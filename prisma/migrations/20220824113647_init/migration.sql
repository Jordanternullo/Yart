/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ref_user]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ref_user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "ref_user" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_ref_user_key" ON "User"("ref_user");
