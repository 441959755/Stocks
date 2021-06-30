import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import PopupManager from "../Utils/PopupManager";
import GameCfg from "./GameCfg";

import { pb } from '../../protos/proto';
import GameData from '../GameData';
import GlobalHandle from "../global/GlobalHandle";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    ALlRateLabel: cc.Label = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    @property(cc.Label)
    currRateLabel: cc.Label = null;


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
        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onShowGANEFUPAN.bind(this), this);
    }


    onShowGANEFUPAN() {
        if (!GameCfg.GAMEFUPAN) { return }
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
            btnMyspic.active = true;
            statBtn.active = true;
        }
        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            btnMyspic.active = false;
            statBtn.active = true;
        }
        else if (GameCfg.GameType == pb.GameType.JJ_PK) {
            btnMyspic.active = false;
            statBtn.active = false;

            this.tipsLabel.string = '结果：';
            this.currRateLabel.string = '胜利';
        }
    }

    protected onEnable() {

        //z中止训练
        let colseBtn = this.rightNode.getChildByName('closeBtn');

        //切换指数
        let btnMyspic = this.rightNode.getChildByName('btnMyspic');

        //数据统计
        let statBtn = this.rightNode.getChildByName('statBtn');

        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            this.GameName.string = '双盲训练';

            this.rightNode.active = false;

            let la = this.node.getChildByName('rate');
            la.x = 0;
        }
        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            this.GameName.string = '指标训练';

            btnMyspic.active = false;
            statBtn.active = false;
        }
        else if (GameCfg.GameType == pb.GameType.DingXiang) {
            this.GameName.string = '定向训练';

            btnMyspic.active = true;
            statBtn.active = false;
        } else if (GameCfg.GameType == pb.GameType.QiHuo) {
            this.GameName.string = '期货训练';

            btnMyspic.active = false;
            statBtn.active = false;

            this.node.height = 80;
            let la = this.node.getChildByName('rate');
            la.x = 0;
        }

        else if (GameCfg.GameType == pb.GameType.JJ_PK) {
            this.GameName.string = 'P K 大战';
            this.rightNode.active = false;
            let la = this.node.getChildByName('rate');
            la.x = 0;
        }

        this.onShowGANEFUPAN();

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
        else if (name == 'backBtn' || name == 'closeBtn' || name == 'sys_back') {
            if (!GameCfg.GAMEFUPAN) {
                if (GameCfg.GameType == pb.GameType.JJ_PK) {
                    PopupManager.LoadPopupBox('tipsBox', '您正在比赛中，现在退出会被认定为逃跑用户，请确认在退出', () => {
                        GlobalHandle.onReqRoomLeave();
                        GameCfg.huizhidatas = 0;
                        GameCfg.allRate = 0;
                        GameCfg.finalfund = 0;
                        GameCfg.GAMEFUPAN = false;
                        cc.director.loadScene('hall');
                    })
                }
                else {
                    PopupManager.LoadPopupBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {
                        GlobalEvent.emit(EventCfg.GAMEOVEER);
                    })
                }
            } else {
                GameCfg.huizhidatas = 0;
                GameCfg.allRate = 0;
                GameCfg.finalfund = 0;
                GameCfg.GAMEFUPAN = false;
                cc.director.loadScene('hall');
            }
        }
        else if (name == 'btnMyspic') {
            GlobalEvent.emit(EventCfg.MYSPICCLICK);
        }

        else if (name == 'statBtn') {
            GlobalEvent.emit(EventCfg.OPENSTATLAYER);
        }

    }
}
