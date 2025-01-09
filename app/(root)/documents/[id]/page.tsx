import CollaborativeRoom from "@/components/CollaborativeRoom";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { getDocument } from "@/lib/actions/room.actions";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clearkUser = await currentUser();
  if (!clearkUser) redirect("/sign-in");
  const document = await getDocument({
    roomId: id,
    userId: clearkUser.emailAddresses[0].emailAddress,
  });
  if (!document) redirect("/");

  // assess teh permission level

  return (
    <main className="flex w-full ">
      <CollaborativeRoom roomId={id} roomMetadata={document.metadata} />
    </main>
  );
};

export default Document;
