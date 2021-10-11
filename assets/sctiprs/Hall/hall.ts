import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto';
import GlobalHandle from '../global/GlobalHandle';
import StrategyAIData from '../game/StrategyAIData';
import GameData from '../GameData';
import LoadUtils from '../Utils/LoadUtils';
import { LocationPoint } from '../global/LocationPoint';
import PopupManager from '../Utils/PopupManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	helpLayer: cc.Node = null;

	playerInfoLayer: cc.Node = null;

	broadcast: cc.Node = null; //广播

	InviteBox: cc.Node = null;

	rewardCenterNode: cc.Node = null;

	noticeLayer: cc.Node = null;  //公告

	friendLayer: cc.Node = null;   //好友

	taskLayer: cc.Node = null;  //任务

	friendInvite: cc.Node = null;  //邀请好友

	rankingList: cc.Node = null;  //排行榜

	otherHis: cc.Node = null;

	@property(cc.Node)
	rightbg: cc.Node = null;

	gameLayer: cc.Node = null;

	isLoading = false;

	finalLayer = []; //结算界面

	index = 0;

	url = null;

	onLoad() {
		PopupManager.init();

		GlobalEvent.on(EventCfg.CmdQuoteQueryFuture, this.onCmdQHGameStart.bind(this), this);

		GlobalEvent.on(EventCfg.INVITEMESSAGE, this.openBroadcast.bind(this), this);

		GlobalEvent.on(EventCfg.ROOMLEAVE, this.onRoomLeave.bind(this), this);
		//打开帮助
		GlobalEvent.on(EventCfg.OPENHELPLAYER, this.openHelpLayer.bind(this), this);
		//打开个人中心
		GlobalEvent.on(EventCfg.OPENPLAYERINFO, this.openPlayerInfoLayer.bind(this), this);

		GlobalEvent.on(EventCfg.OPENREWARDCENTERLAYER, this.openRewardCenterLayer.bind(this), this);

		//打开公告
		GlobalEvent.on('OPENNOTICELAYER', this.openNoticelayer.bind(this), this);

		//好友
		GlobalEvent.on('OPENFRIENDLAYER', this.openFriendLayer.bind(this), this);

		//任务
		GlobalEvent.on('OPENTASKLAYER', this.openTaskLayer.bind(this), this);

		//邀请好友
		GlobalEvent.on('OPENFRIENDINVITE', this.openFriendInvite.bind(this), this);

		GlobalEvent.on(EventCfg.OPENOTHERPLAYERHISLAYER, this.openOtherHisLayer.bind(this), this);

		//打开排行榜
		GlobalEvent.on('OPENRANKINGLIST', this.openRankingList.bind(this), this);

		GlobalEvent.on('LOADGAME', this.onLoadGame.bind(this), this);

		GlobalEvent.on(EventCfg.LEAVEGAME, this.leaveGame.bind(this), this);

	}

	onDestroy() {
		GlobalEvent.off(EventCfg.OPENPLAYERINFO);
		GlobalEvent.off(EventCfg.OPENHELPLAYER);
		GlobalEvent.off(EventCfg.ROOMLEAVE);
		GlobalEvent.off(EventCfg.INVITEMESSAGE);
		GlobalEvent.off(EventCfg.CmdQuoteQueryFuture);
		GlobalEvent.off(EventCfg.OPENREWARDCENTERLAYER);
		GlobalEvent.off(EventCfg.OPENOTHERPLAYERHISLAYER);
		GlobalEvent.off('OPENNOTICELAYER');
		GlobalEvent.off('OPENFRIENDLAYER');
		GlobalEvent.off('OPENTASKLAYER');
		GlobalEvent.off('OPENFRIENDINVITE');
		GlobalEvent.off('OPENRANKINGLIST');
		GlobalEvent.off('LOADGAME');
		LoadUtils.releaseRes('Prefabs/broadcast');
		LoadUtils.releaseRes('Prefabs/playeInfo/playerInfoLayer');
		LoadUtils.releaseRes('Prefabs/helpLayer');
		LoadUtils.releaseRes('Prefabs/inviteBox');
		LoadUtils.releaseRes('Prefabs/RewardCenter/rewardCenter');
		LoadUtils.releaseRes('Prefabs/otherPlayerHisInfo');
		LoadUtils.releaseRes('Prefabs/friendLayer');
		LoadUtils.releaseRes('Prefabs/friendInvite');
		LoadUtils.releaseRes('Prefabs/game/gameLayer');
		GlobalEvent.off(EventCfg.GAMEOVEER);
		PopupManager.delPopupNode();
		GameData.selfEnterRoomData = null;
		LoadUtils.releaseRes(this.url);
	}

	openRankingList() {
		this.openNode(this.rankingList, 'Prefabs/rankingList', 10, (node) => { this.rankingList = node });
	}


	openFriendInvite() {
		this.openNode(this.friendInvite, 'Prefabs/friendInvite', 11, (node) => { this.friendInvite = node });
	}

	//打开公告
	openNoticelayer() {
		this.openNode(this.noticeLayer, 'Prefabs/noticeLayer', 10, (node) => { this.noticeLayer = node });
	}

	//好友
	openFriendLayer() {
		this.openNode(this.friendLayer, 'Prefabs/friendLayer', 10, (node) => { this.friendLayer = node });
	}

	openTaskLayer() {
		this.openNode(this.taskLayer, 'Prefabs/taskLayer', 10, (node) => { this.taskLayer = node });
	}


	openOtherHisLayer(data) {
		this.openNode(this.otherHis, 'Prefabs/otherPlayerHisInfo', 12, (node) => {
			this.otherHis = node;
			this.otherHis.getComponent('OtherPlayerHisInfo').playeInfo = data;
			this.otherHis.getComponent('OtherPlayerHisInfo').onShow();
		});
	}

	/**
	 * 奖励中心
	 */
	openRewardCenterLayer(data) {
		this.openNode(this.rewardCenterNode, 'Prefabs/RewardCenter/rewardCenter', 12, (node) => {
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
			this.rewardCenterNode = node;
			this.node.addChild(this.rewardCenterNode);
			this.rewardCenterNode.active = true;
			let handle = this.rewardCenterNode.getComponent('RewardCenter');
			if (handle) {
				handle.rewardData = data;
				handle.onShow();
			}
		});
	}

	//打开个人中心
	openPlayerInfoLayer() {
		if (!this.playerInfoLayer) {
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			LoadUtils.loadRes('Prefabs/playeInfo/playerInfoLayer', pre => {
				GlobalEvent.emit(EventCfg.LOADINGHIDE);
				this.playerInfoLayer = cc.instantiate(pre);
				this.rightbg.addChild(this.playerInfoLayer);
				this.playerInfoLayer.active = true;
			})
		}
		else {
			this.playerInfoLayer.active = true;
		}
	}

	//帮组
	openHelpLayer() {
		if (!this.helpLayer) {
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			LoadUtils.loadRes('Prefabs/helpLayer', pre => {
				GlobalEvent.emit(EventCfg.LOADINGHIDE);
				this.helpLayer = cc.instantiate(pre);
				this.node.addChild(this.helpLayer, 30);
				this.helpLayer.active = true;
			})
		}
		else {
			this.helpLayer.active = true;
		}
	}

	//离开房间
	onRoomLeave(data) {
		//玩家对战房间解散提示
		if (data.uid == GameData.userID && GameData.RoomType) {
			GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '房间已解散！');
		}
	}

	start() {
		//断线重连 或游戏后进入房间
		if (GameData.selfEnterRoomData) {

			GlobalEvent.emit(EventCfg.LOADINGSHOW);

			GameCfg.GameSet = GameData.JJPKSet;

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

	}

	openBroadcast(data) {
		//不包括自己
		if (data.sender) {
			if (data.sender == GameData.userID) {
				return;
			}
		}
		console.log('邀请信息：' + JSON.stringify(data));

		if (data.text.length <= 1) {
			return;
		}

		if (!this.broadcast) {
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			LoadUtils.loadRes('Prefabs/broadcast', pre => {
				GlobalEvent.emit(EventCfg.LOADINGHIDE);
				this.broadcast = cc.instantiate(pre);
				this.node.addChild(this.broadcast, 98);
				let handle = this.broadcast.getComponent('Broadcast');
				handle.onShow(data);
			})
		}
		else {
			this.broadcast.active = true;
			let handle = this.broadcast.getComponent('Broadcast');
			handle.onShow(data);
		}
	}

	//邀请框
	onShowInviteBox(data) {
		if (!this.InviteBox) {
			LoadUtils.loadRes('Prefabs/inviteBox', (res) => {
				this.InviteBox = cc.instantiate(res);
				this.node.addChild(this.InviteBox);
				let headle = this.InviteBox.getComponent('InviteBox');
				headle.onInviteShow(data);
			})
		}
		else {
			let headle = this.InviteBox.getComponent('InviteBox');
			headle.onInviteShow(data);
		}
	}

	//加载游戏进入
	onLoadGame() {
		//游戏结算
		this.openNode(this.gameLayer, 'Prefabs/game/gameLayer', 50, (node) => {
			this.gameLayer = node;
			GlobalEvent.on(EventCfg.GAMEOVEER, this.GameOver.bind(this), this)
			this.onLoadFinalLayer();
		});
	}

	//加载结算页
	onLoadFinalLayer() {
		console.log('加载结算页');
		GlobalEvent.emit(EventCfg.LOADINGSHOW);
		if (GameCfg.GameType == pb.GameType.ShuangMang ||
			GameCfg.GameType == pb.GameType.ZhiBiao ||
			GameCfg.GameType == pb.GameType.DingXiang ||
			GameCfg.GameType == pb.GameType.QiHuo ||
			GameCfg.GameType == pb.GameType.FenShi) {
			this.url = 'Prefabs/game/finalLayer';
			this.index = 0;
		}

		else if (GameCfg.GameType == pb.GameType.TiaoJianDan) {
			this.url = 'Prefabs/game/TjdFinalLayer';
			this.index = 1;
		}

		else if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan && !GameCfg.JJ_XUNLIAN) {
			this.url = 'Prefabs/game/CGSFinalLayer';
			this.index = 2;
		}

		else if (GameCfg.GameType == pb.GameType.JJ_DuoKong ||
			GameCfg.GameType == pb.GameType.JJ_PK) {
			this.url = 'Prefabs/game/PKFinalLayer';
			this.index = 3;
		}

		else if (GameCfg.JJ_XUNLIAN) {
			this.url = 'Prefabs/game/lxFinalLayer';
			this.index = 4;
		}

		this.openNode(this.finalLayer[this.index], this.url, 51, (node) => {
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
			this.finalLayer[this.index] = node;
			this.finalLayer[this.index].active = false;
		})

	}


	//离开游戏
	leaveGame() {
		this.gameLayer.destroy();
		this.gameLayer = null;
		this.finalLayer[this.index].active = false;
		GameCfg.fill = [];
		GameCfg.mark = [];
		GameCfg.notice = [];
		GameCfg.allRate = 0;
		GameCfg.blockHistoy = [];
		GameCfg.finalfund = 0;
		GameCfg.GAMEFUPAN = false;
		StrategyAIData.onClearData();
		GameCfg.GAMEFUPANDATA = null;
		//跟新闯关赛数据
		GlobalEvent.emit('UPDATEGAMEDATE');
	}

	//游戏结束
	GameOver(message) {

		this.finalLayer[this.index].active = true;

		if (GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) {

			if (message) {
				let handle = this.finalLayer[this.index].getComponent('PKFinalHandle');
				handle.onShow();
			}
		}
		else {
			setTimeout(() => {

				if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan && !GameCfg.JJ_XUNLIAN) {

					this.finalLayer[this.index].getComponent('CGSFinalHandle').onShow();
				}
				else {

					if (GameCfg.JJ_XUNLIAN) {

						this.finalLayer[this.index].getComponent('LXFinalandle').onShow();
					}
					else {

						this.finalLayer[this.index].getComponent('FinalHandle').onShow();
					}
				}
			}, 80)
		}
	}


	//期货进入游戏
	onCmdQHGameStart(data, cb) {

		GameCfg.data[0].data = [];
		//游戏开始
		GlobalHandle.onCmdGameStartReq(() => {
			//游戏行情获取
			GlobalHandle.onCmdGameStartQuoteQueryQH(data, cb);
		})

	}

	openNode(node, url, zIndex, call?) {
		if (!this.isLoading) {
			this.isLoading = true;
		}
		else {
			return;
		}
		if (!node) {
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			LoadUtils.loadRes(url, pre => {
				GlobalEvent.emit(EventCfg.LOADINGHIDE);
				node = cc.instantiate(pre);
				this.node.addChild(node, zIndex);
				node.active = true;
				this.isLoading = false;
				call(node);

			})
		}
		else {
			node.active = true;
			this.isLoading = false;
			call(node);
		}

	}

}
