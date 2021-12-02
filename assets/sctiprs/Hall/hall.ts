import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto';
import GlobalHandle from '../global/GlobalHandle';
import StrategyAIData from '../game/StrategyAIData';
import GameData from '../GameData';
import LoadUtils from '../Utils/LoadUtils';
import PopupManager from '../Utils/PopupManager';
import UpGameOpt from '../global/UpGameOpt';
import ComUtils from '../Utils/ComUtils';

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

	sysBroadcast: cc.Node = null;  //xt

	otherHis: cc.Node = null;

	shopLayer: cc.Node = null;  //商城

	unlockBox: cc.Node = null;  //解锁框

	weeklyHaoLi:cc.Node=null;   //每周豪礼

	signIn:cc.Node=null;        //7天奖励

	@property(cc.Node)
	rightbg: cc.Node = null;

	gameLayer: cc.Node = null;

	finalLayer = []; //结算界面

	index = 0;

	url = null;

	isLoading = false;

	firstBox = null;

	gobrokeBox = null;

	goldchange = false;

	Matchfalg = false;

	onLoad() {

		PopupManager.init();

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

		GlobalEvent.on(EventCfg.GAMEOVEER, this.GameOver.bind(this), this)

		//打开商城
		GlobalEvent.on('OPENSHOPLAYER', this.openShopLayer.bind(this), this);

		GlobalEvent.on('OPENUNLOCKBOX', this.openUnlockBox.bind(this), this);

		//打开每周豪礼
		GlobalEvent.on('OPENWEEKLYHAOLI',this.openWeeklyHaoLi.bind(this),this);

		//打开7天奖励
		GlobalEvent.on('OPENSIGNIN',this.openSignIn.bind(this),this);

		GlobalEvent.on(EventCfg.GOLDCHANGE, () => {
			this.goldchange = true;
		}, this);

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

		GlobalEvent.emit('getRewardCenter');
	}

	onEnable() {
		//自动弹窗
		PopupManager.autoPop();

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
		GlobalEvent.off(EventCfg.OPENREWARDCENTERLAYER);
		GlobalEvent.off(EventCfg.OPENOTHERPLAYERHISLAYER);
		GlobalEvent.off(EventCfg.GAMEOVEER);
		GlobalEvent.off(EventCfg.GOLDCHANGE);
		GlobalEvent.off('OPENNOTICELAYER');
		GlobalEvent.off('OPENFRIENDLAYER');
		GlobalEvent.off('OPENTASKLAYER');
		GlobalEvent.off('OPENFRIENDINVITE');
		GlobalEvent.off('OPENRANKINGLIST');
		GlobalEvent.off('LOADGAME');
		GlobalEvent.off('OPENSHOPLAYER');
		GlobalEvent.off('OPENUNLOCKBOX');
		GlobalEvent.off('OPENWEEKLYHAOLI');
		GlobalEvent.off('OPENSIGNIN');

		LoadUtils.releaseRes('Prefabs/broadcast');
		LoadUtils.releaseRes('Prefabs/playeInfo/playerInfoLayer');
		LoadUtils.releaseRes('Prefabs/helpLayer');
		LoadUtils.releaseRes('Prefabs/inviteBox');
		LoadUtils.releaseRes('Prefabs/RewardCenter/rewardCenter');
		LoadUtils.releaseRes('Prefabs/otherPlayerHisInfo');
		LoadUtils.releaseRes('Prefabs/friendLayer');
		LoadUtils.releaseRes('Prefabs/friendInvite');
		LoadUtils.releaseRes('Prefabs/game/gameLayer');
		LoadUtils.releaseRes('Prefabs/sysBroadcast');
		LoadUtils.releaseRes('Prefabs/shop/shop');
		LoadUtils.releaseRes('Prefabs/fl/weeklyHaoLI');
		LoadUtils.releaseRes('Prefabs/fl/signIn');
		LoadUtils.releaseRes(this.url);
		ComUtils.onDestory();
		PopupManager.delPopupNode();
		GameData.selfEnterRoomData = null;
	}

	//打开解锁框
	openUnlockBox(falg) {
		this.openNode(this.unlockBox, 'Prefabs/unlockBox', 22, (node) => {
			this.unlockBox = node;
			this.unlockBox.getComponent('UnlockBox').oninit(falg);
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	//首次登入弹框
	showFirstBox() {
		return;
		this.openNode(this.firstBox, 'Prefabs/pop/firstBox', 99, (node) => {
			this.firstBox = node;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	onShowGobroke() {
		this.openNode(this.gobrokeBox, 'Prefabs/pop/gobrokeBox', 48, (node) => {
			this.gobrokeBox = node;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	//打开商城
	openShopLayer(type) {
		this.openNode(this.shopLayer, 'Prefabs/shop/shop', 88, (node) => {
			this.shopLayer = node;
			if (type) {
				this.shopLayer.getComponent('ShopControl').onShow(type);
			}
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	openRankingList() {
		this.openNode(this.rankingList, 'Prefabs/rankingList', 10, (node) => {
			this.rankingList = node;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	openFriendInvite() {
		this.openNode(this.friendInvite, 'Prefabs/friendInvite', 11, (node) => {
			this.friendInvite = node;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	//打开公告
	openNoticelayer() {
		this.openNode(this.noticeLayer, 'Prefabs/noticeLayer', 10, (node) => {
			this.noticeLayer = node;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	openWeeklyHaoLi(){
		this.openNode(this.weeklyHaoLi,'Prefabs/fl/weeklyHaoLI',10,(node)=>{
			this.weeklyHaoLi=node;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		})
	}

	openSignIn(){
		this.openNode(this.signIn,'Prefabs/fl/signIn',10,(node)=>{
			this.signIn=node;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		})
	}

	//好友
	openFriendLayer() {
		this.openNode(this.friendLayer, 'Prefabs/friendLayer', 10, (node) => {
			this.friendLayer = node;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	openTaskLayer() {
		this.openNode(this.taskLayer, 'Prefabs/taskLayer', 10, (node) => {
			this.taskLayer = node;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	openOtherHisLayer(data) {
		this.openNode(this.otherHis, 'Prefabs/otherPlayerHisInfo', 12, (node) => {
			this.otherHis = node;
			this.otherHis.getComponent('OtherPlayerHisInfo').playeInfo = data;
			this.otherHis.getComponent('OtherPlayerHisInfo').onShow();
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
		});
	}

	/**
	 * 奖励中心
	 */
	openRewardCenterLayer(data) {
		this.openNode(this.rewardCenterNode, 'Prefabs/RewardCenter/rewardCenter', 12, (node) => {
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
			this.rewardCenterNode = node;
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

	openBroadcast(data) {
		//不包括自己
		if (data.sender) {
			if (data.sender == GameData.userID) {
				return;
			}
		}

		if (GameData.roomId) { return }

		console.log('邀请信息：' + JSON.stringify(data));

		if (data.text.length <= 1) {
			return;
		}

		let arr = data.text.split(',');

		if (data.type == pb.MessageType.RoomInvite && (!this.gameLayer || !this.gameLayer.active) && !this.Matchfalg) {

			if (arr[3] != 0) {
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
			else {
				this.onShowInviteBox(data);
			}
		}
		else if (data.type == pb.MessageType.SystemNotice) {
			GameData.SysBroadcastList.push(data.text);
			this.openNode(this.sysBroadcast, 'Prefabs/sysBroadcast', 99, (node) => {
				GlobalEvent.emit(EventCfg.LOADINGHIDE);
				this.sysBroadcast = node;
				this.sysBroadcast.active = true;
				this.sysBroadcast.getComponent('SysBroadcast').onShowSysBroadcast(data.text);
			});
		}
	}

	//邀请框
	onShowInviteBox(data) {
		if (!this.InviteBox) {
			LoadUtils.loadRes('Prefabs/inviteBox', (res) => {
				this.InviteBox = cc.instantiate(res);
				this.node.addChild(this.InviteBox, 98);
				let headle = this.InviteBox.getComponent('InviteBox');
				headle.onInviteShow(data);
			})
		}
		else {

			this.InviteBox.active = true;

			let headle = this.InviteBox.getComponent('InviteBox');
			headle.onInviteShow(data);
		}
	}

	//加载游戏进入
	onLoadGame() {
		this.broadcast && (this.broadcast.active = false);
		this.InviteBox && (this.InviteBox.active = false);
		//游戏结算
		this.openNode(this.gameLayer, 'Prefabs/game/gameLayer', 50, (node) => {
			this.gameLayer = node;
			this.onLoadFinalLayer();
		});
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
			this.finalLayer[this.index] = node;
			this.finalLayer[this.index].active = false;
			GlobalEvent.emit(EventCfg.LOADINGHIDE);
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

		//跟新闯关赛数据
		GlobalEvent.emit('UPDATEGAMEDATE');

		setTimeout(() => {
			//跟新获取的奖励消息
			GlobalEvent.emit('getRewardCenter');

			//破产补助
			if (GameData.properties[pb.GamePropertyId.Gold] < 1000 && this.goldchange) {
				this.onShowGobroke();
			}

			this.goldchange = false;
		}, 500);
	}

	//游戏结束
	GameOver(message) {

		if (!this.gameLayer || !this.gameLayer.active) { return }

		if (GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) {

			if (message) {
				let handle = this.finalLayer[this.index].getComponent('PKFinalHandle');
				handle.onShow();
			}
			this.finalLayer[this.index].active = true;
		}
		else {
			setTimeout(() => {
				if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan && !GameCfg.JJ_XUNLIAN) {

					this.finalLayer[this.index].getComponent('CGSFinalHandle').onShow();

					this.finalLayer[this.index].active = true;
				}
				else {
					if (GameCfg.JJ_XUNLIAN) {

						this.finalLayer[this.index].getComponent('LXFinalandle').onShow();

						this.finalLayer[this.index].active = true;
					}
					else {
						this.finalLayer[this.index].getComponent('FinalHandle').onShow();

						this.finalLayer[this.index].active = true;
					}
				}
			}, 50)
		}
	}

	openNode(node, url, zIndex, call?) {
		if (!this.isLoading) {
			this.isLoading = true;
		}
		else {
			return;
		}
		GlobalEvent.emit(EventCfg.LOADINGSHOW);
		if (!node) {
			LoadUtils.loadRes(url, pre => {
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

