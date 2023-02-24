import { HttpErrorFilter } from './error.filter';

describe('ErrorInterceptor', () => {
  it('should be defined', () => {
    expect(new HttpErrorFilter()).toBeDefined();
  });
});
