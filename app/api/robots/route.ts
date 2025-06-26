import { NextResponse } from "next/server";

export async function GET() {
  const isProduction = process.env.NODE_ENV === "production";

  const robotsTxt = isProduction
    ? `
User-agent: *
Disallow: /auth/*
Disallow: */edit
Disallow: /login
Sitemap: https://yourdomain.com/sitemap.xml
    `.trim()
    : `
User-agent: *
Disallow: /
    `.trim();

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
