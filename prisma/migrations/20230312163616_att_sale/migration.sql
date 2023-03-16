/*
  Warnings:

  - The primary key for the `sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `sales` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "sales_code_key";

-- AlterTable
ALTER TABLE "sales" DROP CONSTRAINT "sales_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "sales_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "sales_id_key" ON "sales"("id");
