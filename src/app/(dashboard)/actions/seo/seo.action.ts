"use server";

import * as z from "zod";
import { db } from "@/lib/prisma";

const SeoSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  description: z.string(),
  h1: z.string(),
  canonical: z.string().url(),
  ogUrl: z.string().url(),
  ogTitle: z.string(),
  ogDescription: z.string(),
  ogImage: z.string().url(),
  schema: z.string(),
  metaRobots: z.string(),
  altTag: z.string(),
  schemaReview: z.string(),
  keywords: z.string(),
});

// Create SEO entry
export const createSeoEntry = async (values: z.infer<typeof SeoSchema>) => {
  const validatedFields = SeoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    const newEntry = await db.seoMetadata.create({
      data: validatedFields.data,
    });
    console.log(newEntry);
    return { success: "SEO entry created!", data: newEntry };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create SEO entry." };
  }
};

// Update SEO entry
export const updateSeoEntry = async (
  id: string,
  values: z.infer<typeof SeoSchema>
) => {
  const validatedFields = SeoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    const updatedEntry = await db.seoMetadata.update({
      where: { id },
      data: validatedFields.data,
    });
    return { success: "SEO entry updated!", data: updatedEntry };
  } catch (error) {
    return { error: "Failed to update SEO entry." };
  }
};

// Delete SEO entry
export const deleteSeoEntry = async (id: string) => {
  try {
    await db.seoMetadata.delete({
      where: { id },
    });
    return { success: "SEO entry deleted!" };
  } catch (error) {
    return { error: "Failed to delete SEO entry." };
  }
};

// Fetch SEO entry by ID
export const fetchSeoEntryById = async (id: string) => {
  try {
    const seoEntry = await db.seoMetadata.findUnique({
      where: { id },
    });
    if (!seoEntry) {
      return { error: "SEO entry not found." };
    }
    console.log(seoEntry);
    return { success: "SEO entry fetched!", data: seoEntry };
  } catch (error) {
    return { error: "Failed to fetch SEO entry." };
  }
};

// Read SEO entries (for fetching in table)
export const fetchSeoEntries = async (
  offset: number,
  limit: number,
  search?: string
) => {
  try {
    const where = search
      ? { OR: [{ url: { contains: search } }, { title: { contains: search } }] }
      : {};

    const total = await db.seoMetadata.count({ where });
    const items = await db.seoMetadata.findMany({
      where,
      skip: offset,
      take: limit,
    });

    return { total, items };
  } catch (error) {
    return { error: "Failed to fetch SEO entries." };
  }
};

// only used for creating data
export const createData = async () => {
  try {
    for (let i = 1; i <= 100; i++) {
      await db.seoMetadata.create({
        data: {
          url: `https://example.com/page-${i}`,
          title: `Dummy Title ${i}`,
          description: `This is a dummy description for entry ${i}.`,
          h1: `Dummy H1 ${i}`,
          canonical: `https://example.com/page-${i}`,
          ogUrl: `https://example.com/page-${i}`,
          ogTitle: `Dummy OG Title ${i}`,
          ogDescription: `Dummy OG Description ${i}`,
          ogImage: `https://example.com/image-${i}.jpg`,
          schema: `{"@context": "https://schema.org", "@type": "WebPage", "name": "Dummy Page ${i}"}`,
          metaRobots: `index,follow`,
          altTag: `Dummy Alt Tag ${i}`,
          schemaReview: `{"@context": "https://schema.org", "@type": "Review", "reviewBody": "Dummy Review ${i}"}`,
          keywords: `dummy, entry, ${i}`,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};
