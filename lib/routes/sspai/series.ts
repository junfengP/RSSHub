import { Route } from '@/types';
import cache from '@/utils/cache';
import got from '@/utils/got';
import { load } from 'cheerio';

export const route: Route = {
    path: '/series',
    categories: ['new-media', 'popular'],
    example: '/sspai/series',
    parameters: {},
    features: {
        requireConfig: false,
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    radar: [
        {
            source: ['sspai.com/series'],
        },
    ],
    name: '最新上架付费专栏',
    maintainers: ['HenryQW'],
    handler,
    url: 'sspai.com/series',
    description: `> 少数派专栏需要付费订阅，RSS 仅做更新提醒，不含付费内容.`,
};

async function handler() {
    const response = await got('https://sspai.com/api/v1/series/tag/all/get');

    const products = response.data.data.reduce((acc, cate) => {
        if (Array.isArray(cate.children)) {
            const result = cate.children
                .filter((item) => item.sell_status)
                .map((item) => {
                    const price = item.price / 100;
                    return {
                        id: item.id,
                        title: `￥${price} - ${item.title}`,
                        link: `https://sspai.com/series/${item.id}`,
                        author: item.author.nickname,
                    };
                });
            return [...acc, ...result];
        } else {
            return acc;
        }
    }, []);

    const item = await Promise.all(
        products.map((item) =>
            cache.tryGet(item.link, async () => {
                const res = await got(`https://sspai.com/api/v1/series/info/get?id=${item.id}&view=second`);
                const banner = `<img src="https://cdn.sspai.com/${res.data.data.banner_web}" />`;
                const description = banner + res.data.data.intro;
                const $ = load(description);
                $('img').css('max-width', '100%');
                item.description = $.html();
                return item;
            })
        )
    );

    return {
        title: '少数派 -- 最新上架付费专栏',
        link: 'https://sspai.com/series',
        description: '少数派 -- 最新上架付费专栏',
        item,
    };
}
