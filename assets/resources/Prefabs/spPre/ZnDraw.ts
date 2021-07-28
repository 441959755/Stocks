import { pb } from "../../../protos/proto";
import HttpUtils from "../../../sctiprs/common/net/HttpUtils";
import DrawData from "../../../sctiprs/game/DrawData";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
//import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    code = null;

    gpDataMin = null;  //分时数据

    gpDataDay = null  //日k数据

    gpDataDay7 = null  //周k数据

    gpDataMonth = null //月k数据

    ktype = null;

    @property([cc.Label])
    cLabel: cc.Label[] = [];

    @property([cc.Toggle])
    toggles: cc.Toggle[] = [];

    @property(cc.Label)
    uLabel: cc.Label = null;

    onLoad() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        this.getGPDataDay();

        GlobalEvent.on('onClickPosUpdateLabel', (index) => {
            let time, kp, sp, zg, zd, cjl, cje;
            let arr = [];
            if (this.ktype == pb.KType.Min) {
                let t = new Date(this.gpDataMin[index].timestamp * 1000);
                let h = t.getHours();
                let m = t.getMinutes();
                let h1 = h >= 10 ? h : '0' + h;
                let m1 = m >= 10 ? m : '0' + m;
                time = h1 + ':' + m1;
                arr = this.gpDataMin;
            }
            else if (this.ktype == pb.KType.Day) {
                time = ComUtils.getTimestamp(this.gpDataDay[index].timestamp);
                arr = this.gpDataDay;
            }
            else if (this.ktype == pb.KType.Day7) {
                time = ComUtils.getTimestamp(this.gpDataDay7[index].timestamp);
                arr = this.gpDataDay7;
            }
            else {
                time = ComUtils.getTimestamp(this.gpDataMonth[index].timestamp);
                arr = this.gpDataMonth;
            }
            kp = arr[index].open;
            sp = arr[index].close;
            zg = arr[index].high;
            zd = arr[index].low;
            cjl = arr[index].voiume;
            cje = arr[index].amount;

            this.uLabel.string = time + '    ' + '开盘 ' + kp + '    ' + '收盘 ' + sp + '    ' + '最高 ' + zg + '    ' + '最低 ' + zd + '    ' + '成交量 ' + cjl + '    ' + '成交额 ' + cje;
        }, this);
    }

    onShow(code) {
        this.code = code;

        this.initData();

        //订阅
        this.CmdQuoteSubscribe();
    }

    initData() {
        GameCfg.GameSet = GameData.JJPKSet;
        let j = 0;
        for (let i = 1; i <= 6; i++) {
            if (GameCfg.GameSet['isMA' + i]) {
                GameCfg.MAs[j++] = parseInt(GameCfg.GameSet['MA' + i + 'Date']);
            }
        }
    }


    getGPDataMin() {
        this.ktype = pb.KType.Min;
        let curDate = new Date();
        let hour = curDate.getHours();
        let minute = curDate.getMinutes();

        let from, to;
        //获取上一天的数据
        if (hour < 9 || (hour == 9 && minute < 30)) {
            let time = curDate.getTime() - (24 + hour) * 60 * 60 * 1000;
            from = parseInt(new Date(time).getTime() / 1000 + '');
            to = parseInt(new Date(time + 23 * 60 * 60 * 1000).getTime() / 1000 + '');
        }
        else {
            let time = curDate.getTime() - (hour) * 60 * 60 * 1000;
            from = parseInt(new Date(time).getTime() / 1000 + '');
            to = parseInt(curDate.getTime() / 1000 + '');
        }

        let info = {
            ktype: this.ktype,
            code: this.code,
            to: to,
            from: from,
        }
        this.getGPData(info);

    }

    getHttpGPData(type) {
        let url = 'http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js';//?TYPE=mk&rtntype=5&authorityType=fa&id=6000111
        let code;
        code = this.code;
        if ((code + '').length >= 7) {
            code = (code + '').slice(1);
        }
        if (code[0] == 6) {
            code += '1';
        }
        else if (code[0] == 3) {
            code += '2';
        }
        let data = {
            TYPE: type,
            rtntype: 5,
            authorityType: false,
            id: code
        }

        HttpUtils.sendRequest(url, data, (res) => {
            res = res.replace('(', '');
            res = res.replace(')', '');
            //  console.log('日k：' + res);
            res = JSON.parse(res);
            if (type == 'mk') {
                this.gpDataMonth = res;
            }
            else if (type == 'wk') {
                this.gpDataDay7 = res;
            }
            else if (type == 'k') {
                this.gpDataDay = res;
            }
        })
    }

    CmdQuoteSubscribe() {
        let info = {
            items: [{ code: this.code, flag: true }]
        }
        console.log('订阅：' + JSON.stringify(info));
        let CmdQuoteSubscribe = pb.CmdQuoteSubscribe;
        let message = CmdQuoteSubscribe.create(info);
        let buff = CmdQuoteSubscribe.encode(message).finish();

        socket.send(pb.MessageId.Req_QuoteSubscribe, buff, info => {
            console.log('订阅：' + JSON.stringify(info));

        })
    }

    getGPData(info1) {
        console.log('获取数据参数：' + JSON.stringify(info1));
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1), info => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            if (!info.items || info.items.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空');
                return;
            }

            if (info1.ktype == pb.KType.Min) {
                this.gpDataMin = info.items;
                this.setCurLabelData();
            }
            else if (info1.ktype == pb.KType.Day) {
                this.gpDataDay = info.items;
                this.getGPDataMin();
            }
        });
    }

    setCurLabelData() {
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
        let data = this.gpDataMin[this.gpDataMin.length - 1];

        let preData = this.gpDataDay[this.gpDataDay.length - 1];

        let items = GameCfgText.getGPPKItemInfo(this.code);
        let code = this.code;

        if ((code + '').length >= 7) {
            code = (code + '').slice(1);
        }

        this.cLabel[0].string = items[1];
        this.cLabel[1].string = code;

        this.cLabel[2].string = data.price;
        let zf = data.close - preData.close;
        let zfl = (data.close - preData.close) / preData.close * 100;
        this.cLabel[3].string = ComUtils.changeTwoDecimal(zf) + '    ' + ComUtils.changeTwoDecimal(zfl) + '%';

        this.cLabel[4].string = ComUtils.changeTwoDecimal(data.high);
        this.cLabel[5].string = ComUtils.changeTwoDecimal(data.open);

        let zf1 = (data.high - data.low) / preData.close * 100;
        this.cLabel[6].string = ComUtils.changeTwoDecimal(zf1) + '%';
        this.cLabel[7].string = parseInt(data.volume / 100 + '') + '手';

        this.cLabel[8].string = ComUtils.changeTwoDecimal(data.low);
        this.cLabel[9].string = ComUtils.changeTwoDecimal(preData.close);

        let hs = data.volume / items[4] * 100;
        if (items[4] == 0) {
            hs = 1
        }
        this.cLabel[10].string = ComUtils.changeTwoDecimal(hs) + '%';
        this.cLabel[11].string = ComUtils.changeTwoDecimal(data.amount / 10000) + '万';


        if (zf < 0) {
            this.cLabel[2].node.color = cc.Color.GREEN;
            this.cLabel[3].node.color = cc.Color.GREEN;
        }
        else {
            this.cLabel[2].node.color = cc.Color.RED;
            this.cLabel[3].node.color = cc.Color.RED;
        }

        this.onDraw();
    }

    onDraw() {
        this.toggles.forEach((el, index) => {
            if (el.isChecked) {
                let arr = [];
                if (index == 0) {
                    arr = this.gpDataMin;
                }
                else if (index == 1 || index == 2) {
                    arr = this.gpDataDay;
                }

                else if (index == 3) {
                    arr = this.gpDataDay7;
                }
                else if (index == 4) {
                    arr = this.gpDataMonth;
                }
                GlobalEvent.emit('onClickPosUpdateLabel', arr.length - 1);
                DrawData.initData(arr);
                GlobalEvent.emit('onDraw', arr);

            }
        })
    }

    getGPDataDay() {
        this.ktype = pb.KType.Day;
        let to = ComUtils.getCurYearMonthDay();
        let info = {
            ktype: this.ktype,
            code: this.code,
            to: to,
            total: 250,
        }
        this.getGPData(info);
    }

    onToggleClick(event, data) {
        let name = event.node.name;
        if (name == 'toggle1') {
            if (!this.gpDataMin) {
                this.getGPDataMin();
            }
            else {
                this.onDraw();
            }
        }

        else if (name == 'toggle2') {
            if (!this.gpDataDay) {

                this.getGPDataDay();
            }
            else {
                this.onDraw();
            }
        }

        else if (name == 'toggle3') {
            if (!this.gpDataDay) {
                this.ktype = pb.KType.Day;
                this.getGPDataDay();
            }
            else {
                this.onDraw();
            }
        }

        else if (name == 'toggle4') {
            if (!this.gpDataDay7) {
                this.getHttpGPData('wk');
            }
            else {
                this.onDraw();
            }
        }

        else if (name == 'toggle5') {
            if (!this.gpDataMonth) {
                this.getHttpGPData('mk');
            }
            else {
                this.onDraw();
            }
        }
    }


    onDisable() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
        else if (name == '') {

        }

    }

    onDestroy() {
        GlobalEvent.off('onClickPosUpdateLabel');
    }
}
