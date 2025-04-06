import { OrderByKeyPipe } from './order-by-key.pipe';

describe('OrderByPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByKeyPipe();
    expect(pipe).toBeTruthy();
  });
});
