import { Cooparser, ParseResponse } from './type';
declare class CooparserImpl implements Cooparser {
    private static instance;
    private constructor();
    static getInstance(): CooparserImpl;
    parse(url: string): Promise<ParseResponse | undefined>;
    parseList(urlList: string[]): Promise<ParseResponse[]>;
    private returnHTML;
    private getHTML;
    private findFavicon;
    private getURLDomain;
}
export default CooparserImpl;
