import {DashToUnderscorePipe} from './dash-to-underscore.pipe';

describe('DashToUnderscorePipe', () => {
  let pipe: DashToUnderscorePipe;
  beforeAll(() => {
    pipe = new DashToUnderscorePipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should currently change dash to underscore', () => {
    const result = pipe.transform('test-test');
    expect(result).toEqual('test_test');
  })
});
