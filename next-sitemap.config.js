/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://freewinningtips.com',
    generateRobotsTxt: true, // (optional)
    // ...other options
    exclude: ['/404'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: "*",
          disallow: ["/404"],
        },
        { userAgent: "*", allow: "/" },
      ],
    },
}