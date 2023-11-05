-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    ADD COLUMN `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'inactive',
    ADD COLUMN `token` VARCHAR(191) NULL,
    ADD COLUMN `tokenValidityDate` DATETIME(3) NULL;
