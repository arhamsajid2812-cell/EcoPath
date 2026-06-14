import { NextResponse } from 'next/server';

export interface SafeErrorResponse {
  success: false;
  message: string;
  code: string;
}

const ERROR_DICTIONARY: Record<string, string> = {
  'RATE_LIMIT_EXCEEDED': 'Too many requests. Please try again later.',
  'VISION_PARSE_ERROR': 'Failed to analyze the receipt image. Ensure it is a clear picture.',
  'VALIDATION_ERROR': 'Invalid data provided.',
  'INTERNAL_SERVER_ERROR': 'An unexpected error occurred.',
};

export function createSafeError(code: string, customMessage?: string): NextResponse<SafeErrorResponse> {
  const message = customMessage || ERROR_DICTIONARY[code] || ERROR_DICTIONARY['INTERNAL_SERVER_ERROR'];
  
  let status = 500;
  if (code === 'RATE_LIMIT_EXCEEDED') status = 429;
  if (code === 'VALIDATION_ERROR' || code === 'VISION_PARSE_ERROR') status = 400;

  return NextResponse.json({
    success: false,
    message,
    code,
  }, { status });
}
