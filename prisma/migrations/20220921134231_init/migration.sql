-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
