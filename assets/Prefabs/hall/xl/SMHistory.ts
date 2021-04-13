//import ActionUtils from "../Utils/ActionUtils";

import ActionUtils from "../../../sctiprs/Utils/ActionUtils";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from '../../../sctiprs/Utils/EventCfg';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    historyItem: cc.Node = null;

    historyType = null;

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
        if (this.historyType == 'SM') {
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

            let sumEar;
            for (let i = 0; i < datas.length; i++) {
                let node = cc.instantiate(this.historyItem);
                let nodes = node.children;
                this.content.addChild(node);
                nodes[0].getComponent(cc.Label).string = datas[i].uid;
                nodes[1].getComponent(cc.Label).string = datas[i].quotes_code;
                nodes[2].getComponent(cc.Label).string = selectName(datas[i].quotes_code);
                nodes[3].getComponent(cc.Label).string = datas[i].k_from;			// 行情起始日期YYYYMMDD或时间HHMMSS
                nodes[4].getComponent(cc.Label).string = datas[i].k_to;

                nodes[5].getComponent(cc.Label).string = datas[i].stock_profit_rate;
                nodes[6].getComponent(cc.Label).string = datas[i].user_profit_rate;
                nodes[6].getComponent(cc.Label).string = datas[i].user_profit;
                sumEar += datas[i].user_profit;
            }

            this.label.string = sumEar;
        }

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'Mask') {
            this.node.active = false;
        }
    }

    // update (dt) {}
}
