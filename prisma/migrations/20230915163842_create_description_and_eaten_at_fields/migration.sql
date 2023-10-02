/*
  Warnings:

  - Added the required column `description` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eaten_at` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "eaten_at" TIMESTAMP(3) NOT NULL;
