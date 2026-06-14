import { calculateDiet } from '../diet';
import { DIET_FACTORS } from '../constants';

describe('Diet Calculator', () => {
  it('should return correct annual emission for vegan diet', () => {
    const result = calculateDiet({ dietType: 'VEGAN' });
    expect(result.annualEmission).toBe(DIET_FACTORS['VEGAN']);
  });

  it('should return correct annual emission for meat heavy diet', () => {
    const result = calculateDiet({ dietType: 'MEAT_HEAVY' });
    expect(result.annualEmission).toBe(DIET_FACTORS['MEAT_HEAVY']);
  });
});
