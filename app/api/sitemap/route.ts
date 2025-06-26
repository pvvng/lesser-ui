import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// 필요한 정적 페이지 경로들
const staticPages = ["", "terms", "privacy", "elements"];

export async function GET() {
  const supabase = await createClient();

  // elements 데이터
  const { data: elements, error: elementsError } = await supabase
    .from("elements")
    .select("id");

  if (elementsError) {
    console.error("Failed to fetch elements:", elementsError);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }

  // users 데이터
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id");

  if (usersError) {
    console.error("Failed to fetch users:", usersError);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }

  const elementIds = elements?.map(({ id }) => id) ?? [];
  const userIds = users?.map(({ id }) => id) ?? [];

  // 동적 URL 생성
  const dynamicUrls = [
    ...elementIds.map((id) => `${baseUrl}/element/${id}`),
    ...userIds.map((id) => `${baseUrl}/user/${id}`),
  ];

  const staticUrls = staticPages.map((page) => `${baseUrl}/${page}`);

  const urls = [...staticUrls, ...dynamicUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((url) => `<url><loc>${url}</loc></url>`).join("\n  ")}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
