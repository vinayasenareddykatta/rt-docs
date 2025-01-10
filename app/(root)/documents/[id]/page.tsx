import CollaborativeRoom from "@/components/CollaborativeRoom";

import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
  const document = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });
  if (!document) redirect("/");

  const userIds = Object.keys(document.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const usersData = users?.map((user: User) => ({
    ...user,
    userType: document.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));
  const currentUserType = document.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
  ]?.includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <main className="flex w-full ">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={document.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document;
