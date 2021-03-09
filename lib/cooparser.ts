import { Cooparser, ParseResponse } from './type';
import * as cheerio from 'cheerio';
import axios from 'axios';

class CooparserImpl implements Cooparser {
    private static instance: CooparserImpl;
    private constructor () { }

    public static getInstance () {
        return this.instance || (this.instance = new this());
    }

    public async parse (url: string): Promise<ParseResponse> {
        const html = await this.returnHTML(url);
    
        const $ = cheerio.load(html);
        const title = $("meta[property='og:title']").attr('content') ?? $('title').text();
        const content = $("meta[property='og:description']").attr('content') ?? '';
        const provider = $("meta[property='og:site_name']").attr('content') ?? '-';
        const favicon = await this.findFavicon(html, $, url);

        let thumbnail = $("meta[property='og:image']").attr('content') ?? '';
        if (thumbnail.length >= 2 && thumbnail[0] === '/' && thumbnail[1] === '/') {
            thumbnail = 'https:' + thumbnail;
        }
    
        const data = {
            title,
            content,
            link: url,
            thumbnail,
            favicon,
            provider
        };
    
        return data;
    };

    public async parseList (urlList: string[]): Promise<ParseResponse[]> {
        return await Promise.all(urlList.map(url => {
            return this.parse(url);
        }))
    }

    private async returnHTML (url: string) {
        const response = await this.getHTML(url);
        return response.data;
    };

    private async getHTML (url: string) {
        try {
            return await axios.get(url);
        } catch (error) {
            console.log('[GET HTML] ERROR: ', error);
        }
    };

    private async findFavicon (html: any, $: cheerio.Root, url: string) {
        const shortcutIconURL = $(`link[rel="shortcut icon"]`).attr('href') ?? undefined;
        const appleIconURL = $(`link[rel="apple-touch-icon"]`).attr('href') ?? undefined;
        const iconURL = (shortcutIconURL ? shortcutIconURL : appleIconURL) ?? '';
        if (iconURL === '' || iconURL[0] !== '/') {
            return iconURL;
        }
        const httpPrefix = 'https:';
        const faviconURL = iconURL[1] === '/' ? (httpPrefix + iconURL) : (this.getURLDomain(url) + iconURL);
        return faviconURL;
    };

    private getURLDomain (url: string) {
        const end = url.indexOf('/', url.indexOf('/') + 2);
        return url.substring(0, end);
    };
}

export default CooparserImpl;