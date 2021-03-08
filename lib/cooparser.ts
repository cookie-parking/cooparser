import * as cheerio from 'cheerio';
import axios from 'axios';

class Cooparser {
    private static instance: Cooparser;
    private constructor () { }

    public static getInstance () {
        return this.instance || (this.instance = new this());
    }

    public async parse (url: string) {
        const html = await this.returnHTML(url);
    
        const $ = cheerio.load(html);
        const title = $("meta[property='og:title']").attr('content') ?? $('title').text();
        const content = $("meta[property='og:description']").attr('content') ?? '';
        let thumbnail = $("meta[property='og:image']").attr('content') ?? '';
        let provider = $("meta[property='og:site_name']").attr('content') ?? '-';
        const favicon = await this.findFavicon(html, url);
    
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
    };

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

    private async findFavicon (html: any , url: string) {
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
    };

    private sliceURL (url: string) {
        const start = url.indexOf('/');
        const end = url.indexOf('/', start + 2);
        const slice_url = url.substring(0, end);
        return slice_url;
    };
}

export default Cooparser;