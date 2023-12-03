export function isNonEmptyArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}