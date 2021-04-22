//import ActionUtils from "../Utils/ActionUtils";

import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from '../../../sctiprs/Utils/EventCfg';
import GameCfg from "../../../sctiprs/game/GameCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    historyItem: cc.Node = null;

    // historyType = null;

    historyInfo = null;

    @property(cc.Node)
    content: cc.Node = null;


    @property(cc.Label)
    label: cc.Label = null;


    start() {

    }

    protected onEnable() {
        ActionUtils.openLayer(this.node);
    }

    onShow() {
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
        //   if (this.historyType == 'SM') {
        let datas = this.historyInfo.results;
        if (datas.length <= 0) {
            return;
        }

        let selectName = function (code) {
            let name;
            for (let i = 0; i < stocklist.length; i++) {
                if (stocklist[i].indexOf(code) != -1) {
                    let items = stocklist[i].split('|');
                    name = items[1];
                    break;
                }
            }
            if (!name) {
                console.log('没有找到该股票');
            }
            return name;
        }
        // {"uid":1000042,"gType":"ShuangMang","quotesCode":600000,
        // "kType":"Day","kFrom":20100101,"kTo":20101010,
        // "stockProfitRate":19.1200008392334,
        // "userProfitRate":10.220000267028809,
        // "userCapital":"100000","userProfit":"800","ts":"1618454133","rank":2}]}
        let sumEar = 0;
        for (let i = 0; i < datas.length; i++) {
            let node = cc.instantiate(this.historyItem);
            let nodes = node.children;
            this.content.addChild(node);
            node.setPosition(cc.v2(0, 0));
            nodes[0].getComponent(cc.Label).string = datas[i].uid;
            nodes[1].getComponent(cc.Label).string = datas[i].quotesCode;
            nodes[2].getComponent(cc.Label).string = selectName(datas[i].quotesCode);
            nodes[3].getComponent(cc.Label).string = datas[i].kFrom;			// 行情起始日期YYYYMMDD或时间HHMMSS
            nodes[4].getComponent(cc.Label).string = datas[i].kTo;

            nodes[5].getComponent(cc.Label).string = datas[i].stockProfitRate.toFixed(2) + '%';
            nodes[6].getComponent(cc.Label).string = datas[i].userProfitRate.toFixed(2) + '%';
            nodes[7].getComponent(cc.Label).string = datas[i].userProfit;
            sumEar += datas[i].userProfit;
        }

        this.label.string = sumEar + '';
        // }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
        //点击复盘
        else if (name == 'btnFuPan') {
            GameCfg.GAMEFUPAN = true;
            //TODO进入游戏
        }
    }

    // update (dt) {}
}
