import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import GlobalHandle from "./GlobalHandle";

export default class UpGameOpt {

    public static player1Opt = [];

    public static player2Opt = [];

    public static arrOpt = [];

    private static time = 2;

    private static toCount = 10;

    private static curCount = 0;

    private static preTiem = 0;

    private static cb = null;

    //添加操作
    public static addOpt(el) {
        this.arrOpt.push(el);

        if (GameCfg.GameType == pb.GameType.JJ_PK) {
            this.cb && (clearTimeout(this.cb));
            this.cb = null;
            let curTime = new Date().getTime() / 1000;
            if (!this.preTiem) {
                this.preTiem = curTime;
            }
            let interval = curTime - this.preTiem;

            this.curCount++;
            if (this.curCount >= this.toCount || interval >= this.time) {
                this.curCount = 0;
                this.preTiem = curTime;
                this.UpGameOpt();
            } else {
                this.cb = setTimeout(() => {
                    this.curCount = 0;
                    this.preTiem = curTime;
                    this.UpGameOpt();

                }, (2 - interval) * 1000);
            }
        }
    }

    //上传
    public static UpGameOpt() {

        if (GameCfg.GameType == pb.GameType.JJ_PK) {
            this.cb && (clearTimeout(this.cb));
            this.cb = null;
            GlobalHandle.onUpRoomGameOp({ items: this.arrOpt });

            this.arrOpt = [];
            this.arrOpt.length = 0;
        }
    }

    public static clearGameOpt() {
        this.player1Opt = [];
        this.player1Opt.length = 0;
        this.player2Opt = [];
        this.player2Opt.length = 0;
        this.cb && (clearTimeout(this.cb));
        this.cb = null;
    }
}
