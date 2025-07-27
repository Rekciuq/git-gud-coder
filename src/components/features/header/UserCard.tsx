"use client";

import { useUserStore } from "@/context/UserProvider";
import Image from "next/image";

const UserCard = () => {
  const user = useUserStore((state) => state.user);
  const userDetails = user.firstName ? user.firstName : user.email;

  return (
    <div className="inline-flex items-center gap-2">
      <div className="w-6 h-6 relative border border-primary-text">
        <Image
          src={user.image}
          alt={"User profile image"}
          fill={true}
          className="object-cover"
        />
      </div>
      <p className="text-primary-text text-xs">{userDetails}</p>
    </div>
  );
};

export default UserCard;
