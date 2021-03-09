import { ParseResponse } from './type';
import CooparserImpl from './cooparser';

const cooparser = CooparserImpl.getInstance();

export { ParseResponse, cooparser };