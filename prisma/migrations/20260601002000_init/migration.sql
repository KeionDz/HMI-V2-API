-- CreateTable
CREATE TABLE "Pallet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "palletCode" TEXT NOT NULL,
    "beginCell" TEXT NOT NULL,
    "endStation" TEXT NOT NULL,
    "layerId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Layer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "palletsAccomodated" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
