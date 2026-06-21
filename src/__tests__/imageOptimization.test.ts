import { describe, it, expect } from 'vitest';
import { downscaleImage } from '../utils/imageOptimization';

describe('imageOptimization utility', () => {
  it('should immediately resolve PDF files without modification', async () => {
    const pdfBlob = new Blob(['%PDF-1.4'], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'test.pdf', { type: 'application/pdf' });
    
    const result = await downscaleImage(pdfFile, 1600, 1600);
    expect(result.type).toBe('application/pdf');
    expect(result.name).toBe('test.pdf');
  });

  // Note: Testing actual canvas/image manipulation requires a DOM environment 
  // with mock canvas implementation (e.g. jest-canvas-mock), which is outside 
  // the scope of this pure utility test. The PDF path proves the type branching works.
});
