import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfg from "./GameCfg";
import { pb } from "../../protos/proto";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    ma = null;
    boll = null;

    cpm = null;

    macd = null;

    kdj = null;

    rsi = null;

    rZoom = null;

    tipsText: cc.Label[] = [];

    rightBox: cc.Node = null;

    tipsBox: cc.Node = null;

    timerCall = null;

    inotyBox: cc.Node = null;

    lZoom: cc.Toggle = null;

    @property(cc.Node)
    selcetContent: cc.Node = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    @property(cc.Label)
    hsLa: cc.Label = null;

    @property(cc.Label)
    zfLa: cc.Label = null;



    onLoad() {
        GlobalEvent.on('updataLabel', (inde) => {

            let datas = GameCfg.data[0].data;
            let info = [];
            if (datas[inde]) {
                info.push('****/**/**');
                info.push(parseFloat(datas[inde].open).toFixed(2));
                info.push(parseFloat(datas[inde].high).toFixed(2));
                info.push(parseFloat(datas[inde].low).toFixed(2));
                info.push(parseFloat(datas[inde].close).toFixed(2));
                info.push(parseInt(datas[inde].value));
                info.push(parseInt(parseInt(datas[inde].price) / 10000 + '') + 'w');
                info.push(parseFloat(datas[inde].Rate).toFixed(2) + '%');
                let zd = datas[inde].close - datas[inde - 1].close;
                info.push(zd.toFixed(2));
                let zf = zd / datas[inde - 1].close;
                info.push(zf.toFixed(2));

                this.hsLa.string = parseFloat(datas[inde].Rate).toFixed(2) + '%';
                if (info[9] < 0) {
                    this.zfLa.node.color = new cc.Color().fromHEX('#76B87E');
                } else {
                    this.zfLa.node.color = cc.Color.RED;
                }
                this.zfLa.string = zf.toFixed(2);
            }


            info.forEach((el, index) => {
                //黑背景
                if (GameCfg.GameSet.isBW) {
                    if (index >= 5 && index < 8) {
                        this.tipsText[index].node.color = cc.Color.YELLOW;
                    }
                } else {
                    if (index >= 5 && index < 8) {
                        this.tipsText[index].node.color = new cc.Color().fromHEX('#AF84D1');
                    }
                }
                if (index >= 8 && index <= 9) {
                    if (el < 0) {
                        this.tipsText[index].node.color = new cc.Color().fromHEX('#76B87E');
                    } else {
                        this.tipsText[index].node.color = cc.Color.RED;
                    }
                }
                this.tipsText[index].string = el;
            })
        }, this);

        GlobalEvent.on('tipsPoint', (point) => {
            this.timerCall && (clearTimeout(this.timerCall))
            this.timerCall = null;
            this.tipsBox.active = true;
            if (point >= cc.winSize.width / 2) {
                if (this.lZoom.isChecked) {
                    this.tipsBox.x = -cc.winSize.width / 2 + this.tipsBox.width / 2 + this.inotyBox.width + 10;
                } else {
                    this.tipsBox.x = -cc.winSize.width / 2 + this.tipsBox.width / 2 + 10;
                }
            } else {
                if (this.rZoom.isChecked) {
                    this.tipsBox.x = cc.winSize.width / 2 - this.tipsBox.width / 2 - 10;
                } else {
                    this.tipsBox.x = cc.winSize.width / 2 - this.tipsBox.width / 2 - this.rightBox.width - 10;
                }
            }
        }, this);

        GlobalEvent.on('hideTips', () => {
            if (!this.timerCall) {
                this.timerCall = setTimeout(() => {
                    this.tipsBox.active = false;
                    this.timerCall && (clearTimeout(this.timerCall))
                    this.timerCall = null;
                }, 800);
            }
        }, this);
    }

    start() {
        let nodes = this.node.children;
        this.rZoom.isChecked = false;
        //双盲
        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            //  nodes[4].active = false;
            this.lZoom.node.active = false;
            this.lZoom.isChecked = false;
        }

        //定向
        else if (GameCfg.GameType == pb.GameType.DingXiang) {


        }
        //训练指标
        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            // this.node.active=false;
            nodes[0].active = false;
            nodes[1].active = false;
            nodes[2].active = false;
            nodes[3].active = false;
            //  this.rZoom.isChecked = true;
            // GlobalEvent.emit('labelPoint', cc.winSize.width + this.rightBox.width / 2 - 150);
        }
    }

    setBGColor() {
        this.inotyBox = this.node.getChildByName('leftinoty');
        this.lZoom = this.node.getChildByName('lZoomBtn').getComponent(cc.Toggle);
        this.lZoom.node.children[0].active = true;
        this.inotyBox.x = -cc.winSize.width / 2 - this.inotyBox.width / 2;

        this.rightBox = this.node.getChildByName('rightBox');
        this.tipsBox = this.node.getChildByName('tipsBox');
        //黑
        if (GameCfg.GameSet.isBW) {
            this.rightBox.color = new cc.Color().fromHEX('#1E1E1E');
            this.tipsBox.color = new cc.Color().fromHEX('#1E1E1E');

            this.inotyBox.getChildByName('bg').active = true;
            this.inotyBox.getChildByName('label').color = cc.Color.WHITE;

        }
        //白
        else {

            this.rightBox.color = cc.Color.WHITE;
            this.tipsBox.color = cc.Color.WHITE;
            this.inotyBox.getChildByName('bg').active = false;
            this.inotyBox.getChildByName('label').color = cc.Color.BLACK;
        }
        this.tipsBox.children.forEach(el => {
            this.tipsText.push(el.getComponent(cc.Label));
        })
        // this.maboll = this.rightBox.getChildByName('ma_boll').getComponent(cc.Toggle);
        // let toggleContainer = this.rightBox.getChildByName('New ToggleContainer');
        // this.cpm = toggleContainer.getChildByName('CPM').getComponent(cc.Toggle);
        // this.macd = toggleContainer.getChildByName('MACD').getComponent(cc.Toggle);
        // this.kdj = toggleContainer.getChildByName('KDJ').getComponent(cc.Toggle);
        // this.rsi = toggleContainer.getChildByName('RSI').getComponent(cc.Toggle);
        this.rZoom = this.node.getChildByName('rZoomBtn').getComponent(cc.Toggle);
        this.rightBox.active = true;
    }


    onEnable() {
        this.setBGColor();
        this.setBoxfalg('ma');
        this.setBoxfalg('CPM');
        this.rightBox.x = cc.winSize.width / 2 - this.rightBox.width / 2;
        // GlobalEvent.emit('labelPoint', cc.winSize.width - this.rightBox.width / 2 - 150);

    }

    protected onDestroy() {
        this.timerCall && (clearTimeout(this.timerCall))
        this.timerCall = null;
        GlobalEvent.off('updataLabel');
        GlobalEvent.off('tipsPoint');
        GlobalEvent.off('hideTips');
    }


    onBtnSlecet(event, data) {
        let name = event.target.name;

        if (name == 'btnSlecet') {
            this.selcetContent.active = !this.selcetContent.active;
        }
        else if (data == 'CPM' || data == 'MACD' || data == 'KDJ' || data == 'RSI') {
            let str = event.target.getComponent(cc.Label).string;
            this.tipsLabel.string = str;
            this.selcetContent.active = false;
            this.setBoxfalg(data);
        }

    }

    setBoxfalg(data) {
        // this.rightBox.children.forEach(el => {
        //     el.color = new cc.Color().fromHEX('#808080');
        // })

        this.rightBox.getChildByName(data).color = cc.Color.RED;
        if (data == 'ma' || data == 'boll') {
            if (data == 'ma') {
                this.ma = true;
                this.boll = false;
                this.rightBox.getChildByName('boll').color = new cc.Color().fromHEX('#808080');
            } else {
                this.ma = false;
                this.boll = true;
                this.rightBox.getChildByName('ma').color = new cc.Color().fromHEX('#808080');
            }
        } else {
            if (data == 'CPM') {
                this.macd = false;
                this.kdj = false;
                this.rsi = false;
                this.cpm = true;
                this.rightBox.getChildByName('MACD').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('KDJ').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('RSI').color = new cc.Color().fromHEX('#808080');
            } else if (data == 'MACD') {
                this.macd = true;
                this.kdj = false;
                this.rsi = false;
                this.cpm = false;
                this.rightBox.getChildByName('CPM').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('KDJ').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('RSI').color = new cc.Color().fromHEX('#808080');
            } else if (data == 'KDJ') {
                this.macd = false;
                this.kdj = true;
                this.rsi = false;
                this.cpm = false;
                this.rightBox.getChildByName('CPM').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('MACD').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('RSI').color = new cc.Color().fromHEX('#808080');
            } else if (data == 'RSI') {
                this.macd = false;
                this.kdj = false;
                this.rsi = true;
                this.cpm = false;
                this.rightBox.getChildByName('CPM').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('MACD').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('KDJ').color = new cc.Color().fromHEX('#808080');
            }
        }

        let flagData = {
            maboll: this.ma,
            cpm: this.cpm,
            macd: this.macd,
            kdj: this.kdj,
            rsi: this.rsi,
        }

        //是否一直显示
        if (GameCfg.GameSet.isShowVol) {
            flagData.cpm = true;
            this.rightBox.getChildByName('CPM').color = cc.Color.RED;
        }
        GlobalEvent.emit('on_off', flagData);
    }

    onClick(event, data) {
        //先项
        if (data == 'ma' || data == 'CPM' || data == 'MACD' || data == 'KDJ' || data == 'RSI' || data == 'boll') {
            this.setBoxfalg(data);

            if (data != 'ma' && data != 'boll') {
                let str = event.target.getComponent(cc.Label).string;
                this.tipsLabel.string = str;
            }
            if (data == 'CPM') {
                this.tipsLabel.string = '成交量';
            }

        } else if (data == 'rZoomBtn') {
            // this.rightBox.stopAllActions();
            if (this.rZoom.isChecked) {
                this.rZoom.node.children[0].active = false;
                this.rightBox.x = cc.winSize.width / 2 + this.rightBox.width / 2;
                //   GlobalEvent.emit('labelPoint', cc.winSize.width + this.rightBox.width / 2 - 150);
            } else {
                this.rZoom.node.children[0].active = true;
                this.rightBox.x = cc.winSize.width / 2 - this.rightBox.width / 2;
                //   GlobalEvent.emit('labelPoint', cc.winSize.width - this.rightBox.width / 2 - 150);
            }
            GlobalEvent.emit('setDrawing', this.rZoom.isChecked);

        } else if (data == 'lZoomBtn') {
            if (this.lZoom.isChecked) {
                this.lZoom.node.children[0].active = false;
                this.inotyBox.x = -cc.winSize.width / 2 + this.inotyBox.width / 2;

            } else {
                this.lZoom.node.children[0].active = true;
                this.inotyBox.x = -cc.winSize.width / 2 - this.inotyBox.width / 2;
            }
            GlobalEvent.emit(EventCfg.SET_DRAW_SIZE, this.lZoom.isChecked);
        }
    }
}
