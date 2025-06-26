import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction ? process.env.APP_URL : "http://localhost:3000";

// 정적 경로
const staticPages = ["", "terms", "privacy", "elements"];

export async function GET() {
  const supabase = await createClient();

  const { data: elements, error: elementsError } = await supabase
    .from("elements")
    .select("id, updated_at");

  if (elementsError) {
    console.error("Failed to fetch elements:", elementsError);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id, updated_at");

  if (usersError) {
    console.error("Failed to fetch users:", usersError);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }

  const staticUrls = [
    `${baseUrl}/`,
    ...staticPages.map((page) => `${baseUrl}/${page}`),
  ];

  const staticXml = staticUrls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>`
    )
    .join("");

  const today = new Date().toISOString().split("T")[0];

  const elementXml =
    elements
      ?.map(({ id, updated_at }) => {
        const lastmod = updated_at
          ? new Date(updated_at).toISOString().split("T")[0]
          : today;
        return `
  <url>
    <loc>${baseUrl}/element/${id}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
      })
      .join("") ?? "";

  const userXml =
    users
      ?.map(({ id, updated_at }) => {
        const lastmod = updated_at
          ? new Date(updated_at).toISOString().split("T")[0]
          : today;
        return `
  <url>
    <loc>${baseUrl}/user/${id}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
      })
      .join("") ?? "";

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${elementXml}
${userXml}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
