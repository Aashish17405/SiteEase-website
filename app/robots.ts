import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/']
    },
    sitemap: 'https://siteease.dev-aashish.tech/sitemap.xml',
    host: 'https://siteease.dev-aashish.tech/'
  }
}