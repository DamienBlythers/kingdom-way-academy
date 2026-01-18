import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "course";
}

export function generateSEO({
  title = "Kingdom Way Academy - Transform Your Faith Through Kingdom Education",
  description = "Join Kingdom Way Academy for faith-centered leadership training. Transform your spiritual journey with biblical wisdom, practical application, and community support.",
  keywords = [
    "kingdom education",
    "faith-based learning",
    "christian leadership",
    "biblical training",
    "spiritual growth",
    "kingdom principles",
    "faith development",
    "christian courses",
  ],
  image = "/og-image.png",
  url = "https://kingdomwaylearning.com",
  type = "website",
}: SEOProps = {}): Metadata {
  const siteTitle = title.includes("Kingdom Way Academy")
    ? title
    : `${title} | Kingdom Way Academy`;

  return {
    title: siteTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Kingdom Way Academy" }],
    creator: "Kingdom Way Academy",
    publisher: "Kingdom Way Academy",
    applicationName: "Kingdom Way Academy",
    
    metadataBase: new URL(url),
    
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: siteTitle,
      description,
      siteName: "Kingdom Way Academy",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description,
      images: [image],
      creator: "@kingdomwayacademy",
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      // bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
    
    alternates: {
      canonical: url,
    },
  };
}

// Course-specific SEO
export function generateCourseSEO({
  title,
  description,
  image,
  courseId,
}: {
  title: string;
  description: string;
  image?: string;
  courseId: string;
}): Metadata {
  return generateSEO({
    title,
    description,
    image,
    url: `https://kingdomwaylearning.com/courses/${courseId}`,
    type: "course",
    keywords: [
      "online course",
      "faith course",
      "christian education",
      "kingdom training",
      ...title.toLowerCase().split(" "),
    ],
  });
}
