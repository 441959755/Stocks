import PlatDefine from "./PlatDefine";

const CHANNELID = '';
const VERSION = 0;
const GAMEID = 0;
//const PLATTYPE = PlatDefine.PLAT_WECHAT;
const PLATTYPE = PlatDefine.PLAT_WEB;

export default class LLWConfig {
    static get CHANNELID() {
        return CHANNELID;
    }

    static get VERSION() {
        return VERSION;
    }

    static get GAMEID() {
        return GAMEID;
    }

    static get PLATTYPE() {
        return PLATTYPE;
    }
}


////pbjs -t static-module -w commonjs -o proto.js *.proto
//pbts -o proto.d.ts proto.js


