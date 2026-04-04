export function getPositiveIntegerSearchParam(
  searchParams: URLSearchParams,
  key: string,
) {
  const rawValue = searchParams.get(key);

  if (!rawValue) {
    return null;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    return null;
  }

  return parsedValue;
}
