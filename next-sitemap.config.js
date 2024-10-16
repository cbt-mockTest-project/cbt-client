const { default: axios } = require('axios');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.moducbt.com',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true, // (optional)
  exclude: [
    '/exam/pdf/*',
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
    '/question/*/s_image',
    '/exam/*',
    '/category/*',
    '/sitemap_*',
    '/post/*',
    '/study*',
    '/admin*',
  ],
  // ...other options
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_01.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_02.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_03.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_04.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_05.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_06.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_07.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_08.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_09.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_10.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_11.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_question_12.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_category.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap_exam.xml`,
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
