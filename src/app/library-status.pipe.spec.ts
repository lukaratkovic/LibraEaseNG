import { LibraryStatusPipe } from './library-status.pipe';

describe('LibraryStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new LibraryStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
