-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- RenameColumn
ALTER TABLE "Layer" RENAME COLUMN "palletsAccomodated" TO "NumberOfPalletsAccomodated";

-- AlterTable
ALTER TABLE "Layer" ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Layer" ALTER COLUMN "active" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "Roles" NOT NULL DEFAULT 'USER';
