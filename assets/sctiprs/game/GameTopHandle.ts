import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import PopupManager from "../Utils/PopupManager";
import GameCfg from "./GameCfg";
import { pb } from '../../protos/proto';
import GameData from '../GameData';


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

    @property(cc.Label)
    gpName: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Label)
    GameName: cc.Label = null;

    protected onLoad() {
        //跟新盈利率
        GlobalEvent.on('updateRate', (data) => {

            if (data.length >= 2) {
                if (data[1] > 0) {
                    this.ALlRateLabel.node.color = cc.Color.RED;
                    data[1] && (this.ALlRateLabel.string = (parseInt(data[1] * 10000 + '') / 100) + '%');
                    this.currRateLabel.node.color = cc.Color.WHITE;
                    this.currRateLabel.string = '0.00%';
                } else {
                    this.ALlRateLabel.node.color = cc.Color.GREEN;
                    data[1] && (this.ALlRateLabel.string = (parseInt(data[1] * 10000 + '') / 100) + '%');
                    this.currRateLabel.node.color = cc.Color.WHITE;
                    this.currRateLabel.string = '0.00%';
                }
            } else {
                if (data[0] >= 0) {
                    this.currRateLabel.node.color = cc.Color.RED;
                    data[0] && (this.currRateLabel.string = (parseInt(data[0] * 10000 + '') / 100) + '%')
                } else {
                    this.currRateLabel.node.color = cc.Color.GREEN;
                    data[0] && (this.currRateLabel.string = (parseInt(data[0] * 10000 + '') / 100) + '%')
                }
            }
        }, this);

        //复盘
        GlobalEvent.on(EventCfg.GAMEFUPAN, () => {
            let closeBtn = this.node.getChildByName('right').getChildByName('closeBtn');
            let backBtn = this.node.getChildByName('right').getChildByName('backBtn');
            closeBtn.active = false;
            backBtn.active = true;
        }, this);
    }

    protected onEnable() {
        if (GameData.headImg) {
            this.userHead.spriteFrame = GameData.headImg;
        }
        if (GameData.userName) {
            this.userName.string = GameData.userName;
        }
        if (GameData.properties[2]) {
            this.lv.string = 'LV:' + GameData.properties[2] || 0 + '';
        }

        this.gpName.string = GameCfg.data[0].name + ' ' + GameCfg.data[0].code;
        this.timeLabel.string = GameCfg.data[0].data[0].day + '--' + GameCfg.data[0].data[GameCfg.data[0].data.length - 1].day;


        //训练指标
        let nodes = this.rightNode.children;


        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            this.GameName.string = '双盲训练';

            nodes.forEach((el, index) => {
                if (index == 1) {
                    el.active = true;
                } else {
                    el.active = false;
                }
            })

            let la = this.node.getChildByName('rate');
            la.x = 0;
            la.children[4].active = false;
            la.children[5].active = false;

        }
        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            this.GameName.string = '指标训练';

            nodes.forEach((el, index) => {
                if (index == 1) {
                    el.active = true;
                } else {
                    el.active = false;
                }
            })
        }
        else if (GameCfg.GameType == pb.GameType.DingXiang) {
            this.GameName.string = '定向训练';

            nodes.forEach((el, index) => {
                if (index == 1 || index == 3 || index == 4) {
                    el.active = true;
                } else {
                    el.active = false;
                }
            })

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
        else if (name == 'btnMyspic') {
            GlobalEvent.emit(EventCfg.MYSPICCLICK);
        }

    }
}
