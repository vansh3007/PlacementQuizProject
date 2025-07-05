-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `enrollment` VARCHAR(191) NOT NULL,
    `profile` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `admissionYear` DATETIME(3) NOT NULL,
    `currentYear` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_enrollment_key`(`enrollment`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
