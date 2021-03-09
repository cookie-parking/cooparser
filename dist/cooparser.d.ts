import { Cooparser, ParseResponse } from './type';
declare class CooparserImpl implements Cooparser {
    private static instance;
    private constructor();
    static getInstance(): CooparserImpl;
    parse(url: string): Promise<ParseResponse>;
    parseList(urlList: string[]): Promise<ParseResponse[]>;
    private returnHTML;
    private getHTML;
    private findFavicon;
    private sliceURL;
}
export default CooparserImpl;
