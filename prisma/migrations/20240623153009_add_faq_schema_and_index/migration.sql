/*
  Warnings:

  - You are about to drop the column `faqs` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "faqs";

-- AlterTable
ALTER TABLE "Trek" ADD COLUMN     "trekImages" TEXT[];

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "faqs_blogId_idx" ON "faqs"("blogId");

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
