/*
  Warnings:

  - Added the required column `deliverydate` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "deliverydate" TIMESTAMP(3) NOT NULL;
