
import { pb } from "../../../protos/proto";
import GameCfgText from "../../../sctiprs/GameText";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    labels: cc.Label[] = [];

    _code = null;

    _curData = null;
    onEnable() {
        //进来获取的第一条行情
        GlobalEvent.on(EventCfg.CMDQUOTITEM, (info) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            if (!info.items || info.items.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空');
                return;
            }
            if (info.items[0].code == this._code) {
                this.setLabel(info.items[0]);
            }

        })

        //订阅时时行情
        GlobalEvent.on(EventCfg.SYNCQUOTEITEM, (data) => {
            if (data.code == this._code) {
                this.setLabel(data);
            }
        }, this);

        //订阅
        this.CmdQuoteSubscribe(true);
    }

    setLabel(info) {

        this.labels[2].string = info.price;

        this.labels[3].string = this._curData.priceCost;
        this.labels[4].string = this._curData.volume;

        let zd = info.price - info.close;
        if (zd < 0) {
            this.labels[5].node.color = cc.Color.GREEN;
            this.labels[6].node.color = cc.Color.GREEN;
        }
        else {
            this.labels[5].node.color = cc.Color.RED;
            this.labels[6].node.color = cc.Color.RED;
        }

        this.labels[5].string = ComUtils.changeTwoDecimal(zd) + '';
        let zdf = zd / info.close * 100;
        this.labels[6].string = ComUtils.changeTwoDecimal(zdf) + '%';

        this.labels[7].string = ComUtils.changeTwoDecimal(info.high) + '';
        this.labels[8].string = ComUtils.changeTwoDecimal(info.low) + '';
        let sy = (info.price - this._curData.priceCost) * this._curData.priceCost;
        if (sy > 0) {
            this.labels[9].node.color = cc.Color.RED;
        } else {
            this.labels[9].node.color = cc.Color.GREEN;
        }
        this.labels[9].string = ComUtils.changeTwoDecimal(sy) + '';
    }

    onShow(code, data: any) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this._code = code;
        this._curData = data;

        //获取行情
        {
            let info1 = {
                ktype: pb.KType.Min,
                code: this._code,
                to: parseInt((new Date().getTime()) / 1000 + ''),
                total: 1,
            }
            socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1));
        }

        //订阅
        this.CmdQuoteSubscribe(true);

        let items = GameCfgText.getGPPKItemInfo(this._code);
        if (items) {
            this.labels[1].string = items[1];
        }
        code = this._code + '';
        if (code.length >= 7) {
            code = code.slice(1);
        }
        this.labels[0].string = code;
    }

    CmdQuoteSubscribe(flag) {
        if (!this._code) { return }
        let info = {
            items: [{ code: this._code + '', flag: flag }],
        }

        console.log('订阅：' + JSON.stringify(info));
        let CmdQuoteSubscribe = pb.CmdQuoteSubscribe;
        let message = CmdQuoteSubscribe.create(info);
        let buff = CmdQuoteSubscribe.encode(message).finish();

        socket.send(pb.MessageId.Req_QuoteSubscribe, buff, info => {
            console.log('订阅：' + JSON.stringify(info));

        })
    }

    onDisable() {
        this.CmdQuoteSubscribe(false);
        GlobalEvent.off(EventCfg.CMDQUOTITEM);
        GlobalEvent.off(EventCfg.SYNCQUOTEITEM);
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        //看信号买卖
        if (name == 'item1') {
            GlobalEvent.emit(EventCfg.OPENZNDRAW, this._code);
        }
    }

}
