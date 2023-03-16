/*
  Warnings:

  - Added the required column `size` to the `karts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "karts" ADD COLUMN     "size" TEXT NOT NULL;
