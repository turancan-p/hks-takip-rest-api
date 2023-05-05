-- CreateTable
CREATE TABLE `LicensePlate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `productID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `county` VARCHAR(255) NOT NULL,
    `productID` INTEGER NOT NULL,
    `productTypeID` INTEGER NOT NULL,
    `billType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CksOwner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `county` VARCHAR(255) NOT NULL,
    `tckNo` VARCHAR(255) NOT NULL,
    `cksKg` INTEGER NOT NULL,
    `productID` INTEGER NOT NULL,
    `productTypeID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HksRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registerDate` DATETIME(3) NOT NULL,
    `customerID` INTEGER NOT NULL,
    `cksOwnerID` INTEGER NOT NULL,
    `productID` INTEGER NOT NULL,
    `productTypeID` INTEGER NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `county` VARCHAR(255) NOT NULL,
    `hksKg` INTEGER NOT NULL,
    `hksPrice` DOUBLE NOT NULL,
    `licensePlateID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductType` ADD CONSTRAINT `ProductType_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_productTypeID_fkey` FOREIGN KEY (`productTypeID`) REFERENCES `ProductType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CksOwner` ADD CONSTRAINT `CksOwner_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CksOwner` ADD CONSTRAINT `CksOwner_productTypeID_fkey` FOREIGN KEY (`productTypeID`) REFERENCES `ProductType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HksRecord` ADD CONSTRAINT `HksRecord_customerID_fkey` FOREIGN KEY (`customerID`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HksRecord` ADD CONSTRAINT `HksRecord_cksOwnerID_fkey` FOREIGN KEY (`cksOwnerID`) REFERENCES `CksOwner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HksRecord` ADD CONSTRAINT `HksRecord_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HksRecord` ADD CONSTRAINT `HksRecord_productTypeID_fkey` FOREIGN KEY (`productTypeID`) REFERENCES `ProductType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HksRecord` ADD CONSTRAINT `HksRecord_licensePlateID_fkey` FOREIGN KEY (`licensePlateID`) REFERENCES `LicensePlate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
