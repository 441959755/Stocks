import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import GameCfg from "./GameCfg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    maboll: cc.Toggle = null;

    cpm: cc.Toggle = null;

    macd: cc.Toggle = null;

    kdj: cc.Toggle = null;

    rsi: cc.Toggle = null;

    rZoom: cc.Toggle = null;

    tipsText: cc.Label[] = [];

    rightBox: cc.Node = null;

    tipsBox: cc.Node = null;

    timerCall = null;

    onLoad() {
        this.setBGColor();
        GlobalEvent.on('updataLabel', (inde) => {

            let datas = cc.ext.gameData.gameDatas[0].data;
            let info = [];
            if (datas[inde - 1]) {
                info.push('****/**/**');
                info.push(parseFloat(datas[inde - 1].open).toFixed(2));
                info.push(parseFloat(datas[inde - 1].high).toFixed(2));
                info.push(parseFloat(datas[inde - 1].low).toFixed(2));
                info.push(parseFloat(datas[inde - 1].close).toFixed(2));
                info.push(parseInt(datas[inde - 1].value));
                info.push(parseInt(parseInt(datas[inde - 1].price) / 10000 + '') + 'w');
                info.push(parseFloat(datas[inde - 1].Rate) + '%');
                let zd = datas[inde - 1].close - datas[inde - 2].close;
                info.push(zd.toFixed(2));
                let zf = zd / datas[inde - 2].close;
                info.push(zf.toFixed(2));
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
                if(index>=8&&index<=9){
                    if(el<0){
                       this.tipsText[index].node.color= new cc.Color().fromHEX('#76B87E');
                    }else{
                        this.tipsText[index].node.color=cc.Color.RED;
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
                this.tipsBox.x = -cc.winSize.width / 2 + this.tipsBox.width / 2;
            } else {
                if (this.rZoom.isChecked) {
                    this.tipsBox.x = cc.winSize.width / 2 - this.tipsBox.width / 2;
                } else {
                    this.tipsBox.x = cc.winSize.width / 2 - this.tipsBox.width / 2 - this.rightBox.width;
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

    setBGColor() {
        //黑
        if (cc.ext.gameData.SMSet.isBW) {
            this.rightBox = this.node.getChildByName('rightBox');
            this.tipsBox = this.node.getChildByName('tipsBox');
            this.node.getChildByName('rightBox1').active = false;
        }
        //白
        else {
            this.rightBox = this.node.getChildByName('rightBox1');
            this.tipsBox = this.node.getChildByName('tipsBox1');
            this.node.getChildByName('rightBox').active = false;
        }
        this.tipsBox.children.forEach(el => {
            this.tipsText.push(el.getComponent(cc.Label));
        })
        this.maboll = this.rightBox.getChildByName('ma_boll').getComponent(cc.Toggle);
        let toggleContainer = this.rightBox.getChildByName('New ToggleContainer');
        this.cpm = toggleContainer.getChildByName('CPM').getComponent(cc.Toggle);
        this.macd = toggleContainer.getChildByName('MACD').getComponent(cc.Toggle);
        this.kdj = toggleContainer.getChildByName('KDJ').getComponent(cc.Toggle);
        this.rsi = toggleContainer.getChildByName('RSI').getComponent(cc.Toggle);
        this.rZoom = this.rightBox.getChildByName('rZoomBtn').getComponent(cc.Toggle);
        this.rightBox.active = true;
    }


    onEnable() {
        this.setBoxfalg();
        this.rightBox.x = cc.winSize.width / 2 - this.rightBox.width / 2;
        GlobalEvent.emit('labelPoint', cc.winSize.width - this.rightBox.width / 2 - 150);
    }

    protected onDestroy() {
        this.timerCall && (clearTimeout(this.timerCall))
        this.timerCall = null;
        GlobalEvent.off('updataLabel');
        GlobalEvent.off('tipsPoint');
        GlobalEvent.off('hideTips');
    }

    setBoxfalg() {
        let flagData = {
            maboll: this.maboll.isChecked,
            cpm: this.cpm.isChecked,
            macd: this.macd.isChecked,
            kdj: this.kdj.isChecked,
            rsi: this.rsi.isChecked,
        }

        //是否一直显示
        if (cc.ext.gameData.SMSet.isShowVol) {
            flagData.cpm = true;
        }
        GlobalEvent.emit('on_off', flagData);
    }

    onClick(event, data) {
        if (data == 'ma_boll' || data == 'CPM' || data == 'MACD' || data == 'KDJ' || data == 'RSI') {
            this.setBoxfalg();
        } else if (data == 'rZoomBtn') {
            // this.rightBox.stopAllActions();
            if (this.rZoom.isChecked) {
                this.rZoom.node.children[0].active = false;
                this.rightBox.x = cc.winSize.width / 2 + this.rightBox.width / 2;
                console.log(cc.winSize.width);
                console.log(cc.view.getVisibleSize().width);
                GlobalEvent.emit('labelPoint', cc.winSize.width + this.rightBox.width / 2 - 150);
            } else {
                this.rZoom.node.children[0].active = true;
                this.rightBox.x = cc.winSize.width / 2 - this.rightBox.width / 2;
                GlobalEvent.emit('labelPoint', cc.winSize.width - this.rightBox.width / 2 - 150);
            }
            GlobalEvent.emit('setDrawing', this.rZoom.isChecked);
        }
    }
}
