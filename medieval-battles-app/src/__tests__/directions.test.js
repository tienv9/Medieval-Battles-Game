import { rotateClockwise } from '../utils/directions';

describe('rotateClockwise', () => {
  test('N → E', () => expect(rotateClockwise('N')).toBe('E'));
  test('E → S', () => expect(rotateClockwise('E')).toBe('S'));
  test('S → W', () => expect(rotateClockwise('S')).toBe('W'));
  test('W → N', () => expect(rotateClockwise('W')).toBe('N'));

  test('full rotation returns to start', () => {
    let facing = 'N';
    for (let i = 0; i < 4; i++) facing = rotateClockwise(facing);
    expect(facing).toBe('N');
  });
});
