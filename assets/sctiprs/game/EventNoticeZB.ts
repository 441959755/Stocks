import { pb } from "../../protos/proto";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import DrawData from "./DrawData";
import GameCfg from "./GameCfg";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    gpData = null;

    maList = null;

    onLoad() {
        GlobalEvent.on(EventCfg.SLGEVENTNOTICE, () => {
            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                if (GameCfg.GameSet.select == '均线') {
                    this.testMaEvent();
                }
            }
        })
    }

    initData() {
        this.gpData = GameCfg.data[0].data;
        this.maList = DrawData.MaList;

    }


    testMaEvent() {
        let index = GameCfg.huizhidatas - 1;
        if (GameCfg.GameSet.strategy == '股价穿越均线') {
            let str;
            //1)股价上穿均线
            if (this.gpData[index].close > this.maList[0][index]) {
                if (this.maList[index] > this.maList[index - 1]) {
                    let b = Math.max(this.gpData[index - 1].close, this.gpData[index - 1].open);
                    if (this.gpData[index] > b) {
                        //
                        str = '上穿' + GameCfg.MAs[0] + '均线';
                    }
                }
            }

            //2)股价下穿均线
            if (this.gpData[index - 1].close > this.maList[0][index - 1]) {
                if (this.gpData[index].close < this.maList[0][index]) {
                    str = '下穿' + GameCfg.MAs[0] + '均线';
                }
            }

        }
        else if (GameCfg.GameSet.strategy == '均线交叉') {

        }

    }

    start() {
        this.initData();
    }


}
