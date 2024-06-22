-- CreateTable
CREATE TABLE "Trek" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "altitude" TEXT NOT NULL,
    "bestTime" TEXT NOT NULL,
    "pickupPoint" TEXT NOT NULL,
    "difficultyLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultSlots" INTEGER NOT NULL,
    "defaultBookingAmount" INTEGER NOT NULL,
    "defaultTotalAmount" INTEGER NOT NULL,
    "blogId" TEXT,

    CONSTRAINT "Trek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" JSONB,
    "html" TEXT,
    "markdown" TEXT,
    "images" TEXT[],
    "faqs" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogTrek" (
    "blogId" TEXT NOT NULL,
    "trekId" TEXT NOT NULL,

    CONSTRAINT "BlogTrek_pkey" PRIMARY KEY ("blogId","trekId")
);

-- AddForeignKey
ALTER TABLE "Trek" ADD CONSTRAINT "Trek_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTrek" ADD CONSTRAINT "BlogTrek_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTrek" ADD CONSTRAINT "BlogTrek_trekId_fkey" FOREIGN KEY ("trekId") REFERENCES "Trek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
