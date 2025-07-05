/*
  Warnings:

  - Changed the type of `admissionYear` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currentYear` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `admissionYear`,
    ADD COLUMN `admissionYear` INTEGER NOT NULL,
    DROP COLUMN `currentYear`,
    ADD COLUMN `currentYear` INTEGER NOT NULL;
