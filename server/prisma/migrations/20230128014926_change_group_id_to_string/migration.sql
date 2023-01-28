-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "group_id" TEXT,
    "created_at" DATETIME NOT NULL,
    "ended_at" DATETIME,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "habits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habits" ("created_at", "ended_at", "group_id", "id", "title", "user_id") SELECT "created_at", "ended_at", "group_id", "id", "title", "user_id" FROM "habits";
DROP TABLE "habits";
ALTER TABLE "new_habits" RENAME TO "habits";
CREATE UNIQUE INDEX "habits_title_user_id_ended_at_key" ON "habits"("title", "user_id", "ended_at");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
