/*
  Warnings:

  - Added the required column `applyLink` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Jobs` ADD COLUMN `applyLink` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyName` VARCHAR(191) NOT NULL,
    ADD COLUMN `jobDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `jobTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `logo` VARCHAR(191) NOT NULL,
    ADD COLUMN `package` VARCHAR(191) NULL;
