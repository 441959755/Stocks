import { pb } from "../../../protos/proto";
import PlatDefine from "./PlatDefine";

const VERSION = 0;
const GAMEID = 0;
//const PLATTYPE = PlatDefine.PLAT_IOS;
//const PLATTYPE = PlatDefine.PLAT_ANDROID;
const PLATTYPE = PlatDefine.PLAT_WEB;
const FROM = pb.AppFrom.Website3th;
const LOADHEADURL = 'http://test.chaogugame.com/icon/';
//const LOADHEADURL = 'https://www.cgdr168.com/icon/';

const ISLOG = false;

export default class LLWConfig {

    static get FROM() {
        return FROM;
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

    static get ISLOG() {
        return ISLOG;
    }

    static get LOADHEADURL() {
        return LOADHEADURL;
    }
}


////pbjs -t static-module -w commonjs -o proto.js *.proto
//pbts -o proto.d.ts proto.js


//<input id="file" type="file" class="fileToUpload" style="opacity:0;position:absolute;" onchange="handleFiles(this)"/> 


