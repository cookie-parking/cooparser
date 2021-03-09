import { ParseResponse } from './type';
import CooparserImpl from './cooparser';

const cooparser = CooparserImpl.getInstance();

const a = async () => {
    const data = await cooparser.parseList(["https://google.com", "https://youtube.com", "https://www.marvel.com/404"]);
    console.log(data);
}

a();
export { ParseResponse, cooparser };