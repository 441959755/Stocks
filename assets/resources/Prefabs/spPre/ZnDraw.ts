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
import LoadUtils from "../../../sctiprs/Utils/LoadUtils";


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

    @property(cc.Node)
    drawBox: cc.Node = null;

    @property([cc.Node])
    BGrap: cc.Node[] = [];

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    addMark: cc.Node = null;

    yearEarnings = null;

    latestEarnings = null;

    @property(cc.Node)
    laNode: cc.Node = null;

    AISignal = '';

    @property(cc.Node)
    ziXunBtn: cc.Node = null;

    @property(cc.Node)
    yiShouCang: cc.Node = null;

    EnterGameLayer: cc.Node = null;

    onLoad() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        GlobalEvent.on('onClickPosUpdateLabel', (index) => {

            if (index < GameCfg.beg_end[0] || index >= GameCfg.beg_end[1]) { return }
            let time, kp, sp, zg, zd, cjl, cje;
            let arr = [];
            if (this.ktype == pb.KType.Min) {
                index = this.gpDataMin.length - 1;
                let tt = this.gpDataMin[index].timestamp;
                let t = new Date(this.gpDataMin[index].timestamp * 1000);
                let h = t.getHours();
                let m = t.getMinutes();
                let h1 = h >= 10 ? h : '0' + h;
                let m1 = m >= 10 ? m : '0' + m;
                time = h1 + ':' + m1;
                arr = this.gpDataMin;
            }
            else if (this.ktype == pb.KType.Day) {
                time = ComUtils.formatTime(this.gpDataDay[index].timestamp);
                arr = this.gpDataDay;
            }
            else if (this.ktype == pb.KType.Day7) {
                time = ComUtils.formatTime(this.gpDataDay7[index].timestamp);
                arr = this.gpDataDay7;
            }
            else {

                time = ComUtils.formatTime(this.gpDataMonth[index].timestamp);
                arr = this.gpDataMonth;
            }
            kp = arr[index].open;
            sp = arr[index].close;
            zg = arr[index].high;
            zd = arr[index].low;

            cjl = ComUtils.numberConvertUnit(parseInt(arr[index].volume / 100 + '')) + '手';;
            cje = ComUtils.numberConvertUnit(arr[index].amount);

            this.uLabel.string = time + '    ' + '开盘 ' + kp + '    ' + '收盘 ' + sp + '    ' + '最高 ' + zg + '    ' + '最低 ' + zd + '    ' + '成交量 ' + cjl + '    ' + '成交额 ' + cje;
        }, this);
    }

    onShow(code, str) {
        this.laNode.active = false;
        this.AISignal = str;
        this.addMark.active = false;
        this.mask.active = false;
        this.BGrap[0].active = true;
        this.BGrap[1].active = true;
        this.BGrap[2].active = false;
        this.BGrap[3].active = false;
        this.BGrap[4].active = false;
        this.code = code;
        this.getGPDataDay();
        this.initData();

        //订阅
        this.CmdQuoteSubscribe();

        //查询AI操作
        this.onQueryAISignal();

        if (GameData.AIStockList.indexOf(code) == -1) {
            this.ziXunBtn.active = false;
        }
        else {
            this.ziXunBtn.active = true;
        }
    }

    onQueryAISignal() {
        let me = {
            code: this.code,
        }
        let CmdQueryAiSignal = pb.CmdQueryAiSignal;
        let message1 = CmdQueryAiSignal.create(me);
        let buff1 = CmdQueryAiSignal.encode(message1).finish();
        socket.send(pb.MessageId.Req_QueryAiSignal, buff1, (res) => {
            console.log('AI买卖信号：' + JSON.stringify(res));
            let arr = [];
            let price;
            let signals = res.signals;
            signals.forEach((el, index) => {
                for (let i = 0; i < this.gpDataDay.length; i++) {
                    if (el.ts == this.gpDataDay[i].timestamp) {
                        //买
                        if (el.flag == -1) {
                            GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: i + 1 });
                        }
                        else if (el.flag == 1) {
                            GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: i + 1 });
                        }
                    }
                }

                if (index % 2 != 0) {
                    let rate = (el.price - price) / price * 100;
                    arr.push(rate);
                }
                else {
                    price = el.price;
                }

            });

            let num = 0;
            arr.forEach(el => {
                num += el;
            })
            let label1 = this.laNode.getChildByName('label1').getComponent(cc.Label);
            let label2 = this.laNode.getChildByName('label2').getComponent(cc.Label);
            let label3 = this.laNode.getChildByName('label3').getComponent(cc.Label);
            label1.string = '近一年收益：' + ComUtils.changeTwoDecimal(num) + '%';
            label2.string = '最近的收益：' + ComUtils.changeTwoDecimal(arr[arr.length - 1]) + '%';
            label3.string = '今日决策：' + this.AISignal;
        });
    }

    initData() {
        GameCfg.GameSet = GameData.JJPKSet;

        GameCfg.MAColor[0] = new cc.Color().fromHEX('#ffffff');
        GameCfg.MAColor[1] = new cc.Color().fromHEX('#ebeb12');

        GameCfg.MAColor[2] = new cc.Color().fromHEX('#e814ed');
        GameCfg.MAColor[3] = new cc.Color().fromHEX('#14ed14');
        GameCfg.MAColor[4] = new cc.Color().fromHEX('#1c9ce6');
        GameCfg.MAColor[5] = new cc.Color().fromHEX('#d47026');

        GameCfg.BOLLColor[0] = cc.Color.WHITE;
        GameCfg.BOLLColor[1] = new cc.Color().fromHEX('#f0dc05');
        GameCfg.BOLLColor[2] = new cc.Color().fromHEX('#d85cfc');

        GameCfg.VOLColor[0] = new cc.Color().fromHEX('#ffffff');
        GameCfg.VOLColor[1] = new cc.Color().fromHEX('#ebeb12');

        GameCfg.tipsDealColor[0] = new cc.Color().fromHEX('#02230c');
        GameCfg.tipsDealColor[1] = new cc.Color().fromHEX('#2d0202');

        GameCfg.K_D_J_Line[0] = cc.Color.WHITE;
        GameCfg.K_D_J_Line[1] = new cc.Color().fromHEX('#f0dc05');
        GameCfg.K_D_J_Line[2] = new cc.Color().fromHEX('#d85cfc');

        GameCfg.DIF_LINE_COL = cc.Color.WHITE;
        GameCfg.DEA_LINE_COL = new cc.Color().fromHEX('#f0dc05');

        GameCfg.MACD_COL[0] = new cc.Color().fromHEX('#f11111');
        GameCfg.MACD_COL[1] = new cc.Color().fromHEX('#0fee1e');

        GameCfg.RSI_COLOR[0] = cc.Color.WHITE;
        GameCfg.RSI_COLOR[1] = new cc.Color().fromHEX('#f0dc05');
        GameCfg.RSI_COLOR[2] = new cc.Color().fromHEX('#d85cfc');

        GameCfg.CCL_COL = cc.Color.WHITE;

        GameCfg.EXPMA_COL[0] = new cc.Color().fromHEX('#ffffff');
        GameCfg.EXPMA_COL[1] = new cc.Color().fromHEX('#ebeb12');

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
        this.cLabel[7].string = ComUtils.numberConvertUnit(parseInt(data.volume / 100 + '')) + '手';


        this.cLabel[8].string = ComUtils.changeTwoDecimal(data.low);
        this.cLabel[9].string = ComUtils.changeTwoDecimal(preData.close);

        let hs = data.volume / items[4] * 100;
        if (items[4] == 0) {
            hs = 1
        }
        this.cLabel[10].string = ComUtils.changeTwoDecimal(hs) + '%';
        this.cLabel[11].string = ComUtils.numberConvertUnit(data.amount);

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
                    this.ktype = pb.KType.Min;
                    arr = this.gpDataMin;
                    arr.forEach(el => {
                        el.close = el.price;
                    })
                }
                else if (index == 1 || index == 2) {
                    this.ktype = pb.KType.Day;
                    arr = this.gpDataDay;
                }
                else if (index == 3) {
                    this.ktype = pb.KType.Day7;
                    arr = this.gpDataDay7;
                }
                else if (index == 4) {
                    arr = this.gpDataMonth;
                }
                GameCfg.huizhidatas = arr.length;
                GameData.huizhidatas = arr.length;
                GameCfg.beg_end = [];

                GameCfg.beg_end[1] = GameCfg.huizhidatas;
                GameCfg.beg_end[0] = 0;
                if (GameCfg.huizhidatas > 100) {
                    GameCfg.beg_end[0] = GameCfg.beg_end[1] - 100;
                }
                if (GameCfg.beg_end[0] < 0) {
                    GameCfg.beg_end[0] = 0;
                }

                if (this.ktype == pb.KType.Min) {
                    GameCfg.beg_end[0] = 0;

                }

                let mixWidth = 6;
                let maxWidth = 70;

                let drawWidth = this.drawBox.width;

                GameCfg.hz_width = drawWidth / (GameCfg.beg_end[1] - GameCfg.beg_end[0]);

                if (GameCfg.hz_width > maxWidth) {
                    GameCfg.hz_width = maxWidth;
                } else if (GameCfg.hz_width < mixWidth) {
                    GameCfg.hz_width = mixWidth;
                }

                let arr1 = [];
                arr.forEach((el, index) => {
                    if (this.ktype == pb.KType.Min) {
                        for (let q = 0; q < index; q++) {
                            el.volume -= arr[q].volume;
                        }
                    }
                    let data = {
                        day: el.timestamp,
                        open: el.open || 0,
                        close: el.price || 0,
                        high: el.high || 0,
                        low: el.low || 0,
                        price: el.amount || 0,
                        value: el.volume || 0,
                    }
                    arr1.push(data);
                })
                if (!arr1 || arr1.length == 0) {
                    return;
                }
                GlobalEvent.emit('onClickPosUpdateLabel', arr1.length - 1);
                DrawData.initData(arr1);
                GlobalEvent.emit('onDrawGrap', arr1, this.ktype);
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
            this.addMark.active = false;
            this.laNode.active = false;
            if (!this.gpDataMin) {
                this.getGPDataMin();
            }
            else {
                this.onDraw();
            }
        }

        else if (name == 'toggle2') {
            this.addMark.active = true;
            this.laNode.active = true;
            //  GlobalEvent.emit(EventCfg.GAMEFUPAN);
            GameCfg.GAMEFUPAN = true;
            if (!this.gpDataDay) {

                this.getGPDataDay();
            }
            else {
                this.onDraw();
            }
        }

        else if (name == 'toggle3') {
            this.addMark.active = false;
            this.laNode.active = false;
            if (!this.gpDataDay) {
                this.ktype = pb.KType.Day;
                this.getGPDataDay();
            }
            else {
                this.onDraw();
            }
        }

        else if (name == 'toggle4') {
            this.addMark.active = false;
            this.laNode.active = false;
            if (!this.gpDataDay7) {
                this.getHttpGPData('wk');
            }
            else {
                this.onDraw();
            }
        }

        else if (name == 'toggle5') {
            this.addMark.active = false;
            this.laNode.active = false;
            if (!this.gpDataMonth) {
                this.getHttpGPData('mk');
            }
            else {
                this.onDraw();
            }
        }
    }


    onDisable() {
        this.gpDataMin = null;  //分时数据
        this.gpDataDay = null  //日k数据
        this.gpDataDay7 = null  //周k数据
        this.gpDataMonth = null //月k数据
        GameCfg.GAMEFUPAN = null;
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
        else if (name == 'btnSlecet') {
            if (this.ktype == pb.KType.Min) { return }
            this.content.active = true;
            event.target.getChildByName('nodeClick').active = true;
        }
        else if (name == 'nodeClick') {
            event.target.active = false;
            this.content.active = false;
        }
        else if (name == 'BtnCPM') {
            this.mask.active = false;
            this.BGrap[0].active = true;
            this.BGrap[1].active = true;
            this.BGrap[2].active = false;
            this.BGrap[3].active = false;
            this.BGrap[4].active = false;

        }
        else if (name == 'BtnMACD') {
            this.mask.active = true;
            this.BGrap[2].active = true;
            this.BGrap[3].active = false;
            this.BGrap[4].active = false;
        }
        else if (name == 'BtnKDJ') {
            this.mask.active = true;
            this.BGrap[2].active = false;
            this.BGrap[3].active = true;
            this.BGrap[4].active = false;
        }
        else if (name == 'BtnRSI') {
            this.mask.active = true;
            this.BGrap[2].active = false;
            this.BGrap[3].active = false;
            this.BGrap[4].active = true;
        }
        //点击模以
        else if (name == 'sp_btn_moni') {


        }

        else if (name == 'sp_btn_xunlian') {
            if (!this.EnterGameLayer) {
                GlobalEvent.emit(EventCfg.LOADINGSHOW);
                LoadUtils.loadRes('Prefabs/enterXLGame', (pre) => {
                    GlobalEvent.emit(EventCfg.LOADINGHIDE);
                    this.EnterGameLayer = cc.instantiate(pre);
                    this.node.addChild(this.EnterGameLayer);
                    let handle = this.EnterGameLayer.getComponent('EnterXLGame');
                    let items = GameCfgText.getGPPKItemInfo(this.code);
                    handle.onShow(this.code, items[1], ComUtils.fromatTime1(this.gpDataDay[0].timestamp))
                })
            }
            else {
                this.EnterGameLayer.active = true;
                let handle = this.EnterGameLayer.getComponent('EnterXLGame');
                let items = GameCfgText.getGPPKItemInfo(this.code);
                handle.onShow(this.code, items[1], ComUtils.fromatTime1(this.gpDataDay[0].timestamp))
            }

        }

        else if (name == 'sp_btn_shoucang') {
            let info = {
                removed: false,
                code: this.code,
                isAiStock: true,
            }

            let CmdMncgEditStock = pb.CmdMncgEditStock;
            let message = CmdMncgEditStock.create(info);
            let buff = CmdMncgEditStock.encode(message).finish();

            socket.send(pb.MessageId.Req_EditAiStockList, buff, (res) => {

            })
            GameData.AIStockList.push(this.code);
            this.yiShouCang.active = true;
        }

        else if (name == 'sp_mncg_zixuan2') {
            if (GameData.selfStockList.indexOf(this.code) != -1) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '该股票已添加');
                return;
            }
            let info = {
                removed: false,
                code: this.code,
                isAiStock: false,
            }
            let CmdMncgEditStock = pb.CmdMncgEditStock;
            let message = CmdMncgEditStock.create(info);
            let buff = CmdMncgEditStock.encode(message).finish();
            socket.send(pb.MessageId.Req_Game_MncgEditStockList, buff, (res) => {

            })
            GameData.selfStockList.push(this.code);
        }
    }

    onDestroy() {
        GlobalEvent.off('onClickPosUpdateLabel');
    }
}
