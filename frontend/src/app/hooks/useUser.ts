// hooks/useUser.ts
"use client";

import { useState, useEffect } from "react";

export interface CurrentUser {
  id: number;
  fullname: string;
  username: string;
  email: string;
  role: string;
  profile_photo: string | null;
}

export function useUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data.user ?? data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}