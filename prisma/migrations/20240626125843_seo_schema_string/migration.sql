/*
  Warnings:

  - Made the column `schema` on table `SeoMetadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schemaReview` on table `SeoMetadata` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SeoMetadata" ALTER COLUMN "schema" SET NOT NULL,
ALTER COLUMN "schema" SET DATA TYPE TEXT,
ALTER COLUMN "schemaReview" SET NOT NULL,
ALTER COLUMN "schemaReview" SET DATA TYPE TEXT;
