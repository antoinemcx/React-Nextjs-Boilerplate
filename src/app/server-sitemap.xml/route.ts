// @ts-ignore
import { getServerSideSitemap } from 'next-sitemap';
const url = process.env.SITE_URL as string;

export async function GET() {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')

    return getServerSideSitemap([
        {
            loc: url,
            lastmod: new Date().toISOString(),
        },
        // {
        //     loc: `${url}/dynamic-path-2`,
        //     lastmod: new Date().toISOString(),
        // },
    ]);
}
