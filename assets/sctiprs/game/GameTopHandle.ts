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
    GameName: cc.Label = null;

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
                    data[0] && (this.currRateLabel.string = (parseInt(data[0] * 10000 + '') / 100).toFixed(2) + '%');
                } else {
                    this.currRateLabel.node.color = cc.Color.GREEN;
                    data[0] && (this.currRateLabel.string = (parseInt(data[0] * 10000 + '') / 100).toFixed(2) + '%');
                }
            }
        }, this);

        //复盘
        GlobalEvent.on(EventCfg.GAMEFUPAN, () => {
            //z中止训练
            let colseBtn = this.rightNode.getChildByName('closeBtn');

            //切换指数
            let btnMyspic = this.rightNode.getChildByName('btnMyspic');

            //数据统计
            let statBtn = this.rightNode.getChildByName('statBtn');
            colseBtn.active = false;
            if (GameCfg.GameType == pb.GameType.ShuangMang) {

                btnMyspic.active = false;
                statBtn.active = false;
            }
            else if (GameCfg.GameType == pb.GameType.DingXiang) {
                colseBtn.active = false;
                btnMyspic.active = true;
                statBtn.active = true;
            }

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

        //训练指标
        //  let nodes = this.rightNode.children;
        //z中止训练
        let colseBtn = this.rightNode.getChildByName('closeBtn');

        //切换指数
        let btnMyspic = this.rightNode.getChildByName('btnMyspic');

        //数据统计
        let statBtn = this.rightNode.getChildByName('statBtn');

        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            this.GameName.string = '双盲训练';

            colseBtn.active = true;
            colseBtn.children[0].active = false;
            btnMyspic.active = false;
            statBtn.active = false;

            let la = this.node.getChildByName('rate');
            la.x = 0;
        }
        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            this.GameName.string = '指标训练';

            colseBtn.active = true;
            btnMyspic.active = false;
            statBtn.active = false;
        }
        else if (GameCfg.GameType == pb.GameType.DingXiang) {
            this.GameName.string = '定向训练';
            colseBtn.children[0].active = true;
            colseBtn.active = true;
            btnMyspic.active = true;
            statBtn.active = false;
            if (GameCfg.GAMEFUPAN) {
                btnMyspic.active = false;
                statBtn.active = true;
                colseBtn.active = true;
            }
        } else if (GameCfg.GameType == pb.GameType.QiHuo) {
            this.GameName.string = '期货训练';
            colseBtn.active = true;
            colseBtn.children[0].active = false;
            btnMyspic.active = false;
            statBtn.active = false;
            this.node.height = 80;
            let la = this.node.getChildByName('rate');
            la.x = 0;
        }

        if (GameCfg.GAMEFUPAN) {
            //  this.rightNode && (this.rightNode.active = false);
            let tt = parseInt(GameCfg.history.allRate * 10000 + '') / 100;

            this.ALlRateLabel.string = (tt) + '%';
            if (tt > 0) {
                this.ALlRateLabel.node.color = cc.Color.RED;
            } else {
                this.ALlRateLabel.node.color = cc.Color.GREEN;
            }
            // btnMyspic.active = false;
            // statBtn.active = true;
        }
        colseBtn.active = false;

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
            if (GameCfg.GAMEFUPAN) {
                GameCfg.huizhidatas = 0;

                GameCfg.allRate = 0;
                GameCfg.profitCount = 0;
                GameCfg.lossCount = 0;
                GameCfg.finalfund = 0;
                //            GameCfg.GameType = null;
                GameCfg.GAMEFUPAN = false;
                cc.director.loadScene('hall');

            } else {
                PopupManager.LoadPopupBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {
                    GlobalEvent.emit(EventCfg.GAMEOVEER);
                })
            }
        } else if (name == 'backBtn') {
            GameCfg.huizhidatas = 0;

            GameCfg.allRate = 0;
            GameCfg.profitCount = 0;
            GameCfg.lossCount = 0;
            GameCfg.finalfund = 0;
            //   GameCfg.GameType = null;
            GameCfg.GAMEFUPAN = false;
            cc.director.loadScene('hall');
        }
        else if (name == 'btnMyspic') {
            GlobalEvent.emit(EventCfg.MYSPICCLICK);
        }

        else if (name == 'sys_back') {
            if (GameCfg.GAMEFUPAN) {
                GameCfg.huizhidatas = 0;

                GameCfg.allRate = 0;
                GameCfg.profitCount = 0;
                GameCfg.lossCount = 0;
                GameCfg.finalfund = 0;
                //      GameCfg.GameType = null;
                GameCfg.GAMEFUPAN = false;
                cc.director.loadScene('hall');

            } else {
                PopupManager.LoadPopupBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {
                    GlobalEvent.emit(EventCfg.GAMEOVEER);

                })
            }
        }

        else if (name == 'statBtn') {
            GlobalEvent.emit(EventCfg.OPENSTATLAYER);
        }

    }
}
