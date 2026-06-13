const SERVER = process.env.NEXT_PUBLIC_SERVER;

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  token?: string
) {
  return fetch(`${SERVER}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}

export interface AdminUser {
  id: number;
  fullname: string;
  username: string;
  email: string;
  role: string;
  role_id: number;
  profile_photo: string | null;
  created_at: string;
}

export interface UpdateUserPayload {
  fullname: string;
  username: string;
  email: string;
}

export async function getUsers(): Promise<AdminUser[]> {
  const res = await fetch("/api/users");
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Failed to fetch users.");
  return data.users;
}

export async function updateUser(
  id: number,
  payload: UpdateUserPayload
): Promise<void> {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Failed to update user.");
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Failed to delete user.");
}

export async function promoteUser(id: number, roleId: number): Promise<AdminUser> {
  const res = await fetch(`/api/users/${id}/promote`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role_id: roleId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Failed to update user role.");
  return data.user;
}

export interface CreateSnapTokenPayload {
  order_id: number;      
  project_id: number;    
  total_amount: number;  
  title?: string;        
}

export interface SnapTokenResponse {
  snap_token: string;
  order_id: number;
}

export async function createSnapToken(
  payload: CreateSnapTokenPayload
): Promise<SnapTokenResponse> {
  const res = await fetch("/api/payment/snap-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Gagal membuat token pembayaran.");
  return data;
}
