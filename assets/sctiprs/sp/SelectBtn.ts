
import { pb } from '../../protos/proto';
import GameCfg from '../game/GameCfg';
import GlobalEvent from '../Utils/GlobalEvent';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    nodeClick: cc.Node = null;

    @property(cc.Node)
    cjl: cc.Node = null;

    @property(cc.Node)
    macd: cc.Node = null;

    @property(cc.Node)
    kdj: cc.Node = null;

    @property(cc.Node)
    rsi: cc.Node = null;

    @property(cc.Node)
    ccl: cc.Node = null;

    type = 0;

    setLabel() {

        this.cjl.color = cc.Color.WHITE;
        this.macd.color = cc.Color.WHITE;
        this.kdj.color = cc.Color.WHITE;
        this.rsi.color = cc.Color.WHITE;
        this.ccl && (this.ccl.color = cc.Color.WHITE);

        if (this.type == 0) {
            this.label.string = '成交量';
            this.cjl.color = cc.Color.RED;
        }

        else if (this.type == 1) {
            this.label.string = 'MACD';
            this.macd.color = cc.Color.RED;
        }

        else if (this.type == 2) {
            this.label.string = 'KDJ';
            this.kdj.color = cc.Color.RED;
        }

        else if (this.type == 3) {
            this.label.string = 'RSI';
            this.rsi.color = cc.Color.RED;
        }

        else if (this.type == 4) {
            this.label.string = '持仓量';
            this.ccl && (this.ccl.color = cc.Color.RED);
        }
    }

    protected onEnable(): void {
        this.content.active = false;
        this.setLabel();
    }

    onBtnClick(event, customData) {

        let name = event.target.name;

        if (name == 'SelectBtn') {

            this.type += 1;

            if (this.type >= this.content.children.length) {
                this.type = 0;
            }

            GlobalEvent.emit('selectBtn', this.type);
            this.setLabel();
        }

        else if (name == 'btnSlecet') {
            this.content.active = true;
            this.nodeClick.active = true;
        }

        else if (name == 'BtnCPM' || name == 'BtnMACD' || name == 'BtnKDJ' || name == 'BtnRSI') {

            this.type = parseInt(customData);
            GlobalEvent.emit('selectBtn', this.type);
            this.setLabel();
        }

        else if (name == 'nodeClick') {
            this.nodeClick.active = false;
            this.content.active = false;
        }

    }

}
