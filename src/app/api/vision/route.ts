import { NextRequest, NextResponse } from 'next/server';
import { parseReceiptImage } from '@/services/vision/receiptParser';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimiter';
import { createSafeError } from '@/lib/apiError';

const payloadSchema = z.object({
  image: z.string().min(10, "Base64 string too short"),
  mimeType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
});

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

function isValidMagicByte(base64: string, mimeType: string): boolean {
  // Strip data URL prefix if present
  const pureBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
  
  if (mimeType === 'image/jpeg' && pureBase64.startsWith('/9j/')) return true;
  if (mimeType === 'image/png' && pureBase64.startsWith('iVBORw0KGgo')) return true;
  if (mimeType === 'application/pdf' && pureBase64.startsWith('JVBERi0')) return true;
  if (mimeType === 'image/webp' && pureBase64.startsWith('UklGR')) return true;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting (5 req / min)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip, 'vision_api', 5, 60)) {
      return createSafeError('RATE_LIMIT_EXCEEDED');
    }

    // 2. Zod Validation
    const body = await request.json();
    const parsed = payloadSchema.safeParse(body);
    
    if (!parsed.success) {
      return createSafeError('VALIDATION_ERROR', parsed.error.errors[0].message);
    }

    const { image, mimeType } = parsed.data;

    // 3. Payload Size Check
    const approximateSize = (image.length * 3) / 4;
    if (approximateSize > MAX_FILE_SIZE_BYTES) {
      return createSafeError('VALIDATION_ERROR', 'File size exceeds 5MB limit.');
    }

    // 4. Magic Bytes Validation
    if (!isValidMagicByte(image, mimeType)) {
      return createSafeError('VALIDATION_ERROR', 'Invalid file encoding or mime type mismatch.');
    }

    // 5. Processing
    const analysisResult = await parseReceiptImage(image, mimeType);

    if (!analysisResult) {
      return createSafeError('VISION_PARSE_ERROR');
    }

    return NextResponse.json({ success: true, data: analysisResult });

  } catch (error: unknown) {
    console.error("[Vision API] Unhandled Error:", error);
    return createSafeError('INTERNAL_SERVER_ERROR');
  }
}
