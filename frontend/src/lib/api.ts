const SERVER = process.env.NEXT_PUBLIC_SERVER;

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  token?: string
) {
  return fetch(`${SERVER}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}