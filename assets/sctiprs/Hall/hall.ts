import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from '../game/GameCfg';

import { pb } from '../../protos/proto';
import ComUtils from '../Utils/ComUtils';

import GlobalHandle from '../global/GlobalHandle';
import StrategyAIData from '../game/StrategyAIData';
import GameData from '../GameData';
import LoadUtils from '../Utils/LoadUtils';
import { LocationPoint } from '../global/LocationPoint';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	@property(cc.Node)
	shuangmangLayer: cc.Node = null;

	@property(cc.Node)
	zhibiaoLayer: cc.Node = null;

	@property(cc.Node)
	DXLayer: cc.Node = null;

	@property(cc.Node)
	QHLayer: cc.Node = null;

	@property(cc.Prefab)
	SMhistoryPre: cc.Prefab = null;

	SMhistoryLayer: cc.Node = null;

	@property(cc.Prefab)
	QHhistoryPre: cc.Prefab = null;

	QHhistoryLayer: cc.Node = null;

	@property(cc.Prefab)
	ZBhistoryPre: cc.Prefab = null;

	ZBhistoryLayer: cc.Node = null;

	@property(cc.Prefab)
	otherhistoryPre: cc.Prefab = null;

	otherhistoryLayer: cc.Node = null;

	@property(cc.Prefab)
	ZBSetPre: cc.Prefab = null;

	ZBSetLayer: cc.Node = null;

	@property(cc.Prefab)
	SMSetPre: cc.Prefab = null;

	SMSetLayer: cc.Node = null;

	@property(cc.Prefab)
	DXSetPre: cc.Prefab = null;

	DXSetLayer: cc.Node = null;

	@property(cc.Prefab)
	SMYieldPre: cc.Prefab = null;

	SMYieldLayer: cc.Node = null;

	@property(cc.Prefab)
	SMMothlyPre: cc.Prefab = null;

	SMMonthlyLayer: cc.Node = null;

	helpLayer: cc.Node = null;

	@property(cc.Prefab)
	playerInfo: cc.Prefab = null;

	playerInfoLayer: cc.Node = null;

	tipsTextNode: cc.Node = null;

	@property(cc.Prefab)
	SMResetPre: cc.Prefab = null;

	SMResetNode: cc.Node = null;

	@property(cc.Prefab)
	QHSetPre: cc.Prefab = null;

	QHSetNode: cc.Node = null;

	InviteBox: cc.Node = null;

	onLoad() {
		ComUtils.onLoadNode();
		ComUtils.onEvent();
		//打开双盲
		GlobalEvent.on(
			EventCfg.OPENSMLAYER,
			() => {
				this.shuangmangLayer.active = true;
			},
			this
		);

		//打开指标
		GlobalEvent.on(
			EventCfg.OPENZBLAYER,
			() => {
				this.zhibiaoLayer.active = true;
			},
			this
		);

		//打开定向
		GlobalEvent.on(
			EventCfg.OPENDXLAYER,
			() => {
				this.DXLayer.active = true;
			},
			this
		);

		//打开历史记录
		GlobalEvent.on(
			EventCfg.OPENHISTORYLAYER,
			() => {
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				if (GameCfg.GameType == pb.GameType.ShuangMang) {
					if (this.SMhistoryLayer) {
						this.SMhistoryLayer.active = true;
						return;
					}
				}
				else if (GameCfg.GameType == pb.GameType.QiHuo) {
					if (this.QHhistoryLayer) {
						this.QHhistoryLayer.active = true;
						return;
					}
				}

				else if (GameCfg.GameType == pb.GameType.DingXiang) {
					if (this.otherhistoryLayer) {
						this.otherhistoryLayer.active = true;
						return;
					}
				}

				else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
					if (this.ZBhistoryLayer) {
						this.ZBhistoryLayer.active = true;
						return;
					}
				}
				//SM的要获取服务器消息
				this.acquireSMhistoryInfo(info => {
					this.openhistoryLayer && this.openhistoryLayer(info);
				});
			},
			this
		);

		//打开设置
		GlobalEvent.on(
			EventCfg.OPENSETLAYER,
			() => {
				if (GameCfg.GameType == pb.GameType.ZhiBiao) {
					if (!this.ZBSetLayer) {
						this.ZBSetLayer = cc.instantiate(this.ZBSetPre);
						this.node.addChild(this.ZBSetLayer, 30);
					}
					this.ZBSetLayer.active = true;
				} else if (GameCfg.GameType == pb.GameType.ShuangMang) {
					if (!this.SMSetLayer) {
						this.SMSetLayer = cc.instantiate(this.SMSetPre);
						this.node.addChild(this.SMSetLayer, 30);
					}
					this.SMSetLayer.active = true;
				} else if (GameCfg.GameType == pb.GameType.DingXiang) {
					if (!this.DXSetLayer) {
						this.DXSetLayer = cc.instantiate(this.DXSetPre);
						this.node.addChild(this.DXSetLayer, 30);
					}
					this.DXSetLayer.active = true;
				} else if (GameCfg.GameType == pb.GameType.QiHuo) {
					if (!this.QHSetNode) {
						this.QHSetNode = cc.instantiate(this.QHSetPre);
						this.node.addChild(this.QHSetNode, 30);
					}
					this.QHSetNode.active = true;
				}
			},
			this
		);

		//打开月报
		GlobalEvent.on(
			EventCfg.OPENMONTHLAYER,
			() => {
				socket.send(pb.MessageId.Req_Game_SmxlReport, null, info => {
					console.log('OPENMONTHLAYER' + JSON.stringify(info));

					if (!this.SMMonthlyLayer) {
						this.SMMonthlyLayer = cc.instantiate(this.SMMothlyPre);
						this.node.addChild(this.SMMonthlyLayer, 30);
					}
					this.SMMonthlyLayer.active = true;

					this.SMMonthlyLayer.getComponent('SMMonthly').monthlyInfo = info;
					this.SMMonthlyLayer.getComponent('SMMonthly').onShow();
				});

			},
			this
		);

		//打开曲线图
		GlobalEvent.on(
			EventCfg.OPENYIELDLAYER,
			() => {
				GlobalEvent.emit(EventCfg.LOADINGSHOW);

				if (this.SMYieldLayer) {
					this.SMYieldLayer.active = true;
					return;
				}
				this.acquireSMhistoryInfo(info => {
					this.openYieldLaye && this.openYieldLaye(info);
				});
			},
			this
		);

		//查询行情
		GlobalEvent.on(EventCfg.onCmdQuoteQuery, this.onCmdQuoteQuery.bind(this), this);

		//打开个人中心
		GlobalEvent.on(
			EventCfg.OPENPLAYERINFO,
			() => {
				if (!this.playerInfoLayer) {
					this.playerInfoLayer = cc.instantiate(this.playerInfo);
					this.node.addChild(this.playerInfoLayer);
				}
				this.playerInfoLayer.active = true;
			},
			this
		);

		//打开双盲重置金币页面
		GlobalEvent.on(
			EventCfg.OPENSMRESETMONEYLAYER,
			() => {
				if (!this.SMResetNode) {
					this.SMResetNode = cc.instantiate(this.SMResetPre);
					this.node.addChild(this.SMResetNode);
				}
				this.SMResetNode.active = true;
			},
			this
		);

		//打開期货
		GlobalEvent.on(
			EventCfg.OPENQHLAYER,
			() => {
				this.QHLayer.active = true;
			},
			this
		);

		GlobalEvent.on(EventCfg.CmdQuoteQueryFuture, this.onCmdQHGameStart.bind(this), this);

		//打开帮助
		GlobalEvent.on(EventCfg.OPENHELPLAYER, () => {
			if (!this.helpLayer) {
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				LoadUtils.loadRes('Prefabs/helpLayer', (pre) => {
					this.helpLayer = cc.instantiate(pre);
					this.node.addChild(this.helpLayer);
					this.helpLayer.active = true;
					GlobalEvent.emit(EventCfg.LOADINGHIDE);
				})
			}
			else {
				this.helpLayer.active = true;
			}
		}, this);

		GlobalEvent.on(EventCfg.INVITEMESSAGE, this.onShowInviteBox.bind(this), this);

		GlobalEvent.on(EventCfg.ROOMLEAVE, (data) => {
			if (data.uid == GameData.userID) {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '房间已解散！');
			}
		}, this);
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
			GameCfg.GAMEFRTD = true;
			if (!GameData.RoomType) {
				setTimeout(() => {
					cc.director.loadScene('game');
				}, 800)
			}
		}

		//房间已解散
		if (GameData.roomId === 0) {
			GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '房间已解散！');
		}
		//进入房间
		else if (GameData.roomId) {
			GlobalEvent.emit(EventCfg.OPENROOM);
		}

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

	//邀请框
	onShowInviteBox(data) {
		if (data.sender) {
			if (data.sender == GameData.userID) {
				return;
			}
		}
		console.log('邀请信息：' + JSON.stringify(data));
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

	openYieldLaye(info) {
		if (!this.SMYieldLayer) {
			this.SMYieldLayer = cc.instantiate(this.SMYieldPre);
			this.node.addChild(this.SMYieldLayer);
		}
		this.SMYieldLayer.active = true;
		this.SMYieldLayer.getComponent('SMYieldCurve').yieldInfo = info;
		this.SMYieldLayer.getComponent('SMYieldCurve').onShow();
	}

	openhistoryLayer(info) {
		let pre, node;
		if (GameCfg.GameType == pb.GameType.QiHuo) {
			pre = this.QHhistoryPre;
			node = this.QHhistoryLayer;
		}
		else if (GameCfg.GameType == pb.GameType.ShuangMang) {
			pre = this.SMhistoryPre;
			node = this.SMhistoryLayer;
		} else if (GameCfg.GameType == pb.GameType.DingXiang) {
			pre = this.otherhistoryPre;
			node = this.otherhistoryLayer;
		}
		else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
			pre = this.ZBhistoryPre;
			node = this.ZBhistoryLayer;
		}

		if (!node) {
			node = cc.instantiate(pre);
			this.node.addChild(node, 40);
		}
		node.active = true;

		node.getComponent('History').historyInfo = info;
		node.getComponent('History').onShow();
		if (this.SMYieldLayer) {
			node.zIndex = this.SMYieldLayer.zIndex + 1;
		}
	}

	//获取历史记录
	acquireSMhistoryInfo(callBack) {


		let data = new Date();
		data.setDate(1);
		data.setHours(0);
		data.setSeconds(0);
		data.setMinutes(0);

		if (socket) {
			let data1 = {
				uid: GameData.userID,
				gType: GameCfg.GameType,
				//from: parseInt(data.getTime() / 1000 + ''),
				to: parseInt(new Date().getTime() / 1000 + ''),
				pageSize: 100,
			};

			socket.send(pb.MessageId.Req_Game_QueryGameResult, PB.onCmdQueryGameResultConvertToBuff(data1), info => {
				callBack && callBack(info);
			});
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

	protected onDestroy() {
		GlobalEvent.off(EventCfg.OPENSMLAYER);
		GlobalEvent.off(EventCfg.OPENZBLAYER);
		GlobalEvent.off(EventCfg.OPENDXLAYER);
		GlobalEvent.off(EventCfg.OPENHISTORYLAYER);
		GlobalEvent.off(EventCfg.OPENMONTHLAYER);
		GlobalEvent.off(EventCfg.OPENYIELDLAYER);
		GlobalEvent.off(EventCfg.onCmdQuoteQuery);
		GlobalEvent.off(EventCfg.OPENPLAYERINFO);
		GlobalEvent.off(EventCfg.OPENQHLAYER);
		GlobalEvent.off(EventCfg.OPENHELPLAYER);
		GlobalEvent.off(EventCfg.OPENSETLAYER);
		GlobalEvent.off(EventCfg.ROOMLEAVE);
		ComUtils.onDestory();
		GameData.selfEnterRoomData = null;
	}



	// resetSize(cav) {
	//     let frameSize = cc.view.getFrameSize();
	//     let designSize = cc.view.getDesignResolutionSize();

	//     if (frameSize.width / frameSize.height > designSize.width / designSize.height) {
	//         cav.width = designSize.height * frameSize.width / frameSize.height;
	//         cav.height = designSize.height;
	//         cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
	//     } else {
	//         cav.width = designSize.width;
	//         cav.height = designSize.width * frameSize.height / frameSize.width;
	//         cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
	//     }
	//     this.fitScreen(cav, designSize);
	// }

	// /**
	//  * 背景适配
	//  * @param canvasnode
	//  * @param designSize
	//  */
	// fitScreen(canvasnode, designSize) {
	//     let scaleW = canvasnode.width / designSize.width;
	//     let scaleH = canvasnode.height / designSize.height;

	//     let bgNode = canvasnode.getChildByName('bg');
	//     let bgScale = canvasnode.height / bgNode.height;
	//     bgNode.width *= bgScale;
	//     bgNode.height *= bgScale;
	//     if (scaleW > scaleH) {
	//         bgScale = canvasnode.width / bgNode.width;
	//         bgNode.width *= bgScale;
	//         bgNode.height *= bgScale;
	//     }
	// }
}
