export function getSafeRedirectPath(
  value: string | null | undefined,
  fallback: string,
) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

export function buildAuthRedirectPath(
  redirectPath: string,
  mode: "login" | "register" = "login",
) {
  const searchParams = new URLSearchParams({
    redirect: redirectPath,
  });

  return `/auth/${mode}?${searchParams.toString()}`;
}
