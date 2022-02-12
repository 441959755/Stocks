import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import UpGameOpt from "../../../sctiprs/global/UpGameOpt";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ingNode: cc.Node = null;

    @property(cc.Node)
    fupanNode: cc.Node = null;

    @property([cc.Label])
    klabels: cc.Label[] = [];

    @property([cc.Label])
    flabels: cc.Label[] = [];

    @property([cc.Node])
    mrNode: cc.Node[] = [];

    @property([cc.Node])
    mcNode: cc.Node[] = [];

    @property([cc.Node])
    zsNode: cc.Node[] = [];

    @property([cc.Node])
    zxNode: cc.Node[] = [];

    @property(cc.Node)
    buyBox: cc.Node = null;

    @property(cc.Node)
    sellBox: cc.Node = null;

    @property(cc.Node)
    stopBox: cc.Node = null;

    @property(cc.Node)
    finalNode: cc.Node = null;

    junjia = 0.00;

    chigushuliang = 0;

    keyongzhichan = 0;

    zongzhichan = 100000;

    huiheshu = 0;

    viweData = null;

    autoCallback = null;

    buySlg = null;

    sellSlg = null;

    stopSlg = null;

    rateItem = null;

    buydata = [];

    selldata = [];

    stopdata = [];

    allRate = null;

    onDestroy() {
        GlobalEvent.off(EventCfg.GAMEFUPAN);
    }

    onShowGameFuPan() {
        this.ingNode.active = false;
        this.fupanNode.active = true;
        this.fupanNode.getComponent('TJDFUPAN').onShow(this.allRate || 0.00);
    }

    onLoad() {
        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onShowGameFuPan.bind(this), this);
    }

    protected onDisable(): void {
        this.autoCallback && (clearInterval(this.autoCallback));
        this.autoCallback = null;
    }

    onEnable() {
        this.autoCallback && (clearInterval(this.autoCallback));
        this.autoCallback = null;
        GameCfg.fill = [];
        this.buydata = [];
        this.stopdata = [];
        this.selldata = [];
        this.buySlg = {
            price: 0,
            count: 0,
        };
        this.sellSlg = {
            price: 0,
            count: 0,
        };
        this.stopSlg = {
            price: 0,
            count: 0,
        };
        this.zongzhichan = 100000;
        this.keyongzhichan = 100000;
        this.junjia = 0;

        this.chigushuliang = 0;

        this.viweData = GameCfg.data[0].data;

        this.rateItem = null;
        this.finalNode.active = false;
        this.fupanNode.active = false;

        this.ingNode.active = true;
        this.fupanNode.active = false;
        this.mrNode[1].active = false;
        this.mcNode[1].active = true;
        this.zsNode[1].active = true;
        this.zxNode[1].active = false;

        this.setLabelData();

        if (GameCfg.GAMEFUPAN) {

            let opt = UpGameOpt.player1Opt;
            this.onGameFUPANOPT(opt);

            this.onShowGameFuPan();
            return;
        }
    }


    onBtnClick(event, curData) {
        let name = event.target.name;

        //返回
        if (name == 'sys_back') {

            if (GameCfg.GAMEFUPAN) {
                this.node.parent.active = false;
            }

            else {
                PopupManager.LoadTipsBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {
                    clearInterval(this.autoCallback);
                    this.autoCallback = null;
                    if (this.chigushuliang > 0) {
                        GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });
                        let item = {
                            opId: pb.GameOperationId.Bid,
                            volume: this.chigushuliang,
                            kOffset: GameCfg.huizhidatas,
                            price: this.viweData[GameCfg.huizhidatas].close,
                        }
                        UpGameOpt.addOpt(item);
                        let rate = this.onCurPositionRete();
                        if (!GameCfg.fill[GameCfg.fill.length - 1].end) {
                            this.rateItem.end = GameCfg.huizhidatas - 1;
                            GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
                            GameCfg.fill[GameCfg.fill.length - 1].end = this.rateItem.end;

                            this.keyongzhichan += (this.viweData[GameCfg.huizhidatas].close * this.chigushuliang);
                            this.chigushuliang = 0;

                            GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
                        }
                    }
                    this.finalNode.active = true;
                    let all = ((this.keyongzhichan - 100000) / 100000 * 100).toFixed(2);
                    this.allRate = all;
                    this.finalNode.getComponent('TJDFInalLayer').onShow(all, this.keyongzhichan);
                })
            }
        }

        else if (name == 'xl_btn_mairu') {
            this.buyBox.active = true;
            this.buyBox.getComponent('TJDBuyBox').onShow(this.keyongzhichan, this.buySlg, (slg) => {
                this.buySlg = slg;
            });
        }

        else if (name == 'xl_btn_maichu') {
            this.sellBox.active = true;
            this.sellBox.getComponent('TJDSellBox').onShow(this.chigushuliang, this.sellSlg, (slg, node) => {
                if (this.stopSlg) {
                    if (this.stopSlg.price >= slg.price) {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '卖出价必须高于止损价');
                        return;
                    }
                }
                this.sellSlg = slg;
                node.active = false;
            })
        }

        else if (name == 'xl_btn_zhisun') {
            this.stopBox.active = true;

            this.stopBox.getComponent('TJDSellBox').onShow(this.chigushuliang, this.stopSlg, (slg, node) => {
                if (this.sellSlg) {
                    if (this.sellSlg.price <= slg.price) {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '卖出价必须高于止损价');
                        return;
                    }
                }
                this.stopSlg = slg;
                node.active = false;
            })
        }

        //执行
        else if (name == 'xl_btn_zhixing') {
            this.zxNode[1].active = true;
            this.setAutoExecute();
        }

        //暂停
        else if (name == 'xl_btn_zanting') {
            this.zxNode[1].active = false;
            this.autoCallback && (clearInterval(this.autoCallback))
            this.autoCallback = null;
        }

    }

    setLabelData() {

        if (GameCfg.GAMEFUPAN) {

        }
        else {
            this.klabels[0].string = this.viweData[GameCfg.huizhidatas - 1].open;
            this.klabels[1].string = this.viweData[GameCfg.huizhidatas - 1].close;
            this.klabels[2].string = this.viweData[GameCfg.huizhidatas - 1].high;
            this.klabels[3].string = this.viweData[GameCfg.huizhidatas - 1].low;

            if (!this.junjia) this.junjia = 0.00;

            this.klabels[4].string = this.junjia.toFixed(2) + '';
            this.klabels[5].string = this.chigushuliang + '';
            this.klabels[6].string = this.zongzhichan + '';
            this.klabels[7].string = parseInt(this.keyongzhichan + '') + '';

            this.huiheshu = this.viweData.length - GameCfg.huizhidatas;
            this.klabels[8].string = '回合数：' + this.huiheshu;
        }
    }

    ////买入的均价
    onGetJunjia() {
        let data = this.viweData;
    }

    AskOpt() {

        GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: GameCfg.huizhidatas });

        this.buydata.push(this.buySlg);

        let sign = 1;
        let rate = 0;

        if (this.onjunjia() > this.viweData[GameCfg.huizhidatas].close) {
            rate = -1;
        }
        else {
            rate = 1;
        }

        let start = GameCfg.huizhidatas;

        this.rateItem = {
            rate: rate,
            start: start,
            end: null,
            state: sign,
        };


        if (GameCfg.fill.length > 0 && GameCfg.fill[GameCfg.fill.length - 1].end) {

            GameCfg.fill.push(this.rateItem);

        } else if (GameCfg.fill.length == 0) {

            GameCfg.fill.push(this.rateItem);

        } else {

            GameCfg.fill[GameCfg.fill.length - 1].rate = rate;

        }

        GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);

        this.chigushuliang += this.buySlg.count;

        this.keyongzhichan = this.keyongzhichan - this.buySlg.price * this.buySlg.count;

        this.buySlg = {
            price: 0,
            count: 0,
        };
        this.sellSlg = {
            price: 0,
            count: 0,
        };
        this.stopSlg = {
            price: 0,
            count: 0,
        };
    }

    BidOpt() {
        GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });
        let rate = 0;

        rate = this.onCurPositionRete();

        if (!GameCfg.fill[GameCfg.fill.length - 1].end) {
            this.rateItem.end = GameCfg.huizhidatas - 1;
            GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
            GameCfg.fill[GameCfg.fill.length - 1].end = this.rateItem.end;
        }
        else {

            let start = GameCfg.huizhidatas;

            this.rateItem = {
                rate: rate,
                start: start,
                end: null,
                state: false,
            };
            GameCfg.fill.push(this.rateItem);
        }

        this.selldata.push(this.sellSlg);

        this.chigushuliang -= this.sellSlg.count;

        if (this.chigushuliang > 0) {
            this.rateItem = {
                rate: 0,
                start: GameCfg.huizhidatas,
                end: null,
                state: 1,
            };
            GameCfg.fill.push(this.rateItem);
        }

        this.keyongzhichan = this.keyongzhichan + this.sellSlg.price * this.sellSlg.count;

        GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);

        this.buySlg = {
            price: 0,
            count: 0,
        };
        this.sellSlg = {
            price: 0,
            count: 0,
        };
        this.stopSlg = {
            price: 0,
            count: 0,
        };
    }

    StopOpt() {
        GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });
        let rate = 0;

        rate = this.onCurPositionRete();

        if (this.chigushuliang == 0) {
            this.rateItem.end = GameCfg.huizhidatas - 1;
            GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
            GameCfg.fill[GameCfg.fill.length - 1].end = this.rateItem.end;
        }
        else {
            this.rateItem.end = GameCfg.huizhidatas - 1;
            GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
            GameCfg.fill[GameCfg.fill.length - 1].end = this.rateItem.end;

            let start = GameCfg.huizhidatas;
            this.rateItem = {
                rate: rate,
                start: start,
                end: null,
                state: false,
            };
            GameCfg.fill.push(this.rateItem);
        }

        this.stopdata.push(this.stopSlg);
        this.chigushuliang -= this.stopSlg.count;
        this.keyongzhichan += (this.stopSlg.price * this.stopSlg.count);
        GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
        this.buySlg = {
            price: 0,
            count: 0,
        };
        this.sellSlg = {
            price: 0,
            count: 0,
        };
        this.stopSlg = {
            price: 0,
            count: 0,
        };
    }

    //自动执行
    setAutoExecute() {

        this.autoCallback = setInterval(() => {

            let type = 0;

            if (this.buySlg && this.keyongzhichan >= this.buySlg.price * this.buySlg.count && (this.buySlg.price >= this.viweData[GameCfg.huizhidatas - 1].low && this.buySlg.price <= this.viweData[GameCfg.huizhidatas - 1].high)) {
                let item = {
                    opId: pb.GameOperationId.Ask,
                    volume: this.buySlg.count,
                    kOffset: GameCfg.huizhidatas,
                    price: this.buySlg.price,
                }

                UpGameOpt.addOpt(item);
                type = 1;
                this.AskOpt();

                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '条件单买入成功');

            }

            else if (this.sellSlg && this.chigushuliang >= this.sellSlg.count && (this.sellSlg.price >= this.viweData[GameCfg.huizhidatas - 1].low && this.sellSlg.price <= this.viweData[GameCfg.huizhidatas - 1].high)) {

                let item = {
                    opId: pb.GameOperationId.Bid,
                    volume: this.sellSlg.count,
                    kOffset: GameCfg.huizhidatas,
                    price: this.sellSlg.price,
                }

                UpGameOpt.addOpt(item);

                type = 2;
                this.BidOpt();

                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '条件单买出成功');
            }

            else if (this.stopSlg && this.chigushuliang >= this.stopSlg.count && (this.stopSlg.price >= this.viweData[GameCfg.huizhidatas - 1].low && this.stopSlg.price <= this.viweData[GameCfg.huizhidatas - 1].high)) {
                let item = {
                    opId: pb.GameOperationId.Bid,
                    volume: this.sellSlg.count,
                    kOffset: GameCfg.huizhidatas,
                    price: this.viweData[GameCfg.huizhidatas].close,
                }
                UpGameOpt.addOpt(item);

                type = 3;
                this.StopOpt();
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '条件单止损成功');
            }

            else {

                let rate = this.onCurPositionRete();
                if (GameCfg.fill[GameCfg.fill.length - 1]) {
                    GameCfg.fill[GameCfg.fill.length - 1].rate = rate;

                    GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
                }
            }

            let curClose = parseFloat(this.viweData[GameCfg.huizhidatas - 1].close);
            this.zongzhichan = parseInt(this.chigushuliang * curClose + this.keyongzhichan + '');

            if (this.chigushuliang > 0) {
                this.mcNode[1].active = false;
                this.zsNode[1].active = false;
            }

            if (this.huiheshu > 0) {
                this.huiheshu -= 1;
                this.setLabelData();
                //绘制下回合的走势线
                GlobalEvent.emit('roundNUmber');

                if (type) {
                    clearInterval(this.autoCallback);
                    this.autoCallback = null;
                    this.zxNode[1].active = false;
                }
            }
            //结束
            else {
                clearInterval(this.autoCallback);
                this.autoCallback = null;
                if (this.chigushuliang > 0) {

                    GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });

                    let item = {
                        opId: pb.GameOperationId.Bid,
                        volume: this.chigushuliang,
                        kOffset: GameCfg.huizhidatas,
                    }
                    UpGameOpt.addOpt(item);

                    let rate = this.onCurPositionRete1();
                    if (!GameCfg.fill[GameCfg.fill.length - 1].end) {

                        this.rateItem.end = GameCfg.huizhidatas - 1;

                        GameCfg.fill[GameCfg.fill.length - 1].rate = rate;

                        GameCfg.fill[GameCfg.fill.length - 1].end = this.rateItem.end;

                        this.keyongzhichan += (this.viweData[GameCfg.huizhidatas - 1].close * this.chigushuliang);
                        this.chigushuliang = 0;

                        GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
                    }


                }

                // GlobalEvent.emit(EventCfg.GAMEOVEER);
                this.finalNode.active = true;
                //总盈利率
                let all = ((this.keyongzhichan - 100000) / 100000 * 100).toFixed(2);
                this.allRate = all;
                this.finalNode.getComponent('TJDFInalLayer').onShow(all, this.keyongzhichan);
            }

        }, GameCfg.GameSet.KSpeed * 1000);
    }

    onjunjia() {

        if (!this.buySlg) {
            this.junjia = 0;
            return this.junjia;
        }

        if (!this.junjia) {
            this.junjia = this.buySlg.price;
            return this.buySlg.price;
        }

        let zl = 0, ze = 0;

        this.buydata.forEach(el => {
            zl = el.count;
            ze = el.count * el.price;
        })

        this.selldata && (this.selldata.forEach(el => {
            zl -= el.count;
            ze -= (el.count * el.price);
        }))

        this.stopdata && (this.stopdata.forEach(el => {
            zl -= el.count;
            ze -= (el.count * el.price);
        }))

        this.junjia = ze / zl;

        return this.junjia;
    }

    onCurPositionRete() {

        if (!this.viweData[GameCfg.huizhidatas]) { return 0 }

        let curClose = parseFloat(this.viweData[GameCfg.huizhidatas].close);

        let preClose = this.onjunjia();

        if (!preClose) {
            return 0;
        }

        let rate = (curClose - preClose) / preClose * 100;

        return rate;
    }

    onCurPositionRete1() {

        if (!this.viweData[GameCfg.huizhidatas - 1]) { return 0 }

        let curClose = parseFloat(this.viweData[GameCfg.huizhidatas - 1].close);

        let preClose = this.onjunjia();

        if (!preClose) {
            return 0;
        }

        let rate = (curClose - preClose) / preClose * 100;

        return rate;
    }

    onGameFUPANOPT(opt) {

        if (!opt) {
            return;
        }

        opt.forEach((el, index) => {

            GameCfg.huizhidatas = el.kOffset;
            if (el.opId == pb.GameOperationId.Ask || el.opId == 'Ask') {
                this.buySlg.count = el.volume;
                this.buySlg.price = el.price;
                this.AskOpt();
            }

            else if (el.opId == pb.GameOperationId.Bid || el.opId == 'Bid') {
                this.sellSlg.count = el.volume;
                this.sellSlg.price = el.price;
                this.BidOpt();
            }
        })

        //   GameCfg.huizhidatas = this.viweData.length;
        GlobalEvent.emit('roundNUmber');

        let all = ((this.keyongzhichan - 100000) / 100000 * 100).toFixed(2);

        this.allRate = all;

        this.finalNode.getComponent('TJDFInalLayer').onShow(all, this.keyongzhichan);
    }
}
