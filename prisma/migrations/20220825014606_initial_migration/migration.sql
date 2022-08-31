-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Poll" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "expiration" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Answer" (
    "uuid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
