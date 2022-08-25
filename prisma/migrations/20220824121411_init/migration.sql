/*
  Warnings:

  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_authorId_fkey";

-- AlterTable
ALTER TABLE "post" DROP CONSTRAINT "post_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "post_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "ref_user" DROP DEFAULT,
ALTER COLUMN "ref_user" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("ref_user");
DROP SEQUENCE "users_ref_user_seq";

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("ref_user") ON DELETE RESTRICT ON UPDATE CASCADE;
