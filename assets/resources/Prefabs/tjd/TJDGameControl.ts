import GameCfg from "../../../sctiprs/game/GameCfg";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

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

    onLoad() {
        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onShowGameFuPan.bind(this), this);
    }

    onShowGameFuPan() {
        this.ingNode.active = false;
        this.fupanNode.active = true;
    }

    onEnable() {
        this.autoCallback && (clearInterval(this.autoCallback));
        this.autoCallback = null;
        GameCfg.fill = [];
        this.buydata = [];
        this.buySlg = null;
        this.sellSlg = null;
        this.stopSlg = null;
        this.zongzhichan = 100000;
        this.keyongzhichan = 100000;

        this.chigushuliang = 0;

        this.viweData = GameCfg.data[0].data;

        if (GameCfg.GAMEFUPAN) {
            this.onShowGameFuPan();
            return;
        }

        this.ingNode.active = true;
        this.fupanNode.active = false;
        this.mrNode[1].active = false;
        this.mcNode[1].active = true;
        this.zsNode[1].active = true;
        this.zxNode[1].active = false;

        this.setLabelData();
    }


    onBtnClick(event, curData) {
        let name = event.target.name;

        //返回
        if (name == 'sys_back') {
            this.node.parent.active = false;
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

            this.stopBox.getComponent('TJDSellBox').onShow(this.chigushuliang, this.sellSlg, (slg, node) => {
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

            this.klabels[4].string = this.junjia + '';
            this.klabels[5].string = this.chigushuliang + '';
            this.klabels[6].string = this.zongzhichan + '';
            this.klabels[7].string = this.keyongzhichan + '';

            this.huiheshu = this.viweData.length - GameCfg.huizhidatas;
            this.klabels[8].string = '回合数：' + this.huiheshu;
        }
    }

    ////买入的均价
    onGetJunjia() {
        let data = this.viweData;
    }

    //自动执行
    setAutoExecute() {
        this.autoCallback = setInterval(() => {

            if (this.buySlg && this.keyongzhichan >= this.buySlg.price * this.buySlg.count && (this.buySlg.price >= this.viweData[GameCfg.huizhidatas - 1].low || this.buySlg.price <= this.viweData[GameCfg.huizhidatas - 1].high)) {

                this.buydata.push(this.buySlg);

                let sign = 1;
                let rate = 0;

                if (this.buySlg.price < this.viweData[GameCfg.huizhidatas].close) {
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

            }

            else if (this.sellSlg && this.chigushuliang >= this.buySlg.count && (this.buySlg.price >= this.viweData[GameCfg.huizhidatas - 1].low || this.buySlg.price <= this.viweData[GameCfg.huizhidatas - 1].high)) {

                let preClose = this.onjunjia();

                this.selldata.push(this.sellSlg);
            }

            else if (this.stopSlg) {

            }

            //
            if (this.huiheshu > 0) {
                this.huiheshu -= 1;
                this.setLabelData();
                //绘制下回合的走势线
                GlobalEvent.emit('roundNUmber');
            }
            //结束
            else {
                GlobalEvent.emit(EventCfg.GAMEOVEER);
            }

        }, GameCfg.GameSet.KSpeed * 1000);
    }

    onjunjia() {
        // if (this.buydata.length <= 0) {
        //     return this.buySlg.price;
        // }

        let zl = 0, ze = 0;
        this.buydata.forEach(el => {
            zl = el.count;
            ze = el.count * el.price;
        })

        this.sellSlg.forEach(el => {
            zl -= el.count;
            ze -= (el.count * el.price);
        });


        this.stopSlg.forEach(el => {
            zl -= el.count;
            ze -= (el.count * el.price);
        });

        return ze / zl;

    }
}
