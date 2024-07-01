-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roles` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `annee` VARCHAR(191) NOT NULL,
    `idutilisateurs` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Formation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `libelle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Centre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `departement` VARCHAR(191) NOT NULL,
    `arrondissement` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numacte` VARCHAR(191) NOT NULL,
    `cnipere` VARCHAR(191) NOT NULL,
    `cnimere` VARCHAR(191) NOT NULL,
    `cnitemoin1` VARCHAR(191) NOT NULL,
    `cnitemoin2` VARCHAR(191) NOT NULL,
    `dateetablissementacte` DATETIME(3) NOT NULL,
    `idregistre` INTEGER NOT NULL,
    `idformation` INTEGER NULL,
    `type` ENUM('Mariage', 'Naissance', 'Deces') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mariage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_acte` INTEGER NOT NULL,
    `cniepoux` VARCHAR(191) NOT NULL,
    `cniepouse` VARCHAR(191) NOT NULL,
    `nomepoux` VARCHAR(191) NOT NULL,
    `datenaissanceepoux` DATETIME(3) NOT NULL,
    `lieunaissanceepoux` VARCHAR(191) NOT NULL,
    `professionepoux` VARCHAR(191) NOT NULL,
    `domicileepoux` VARCHAR(191) NOT NULL,
    `nationaliteepoux` VARCHAR(191) NOT NULL,
    `situationmatrimonialeepoux` VARCHAR(191) NOT NULL,
    `nomepouse` VARCHAR(191) NOT NULL,
    `datenaissanceepouse` DATETIME(3) NOT NULL,
    `lieunaissanceepouse` VARCHAR(191) NOT NULL,
    `professionepouse` VARCHAR(191) NOT NULL,
    `domicileepouse` VARCHAR(191) NOT NULL,
    `nationaliteepouse` VARCHAR(191) NOT NULL,
    `situationmatrimonialeepouse` VARCHAR(191) NOT NULL,
    `regimematrimonial` VARCHAR(191) NOT NULL,
    `idcentre` INTEGER NOT NULL,
    `idutilisateur` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Naissance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_acte` INTEGER NOT NULL,
    `sexe` VARCHAR(191) NOT NULL,
    `nomenfant` VARCHAR(191) NOT NULL,
    `datenaissanceenfant` DATETIME(3) NOT NULL,
    `lieunaissanceenfant` VARCHAR(191) NOT NULL,
    `nompere` VARCHAR(191) NOT NULL,
    `proffessionpere` VARCHAR(191) NOT NULL,
    `domicileparent` VARCHAR(191) NOT NULL,
    `nomemere` VARCHAR(191) NOT NULL,
    `proffessionmere` VARCHAR(191) NOT NULL,
    `etatparent` VARCHAR(191) NOT NULL,
    `idformation` INTEGER NOT NULL,
    `idcentre` INTEGER NOT NULL,
    `idutilisateurs` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_acte` INTEGER NOT NULL,
    `nomdeclarant` VARCHAR(191) NOT NULL,
    `professiondeclarant` VARCHAR(191) NOT NULL,
    `domiciledeclarant` VARCHAR(191) NOT NULL,
    `qualitedeclarant` VARCHAR(191) NOT NULL,
    `nomdefun` VARCHAR(191) NOT NULL,
    `datenaissance` DATETIME(3) NOT NULL,
    `lieunaissance` VARCHAR(191) NOT NULL,
    `profession` VARCHAR(191) NOT NULL,
    `domiciledefun` VARCHAR(191) NOT NULL,
    `nationalitedefun` VARCHAR(191) NOT NULL,
    `datedeces` DATETIME(3) NOT NULL,
    `lieudeces` VARCHAR(191) NOT NULL,
    `circonstancesdeces` VARCHAR(191) NOT NULL,
    `idformation` INTEGER NOT NULL,
    `idcentre` INTEGER NOT NULL,
    `idutilisateurs` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Registre` ADD CONSTRAINT `Registre_idutilisateurs_fkey` FOREIGN KEY (`idutilisateurs`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acte` ADD CONSTRAINT `Acte_idregistre_fkey` FOREIGN KEY (`idregistre`) REFERENCES `Registre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acte` ADD CONSTRAINT `Acte_idformation_fkey` FOREIGN KEY (`idformation`) REFERENCES `Formation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mariage` ADD CONSTRAINT `Mariage_idcentre_fkey` FOREIGN KEY (`idcentre`) REFERENCES `Centre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mariage` ADD CONSTRAINT `Mariage_idutilisateur_fkey` FOREIGN KEY (`idutilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naissance` ADD CONSTRAINT `Naissance_id_acte_fkey` FOREIGN KEY (`id_acte`) REFERENCES `Acte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naissance` ADD CONSTRAINT `Naissance_idformation_fkey` FOREIGN KEY (`idformation`) REFERENCES `Formation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naissance` ADD CONSTRAINT `Naissance_idcentre_fkey` FOREIGN KEY (`idcentre`) REFERENCES `Centre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Naissance` ADD CONSTRAINT `Naissance_idutilisateurs_fkey` FOREIGN KEY (`idutilisateurs`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deces` ADD CONSTRAINT `Deces_id_acte_fkey` FOREIGN KEY (`id_acte`) REFERENCES `Acte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deces` ADD CONSTRAINT `Deces_idformation_fkey` FOREIGN KEY (`idformation`) REFERENCES `Formation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deces` ADD CONSTRAINT `Deces_idcentre_fkey` FOREIGN KEY (`idcentre`) REFERENCES `Centre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deces` ADD CONSTRAINT `Deces_idutilisateurs_fkey` FOREIGN KEY (`idutilisateurs`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
