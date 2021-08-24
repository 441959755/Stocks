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

	tipsTextNode: cc.Node = null;

	broadcast: cc.Node = null; //广播

	InviteBox: cc.Node = null;

	rewardCenterNode: cc.Node = null;

	onLoad() {

		PopupManager.init();
		//查询行情
		GlobalEvent.on(EventCfg.onCmdQuoteQuery, this.onCmdQuoteQuery.bind(this), this);

		GlobalEvent.on(EventCfg.CmdQuoteQueryFuture, this.onCmdQHGameStart.bind(this), this);

		GlobalEvent.on(EventCfg.INVITEMESSAGE, this.openBroadcast.bind(this), this);

		GlobalEvent.on(EventCfg.ROOMLEAVE, this.onRoomLeave.bind(this), this);
		//打开帮助
		GlobalEvent.on(EventCfg.OPENHELPLAYER, this.openHelpLayer.bind(this), this);
		//打开个人中心
		GlobalEvent.on(EventCfg.OPENPLAYERINFO, this.openPlayerInfoLayer.bind(this), this);

		GlobalEvent.on(EventCfg.OPENREWARDCENTERLAYER, this.openRewardCenterLayer.bind(this), this);


	}

	protected onDestroy() {
		GlobalEvent.off(EventCfg.onCmdQuoteQuery);
		GlobalEvent.off(EventCfg.OPENPLAYERINFO);
		GlobalEvent.off(EventCfg.OPENHELPLAYER);
		GlobalEvent.off(EventCfg.ROOMLEAVE);
		GlobalEvent.off(EventCfg.INVITEMESSAGE);
		GlobalEvent.off(EventCfg.CmdQuoteQueryFuture);
		GlobalEvent.off(EventCfg.OPENREWARDCENTERLAYER);
		LoadUtils.releaseRes('Prefabs/broadcast');
		LoadUtils.releaseRes('Prefabs/playeInfo/playerInfoLayer');
		LoadUtils.releaseRes('Prefabs/helpLayer');
		LoadUtils.releaseRes('Prefabs/inviteBox');
		LoadUtils.releaseRes('Prefabs/RewardCenter/rewardCenter');
		PopupManager.delPopupNode();
		GameData.selfEnterRoomData = null;
	}

	/**
	 * 奖励中心
	 */
	openRewardCenterLayer(data) {
		if (this.rewardCenterNode) {
			this.rewardCenterNode.active = true;
			let handle = this.rewardCenterNode.getComponent('RewardCenter');
			if (handle) {
				handle.rewardData = data;
				handle.onShow();
			}
		}
		else {
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			LoadUtils.loadRes('Prefabs/RewardCenter/rewardCenter', pre => {
				GlobalEvent.emit(EventCfg.LOADINGHIDE);
				this.rewardCenterNode = cc.instantiate(pre);
				this.node.addChild(this.rewardCenterNode);
				this.rewardCenterNode.active = true;
				let handle = this.rewardCenterNode.getComponent('RewardCenter');
				if (handle) {
					handle.rewardData = data;
					handle.onShow();
				}
			})
		}
	}

	//打开个人中心
	openPlayerInfoLayer() {
		if (!this.playerInfoLayer) {
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			LoadUtils.loadRes('Prefabs/playeInfo/playerInfoLayer', pre => {
				GlobalEvent.emit(EventCfg.LOADINGHIDE);
				this.playerInfoLayer = cc.instantiate(pre);
				this.node.addChild(this.playerInfoLayer);
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
				this.node.addChild(this.helpLayer);
				this.helpLayer.active = true;
			})
		}
		else {
			this.helpLayer.active = true;
		}
	}

	//离开房间
	onRoomLeave(data) {
		if (data.uid == GameData.userID) {
			GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '房间已解散！');
		}
	}

	start() {
		//回到进入游戏的界面
		let event;
		if (GameCfg.GameType == pb.GameType.ShuangMang) {
			event = { target: { name: 'main_xl_smxl' } };
		} else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
			event = { target: { name: 'main_xl_zbxl' } }
		} else if (GameCfg.GameType == pb.GameType.DingXiang) {
			event = { target: { name: 'main_xl_dxxl' } }
		} else if (GameCfg.GameType == pb.GameType.QiHuo) {
			event = { target: { name: 'main_xl_qhxl' } }
		}
		else if (GameCfg.GameType == pb.GameType.JJ_PK) {
			event = { target: { name: 'toggle1' } }
		}
		else if (GameCfg.GameType == pb.GameType.JJ_DuoKong) {
			event = { target: { name: 'toggle1' } }
		}
		else if (GameCfg.GameType == pb.GameType.JJ_ChuangGuan || GameData.locationLayer == LocationPoint.JJ_ChuangGuanOtherHis) {
			event = { target: { name: 'toggle1' } }
		}

		if (event) {
			GlobalEvent.emit(EventCfg.BLACKGOTOLAYER, event);
			if (GameCfg.historyType) {
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				GlobalEvent.emit(EventCfg.OPENHISTORYLAYER);
			}
		}

		//断线重连 或游戏后进入房间
		if (GameData.selfEnterRoomData) {
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			GameCfg.GameSet = GameData.JJPKSet;

			GlobalEvent.emit(EventCfg.RoomGameDataSelf, GameData.selfEnterRoomData);
			GameData.roomId = GameData.selfEnterRoomData.id;

			if (!GameData.RoomType) {
				GameCfg.GAMEFRTD = true;

				setTimeout(() => {
					cc.director.loadScene('game');
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

		cc.director.preloadScene('game', () => {
			console.log('game 加载完成');
		})
	}


	onEnable() {
		GameCfg.fill = [];
		GameCfg.mark = [];
		GameCfg.notice = [];
		GameCfg.huizhidatas = 0;
		GameCfg.allRate = 0;
		GameCfg.blockHistoy = [];
		GameCfg.finalfund = 0;
		GameCfg.GAMEFUPAN = false;
		StrategyAIData.onClearData();
		GameCfg.enterGameCache = null;
		GameCfg.data[0].data = [];
		GameCfg.GAMEFUPANDATA = null;
	}

	openBroadcast(data) {
		//不包括自己
		if (data.sender) {
			if (data.sender == GameData.userID) {
				return;
			}
		}
		console.log('邀请信息：' + JSON.stringify(data));
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


	//训练股票进入游戏
	onCmdQuoteQuery(data) {

		let info1 = data;

		data = { game: GameCfg.GameType };

		GameCfg.data[0].data = [];

		GameCfg.enterGameCache = info1;
		//游戏开始
		GlobalHandle.onCmdGameStartReq(() => {
			//游戏行情获取
			GlobalHandle.onCmdGameStartQuoteQuery(info1, () => {
				cc.director.loadScene('game');
			})

		});
	}

	//期货进入游戏
	onCmdQHGameStart(data) {
		GameCfg.data[0].data = [];
		//游戏开始
		GlobalHandle.onCmdGameStartReq(() => {
			//游戏行情获取
			GlobalHandle.onCmdGameStartQuoteQueryQH(data, () => {
				cc.director.loadScene('game');
			});
		})
	}

}
