declare class Cooparser {
    private static instance;
    private constructor();
    static getInstance(): Cooparser;
    parse(url: string): Promise<{
        title: string;
        content: string;
        link: string;
        thumbnail: string;
        favicon: any;
        provider: string;
    }>;
    private returnHTML;
    private getHTML;
    private findFavicon;
    private sliceURL;
}
export default Cooparser;
