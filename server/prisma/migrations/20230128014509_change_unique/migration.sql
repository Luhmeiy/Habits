/*
  Warnings:

  - A unique constraint covering the columns `[title,user_id,ended_at]` on the table `habits` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "habits_title_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "habits_title_user_id_ended_at_key" ON "habits"("title", "user_id", "ended_at");
