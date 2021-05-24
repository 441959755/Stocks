import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfg from "./GameCfg";
import { pb } from "../../protos/proto";
import GameData from '../GameData';
import ComUtils from '../Utils/ComUtils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    ma = null;
    boll = null;

    cpm = null;

    macd = null;

    kdj = null;

    rsi = null;
    ccl = null;

    EXPMA = null;

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

    @property(cc.Label)
    ccLa: cc.Label = null;

    @property(cc.Node)
    cclNode: cc.Node = null;

    @property(cc.Node)
    CCLBtn: cc.Node = null;

    onLoad() {
        //  let la1 = this.tipsText[0].node.parent.getChildByName('tips').children[7].getComponent(cc.Label);
        GlobalEvent.on('updataLabel', (inde) => {

            let datas = GameCfg.data[0].data;
            let info = [];
            if (datas[inde]) {
                if (GameCfg.GAMEFUPAN) {
                    //  info.push(datas[inde].day);
                    info.push(ComUtils.formatTime(datas[inde].day));
                } else {
                    if (GameCfg.GameSet.year == '随机') {
                        info.push('****/**/**');
                    } else {
                        info.push(ComUtils.formatTime(datas[inde].day));
                    }

                }

                info.push(parseFloat(datas[inde].open).toFixed(2));
                info.push(parseFloat(datas[inde].high).toFixed(2));
                info.push(parseFloat(datas[inde].low).toFixed(2));
                info.push(parseFloat(datas[inde].close).toFixed(2));
                // if (parseInt(datas[inde].value) >= 10000) {
                //     info.push((parseInt(datas[inde].value) / 10000).toFixed(2) + 'w');
                // } else {
                info.push((parseInt(datas[inde].value)));
                //  }


                if (GameCfg.GameType == pb.GameType.QiHuo) {
                    info.push('--');
                    info.push(parseInt(parseInt(datas[inde].ccl_hold) + ''));
                    this.ccLa.string = '持仓：';
                    //   this.hsLa.string = parseInt(datas[inde].ccl_hold + '') + '';
                } else {
                    //   info.push(parseInt(parseInt(datas[inde].price) / 10000 + '') + 'w');
                    info.push(parseInt(datas[inde].price));
                    info.push(parseFloat(datas[inde].Rate).toFixed(2) + '%');
                    this.hsLa.string = parseFloat(datas[inde].Rate).toFixed(2) + '%';
                }


                let zd = datas[inde].close - datas[inde - 1].close;
                info.push(zd.toFixed(2));
                let zf = (zd / datas[inde - 1].close) * 100;
                info.push(zf.toFixed(2));
                //  this.hsLa.string = parseFloat(datas[inde].Rate).toFixed(2) + '%';
                if (zf < 0) {
                    this.zfLa.node.color = new cc.Color().fromHEX('#76B87E');
                    //    this.tipsBox.children[9].color = new cc.Color().fromHEX('#76B87E');
                    //  this.tipsText[9].node.color = new cc.Color().fromHEX('#76B87E');
                } else {
                    this.zfLa.node.color = cc.Color.RED;
                    //   this.tipsBox.children[9].color = cc.Color.RED;
                    //  this.tipsText[9].node.color = cc.Color.RED;
                }

                this.zfLa.string = zf.toFixed(2) + '%';
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
                    if (index == 9) {
                        el += '%';
                    }
                }
                this.tipsText[index] && (this.tipsText[index].string = el)
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

        this.setBGColor();

        GlobalEvent.on('setBoxfalg', this.setBoxfalg.bind(this), this);
    }

    start() {
        let nodes = this.node.children;
        this.rZoom.isChecked = false;
        this.cclNode.active = false;
        this.CCLBtn.active = false;
        this.rightBox.x = cc.winSize.width / 2 - this.rightBox.width / 2;
        //双盲
        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            //  nodes[4].active = false;
            this.lZoom.node.active = false;
            this.lZoom.isChecked = false;

            this.setBoxfalg('ma');
            this.setBoxfalg('CPM');
        }

        //定向
        else if (GameCfg.GameType == pb.GameType.DingXiang) {
            this.setBoxfalg('ma');
            this.setBoxfalg('CPM');
        }
        //训练指标
        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {


            this.rZoom.node.active = false;
            this.rightBox.active = false;
            this.selcetContent.parent.active = false;
            this.rZoom.isChecked = true;
            if (GameCfg.GameSet.select == '均线') {
                this.setBoxfalg('ma');
                this.setBoxfalg('CPM');
            }
            else if (GameCfg.GameSet.select == 'MACD') {
                this.setBoxfalg('ma');
                this.setBoxfalg('MACD');
            } else if (GameCfg.GameSet.select == 'BOLL') {
                this.setBoxfalg('boll');
                this.setBoxfalg('CPM');
            }
            else if (GameCfg.GameSet.select == 'KDJ') {
                this.setBoxfalg('ma');
                this.setBoxfalg('KDJ');
            }
            else if (GameCfg.GameSet.select == 'EXPMA') {
                this.setBoxfalg('EXPMA');
                this.setBoxfalg('CPM');
            }
            else if (GameCfg.GameSet.select == 'RSI') {
                this.setBoxfalg('ma');
                this.setBoxfalg('RSI');
            }
            else if (GameCfg.GameSet.select == '成交量') {
                this.setBoxfalg('ma');
                this.setBoxfalg('CPM');
            }

            setTimeout(() => {
                GlobalEvent.emit('setDrawing', true);
            }, 100);

        }
        else if (GameCfg.GameType == pb.GameType.QiHuo) {
            this.setBoxfalg('ma');
            this.setBoxfalg('CPM');
            this.lZoom.node.active = false;
            this.lZoom.isChecked = false;
            this.hsLa.node.parent.active = false;
            this.cclNode.active = true;
            this.CCLBtn.active = true;
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
            this.inotyBox.color = new cc.Color().fromHEX('#1E1E1E');
            //  this.inotyBox.getChildByName('bg').active = true;
            this.inotyBox.getChildByName('label').color = cc.Color.WHITE;
            this.selcetContent.color = new cc.Color().fromHEX('#1E1E1E');
            this.selcetContent.parent.color = new cc.Color().fromHEX('#343434');
        }
        //白
        else {
            this.rightBox.color = cc.Color.WHITE;
            this.tipsBox.color = cc.Color.WHITE;
            this.inotyBox.color = cc.Color.WHITE;
            this.selcetContent.color = cc.Color.WHITE;
            this.selcetContent.parent.color = cc.Color.WHITE;
            //  this.inotyBox.getChildByName('bg').active = false;
            this.inotyBox.getChildByName('label').color = cc.Color.BLACK;
        }
        this.tipsBox.children.forEach(el => {
            this.tipsText.push(el.getComponent(cc.Label));
        })

        this.rZoom = this.node.getChildByName('rZoomBtn').getComponent(cc.Toggle);
        this.rightBox.active = true;
    }

    protected onDestroy() {
        this.timerCall && (clearTimeout(this.timerCall))
        this.timerCall = null;
        GlobalEvent.off('updataLabel');
        GlobalEvent.off('tipsPoint');
        GlobalEvent.off('hideTips');
        GlobalEvent.off('setBoxfalg');
    }


    onBtnSlecet(event, data) {
        let name = event.target.name;

        if (name == 'btnSlecet') {
            this.selcetContent.active = !this.selcetContent.active;
            //   this.touchNode.active = this.selcetContent.active;
        }
        else if (data == 'CPM' || data == 'MACD' || data == 'KDJ' || data == 'RSI' || data == 'CCL') {
            let str = event.target.getComponent(cc.Label).string;
            this.tipsLabel.string = str;
            this.selcetContent.active = false;
            // this.touchNode.active = false;
            this.setBoxfalg(data);
        }

    }

    setBoxfalg(data) {

        let node = this.rightBox.getChildByName(data);
        node && (node.color = new cc.Color().fromHEX('#fd4432'))
        if (data == 'ma' || data == 'boll') {
            if (data == 'ma') {
                this.ma = true;
                this.boll = false;
                this.rightBox.getChildByName('boll').color = new cc.Color().fromHEX('#808080');
            } else if (data == 'boll') {
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
                this.ccl = false;
                this.rightBox.getChildByName('MACD').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('KDJ').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('RSI').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('CCL').color = new cc.Color().fromHEX('#808080');
            } else if (data == 'MACD') {
                this.macd = true;
                this.kdj = false;
                this.rsi = false;
                this.cpm = false;
                this.ccl = false;
                this.rightBox.getChildByName('CPM').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('KDJ').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('RSI').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('CCL').color = new cc.Color().fromHEX('#808080');
            } else if (data == 'KDJ') {
                this.macd = false;
                this.kdj = true;
                this.rsi = false;
                this.cpm = false;
                this.ccl = false;
                this.rightBox.getChildByName('CPM').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('MACD').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('RSI').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('CCL').color = new cc.Color().fromHEX('#808080');
            } else if (data == 'RSI') {
                this.macd = false;
                this.kdj = false;
                this.rsi = true;
                this.cpm = false;
                this.ccl = false;
                this.rightBox.getChildByName('CPM').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('MACD').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('KDJ').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('CCL').color = new cc.Color().fromHEX('#808080');
            } else if (data == 'CCL') {
                this.macd = false;
                this.kdj = false;
                this.rsi = false;
                this.cpm = false;
                this.ccl = true;
                this.rightBox.getChildByName('CPM').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('MACD').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('KDJ').color = new cc.Color().fromHEX('#808080');
                this.rightBox.getChildByName('RSI').color = new cc.Color().fromHEX('#808080');
            } else if (data == 'EXPMA') {
                this.ma = false;
                this.boll = false;
                this.EXPMA = true;
            }
        }

        let flagData = {
            ma: this.ma,
            boll: this.boll,
            cpm: this.cpm,
            macd: this.macd,
            kdj: this.kdj,
            rsi: this.rsi,
            ccl: this.ccl,
            expma: this.EXPMA,
        }

        //是否一直显示
        if (GameCfg.GameSet.isShowVol && !flagData.ccl) {
            flagData.cpm = true;
            this.rightBox.getChildByName('CPM').color = new cc.Color().fromHEX('#fd4432');
        }
        GlobalEvent.emit('on_off', flagData);
    }

    onClick(event, data) {
        //先项
        if (data == 'ma' || data == 'CPM' || data == 'MACD' || data == 'KDJ' || data == 'RSI' || data == 'boll' || data == 'CCL') {
            this.setBoxfalg(data);

            if (data != 'ma' && data != 'boll') {
                let str = event.target.getComponent(cc.Label).string;
                this.tipsLabel.string = str;
            }
            if (data == 'CPM') {
                this.tipsLabel.string = '成交量';
            } else if (data == 'CCL') {
                this.tipsLabel.string = '持仓量';
            }

        } else if (data == 'rZoomBtn') {
            ;
            if (this.rZoom.isChecked) {
                this.rZoom.node.children[0].active = false;
                this.rightBox.x = cc.winSize.width / 2 + this.rightBox.width / 2;
            } else {
                this.rZoom.node.children[0].active = true;
                this.rightBox.x = cc.winSize.width / 2 - this.rightBox.width / 2;
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
