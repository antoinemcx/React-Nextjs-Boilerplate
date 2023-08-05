/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    autoLastmod: false,
    exclude: [`${process.env.SITE_URL}/server-sitemap.xml`],
    robotsTxtOptions: {
        additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`],
        policies: [
            {
                userAgent: '*',
                allow: '/',
                // disallow: [],
            },
        ],
    },
    sitemapSize: 7000,
};
