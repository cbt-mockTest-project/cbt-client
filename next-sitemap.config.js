const { default: axios } = require('axios');

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
  additionalPaths : async (config) => {
    const res = await axios.post('https://api.moducbt.com/graphql', {
      operationName : null,
      variables : {},
      query : "{\n  readAllQuestions {\n    ok\n    questions {\n      id\n      question\n   }\n  }\n}\n"
    })
    const questionIds = await Promise.all(res.data.data.readAllQuestions.questions
      .filter((question) => question.question)
      .map(async (question) => await config.transform(config, `/question/${question.id}`)))
    return questionIds;
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
