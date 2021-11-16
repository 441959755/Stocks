import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import PopupManager from "../Utils/PopupManager";
import GameCfg from "./GameCfg";
import { pb } from '../../protos/proto';
import GameData from '../GameData';
import GlobalHandle from "../global/GlobalHandle";
import ComUtils from "../Utils/ComUtils";

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

    @property(cc.Node)
    pkfupan1: cc.Node = null;

    @property(cc.Node)
    pkNode: cc.Node = null;

    @property(cc.Label)
    pkAllRateLa1: cc.Label = null;

    @property(cc.Label)
    pkCurRatela1: cc.Label = null;

    @property(cc.Sprite)
    head1: cc.Sprite = null;

    @property(cc.Label)
    name1: cc.Label = null;

    @property(cc.Label)
    level1: cc.Label = null;

    @property(cc.Label)
    pkAllRateLa2: cc.Label = null;

    @property(cc.Sprite)
    head2: cc.Sprite = null;

    @property(cc.Label)
    name2: cc.Label = null;

    @property(cc.Label)
    level2: cc.Label = null;

    @property(cc.Node)
    box1: cc.Node = null;

    @property(cc.Node)
    box2: cc.Node = null;

    @property(cc.Label)
    label5: cc.Label = null;

    @property(cc.Node)
    vipImg1: cc.Node = null;

    @property(cc.Node)
    vipImg2: cc.Node = null;

    @property(cc.Node)
    vipImg3: cc.Node = null;

    protected onLoad() {
        //跟新盈利率
        GlobalEvent.on(EventCfg.UPDATERATE, this.UpdateRate.bind(this), this);

        //跟新其他玩家盈利率
        GlobalEvent.on(EventCfg.UPDATEOTHERRATE, this.UpdateOtherRate.bind(this), this);

        //复盘
        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onShowGANEFUPAN.bind(this), this);

        //pk复盘
        GlobalEvent.on(EventCfg.CUTGAMEFUPAN, this.onShowPKFUPAN.bind(this), this);
    }

    UpdateOtherRate(rate) {
        this.pkAllRateLa2.string = rate + '%';
        if (rate > 0) {
            this.pkAllRateLa2.node.color = new cc.Color().fromHEX('#e94343');
        }
        else {
            this.pkAllRateLa2.node.color = new cc.Color().fromHEX('#31a633');
        }
    }

    onDisable() {
        this.currRateLabel.node.color = cc.Color.WHITE;
        this.pkCurRatela1.node.color = cc.Color.WHITE;
        this.ALlRateLabel.node.color = cc.Color.WHITE;
        this.pkAllRateLa1.node.color = cc.Color.WHITE;
        this.currRateLabel.string = '0.00%';
        this.pkCurRatela1.string = '0.00%';
        this.ALlRateLabel.string = '0.00%';
        this.pkAllRateLa1.string = '0.00%';
        this.pkfupan1.active = false;
        this.pkNode.active = false;
        this.box1.active = false;
        this.box2.active = false;
        this.label5.string = '';
    }

    UpdateRate(data) {
        if (data.length >= 2) {
            if (data[1] > 0) {
                this.ALlRateLabel.node.color = new cc.Color().fromHEX('#e94343');
                this.currRateLabel.node.color = cc.Color.WHITE;

                this.pkAllRateLa1.node.color = new cc.Color().fromHEX('#e94343');
                this.pkCurRatela1.node.color = cc.Color.WHITE;
            } else {
                this.ALlRateLabel.node.color = new cc.Color().fromHEX('#31a633');
                this.currRateLabel.node.color = cc.Color.WHITE;

                this.pkAllRateLa1.node.color = new cc.Color().fromHEX('#31a633');
                this.pkCurRatela1.node.color = cc.Color.WHITE;
            }
            data[1] && (this.ALlRateLabel.string = (parseInt(data[1] * 10000 + '') / 100).toFixed(2) + '%');
            data[1] && (this.pkAllRateLa1.string = (parseInt(data[1] * 10000 + '') / 100).toFixed(2) + '%');
            this.currRateLabel.string = '0.00%';
            this.pkCurRatela1.string = '0.00%';
        } else {
            if (data[0] >= 0) {
                this.currRateLabel.node.color = new cc.Color().fromHEX('#e94343');

                this.pkCurRatela1.node.color = new cc.Color().fromHEX('#e94343');
            } else {
                this.currRateLabel.node.color = new cc.Color().fromHEX('#31a633');

                this.pkCurRatela1.node.color = new cc.Color().fromHEX('#31a633');
            }
            data[0] && (this.currRateLabel.string = (parseInt(data[0] * 10000 + '') / 100).toFixed(2) + '%');
            data[0] && (this.pkCurRatela1.string = (parseInt(data[0] * 10000 + '') / 100).toFixed(2) + '%');
        }
    }

    onShowPKFUPAN(status) {
        status = Math.abs(status);
        this.pkfupan1.active = false;
        this.pkNode.active = false;
        if (status == 3) {
            this.pkNode.active = true;
            this.name1.string = GameData.userName;
            if (GameData.Players[1].nickname || GameData.Players[1].nick) {
                this.name2.string = GameData.Players[1].nickname || GameData.Players[1].nick;
                this.level2.string = 'LV: ' + GameData.Players[1].properties[pb.GamePropertyId.Level];
            } else {
                this.name2.string = GameCfg.RoomGameData.players[1].gd.nickname;
                this.level2.string = 'LV: ' + GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level];
            }
            this.level1.string = 'LV: ' + GameData.properties[pb.GamePropertyId.Level];
            this.head1.spriteFrame = GameData.headImg;

            if (GameData.Players[1].icon) {
                this.head2.spriteFrame = GameData.Players[1].icon;
            }


            this.box1.active = true;
            this.box2.active = true;
            let userProfitRate1;

            userProfitRate1 = GameCfg.RoomGameData.players[0].result.userProfitRate || 0;

            let userProfitRate2 = GameCfg.RoomGameData.players[1].result.userProfitRate || 0;

            this.pkAllRateLa1.string = ComUtils.changeTwoDecimal(userProfitRate1) + '%';

            this.pkAllRateLa2.string = ComUtils.changeTwoDecimal(userProfitRate2) + '%';

            if (userProfitRate1 > 0) {
                this.pkAllRateLa1.node.color = new cc.Color().fromHEX('#e94343');
            } else {
                this.pkAllRateLa1.node.color = new cc.Color().fromHEX('#31a633');
            }

            if (userProfitRate2 > 0) {
                this.pkAllRateLa2.node.color = new cc.Color().fromHEX('#e94343');
            }
            else {
                this.pkAllRateLa2.node.color = new cc.Color().fromHEX('#31a633');
            }
        }
        else {

            this.pkfupan1.active = true;

            let name = this.pkfupan1.getChildByName('name').getComponent(cc.Label);

            let head = this.pkfupan1.getChildByName('head').getComponent(cc.Sprite);

            let rate = this.pkfupan1.getChildByName('rate').getChildByName('label2').getComponent(cc.Label);

            let result = this.pkfupan1.getChildByName('rate').getChildByName('label4').getComponent(cc.Label);
            if (status == 1) {
                head.spriteFrame = GameData.headImg;
                name.string = '昵称：' + GameData.userName;

                if (GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
                    this.vipImg3.active = true;
                }
                else {
                    this.vipImg3.active = false;
                }
            }
            else {
                if (GameData.Players[1].icon) {
                    head.spriteFrame = GameData.Players[1].icon;
                }
                if (GameData.Players[1].uid || GameData.Players[1].nickname) {
                    name.string = '昵称：' + (GameData.Players[1].nickname || GameData.Players[1].nick);

                    if (GameData.Players[1].properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
                        this.vipImg3.active = true;
                    }
                    else {
                        this.vipImg3.active = false;
                    }
                } else {
                    name.string = '昵称：' + GameCfg.RoomGameData.players[status - 1].gd.nickname;
                }


            }

            let r, rank;

            if (GameCfg.GAMEFUPANDATA) {

                r = GameCfg.GAMEFUPANDATA.userProfitRate || 0.00;
                rank = GameCfg.GAMEFUPANDATA.rank;

            }
            else if (GameCfg.RoomGameData) {

                r = GameCfg.RoomGameData.players[status - 1].result.userProfitRate;
                rank = GameCfg.RoomGameData.players[status - 1].result.rank;
            }

            if (r > 0) {
                rate.node.color = new cc.Color().fromHEX('#e94343');
            }
            else {
                rate.node.color = new cc.Color().fromHEX('#31a633');
            }

            rate.string = ComUtils.changeTwoDecimal(r) + '%';

            if (rank == 1) {
                result.string = '胜利';
            }
            else {
                result.string = '失败';
            }
        }
    }

    onShowGANEFUPAN(str?) {
        if (!GameCfg.GAMEFUPAN) { return }
        //z中止训练
        let colseBtn = this.rightNode.getChildByName('closeBtn');

        //切换指数
        let btnMyspic = this.rightNode.getChildByName('btnMyspic');
        btnMyspic.active = false;
        //数据统计
        let statBtn = this.rightNode.getChildByName('statBtn');
        statBtn.active = false;

        colseBtn.active = false;
        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            statBtn.active = false;
        }
        else if (GameCfg.GameType == pb.GameType.DingXiang) {
            statBtn.active = true;
        }
        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            statBtn.active = true;
        }

    }

    protected onEnable() {

        this.pkNode.active = false;
        //z中止训练
        let colseBtn = this.rightNode.getChildByName('closeBtn');

        //切换指数
        let btnMyspic = this.rightNode.getChildByName('btnMyspic');

        //数据统计
        let statBtn = this.rightNode.getChildByName('statBtn');
        this.node.height = 100;
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

            this.GameName.string = '';
            if (!GameCfg.JJ_XUNLIAN) {
                this.GameName.string = '定向训练';
            }

            btnMyspic.active = true;
            statBtn.active = false;
        } else if (GameCfg.GameType == pb.GameType.QiHuo) {
            this.GameName.string = '期货训练';

            btnMyspic.active = false;
            statBtn.active = false;

            this.node.height = 70;
            let la = this.node.getChildByName('rate');
            la.x = 0;
        }

        else if (GameCfg.GameType == pb.GameType.JJ_PK
            || GameCfg.GameType == pb.GameType.JJ_DuoKong
            || GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {

            this.GameName.string = '';

            this.rightNode.active = false;
            let la = this.node.getChildByName('rate');
            la.x = 0;

            if (GameCfg.JJ_XUNLIAN) {
                btnMyspic.active = false;
                statBtn.active = false;
            } else {
                this.pkNode.active = true;
                //自己的信息
                {
                    this.head1.spriteFrame = GameData.headImg;
                    this.name1.string = GameData.userName;
                    this.level1.string = 'LV:' + GameData.properties[pb.GamePropertyId.Level];

                    if (GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
                        this.vipImg1.active = true;
                    }
                    else {
                        this.vipImg1.active = false;
                    }
                }
                //其他人
                {
                    if (GameData.Players[1]) {
                        this.head2.spriteFrame = null;
                        if (GameData.Players[1].icon) {
                            this.head2.spriteFrame = GameData.Players[1].icon;
                        }
                        this.name2.string = GameData.Players[1].nickname;
                        GameData.Players[1].properties && (this.level2.string = 'LV：' + (GameData.Players[1].properties[pb.GamePropertyId.Level] || 1));
                        // this.pkAllRateLa2.string = "****";

                        if (GameData.Players[1].properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
                            this.vipImg2.active = true;
                        }
                        else {
                            this.vipImg2.active = false;
                        }
                    }
                }
            }
        }

        this.onShowGANEFUPAN();

        if (GameCfg.GAMEFUPAN) {
            if (GameCfg.GameType == pb.GameType.JJ_PK ||
                GameCfg.GameType == pb.GameType.JJ_DuoKong ||
                GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {

                if (GameData.Players[1]) {
                    this.onShowPKFUPAN(2)
                } else {
                    this.onShowPKFUPAN(1)
                }
            }
        }

        colseBtn.active = false;
    }

    protected onDestroy() {
        GlobalEvent.off(EventCfg.UPDATERATE);
        GlobalEvent.off(EventCfg.GAMEFUPAN);
        GlobalEvent.off(EventCfg.CUTGAMEFUPAN);
        GlobalEvent.off(EventCfg.UPDATEOTHERRATE);
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
                if (GameCfg.GameType == pb.GameType.JJ_PK ||
                    GameCfg.GameType == pb.GameType.JJ_DuoKong ||
                    GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {

                    let str;
                    if (GameCfg.GAMEWAIT) {
                        str = '您的成绩已出，现在退出无任何影响。稍后记得在奖励中心领取奖励。';
                    }
                    else {
                        str = '您正在比赛中，现在退出会被认定为逃跑用户，请确认在退出';
                    }

                    PopupManager.LoadTipsBox('tipsBox', str, () => {

                        GameCfg.allRate = 0;
                        GameCfg.finalfund = 0;
                        GameCfg.GAMEFUPAN = false;
                        GameCfg.RoomGameData = null;

                        if (!GameCfg.GAMEWAIT) {
                            GlobalHandle.onReqRoomLeave();
                        }

                        if (!GameData.RoomType) {
                            GameData.selfEnterRoomData = null;
                            GameData.roomId = null;
                        }

                        this.roomLeave();
                    })
                }
                else {
                    if (GameCfg.JJ_XUNLIAN) {

                        GlobalEvent.emit(EventCfg.GAMEOVEER);

                    } else {

                        PopupManager.LoadTipsBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {

                            GlobalEvent.emit(EventCfg.GAMEOVEER);

                        })
                    }
                }
            } else {
                if (GameCfg.GameType == pb.GameType.JJ_PK ||
                    GameCfg.GameType == pb.GameType.JJ_DuoKong ||
                    GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {
                    if (GameCfg.GAMEFUPANDATA) {
                        GameCfg.GameType = null;
                        this.onBlackHAll();
                    }
                    else {
                        GlobalEvent.emit(EventCfg.GAMEOVEER);
                    }

                } else {
                    this.onBlackHAll();
                }
            }
        }
        else if (name == 'btnMyspic') {
            GlobalEvent.emit(EventCfg.MYSPICCLICK);
        }

        else if (name == 'statBtn') {
            GlobalEvent.emit(EventCfg.OPENSTATLAYER);
        }

        else if (name == 'otherPlayerNode') {
            console.log(GameData.Players[1]);

            GlobalEvent.emit(EventCfg.OPENOTHERPLAYERINFO, GameData.Players[1]);
        }
    }

    onBlackHAll() {

        GameCfg.allRate = 0;
        GameCfg.finalfund = 0;
        GameCfg.GAMEFUPAN = false;

        if (!GameData.RoomType) {
            GameCfg.RoomGameData = null;
        }

        GlobalEvent.emit(EventCfg.LEAVEGAME);
    }

    //进游戏逃跑
    roomLeave() {

        if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {
            let gpData = GameCfg.data[0].data;
            let datas = {
                uid: GameData.userID,
                gType: GameCfg.GameType,
                quotesCode: GameCfg.data[0].code,
                kType: GameCfg.data[0].ktype,
                kFrom: parseInt(ComUtils.fromatTime1(gpData[GameData.huizhidatas - 1].day)),
                kTo: parseInt(ComUtils.fromatTime1(gpData[GameCfg.huizhidatas - 1].day)),
                stockProfitRate: ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[GameData.huizhidatas - 1].close * 100),
                userProfitRate: (GameCfg.allRate),
                ts: parseInt(new Date().getTime() / 1000 + ''),
                rank: 2,
                refId: 0,
                kStartup: GameData.huizhidatas - 1,
                kStop: GameCfg.huizhidatas - 1,
            }

            let CmdGameOver = {
                result: datas,
            }
            GlobalHandle.onCmdGameOverReq(CmdGameOver);
        }

        //离开游戏
        GlobalEvent.emit(EventCfg.LEAVEGAME, 1);

    }


}
