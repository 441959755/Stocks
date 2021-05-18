import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from '../game/GameCfg';
import LoadUtils from '../Utils/LoadUtils';
import { pb } from '../../protos/proto';
import ComUtils from '../Utils/ComUtils';
import GameData from '../GameData';
import DrawData from '../game/DrawData';

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

	@property(cc.Prefab)
	helpPre: cc.Prefab = null;

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

	curTotal = 0;

	onLoad() {
		ComUtils.onLoadNode();
		ComUtils.onEvent();
		//打开双盲
		GlobalEvent.on(
			'OPENSMLAYER',
			() => {
				this.shuangmangLayer.active = true;
			},
			this
		);

		//打开指标
		GlobalEvent.on(
			'OPENZBLAYER',
			() => {
				this.zhibiaoLayer.active = true;
			},
			this
		);

		//打开定向
		GlobalEvent.on(
			'OPENDXLAYER',
			() => {
				this.DXLayer.active = true;
			},
			this
		);

		//打开历史记录
		GlobalEvent.on(
			'OPENHISTORYLAYER',
			str => {
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				//SM的要获取服务器消息
				this.acquireSMhistoryInfo(info => {
					this.openhistoryLayer && this.openhistoryLayer(info, str);
				});
			},
			this
		);

		//打开设置
		GlobalEvent.on(
			'OPENSETLAYER',
			str => {
				if (str == 'ZB') {
					if (!this.ZBSetLayer) {
						this.ZBSetLayer = cc.instantiate(this.ZBSetPre);
						this.node.addChild(this.ZBSetLayer);
					}
					this.ZBSetLayer.active = true;
				} else if (str == 'SM') {
					if (!this.SMSetLayer) {
						this.SMSetLayer = cc.instantiate(this.SMSetPre);
						this.node.addChild(this.SMSetLayer);
					}
					this.SMSetLayer.active = true;
				} else if (str == 'DX') {
					if (!this.DXSetLayer) {
						this.DXSetLayer = cc.instantiate(this.DXSetPre);
						this.node.addChild(this.DXSetLayer);
					}
					this.DXSetLayer.active = true;
				} else if (str == 'QH') {
					if (!this.QHSetNode) {
						this.QHSetNode = cc.instantiate(this.QHSetPre);
						this.node.addChild(this.QHSetNode);
					}
					this.QHSetNode.active = true;
				}
			},
			this
		);

		//打开月报
		GlobalEvent.on(
			'OPENMONTHLAYER',
			str => {
				//  if (str == 'SM') {
				if (socket) {
					socket.send(4009, null, info => {
						console.log('OPENMONTHLAYER' + JSON.stringify(info));

						if (!this.SMMonthlyLayer) {
							this.SMMonthlyLayer = cc.instantiate(this.SMMothlyPre);
							this.node.addChild(this.SMMonthlyLayer);
						}
						this.SMMonthlyLayer.active = true;

						this.SMMonthlyLayer.getComponent('SMMonthly').monthlyInfo = info;
						this.SMMonthlyLayer.getComponent('SMMonthly').onShow();
					});
				}

				//  }
			},
			this
		);

		//打开曲线图
		GlobalEvent.on(
			'OPENYIELDLAYER',
			str => {
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				this.acquireSMhistoryInfo(info => {
					this.openYieldLaye && this.openYieldLaye(info);
				});
			},
			this
		);

		//打开帮助
		GlobalEvent.on(
			'OPENHELPLAYER',
			str => {
				if (!this.helpLayer) {
					this.helpLayer = cc.instantiate(this.helpPre);
					this.node.addChild(this.helpLayer);
				}
				this.helpLayer.active = true;
			},
			this
		);

		//查询行情
		GlobalEvent.on('onCmdQuoteQuery', this.onCmdQuoteQuery.bind(this), this);

		//打开个人中心
		GlobalEvent.on(
			'OPENPLAYERINFO',
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
			'OPENQHLAYER',
			() => {
				this.QHLayer.active = true;
			},
			this
		);

		GlobalEvent.on(EventCfg.CmdQuoteQueryFuture, this.onCmdQHGameStart.bind(this), this);
	}


	onEnable() {
		GameCfg.fill = [];
		GameCfg.mark = [];
		GameCfg.notice = [];
		GameCfg.huizhidatas = 0;
		GameCfg.allRate = 0;
		GameCfg.profitCount = 0;
		GameCfg.lossCount = 0;
		GameCfg.finalfund = 0;
		//	GameCfg.GameType = null;

		GameCfg.GAMEFUPAN = false;
		GameCfg.history.huizhidatas = 0;
		GameCfg.history.allRate = 0;
		GameCfg.history.deal = [];
		GameCfg.data[0].data = [];
		//	GameCfg.ziChan = 100000;

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
		if (event) {
			GlobalEvent.emit(EventCfg.BLACKGOTOLAYER, event);
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

	openhistoryLayer(info, str?) {
		let pre, node;
		if (str == 'QH') {
			pre = this.QHhistoryPre;
			node = this.QHhistoryLayer;
		}
		else if (str == 'SM') {
			pre = this.SMhistoryPre;
			node = this.SMhistoryLayer;
		} else {
			pre = this.otherhistoryPre;
			node = this.otherhistoryLayer;
		}
		if (!node) {
			//   this.SMhistoryLayer = cc.instantiate(this.SMhistoryPre)
			node = cc.instantiate(pre);
			this.node.addChild(node);
		}
		node.active = true;
		//  this.SMhistoryLayer.getComponent('SMHistory').historyType = type;
		node.getComponent('History').historyInfo = info;
		node.getComponent('History').onShow();
		if (this.SMYieldLayer) {
			node.zIndex = this.SMYieldLayer.zIndex + 1;
		}

		// if (str == 'SM') {
		// 	this.SMhistoryLayer = node;
		// } else {
		// 	this.otherhistoryLayer = node;
		// }
	}

	protected onDestroy() {
		GlobalEvent.off('OPENSMLAYER');
		GlobalEvent.off('OPENZBLAYER');
		GlobalEvent.off('OPENHISTORYLAYER');
		GlobalEvent.off('OPENZBSETLAYER');
		GlobalEvent.off('OPENMONTHLAYER');
		GlobalEvent.off('OPENYIELDLAYER');
		GlobalEvent.off('OPENHELPLAYER');
		GlobalEvent.off('onCmdQuoteQuery');
		GlobalEvent.off('OPENDXKAYER');
		GlobalEvent.off('OPENPLAYERINFO');
		GlobalEvent.off('OPENQHLAYER');
		ComUtils.onDestory();
	}

	onCmdGameStart(data, info1) {
		//  if (socket) {
		GameCfg.data[0].data = [];
		GameCfg.info = info1;
		socket.send(pb.MessageId.Req_Game_Start, PB.onCmdGameStartConvertToBuff(data), res => {
			//console.log('onCmdGameStart' + JSON.stringify(res));
			//先去前面条数 要我这样写

			let infoPre = {
				ktype: info1.ktype,
				kstyle: info1.kstyle,
				code: info1.code,
				form: 0,
				total: 100,
				to: info1.from,
			}

			socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(infoPre), info => {
				if (!info.items || info.items.length <= 0) {
					console.log('获取的行情为空');
					// console.log(JSON.stringify(GameCfg.data));
					GameCfg.GAMEFUPAN = false;
					GlobalEvent.emit(EventCfg.LOADINGHIDE);
					return;
				}
				info.items.forEach(el => {
					//  let date = new Date(el.timestamp);
					let ye = (el.timestamp + '').slice(0, 4);
					let mon = (el.timestamp + '').slice(4, 6);
					let da = (el.timestamp + '').slice(6);
					let fromDate = ye + '-' + mon + '-' + da;
					let data = {
						day: fromDate,
						open: el.open,
						close: el.price,
						high: el.high,
						low: el.low,
						price: el.amount,
						value: el.volume,
						Rate: (el.volume / GameCfg.data[0].circulate) * 100
					};

					if (GameCfg.data[0].circulate == 0) {
						data.Rate = 1;
					}
					GameCfg.data[0].data.push(data);
				});
				//	console.log(JSON.stringify(GameCfg.data[0].data));
				//cc.director.loadScene('game');
				//在获取后面的
				socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1), info => {
					//   console.log('onCmdQuoteQuery' + JSON.stringify(info));
					if (!info.items || info.items.length <= 0) {
						console.log('获取的行情为空');
						// console.log(JSON.stringify(GameCfg.data));
						GameCfg.GAMEFUPAN = false;
						GlobalEvent.emit(EventCfg.LOADINGHIDE);
						return;
					}
					info.items.forEach(el => {
						//  let date = new Date(el.timestamp);
						let ye = (el.timestamp + '').slice(0, 4);
						let mon = (el.timestamp + '').slice(4, 6);
						let da = (el.timestamp + '').slice(6);
						let fromDate = ye + '-' + mon + '-' + da;
						if (fromDate != GameCfg.data[0].data[GameCfg.data[0].data.length - 1].day) {
							let data = {
								day: fromDate,
								open: el.open,
								close: el.price,
								high: el.high,
								low: el.low,
								price: el.amount,
								value: el.volume,
								Rate: (el.volume / GameCfg.data[0].circulate) * 100
							};

							if (GameCfg.data[0].circulate == 0) {
								data.Rate = 1;
							}
							GameCfg.data[0].data.push(data);
						}

					});
					//	GameCfg.enterGameCache.from1 = GameCfg.data[0].data[0].day;
					// console.log(JSON.stringify(GameCfg.data[0].data));
					// console.log(JSON.stringify(GameCfg.data[0].data.length));
					cc.director.loadScene('game');
				});

			});


		});
		//  }
	}

	onCmdQuoteQuery(data) {
		// console.log(JSON.stringify(data));
		this.onCmdGameStart({ game: GameCfg.GameType }, data);
	}

	acquireSMhistoryInfo(callBack) {
		let data = new Date();
		data.setDate(1);
		data.setHours(0);
		data.setSeconds(0);
		data.setMinutes(0);

		if (socket) {
			let data1 = {
				g_type: GameCfg.GameType,
				from: data.getTime(),
				to: new Date().getTime(),
				page_size: 100
			};

			socket.send(pb.MessageId.Req_Game_QueryGameResult, PB.onCmdQueryGameResultConvertToBuff(data1), info => {
				console.log('acquireSMhistoryInfo' + JSON.stringify(info));

				callBack && callBack(info);
			});
		}
	}

	//我也不知道为什么要我这样写
	onCmdQHGameStart(data) {
		let maxLength = 2000;
		this.curTotal = 0;
		GameCfg.data[0].data = [];
		let inf = {
			game: pb.GameType.QiHuo
		}
		socket.send(pb.MessageId.Req_Game_Start, PB.onCmdGameStartConvertToBuff(inf), res => {

			//先获取前面的
			let preData = {
				ktype: data.ktype,
				code: data.code,
				from: 0,
				total: 50,
				to: data.from,
			}

			if (GameData.QHSet.ZLine == '15分钟K') {
				preData.total *= 3;
			} else if (GameData.QHSet.ZLine == '30分钟K') {
				preData.total *= 6;
			} else if (GameData.QHSet.ZLine == '60分钟K') {
				preData.total *= 12;
			}

			//	data.total -= 50;
			socket.send(pb.MessageId.Req_QuoteQueryFuture, PB.onCmdQuoteQueryFutureConverToBuff(preData), info => {
				//console.log(JSON.stringify(info));
				if (!info.items || info.items.length <= 0) {
					console.log('获取的行情为空');
					GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空' + JSON.stringify(preData));
					GameCfg.GAMEFUPAN = false;
					GlobalEvent.emit(EventCfg.LOADINGHIDE);
					return;
				}
				//	if (GameData.QHSet.ZLine == '日线' || GameData.QHSet.ZLine == '5分钟K') {
				info.items.forEach(el => {
					// {"code":2000042,"ktype":"Day","timestamp":"1577235900","open":3112,"close":3116,"high":3120,"low":3112,"volume":"15032"},
					//[{"code":2000113,"ktype":"Day","timestamp":"20171103","open":610.2,"close":607.4,"high":610.6,"low":606.6,"volume":"178060","cclHold":"442454"},
					let data1 = {
						day: el.timestamp + '',
						open: el.open,
						close: el.close,
						high: el.high,
						low: el.low,
						value: el.volume,
						ccl_hold: el.cclHold,
					};
					GameCfg.data[0].data.push(data1);
				});

				if (data.total > maxLength) {
					this.curTotal = data.total - maxLength;
					data.total = maxLength;
				}
				this.getQHHangQing(data);
			})
		})
	}

	getQHHangQing(data) {
		let qhHQ = GameCfg.data[0].data;
		socket.send(pb.MessageId.Req_QuoteQueryFuture, PB.onCmdQuoteQueryFutureConverToBuff(data), info => {
			//console.log(JSON.stringify(info));
			if (!info.items || info.items.length <= 0) {
				console.log('获取的行情为空');
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空' + JSON.stringify(data));
				GameCfg.GAMEFUPAN = false;
				GlobalEvent.emit(EventCfg.LOADINGHIDE);
				return;
			}
			info.items.forEach(el => {
				// {"code":2000042,"ktype":"Day","timestamp":"1577235900","open":3112,"close":3116,"high":3120,"low":3112,"volume":"15032"},
				//[{"code":2000113,"ktype":"Day","timestamp":"20171103","open":610.2,"close":607.4,"high":610.6,"low":606.6,"volume":"178060","cclHold":"442454"},
				//	if (el.timestamp != GameCfg.data[0].data[GameCfg.data[0].data.length - 1].day) {
				let data1 = {
					day: el.timestamp + '',
					open: el.open,
					close: el.close,
					high: el.high,
					low: el.low,
					value: el.volume,
					ccl_hold: el.cclHold,
				};
				qhHQ.push(data1);
				//	}
			});
			// console.log(JSON.stringify(GameCfg.data[0].data.length));
			// console.log(JSON.stringify(GameCfg.data[0].data));

			if (this.curTotal > 0) {
				if (this.curTotal >= 2000) {
					this.curTotal -= 2000;
					data.total = 2000;
				} else {
					data.total = this.curTotal;
					this.curTotal = 0;
				}
				GameCfg.data[0].data = qhHQ;
				data.from = qhHQ[qhHQ.length - 1].day;
				this.getQHHangQing(data);
			} else {
				if (GameData.QHSet.ZLine == '5分钟K') {
					DrawData.arrMin5 = qhHQ;
				} else if (GameData.QHSet.ZLine == '日线') {
					DrawData.arrDay = qhHQ;
				}
				else {
					let t
					if (GameData.QHSet.ZLine == '15分钟K') {
						t = 3;
						DrawData.arrMin5 = qhHQ;
					} else if (GameData.QHSet.ZLine == '30分钟K') {
						t = 6;
						DrawData.arrMin5 = qhHQ;
					} else if (GameData.QHSet.ZLine == '60分钟K') {
						t = 12;
						DrawData.arrMin5 = qhHQ;
					}
					qhHQ = DrawData.dataChange(qhHQ[qhHQ.length - 1].day, t, qhHQ);
				}
				GameCfg.data[0].data = qhHQ;
				//	GameCfg.enterGameCache.from1 = GameCfg.data[0].data[0].day;
				cc.director.loadScene('game');
			}

		})
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
