/*
  Warnings:

  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL
);
INSERT INTO "new_users" ("id", "name", "nickname") SELECT "id", "name", "nickname" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
