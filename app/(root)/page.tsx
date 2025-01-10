import AddDocumentBtn from "@/components/AddDocumentBtn";
import { DeleteModal } from "@/components/DeleteModal";

import Header from "@/components/Header";
import { Notifications } from "@/components/Notifications";
import { Button } from "@/components/ui/button";
import { getDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Delete } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async () => {
  const clearkUser = await currentUser();
  if (!clearkUser) redirect("/sign-in");

  const documents = await getDocuments(
    clearkUser.emailAddresses[0].emailAddress
  );
  return (
    <main className="home-container">
      <Header className="sticky top-0 left-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {documents.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn
              userId={clearkUser.id}
              email={clearkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {documents.data.map((document: any, index: any) => {
              return (
                <li className="document-list-item" key={document.id}>
                  <Link
                    href={`/documents/${document.id}`}
                    className="flex flex-1 items-center gap-4"
                  >
                    <div className="hidden rounded-mf bg-dark-500 p-2 sm:block">
                      <Image
                        src="/assets/icons/doc.svg"
                        alt="file"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="line-clamp-1 text-lg">
                        {document.metadata.title}
                      </p>
                      <p className="text-sm font-light text-blue-100">
                        Created about {dateConverter(document.createdAt)}
                      </p>
                    </div>
                  </Link>
                  <DeleteModal roomId={document?.id} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt=""
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentBtn
            userId={clearkUser.id}
            email={clearkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
