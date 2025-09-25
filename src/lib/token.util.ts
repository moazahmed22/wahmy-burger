// utils/getUserToken.ts
import { useSession } from "next-auth/react";

export const getUserToken = () => {
  const { data: session } = useSession();
  return session?.token ?? null;
};
