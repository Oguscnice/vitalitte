import { EnumProductTypeFormatPipe } from '../pipes/enum-product-type-format.pipe';

describe('EnumProductTypeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new EnumProductTypeFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
