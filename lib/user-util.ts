import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { db } from "./db";

const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  const user = await db.user.findUnique({
    where: {
      username: session?.user.email as string,
    },
  });
  if (user === null) return null;
  return user;
};

export default getCurrentUser;
