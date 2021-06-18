
import LLWConfig from "../config/LLWConfig";


export default class LLLog {

    static reConsole() {
        if (!LLWConfig.ISLOG) { return }

        window.console = (function (origConsole) {

            if (!window.console)
                console = {};

            return {
                log: function () {
                    if (LLWConfig.ISLOG) { return }
                    origConsole && origConsole.log && origConsole.log(arguments[0]);
                },
                info: function () {
                    if (LLWConfig.ISLOG) { return }
                    origConsole.info(arguments[0]);
                },
                warn: function () {
                    if (LLWConfig.ISLOG) { return }
                    origConsole.warn(arguments[0]);
                },
                error: function () {
                    if (LLWConfig.ISLOG) { return }
                    origConsole.error(arguments[0]);
                },
                time: function () {
                    if (LLWConfig.ISLOG) { return }
                    origConsole.time(arguments[0]);
                },
                timeEnd: function () {
                    if (LLWConfig.ISLOG) { return }
                    origConsole.timeEnd(arguments[0]);
                }
            };
        }(window.console));
    };


}




