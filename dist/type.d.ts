export declare type ParseResponse = {
    title: string;
    content: string;
    thumbnail: string;
    provider: string;
    favicon: string;
};
export interface Cooparser {
    parse: (url: string) => Promise<ParseResponse>;
    parseList: (urlList: string[]) => Promise<ParseResponse[]>;
}
