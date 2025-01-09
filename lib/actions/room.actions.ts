"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();
  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"],
    });
    revalidatePath("/");

    return parseStringify(room);
  } catch (e) {
    console.log(`Error happened while creating a room: ${e}`);
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const document = await liveblocks.getRoom(roomId);

    // TODO: Implement access control
    // const hasAccess = Object.keys(document.usersAccesses).includes(userId);

    // if (!hasAccess) {
    //   throw new Error("You do not have acces to this room");
    // }

    return parseStringify(document);
  } catch (e) {
    console.log(`Error happened while getting a document: ${e}`);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedDocument = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedDocument);
  } catch (e) {
    console.log(`Error happened while updating a document: ${e}`);
  }
};

export const getDocuments = async (email: string) => {
  try {
    const documents = await liveblocks.getRooms({ userId: email });

    return parseStringify(documents);
  } catch (e) {
    console.log(`Error happened while getting a documents: ${e}`);
  }
};
