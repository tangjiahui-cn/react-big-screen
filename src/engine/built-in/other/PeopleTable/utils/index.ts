export async function mockQuery<T>(value?: T, delay: number = 300): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
}
