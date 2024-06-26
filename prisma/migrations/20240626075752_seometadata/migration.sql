-- CreateTable
CREATE TABLE "SeoMetadata" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "h1" TEXT NOT NULL,
    "canonical" TEXT NOT NULL,
    "ogUrl" TEXT NOT NULL,
    "ogTitle" TEXT NOT NULL,
    "ogDescription" TEXT NOT NULL,
    "ogImage" TEXT NOT NULL,
    "schema" JSONB,
    "metaRobots" TEXT NOT NULL,
    "altTag" TEXT NOT NULL,
    "schemaReview" JSONB,
    "keywords" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeoMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeoMetadata_url_key" ON "SeoMetadata"("url");

-- CreateIndex
CREATE INDEX "SeoMetadata_url_idx" ON "SeoMetadata"("url");
