/*
  Warnings:

  - Added the required column `cellphone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cellphone" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
