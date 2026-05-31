-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pallet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "palletCode" TEXT NOT NULL,
    "beginCell" TEXT NOT NULL,
    "endStation" TEXT NOT NULL,
    "layerId" TEXT NOT NULL,
    CONSTRAINT "Pallet_layerId_fkey" FOREIGN KEY ("layerId") REFERENCES "Layer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pallet" ("beginCell", "description", "endStation", "id", "label", "layerId", "palletCode", "taskId") SELECT "beginCell", "description", "endStation", "id", "label", "layerId", "palletCode", "taskId" FROM "Pallet";
DROP TABLE "Pallet";
ALTER TABLE "new_Pallet" RENAME TO "Pallet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
