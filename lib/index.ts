import * as cheerio from 'cheerio';
import axios from 'axios';

const cooparser = {
    async parse (url: string) {
        const html = await this.returnHTML(url);
    
        const $ = cheerio.load(html);
        const title = $("meta[property='og:title']").attr('content') ?? $('title').text();
        const content = $("meta[property='og:description']").attr('content') ?? '';
        let thumbnail = $("meta[property='og:image']").attr('content') ?? '';
        let provider = $("meta[property='og:site_name']").attr('content') ?? '-';
        const favicon = this.findFavicon(html, url);
    
        if (thumbnail[0] == '/' && thumbnail[1] == '/') {
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
    },
    async returnHTML (url: string) {
        const response = await this.getHTML(url);
        return response.data;
    },
    async getHTML (url: string) {
        try {
            return await axios.get(url);
        } catch (error) {
            console.log('[GET HTML] ERROR: ', error);
        }
    },
    async findFavicon (html: any , url: string) {
        let location = html.indexOf(`<link rel="shortcut icon`);
        if (location == -1) {
            location = html.indexOf(`<link rel="apple-touch-icon`);
        }
        if (location != -1) {
            let start = html.indexOf(`href=`, location);
            if (start != -1) {
                let end = html.indexOf(`"`, start + 6);
                let favicon_url = html.substring(start + 6, end);
                if (favicon_url[0] == '/' && favicon_url[1] != '/') {
                    favicon_url = this.sliceURL(url) + favicon_url;
                }
                if (favicon_url[0] == '/' && favicon_url[1] == '/') {
                    favicon_url = 'http:' + favicon_url;
                }
                return favicon_url;
            }
        }
        return '';
    },
    sliceURL (url: string) {
        const start = url.indexOf('/');
        const end = url.indexOf('/', start + 2);
        const slice_url = url.substring(0, end);
        return slice_url;
    }
}

export default cooparser;