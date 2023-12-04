"use client";
import { signOut } from "next-auth/react";

const Logout = ({ className }: { className: string }) => {
  const handleLogout = () => {
    signOut();
  };
  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
};

export default Logout;
