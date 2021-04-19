import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfg from "./GameCfg";


const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    @property(cc.Button)
    mrBtn: cc.Button = null;

    @property(cc.Button)
    mcBtn: cc.Button = null;

    @property(cc.Button)
    gwBtn: cc.Button = null;

    @property(cc.Button)
    cyBtn: cc.Button = null;

    @property(cc.Node)
    selectBox: cc.Node = null;

    roundNumber = 150;

    @property(cc.Label)
    tipsmr: cc.Label = null;

    @property(cc.Label)
    tipsmc: cc.Label = null;


    _keMcCount = 0;       //可卖出的数量

    gpData = null;


    get keMcCount() {
        return this._keMcCount;
    }

    set keMcCount(val) {
        this._keMcCount = val;
        if (this._keMcCount <= 0) {
            this.tipsmc.string = '可卖: 0';
            this.gwBtn.node.active = true;
            this.cyBtn.node.active = false;
        } else {

            this.tipsmc.string = '可卖：' + parseInt(val + '');
            this.gwBtn.node.active = false;
            this.cyBtn.node.active = true;
        }
    }

    _keMrCount = null;       //可买入得数量
    get keMrCount() {
        return this._keMrCount;
    }

    set keMrCount(val) {
        this._keMrCount = val;
        if (this.keMrCount <= 0) {
            this.tipsmr.string = '可买: 0';
        } else {
            this.tipsmr.string = '可买：' + parseInt(val + '');
        }
    }

    flag = false;

    _type = 0;

    ziChan = 0;

    buyData = [];

    saleData = [];


    rateItem = null;

    isFlag = false;

    onLoad() {

        GlobalEvent.on(EventCfg.GAMEOVEER, () => {
            if (this.keMcCount > 0) {
                this.ziChan += parseFloat(this.keMcCount + '') * this.gpData[GameCfg.huizhidatas - 1].close;
            }
            GameCfg.finalfund = this.ziChan;
        }, this);

        GlobalEvent.on(EventCfg.GAMEFUPAN, () => {
            this.node.children.forEach(el => {
                el.active = false;
            })
            let node = this.node.getChildByName('fupan');
            node.active = true;
            node.children[0].getComponent(cc.Label).string = GameCfg.data[0].name;
            node.children[1].getComponent(cc.Label).string = this.gpData[0].day + '-' + this.gpData[this.gpData.length - 1].day;
            node.children[2].getComponent(cc.Label).string = '0.00%';
        }, this);
    }

    protected start() {
        this.ziChan = GameCfg.ziChan;
        this.selectBox.active = false;
        //分仓
        if (GameCfg.GameSet.isFC) {
            this.mcBtn.node.x = -266;
            this.tipsmc.node.active = true;
            this.tipsmr.node.active = true;

            this.mrBtn.node.active = true;
            this.mcBtn.node.active = true;

            this.keMcCount = 0;
            this.mcBtn.interactable = false;
            this.mcBtn.enableAutoGrayEffect = true;
        }
        //不分仓
        else {
            this.tipsmr.node.active = false;
            this.tipsmc.node.active = false;
            this.mrBtn.node.active = true
            this.mcBtn.node.active = false
        }
        this.onSetMrCount();
    }

    onSetMrCount() {
        this.gpData = GameCfg.data[0].data;

        if (this.ziChan > 0 && GameCfg.huizhidatas <= this.gpData.length) {
            if (this.gpData[GameCfg.huizhidatas - 1]) {
                this.keMrCount = (this.ziChan / parseFloat(this.gpData[GameCfg.huizhidatas - 1].open) + '');
            }

        }
    }

    onEnable() {
        this.setLabelData();
        if (this.keMcCount > 0) {
            this.cyBtn.node.active = true;
            this.gwBtn.node.active = false;
        } else {
            this.gwBtn.node.active = true;
            this.cyBtn.node.active = false;
        }
        this.mrBtn.node.active = !this.flag;
        this.mcBtn.node.active = this.flag;

        if (GameCfg.GameType == 3) {
            if (GameCfg.data && GameCfg.data.length > 0) {
                let info = this.node.getChildByName('info');
                info.active = true;
                let nodes = info.children;
                nodes[2].getComponent(cc.Label).string = '股票信息:' + GameCfg.data[0].name;
                nodes[1].getComponent(cc.Label).string = '起始时间:' + GameCfg.data[0].data[0].day;
                let le = GameCfg.data[0].data.length;
                nodes[0].getComponent(cc.Label).string = '结束时间:' + GameCfg.data[0].data[le - 1].day;
            }
        }
        this.roundNumber = GameCfg.data[0].data.length - GameCfg.huizhidatas;

        this.tipsLabel.string = '回合数：' + this.roundNumber;
    }

    //回合数
    setLabelData() {
        if (this.roundNumber <= 0) {
            this.roundNumber = 0;
        }
        this.tipsLabel.string = '回合数：' + this.roundNumber;
        if (this.roundNumber <= 0) {
            GlobalEvent.emit(EventCfg.GAMEOVEER, true);
            return;
        }
    }

    onClick(event, data) {
        let name = event.target.name;
        //点击买入卖出
        if (name == 'mrBtn' || name == 'mcBtn') {
            if (GameCfg.GameSet.isFC) {
                this.selectBox.active = true;
                let point = event.target.convertToWorldSpaceAR(cc.v2(0, 0));

                this.selectBox.x = this.selectBox.parent.convertToNodeSpaceAR(point).x;

                if (name == 'mrBtn') {
                    this._type = 1;
                } else {
                    this._type = 2;
                }
            } else {
                this.flag = !this.flag;
                this.mrBtn.node.active = !this.flag;
                this.mcBtn.node.active = this.flag;
                if (name == 'mrBtn') {
                    GlobalEvent.emit(EventCfg.ONADDMARK, 2);

                    this.keMcCount += this.keMrCount;
                    this.keMrCount = 0;
                    this.ziChan = 0;
                    this.cyBtn.node.active = true;
                    this.gwBtn.node.active = false;
                } else {
                    GlobalEvent.emit(EventCfg.ONADDMARK, 3);

                    this.ziChan += parseFloat(this.keMcCount + '') * this.gpData[GameCfg.huizhidatas - 1].close;
                    this.keMcCount = 0;
                    this.gwBtn.node.active = true;
                    this.cyBtn.node.active = false;
                }
                this.setRoundNumber(name);
            }
        }
        //点击观望
        else if (name == 'gwBtn' || name == 'cyBtn') {
            this.setRoundNumber(name);
        }
        //全仓
        else if (name == 'fcBtn') {
            //买入
            if (this._type == 1) {


                this.keMcCount += this.keMrCount;
                this.keMrCount = 0;
                this.ziChan = 0;
                this.mrBtn.interactable = false;
                this.mrBtn.enableAutoGrayEffect = true;
                this.mcBtn.interactable = true;
                this.mcBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mrBtn');


            }
            //卖出
            else {


                this.mrBtn.interactable = true;
                this.mrBtn.enableAutoGrayEffect = false;
                this.mcBtn.interactable = false;
                this.mcBtn.enableAutoGrayEffect = true;
                this.ziChan += parseFloat(this.keMcCount + '') * this.gpData[GameCfg.huizhidatas - 1].close;

                this.keMcCount = 0;
                this.setRoundNumber('mcBtn');


            }
            this.selectBox.active = false;
        }
        //3/4
        else if (name == 'fcBtn1') {
            if (this._type == 1) {

                this.keMcCount += parseFloat(this.ziChan * (3 / 4) / this.gpData[GameCfg.huizhidatas - 1].open + '');
                this.ziChan -= this.ziChan * (3 / 4);
                //  this.keMrCount -= this.keMrCount * (3 / 4);

                if (this.keMrCount <= 0) {
                    this.mrBtn.interactable = false;
                    this.mrBtn.enableAutoGrayEffect = true;
                }
                this.mcBtn.interactable = true;
                this.mcBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mrBtn');
            } else {

                this.ziChan += parseFloat(this.keMcCount * (3 / 4) * this.gpData[GameCfg.huizhidatas - 1].close + '');
                this.keMcCount -= this.keMcCount * (3 / 4);
                if (this.keMcCount <= 0) {
                    this.mcBtn.interactable = false;
                    this.mcBtn.enableAutoGrayEffect = true;
                }
                this.mrBtn.interactable = true;
                this.mrBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mcBtn');
            }
            this.selectBox.active = false;
        } else if (name == 'fcBtn2') {
            if (this._type == 1) {
                this.keMcCount += parseFloat(this.ziChan * (2 / 3) / this.gpData[GameCfg.huizhidatas - 1].open + '');
                this.ziChan -= this.ziChan * (2 / 3);

                if (this.keMrCount <= 0) {
                    this.mrBtn.interactable = false;
                    this.mrBtn.enableAutoGrayEffect = true;

                }
                this.mcBtn.interactable = true;
                this.mcBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mrBtn');
            } else {

                this.ziChan += parseFloat(this.keMcCount * (2 / 3) * this.gpData[GameCfg.huizhidatas - 1].close + '');
                this.keMcCount -= this.keMcCount * (2 / 3);
                if (this.keMcCount <= 0) {

                    this.mcBtn.interactable = false;
                    this.mcBtn.enableAutoGrayEffect = true;
                }
                this.mrBtn.interactable = true;
                this.mrBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mcBtn');
            }
            this.selectBox.active = false;
        } else if (name == 'fcBtn3') {
            if (this._type == 1) {
                this.keMcCount += parseFloat(this.ziChan * (1 / 2) / this.gpData[GameCfg.huizhidatas - 1].open + '');
                this.ziChan -= this.ziChan * (1 / 2);

                if (this.keMrCount <= 0) {
                    this.mrBtn.interactable = false;
                    this.mrBtn.enableAutoGrayEffect = true;

                }
                this.mcBtn.interactable = true;
                this.mcBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mrBtn');
            } else {
                this.ziChan += parseFloat(this.keMcCount * (1 / 2) * this.gpData[GameCfg.huizhidatas - 1].close + '');
                this.keMcCount -= this.keMcCount * (3 / 4);

                if (this.keMcCount <= 0) {

                    this.mcBtn.interactable = false;
                    this.mcBtn.enableAutoGrayEffect = true;
                }
                this.mrBtn.interactable = true;
                this.mrBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mcBtn');
            }
            this.selectBox.active = false;
        } else if (name == 'fcBtn4') {
            if (this._type == 1) {
                this.keMcCount += parseFloat(this.ziChan * (1 / 3) / this.gpData[GameCfg.huizhidatas - 1].open + '');
                this.ziChan -= this.ziChan * (1 / 3);

                if (this.keMrCount <= 0) {
                    this.mrBtn.interactable = false;
                    this.mrBtn.enableAutoGrayEffect = true;

                }
                this.mcBtn.interactable = true;
                this.mcBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mrBtn');
            } else {
                this.ziChan += parseFloat(this.keMcCount * (1 / 3) * this.gpData[GameCfg.huizhidatas - 1].close + '');
                this.keMcCount -= this.keMcCount * (1 / 3);

                if (this.keMcCount <= 0) {

                    this.mcBtn.interactable = false;
                    this.mcBtn.enableAutoGrayEffect = true;
                }
                this.mrBtn.interactable = true;
                this.mrBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mcBtn');
            }
            this.selectBox.active = false;
        } else if (name == 'fcBtn5') {
            if (this._type == 1) {
                this.keMcCount += parseFloat(this.ziChan * (1 / 4) / this.gpData[GameCfg.huizhidatas - 1].open + '');
                this.ziChan -= this.ziChan * (1 / 4);

                if (this.keMrCount <= 0) {
                    this.mrBtn.interactable = false;
                    this.mrBtn.enableAutoGrayEffect = true;
                }
                this.mcBtn.interactable = true;
                this.mcBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mrBtn');
            } else {
                this.ziChan += parseFloat(this.keMcCount * (1 / 4) * this.gpData[GameCfg.huizhidatas - 1].close + '');
                this.keMcCount -= this.keMcCount * (1 / 4);
                if (this.keMcCount <= 0) {
                    this.mcBtn.interactable = false;
                    this.mcBtn.enableAutoGrayEffect = true;
                }
                this.mrBtn.interactable = true;
                this.mrBtn.enableAutoGrayEffect = false;
                this.setRoundNumber('mcBtn');
            }
            this.selectBox.active = false;
        }
    }

    setRoundNumber(name) {

        //买入卖出回合数
        if (this.roundNumber > 0) {
            //  GlobalEvent.emit('onBuyOrSell', name);
            this.onBuyOrSell(name);
        }
        this.roundNumber -= 1;
        this.setLabelData();
        //绘制下回合的走势线
        GlobalEvent.emit('roundNUmber');

        this.onSetMrCount();
    }

    onBuyOrSell(state) {
        //买入
        let data = GameCfg.data[0].data;
        if (state == 'mrBtn') {
            this.buyData.push(GameCfg.huizhidatas - 2);
            let curClose = parseFloat(data[GameCfg.huizhidatas - 1].close);
            let preClose = parseFloat(data[GameCfg.huizhidatas - 2].close);
            let rate = (curClose - preClose) / preClose;
            GlobalEvent.emit('updateRate', [rate]);
            this.isFlag = true;
            let start = GameCfg.huizhidatas;

            this.rateItem = {
                rate: rate,
                start: start,
                end: null,
            }
            GameCfg.eachRate.push(this.rateItem);
            GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.eachRate);
        }

        //卖出
        else if (state == 'mcBtn') {
            this.saleData.push(GameCfg.huizhidatas - 2);
            let curClose = parseFloat(data[GameCfg.huizhidatas - 2].close);
            console.log('curClose:' + curClose);
            let preClose = parseFloat(data[this.buyData[this.buyData.length - 1]].close);
            console.log('preClose:' + preClose);

            let rate = (curClose - preClose) / preClose;
            GameCfg.allRate = ((GameCfg.allRate + 1) * (rate + 1) - 1);
            if (rate < 0) {
                GameCfg.lossCount++;
            } else {
                GameCfg.profitCount++;
            }
            GlobalEvent.emit('updateRate', [rate, GameCfg.allRate]);

            this.isFlag = false;

            if (this.keMcCount == 0) {
                this.rateItem.end = GameCfg.huizhidatas - 1;
            } else {
                this.rateItem.end = GameCfg.huizhidatas - 1;
                let start = GameCfg.huizhidatas;
                this.rateItem = {
                    rate: rate,
                    start: start,
                    end: null,
                }
                GameCfg.eachRate.push(this.rateItem);
            }
            this.rateItem.rate = rate;


            GameCfg.eachRate[GameCfg.eachRate.length - 1] = this.rateItem;
            GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.eachRate);
        }
        //观望
        else if (state == 'cyBtn') {
            if (!this.isFlag) {
                return;
            }
            let curClose = parseFloat(data[GameCfg.huizhidatas - 2].close);
            let preClose = parseFloat(data[this.buyData[this.buyData.length - 1]].open);
            let rate = (curClose - preClose) / preClose;
            GlobalEvent.emit('updateRate', [rate]);

            this.rateItem.rate = rate;
            GameCfg.eachRate[GameCfg.eachRate.length - 1] = this.rateItem;
            GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.eachRate);
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GAMEOVEER);
        GlobalEvent.off(EventCfg.GAMEFUPAN);
    }

}
