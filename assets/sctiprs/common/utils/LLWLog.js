//import LLWConfig from "../config/LLWConfig"
import LLWConfig from "../config/LLWConfig";
export default class LLWLog {
    static log(message, ...optionalParams) {
        if (LLWConfig.LogSwitch) {
            console.log(message, optionalParams);
        }
    }
    static error(message, ...optionalParams) {
        if (LLWConfig.LogSwitch) {
            console.error(message, optionalParams);
        }
    }
    static info(message, ...optionalParams) {
        if (LLWConfig.LogSwitch) {
            console.info(message, optionalParams);
        }
    }
    static debug(message, ...optionalParams) {
        if (LLWConfig.LogSwitch) {
            console.debug(message, optionalParams);
        }
    }
}