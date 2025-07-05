/*
  Warnings:

  - The primary key for the `AttemptedQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CorrectQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Topic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserQuiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WrongQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `AttemptedQuestion` DROP FOREIGN KEY `AttemptedQuestion_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `AttemptedQuestion` DROP FOREIGN KEY `AttemptedQuestion_userQuizId_fkey`;

-- DropForeignKey
ALTER TABLE `CorrectQuestion` DROP FOREIGN KEY `CorrectQuestion_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `CorrectQuestion` DROP FOREIGN KEY `CorrectQuestion_userQuizId_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_topicId_fkey`;

-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_userQuizId_fkey`;

-- DropForeignKey
ALTER TABLE `Topic` DROP FOREIGN KEY `Topic_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `UserQuiz` DROP FOREIGN KEY `UserQuiz_userId_fkey`;

-- DropForeignKey
ALTER TABLE `WrongQuestion` DROP FOREIGN KEY `WrongQuestion_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `WrongQuestion` DROP FOREIGN KEY `WrongQuestion_userQuizId_fkey`;

-- DropIndex
DROP INDEX `AttemptedQuestion_questionId_fkey` ON `AttemptedQuestion`;

-- DropIndex
DROP INDEX `AttemptedQuestion_userQuizId_fkey` ON `AttemptedQuestion`;

-- DropIndex
DROP INDEX `CorrectQuestion_questionId_fkey` ON `CorrectQuestion`;

-- DropIndex
DROP INDEX `CorrectQuestion_userQuizId_fkey` ON `CorrectQuestion`;

-- DropIndex
DROP INDEX `Question_topicId_fkey` ON `Question`;

-- DropIndex
DROP INDEX `Quiz_questionId_fkey` ON `Quiz`;

-- DropIndex
DROP INDEX `Quiz_userQuizId_fkey` ON `Quiz`;

-- DropIndex
DROP INDEX `Topic_categoryId_fkey` ON `Topic`;

-- DropIndex
DROP INDEX `UserQuiz_userId_fkey` ON `UserQuiz`;

-- DropIndex
DROP INDEX `WrongQuestion_questionId_fkey` ON `WrongQuestion`;

-- DropIndex
DROP INDEX `WrongQuestion_userQuizId_fkey` ON `WrongQuestion`;

-- AlterTable
ALTER TABLE `Admin` MODIFY `id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `AttemptedQuestion` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userQuizId` VARCHAR(191) NOT NULL,
    MODIFY `questionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Category` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CorrectQuestion` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userQuizId` VARCHAR(191) NOT NULL,
    MODIFY `questionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Question` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `topicId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Quiz` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `questionId` VARCHAR(191) NOT NULL,
    MODIFY `userQuizId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Topic` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserQuiz` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `WrongQuestion` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userQuizId` VARCHAR(191) NOT NULL,
    MODIFY `questionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Jobs` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_userQuizId_fkey` FOREIGN KEY (`userQuizId`) REFERENCES `UserQuiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuiz` ADD CONSTRAINT `UserQuiz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CorrectQuestion` ADD CONSTRAINT `CorrectQuestion_userQuizId_fkey` FOREIGN KEY (`userQuizId`) REFERENCES `UserQuiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CorrectQuestion` ADD CONSTRAINT `CorrectQuestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WrongQuestion` ADD CONSTRAINT `WrongQuestion_userQuizId_fkey` FOREIGN KEY (`userQuizId`) REFERENCES `UserQuiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WrongQuestion` ADD CONSTRAINT `WrongQuestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttemptedQuestion` ADD CONSTRAINT `AttemptedQuestion_userQuizId_fkey` FOREIGN KEY (`userQuizId`) REFERENCES `UserQuiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttemptedQuestion` ADD CONSTRAINT `AttemptedQuestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
