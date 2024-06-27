-- DropForeignKey
ALTER TABLE "faqs" DROP CONSTRAINT "faqs_blogId_fkey";

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
