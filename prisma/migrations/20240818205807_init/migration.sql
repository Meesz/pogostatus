-- CreateTable
CREATE TABLE `Status` (
    `isInUse` BOOLEAN NOT NULL,

    UNIQUE INDEX `Status_isInUse_key`(`isInUse`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
