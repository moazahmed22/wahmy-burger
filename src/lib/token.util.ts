// utils/getUserToken.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getUserToken = async () => {
  const session = await getServerSession(authOptions);
  return session?.token ?? null;
};
