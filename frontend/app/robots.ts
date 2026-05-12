import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // We keep your admin panel hidden from Google search
    },
    sitemap: 'https://finixeducationinstitute.com/sitemap.xml',
  }
}
