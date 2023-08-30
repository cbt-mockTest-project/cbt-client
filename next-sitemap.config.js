/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true, // (optional)
  exclude: [
    '/me*',
    '/register/*',
    '/exam/selectedresult',
    '/findpw',
    '/post/write',
    '/test',
    '/exam/write',
    '/admin/*',
    '/admin',
    '/preview/*',
    '/manage/*',
    '/manage',
    '/pricing',
    '/question/*/q_image',
    '/question/*/s_image'
  ],
  // ...other options
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
