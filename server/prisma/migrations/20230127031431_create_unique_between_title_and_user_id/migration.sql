/*
  Warnings:

  - A unique constraint covering the columns `[title,user_id]` on the table `habits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "habits_title_user_id_key" ON "habits"("title", "user_id");
