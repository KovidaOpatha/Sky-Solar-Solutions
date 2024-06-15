import { auth } from "@clerk/clerk-js";

export const checkRole = (role) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
}