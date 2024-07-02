/*
  Warnings:

  - Added the required column `idutilisateurs` to the `Acte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Acte` ADD COLUMN `idutilisateurs` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'En attente';
