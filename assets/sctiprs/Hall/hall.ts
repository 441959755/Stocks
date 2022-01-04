import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto';
import StrategyAIData from '../game/StrategyAIData';
import GameData from '../GameData';
import LoadUtils from '../Utils/LoadUtils';
import PopupManager from '../Utils/PopupManager';
import UpGameOpt from '../global/UpGameOpt';
import ComUtils from '../Utils/ComUtils';
import GlobalHandle from '../global/GlobalHandle';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    broadcast: cc.Node = null; //广播

    InviteBox: cc.Node = null;

    sysBroadcast: cc.Node = null;  //xt

    @property(cc.Node)
    rightbg: cc.Node = null;

    gameLayer: cc.Node = null;

    finalLayer = []; //结算界面

    index = 0;

    url = null;

    isLoading = false;

    firstBox = null;

    gobrokeBox = null;

    Matchfalg = false;

    onLoad() {

        PopupManager.init();

        GlobalEvent.on(EventCfg.INVITEMESSAGE, this.openBroadcast.bind(this), this);

        GlobalEvent.on(EventCfg.ROOMLEAVE, this.onRoomLeave.bind(this), this);

        //打开帮助
        GlobalEvent.on(EventCfg.OPENHELPLAYER, this.openHelpLayer.bind(this), this);

        //打开个人中心
        GlobalEvent.on(EventCfg.OPENPLAYERINFO, this.openPlayerInfoLayer.bind(this), this);


        //邀请好友
        GlobalEvent.on('OPENFRIENDINVITE', this.openFriendInvite.bind(this), this);

        GlobalEvent.on(EventCfg.OPENOTHERPLAYERHISLAYER, this.openOtherHisLayer.bind(this), this);



        GlobalEvent.on('LOADGAME', this.onLoadGame.bind(this), this);

        GlobalEvent.on(EventCfg.LEAVEGAME, this.leaveGame.bind(this), this);

        GlobalEvent.on(EventCfg.GAMEOVEER, this.GameOver.bind(this), this)



        GlobalEvent.on('OPENUNLOCKBOX', this.openUnlockBox.bind(this), this);

        //打开每周豪礼
        GlobalEvent.on('OPENWEEKLYHAOLI', this.openWeeklyHaoLi.bind(this), this);

        //打开7天奖励
        GlobalEvent.on('OPENSIGNIN', this.openSignIn.bind(this), this);

        //匹配界面不弹窗邀请框
        GlobalEvent.on('HALLPKMATCH', (flag) => {
            this.Matchfalg = flag;
            if (flag) {
                this.broadcast && (this.broadcast.active = false);
                this.InviteBox && (this.InviteBox.active = false);
            }
        }, this);

        ComUtils.resetSize(this.node);
    }

    start() {

        GlobalHandle.getActivity();

        //断线重连 或游戏后进入房间
        if (GameData.selfEnterRoomData) {

            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            GameCfg.GameSet = GameData.JJPKSet;

            GameCfg.GameType = pb.GameType.JJ_PK;

            GlobalEvent.emit(EventCfg.RoomGameDataSelf, GameData.selfEnterRoomData);

            GameData.roomId = GameData.selfEnterRoomData.id;

            if (!GameData.RoomType) {

                GameCfg.GAMEFRTD = true;

                setTimeout(() => {
                    GlobalEvent.emit('LOADGAME');
                }, 800)
            }
        }

        //房间已解散  ,给出提示
        if (GameData.RoomType && !GameData.roomId) {
            GameData.RoomType = 0;
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            setTimeout(() => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '房间已解散！');
            }, 200)
        }
        //进入房间

        else if (GameData.roomId) {
            GlobalEvent.emit(EventCfg.OPENROOM);
        }

        GlobalEvent.emit('getRewardCenter');

        this.onShow();
    }

    onShow() {
        if (GameData.firstGame) {
            GameData.firstGame = false;
            this.showFirstBox();
        }
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.OPENPLAYERINFO);
        GlobalEvent.off(EventCfg.OPENHELPLAYER);
        GlobalEvent.off(EventCfg.ROOMLEAVE);
        GlobalEvent.off(EventCfg.INVITEMESSAGE);
        GlobalEvent.off(EventCfg.OPENOTHERPLAYERHISLAYER);
        GlobalEvent.off(EventCfg.GAMEOVEER);

        GlobalEvent.off('OPENFRIENDINVITE');

        GlobalEvent.off('LOADGAME');

        GlobalEvent.off('OPENUNLOCKBOX');
        GlobalEvent.off('OPENWEEKLYHAOLI');
        GlobalEvent.off('OPENSIGNIN');
        ComUtils.onDestory();
        PopupManager.delPopupNode();
        GameData.selfEnterRoomData = null;
    }

    //打开解锁框
    openUnlockBox(falg) {
        PopupManager.openNode(this.node, null, 'Prefabs/unlockBox', 22, (node) => {
            node.getComponent('UnlockBox').oninit(falg);
        });
    }

    //首次登入弹框
    showFirstBox() {
        return;
        // this.openNode(this.firstBox, 'Prefabs/pop/firstBox', 99, (node) => {
        //     this.firstBox = node;
        //     GlobalEvent.emit(EventCfg.LOADINGHIDE);
        // });
    }

    onShowGobroke() {
        PopupManager.openNode(this.node, null, 'Prefabs/pop/gobrokeBox', 48, null);
    }





    openFriendInvite() {
        PopupManager.openNode(this.node, null, 'Prefabs/friendInvite', 11, null);
    }



    openWeeklyHaoLi() {
        PopupManager.openNode(this.node, null, 'Prefabs/fl/weeklyHaoLI', 10, null);
    }

    openSignIn() {
        PopupManager.openNode(this.node, null, 'Prefabs/fl/signIn', 10, null);
    }


    openOtherHisLayer(data) {
        PopupManager.openNode(this.node, null, 'Prefabs/otherPlayerHisInfo', 12, (node) => {
            node.getComponent('OtherPlayerHisInfo').playeInfo = data;
            node.getComponent('OtherPlayerHisInfo').onShow();
        })
    }


    //打开个人中心
    openPlayerInfoLayer() {
        PopupManager.openNode(this.rightbg, null, 'Prefabs/playeInfo/playerInfoLayer', 5, null);
    }

    //帮组
    openHelpLayer() {
        PopupManager.openNode(this.node, null, 'Prefabs/helpLayer', 30, null);
    }

    //离开房间
    onRoomLeave(data) {
        //玩家对战房间解散提示
        if (data.uid == GameData.userID && GameData.RoomType) {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '房间已解散！');
        }
    }

    openBroadcast(data) {
        //不包括自己
        if (data.sender) {
            if (data.sender == GameData.userID) {
                return;
            }
        }

        if (GameData.roomId) {
            return
        }

        console.log('邀请信息：' + JSON.stringify(data));

        if (data.text.length <= 1) {
            return;
        }

        let arr = data.text.split(',');

        if (data.type == pb.MessageType.RoomInvite && (!this.gameLayer || !this.gameLayer.active) && !this.Matchfalg) {

            if (arr[3] != 0) {
                PopupManager.openNode(this.node, this.broadcast, 'Prefabs/broadcast', 98, (node) => {
                    this.broadcast = node;
                    let handle = this.broadcast.getComponent('Broadcast');
                    handle.onShow(data);
                })
            } else {
                this.onShowInviteBox(data);
            }
        } else if (data.type == pb.MessageType.SystemNotice) {
            GameData.SysBroadcastList.push(data.text);
            PopupManager.openNode(this.node, this.sysBroadcast, 'Prefabs/sysBroadcast', 99, (node) => {
                this.sysBroadcast = node;
                this.sysBroadcast.getComponent('SysBroadcast').onShowSysBroadcast(data.text);
            })
        }
    }

    //邀请框
    onShowInviteBox(data) {

        PopupManager.openNode(this.node, this.InviteBox, 'Prefabs/inviteBox', 98, (node) => {
            this.InviteBox = node;
            let headle = this.InviteBox.getComponent('InviteBox');
            headle.onInviteShow(data);
        })
    }


    //加载游戏进入
    onLoadGame() {
        this.broadcast && (this.broadcast.active = false);
        this.InviteBox && (this.InviteBox.active = false);

        PopupManager.openNode(this.node, this.gameLayer, 'Prefabs/game/gameLayer', 50, (node) => {
            this.gameLayer = node;
            this.onLoadFinalLayer();
        })
    }

    //加载结算页
    onLoadFinalLayer() {

        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        if (GameCfg.GameType == pb.GameType.ShuangMang ||
            GameCfg.GameType == pb.GameType.ZhiBiao ||
            GameCfg.GameType == pb.GameType.DingXiang ||
            GameCfg.GameType == pb.GameType.QiHuo ||
            GameCfg.GameType == pb.GameType.FenShi) {
            this.url = 'Prefabs/game/finalLayer';
            this.index = 0;
        } else if (GameCfg.GameType == pb.GameType.TiaoJianDan) {
            this.url = 'Prefabs/game/TjdFinalLayer';
            this.index = 1;
        } else if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan && !GameCfg.JJ_XUNLIAN) {
            this.url = 'Prefabs/game/CGSFinalLayer';
            this.index = 2;
        } else if (GameCfg.GameType == pb.GameType.JJ_DuoKong ||
            GameCfg.GameType == pb.GameType.JJ_PK) {
            this.url = 'Prefabs/game/PKFinalLayer';
            this.index = 3;
        } else if (GameCfg.JJ_XUNLIAN) {
            this.url = 'Prefabs/game/lxFinalLayer';
            this.index = 4;
        }

        PopupManager.openNode(this.node, this.finalLayer[this.index], this.url, 51, (node) => {
            this.finalLayer[this.index] = node;
            this.finalLayer[this.index].active = false;
        })

    }

    //离开游戏
    leaveGame() {

        GameCfg.beg_end[0] = 0;

        GameCfg.beg_end[1] = 0;

        GlobalEvent.emit(EventCfg.FILLNODEISSHOW, true);

        UpGameOpt.clearGameOpt();

        this.gameLayer && (this.gameLayer.active = false)

        this.finalLayer[this.index] && (this.finalLayer[this.index].active = false);

        GameCfg.fill = [];

        GameCfg.mark = [];

        GameCfg.notice = [];

        GameCfg.allRate = 0;

        GameCfg.blockHistoy = [];

        GameCfg.finalfund = 0;

        GameCfg.GAMEFUPAN = false;

        GameCfg.GAMEWAIT = false;

        GameCfg.JJ_XUNLIAN = false;

        StrategyAIData.onClearData();

        GameCfg.GAMEFUPANDATA = null;

        GameCfg.RoomGameData = null;

        //跟新闯关赛数据
        GlobalEvent.emit('UPDATEGAMEDATE');

        setTimeout(() => {
            //跟新获取的奖励消息
            GlobalEvent.emit('getRewardCenter');

            //破产补助
            if (GameData.properties[pb.GamePropertyId.Gold] < 1000) {
                this.onShowGobroke();
            }

        }, 500);
    }

    //游戏结束
    GameOver(flag) {

        if (!this.gameLayer || !this.gameLayer.active || flag) {
            return
        }

        setTimeout(() => {
            if (GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) {

                if (GameCfg.RoomGameData) {
                    let handle = this.finalLayer[this.index].getComponent('PKFinalHandle');
                    handle.onShow();
                }

                this.finalLayer[this.index].active = true;
            } else if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan && !GameCfg.JJ_XUNLIAN) {

                this.finalLayer[this.index].getComponent('CGSFinalHandle').onShow();

                this.finalLayer[this.index].active = true;
            } else {
                if (GameCfg.JJ_XUNLIAN) {

                    this.finalLayer[this.index].getComponent('LXFinalandle').onShow();

                    this.finalLayer[this.index].active = true;
                } else {
                    this.finalLayer[this.index].getComponent('FinalHandle').onShow();

                    this.finalLayer[this.index].active = true;
                }
            }
        }, 50)

    }
}

