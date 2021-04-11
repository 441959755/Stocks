import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import PopupManager from "../Utils/PopupManager";
import GameCfg from "./GameCfg";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    ALlRateLabel: cc.Label = null;

    @property(cc.Label)
    currRateLabel: cc.Label = null;


    @property(cc.Sprite)
    userHead: cc.Sprite = null

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Label)
    lv: cc.Label = null;

    @property(cc.Node)
    rightNode: cc.Node = null;


    protected onLoad() {
        //跟新盈利率
        GlobalEvent.on('updateRate', (data) => {

            if (data.length >= 2) {
                if (data[1] > 0) {
                    this.ALlRateLabel.node.color = cc.Color.RED;
                    data[1] && (this.ALlRateLabel.string = (parseInt(data[1] * 10000 + '') / 100).toFixed(2) + '%');
                    this.currRateLabel.node.color = cc.Color.WHITE;
                    this.currRateLabel.string = '0.00%';
                } else {
                    this.ALlRateLabel.node.color = cc.Color.GREEN;
                    data[1] && (this.ALlRateLabel.string = (parseInt(data[1] * 10000 + '') / 100).toFixed(2) + '%');
                    this.currRateLabel.node.color = cc.Color.WHITE;
                    this.currRateLabel.string = '0.00%';
                }
            } else {
                if (data[0] >= 0) {
                    this.currRateLabel.node.color = cc.Color.RED;
                    data[0] && (this.currRateLabel.string = (parseInt(data[0] * 10000 + '') / 100).toFixed(2) + '%')
                } else {
                    this.currRateLabel.node.color = cc.Color.GREEN;
                    data[0] && (this.currRateLabel.string = (parseInt(data[0] * 10000 + '') / 100).toFixed(2) + '%')
                }
            }
        }, this);

        GlobalEvent.on(EventCfg.GAMEFUPAN, () => {
            let closeBtn = this.node.getChildByName('New Node').getChildByName('closeBtn');
            let backBtn = this.node.getChildByName('New Node').getChildByName('backBtn');
            closeBtn.active = false;
            backBtn.active = true;

        }, this);
    }

    protected onEnable() {
        if (cc.ext.gameData.headImg) {
            this.userHead.spriteFrame = cc.ext.gameData.headImg;
        }
        if (cc.ext.gameData.userName) {
            this.userName.string = cc.ext.gameData.userName;
        }
        if (cc.ext.gameData.level) {
            this.lv.string = 'LV:' + cc.ext.gameData.level || 0 + '';
        }

        //训练指标
        if (GameCfg.GameType == 2) {
            let nodes = this.rightNode.children;
            nodes[0].active = false;
        }
    }

    protected onDestroy() {
        GlobalEvent.off('updateRate');
        GlobalEvent.off(EventCfg.GAMEFUPAN);
    }

    //点击事件
    onClick(event, data) {
        let name = event.target.name;
        //点击帮组
        if (name == 'helpBtn') {
            GlobalEvent.emit(EventCfg.HELPSHOW);
        }
        //点击终止
        else if (name == 'closeBtn') {
            PopupManager.LoadPopupBox('tipsBox', '是否终止当前训练，查看训练结果？', (flag) => {
                GlobalEvent.emit(EventCfg.GAMEOVEER, flag);
            })
        } else if (name == 'backBtn') {
            cc.director.loadScene('hall');

        }
    }
}
