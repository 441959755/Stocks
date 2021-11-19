import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfg from "./GameCfg";
import { pb } from "../../protos/proto";
import ComUtils from '../Utils/ComUtils';
import DrawData from "./DrawData";

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

    lZoom = null;

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

    @property(cc.Node)
    tipsTitle: cc.Node = null;

    onLoad() {

        GlobalEvent.on('updataLabel', (inde) => {
            let datas = GameCfg.data[0].data;
            let info = [];
            if (datas[inde]) {
                if (GameCfg.GAMEFUPAN) {
                    info.push(ComUtils.formatTime(datas[inde].day));
                } else {
                    if (GameCfg.GameSet.year == '随机') {
                        info.push('****/**/**');
                    } else {
                        info.push(ComUtils.formatTime(datas[inde].day));
                    }
                }

                info.push((datas[inde].open).toFixed(2));
                info.push((datas[inde].high).toFixed(2));
                info.push((datas[inde].low).toFixed(2));
                info.push((datas[inde].close).toFixed(2));

                if (parseInt(datas[inde].value) >= 100) {
                    info.push(parseInt(datas[inde].value / 100 + '') + '手');
                } else {
                    info.push((parseInt(datas[inde].value)));
                }

                if (GameCfg.GameType == pb.GameType.QiHuo) {
                    info.push('--');
                    info.push(datas[inde].ccl_hold);
                    this.ccLa.string = '持仓：';

                } else {
                    if (datas[inde].price >= 100000000) {
                        info.push(((datas[inde].price) / 100000000).toFixed(2) + '亿');
                    }
                    else {
                        info.push(((datas[inde].price) / 10000).toFixed(2) + '万');
                    }


                    info.push((datas[inde].Rate || 0.00).toFixed(2) + '%');
                    this.hsLa.string = (datas[inde].Rate || 0.00).toFixed(2) + '%';
                }

                let zd = 0.00, zf = 0.00;
                if (inde > 0) {
                    zd = datas[inde].close - datas[inde - 1].close;
                    zf = (zd / datas[inde - 1].close) * 100;
                }

                info.push(zd.toFixed(2));

                info.push(zf.toFixed(2));

                if (zf < 0) {
                    this.zfLa.node.color = new cc.Color().fromHEX('#76B87E');
                } else {
                    this.zfLa.node.color = new cc.Color().fromHEX('#e94343');
                }

                this.zfLa.string = zf.toFixed(2) + '%';

                info.push(DrawData.getCurrentEarning(inde));

                info.push(DrawData.getCurrentBlockMark(inde));
            }


            info.forEach((el, index) => {
                //本轮收益
                if (index == 10) {
                    let la = this.tipsTitle.children[10].getComponent(cc.Label);
                    let state = DrawData.getCurrentState(inde);
                    if (state == 1) {
                        la.string = '本轮多单收益:';
                    }
                    else if (state == 2) {
                        la.string = '本轮空单收益:';
                    } else {
                        la.string = '本 轮 收 益 :';
                    }
                    if (el === null) {
                        this.tipsText[index].node.active = false;
                        this.tipsTitle.children[10].active = false;
                    }
                    else if (el < 0) {
                        this.tipsText[index].node.active = true;
                        this.tipsTitle.children[10].active = true;

                        this.tipsText[index].string = parseInt(el * 10000 + '') / 100 + '%';
                        this.tipsText[index].node.color = new cc.Color().fromHEX('#31a633');
                    } else {
                        this.tipsText[index].node.active = true;
                        this.tipsTitle.children[10].active = true;
                        this.tipsText[index].string = parseInt(el * 10000 + '') / 100 + '%';
                        this.tipsText[index].node.color = new cc.Color().fromHEX('#e94343');
                    }
                }
                else if (index == 11) {
                    if (el === null) {
                        this.tipsText[index].node.active = false;
                        this.tipsTitle.children[11].active = false;
                    }
                    else {
                        this.tipsText[index].node.active = true;
                        this.tipsTitle.children[11].active = true;
                        this.tipsText[index].string = el;
                    }
                }
                else {
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
                            this.tipsText[index].node.color = new cc.Color().fromHEX('#e94343');
                        }
                        if (index == 9) {
                            el += '%';
                        }
                    }
                    this.tipsText[index] && (this.tipsText[index].string = el)
                }


            })

        }, this);

        GlobalEvent.on('tipsPoint', (point) => {
            this.timerCall && (clearTimeout(this.timerCall))
            this.timerCall = null;
            this.tipsBox.active = true;
            if (point >= cc.winSize.width / 2) {
                if (this.lZoom) {
                    this.tipsBox.x = -cc.winSize.width / 2 + this.tipsBox.width / 2 + 206 + 10;

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

        GlobalEvent.on('setBoxfalg', this.setBoxfalg.bind(this), this);

        GlobalEvent.on(EventCfg.SET_DRAW_SIZE, (flag) => {
            this.lZoom = flag;
            // if (flag) {
            //     this.selcetContent.parent.x += 206;
            // } else {
            //     this.selcetContent.parent.x -= 206;
            // }
        }, this);

        this.rightBox = this.node.getChildByName('rightBox');
        this.tipsBox = this.node.getChildByName('tipsBox');

        this.tipsBox.children.forEach(el => {
            this.tipsText.push(el.getComponent(cc.Label));
        })

        this.rZoom = this.node.getChildByName('rZoomBtn').getComponent(cc.Toggle);
        this.rightBox.active = true;
    }



    onEnable() {

        this.setBGColor();

        this.rZoom.isChecked = false;
        this.cclNode.active = false;
        this.CCLBtn.active = false;
        this.rightBox.x = cc.winSize.width / 2 - this.rightBox.width / 2;

        //双盲
        if (GameCfg.GameType == pb.GameType.ShuangMang || GameCfg.JJ_XUNLIAN) {
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
            this.hsLa.node.parent.active = false;
            this.cclNode.active = true;
            this.CCLBtn.active = true;
        }
        else if (GameCfg.GameType == pb.GameType.JJ_PK ||
            GameCfg.GameType == pb.GameType.JJ_DuoKong ||
            GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {
            this.setBoxfalg('ma');
            this.setBoxfalg('CPM');
        }
        else if (GameCfg.GameType == pb.GameType.TiaoJianDan) {
            this.setBoxfalg('ma');
            this.setBoxfalg('CPM');
        }
    }


    setBGColor() {
        this.rightBox = this.node.getChildByName('rightBox');
        this.tipsBox = this.node.getChildByName('tipsBox');
        //黑
        if (GameCfg.GameSet.isBW) {
            this.rightBox.color = new cc.Color().fromHEX('#1E1E1E');
            this.tipsBox.color = new cc.Color().fromHEX('#1E1E1E');

            this.selcetContent.color = new cc.Color().fromHEX('#1E1E1E');
            this.selcetContent.parent.color = new cc.Color().fromHEX('#343434');
        }
        //白
        else {
            this.rightBox.color = cc.Color.WHITE;
            this.tipsBox.color = cc.Color.WHITE;

            this.selcetContent.color = cc.Color.WHITE;
            this.selcetContent.parent.color = cc.Color.WHITE;

        }
    }

    protected onDestroy() {
        this.timerCall && (clearTimeout(this.timerCall))
        this.timerCall = null;
        GlobalEvent.off('updataLabel');
        GlobalEvent.off('tipsPoint');
        GlobalEvent.off('hideTips');
        GlobalEvent.off('setBoxfalg');
        GlobalEvent.off(EventCfg.SET_DRAW_SIZE);

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
            this.setBoxfalg(data);
        }
    }

    setBoxfalg(data) {
        let node = this.rightBox.getChildByName(data);
        node && (node.color = new cc.Color().fromHEX('#cccccc'))
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
            }
            if (data == 'EXPMA') {
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
            this.rightBox.getChildByName('CPM').color = new cc.Color().fromHEX('#cccccc');
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

        }
    }

    onDisable() {
        if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            this.selcetContent.parent.active = true;
            GlobalEvent.emit('setDrawing', false);
        }

        else if (this.rZoom.isChecked) {
            GlobalEvent.emit('setDrawing', false);
        }
        this.rZoom.node.active = true;
        this.rZoom.node.children[0].active = true;
        this.rightBox.active = true;
    }
}
