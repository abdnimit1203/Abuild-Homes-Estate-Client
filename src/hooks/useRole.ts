"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import { UserRole } from "@/types";

export const useRole = (email?: string | null): [UserRole, boolean] => {
  const { data: role = "user" as UserRole, isLoading } = useQuery<UserRole>({
    queryKey: ["user-role", email],
    enabled: Boolean(email),
    queryFn: async () => {
      if (!email) return "user";
      try {
        const res = await axiosPublic.get(`/api/v1/users/role?email=${email}`);
        return (res.data || "user") as UserRole;
      } catch (error) {
        console.error("Error fetching user role:", error);
        return "user";
      }
    },
  });

  return [role, isLoading];
};

export default useRole;
