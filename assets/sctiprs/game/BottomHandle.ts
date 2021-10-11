import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from './GameCfg';
import { pb } from '../../protos/proto';
import ComUtils from '../Utils/ComUtils';
import DrawData from './DrawData';
import GameData from '../GameData';
import StrategyAIData from './StrategyAIData';
import PopupManager from '../Utils/PopupManager';
import UpGameOpt from '../global/UpGameOpt';
import LoadUtils from '../Utils/LoadUtils';

const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
	@property(cc.Label)
	tipsLabel: cc.Label = null;

	@property(cc.Label)
	tipsLabel1: cc.Label = null;

	@property(cc.Button)
	mrBtn: cc.Button = null;

	@property(cc.Button)
	mcBtn: cc.Button = null;

	@property(cc.Button)
	gwBtn: cc.Button = null;

	@property(cc.Button)
	cyBtn: cc.Button = null;

	roundNumber = 150;

	@property(cc.Label)
	tipsmr: cc.Label = null;

	@property(cc.Label)
	tipsmc: cc.Label = null;

	_keMcCount = 0; //可卖出的数量

	gpData = null;

	get keMcCount() {
		return this._keMcCount;
	}

	set keMcCount(val) {
		this._keMcCount = val;
		if (this._keMcCount <= 0) {
			this.tipsmc.string = '可卖: 0';
			this.gwBtn.node.active = true;
			this.cyBtn.node.active = false;
		} else {
			this.tipsmc.string = '可卖：' + parseInt(val + '');
			this.gwBtn.node.active = false;
			this.cyBtn.node.active = true;
		}
	}

	_keMrCount = null; //可买入得数量
	get keMrCount() {
		return this._keMrCount;
	}

	set keMrCount(val) {
		this._keMrCount = val;
		if (this.keMrCount <= 0) {
			this.tipsmr.string = '可买: 0';
		} else {
			this.tipsmr.string = '可买：' + parseInt(val + '');
		}
	}

	flag = false;

	_type = 0;

	ziChan = 0;

	buyData = [];

	saleData = [];

	rateItem = {
		rate: null,
		start: null,
		end: null,
		state: null,
	};

	isFlag = false;
	@property(cc.Label)
	gpName: cc.Label = null;

	@property([cc.Label])
	timeLabel: cc.Label[] = [];

	@property([cc.Label])
	moneyLabel: cc.Label[] = [];

	@property(cc.Label)
	priceLabel: cc.Label[] = [];

	_kdCount = 0;

	_KKCount = 0;

	@property(cc.Node)
	kdNode: cc.Node = null;

	@property(cc.Node)
	fsNode: cc.Node = null;

	@property(cc.Node)
	kkNode: cc.Node = null;

	@property(cc.Node)
	qhNode: cc.Node = null;

	curMrPJPrice = 0;   //当前平均买入价格

	curMrCount = [];

	curMcCount = 0;

	@property(cc.Node)
	zhangting: cc.Node = null;

	@property(cc.Node)
	dieting: cc.Node = null;

	@property(cc.Node)
	xlzb: cc.Node = null;

	limitUP = 0;  //0没有  1涨停  2跌停


	onLoad() {

		GlobalEvent.on(
			EventCfg.GAMEOVEER,
			() => {
				this.onGameOverClosRate()

				GameCfg.finalfund = this.ziChan;

				this.curMrPJPrice = 0;   //当前平均买入价格

				this.curMrCount = [];

				this.curMcCount = 0;

				this.buyData = [];
				StrategyAIData.onSellFunc();
			},
			this
		);

		GlobalEvent.on(
			EventCfg.GAMEFUPAN,
			this.onShowGAMEFUPAN.bind(this),
			this
		);

		GlobalEvent.on('HIDEBOTTOMNODE', (flag) => {
			if (GameCfg.GAMEFUPAN) {
				return;
			}
			this.qhNode.active = flag;
			this.cyBtn.node.active = flag;
			this.gwBtn.node.active = flag;
			if (flag) {
				if (this._kdCount > 0 || this._KKCount > 0) {
					this.cyBtn.node.active = true;
					this.gwBtn.node.active = false;
				} else {
					this.cyBtn.node.active = false;
					this.gwBtn.node.active = true;
				}
			}
		}, this);

		GlobalEvent.on(EventCfg.CLICKFCBTN, this.onClickCfBtn.bind(this), this);

		GlobalEvent.on(EventCfg.GAMEFUPANOPT, this.onGameFUPANOPT.bind(this), this);

		//同步其他玩家操作
		GlobalEvent.on(EventCfg.UPDATEOTHERPLAYEROPT, this.updateOtherPlayerOpt.bind(this), this);

	}

	//pk 其他玩家操作计算
	updateOtherPlayerOpt() {

		setTimeout(() => {

			let otherAllRate = 0, curAskPrice = 0;

			UpGameOpt.player2Opt.forEach(el => {

				if (el.opId == pb.GameOperationId.Bid || el.opId == pb.GameOperationId.Long) {

					let rate = (this.gpData[el.kOffset - 1].close - curAskPrice) / curAskPrice;

					if (el.opId == pb.GameOperationId.Long) {
						rate = -rate;
					}
					otherAllRate = (otherAllRate + 1) * (rate + 1) - 1;
				}
				//买入
				else if (el.opId == pb.GameOperationId.Ask || el.opId == pb.GameOperationId.Short) {
					curAskPrice = this.gpData[el.kOffset - 1].close;
				}

			})

			if (this.roundNumber <= 0) {
				GlobalEvent.emit(EventCfg.UPDATEOTHERRATE, ComUtils.changeTwoDecimal(otherAllRate * 100));
			}

		}, 200)
	}

	//游戏结束结算盈利率
	onGameOverClosRate() {
		let count = 1;
		if (this.keMcCount > 0 || (this._KKCount != 0 || this._kdCount != 0)) {
			let preClose = this.onjunjia();
			if (preClose) {
				this.ziChan += this.keMcCount * this.gpData[GameCfg.huizhidatas - count].close;
				this.moneyLabel[0].string = '总资产    ：' + parseInt(this.ziChan + '');
				this.moneyLabel[1].string = '可用资产：' + parseInt(this.ziChan + '');
				this.moneyLabel[1].string = '可用资产：' + parseInt(this.ziChan + '');
				this.keMcCount = 0;
				let rate = this.onCurPositionRete(count);
				if (GameCfg.GameType == pb.GameType.QiHuo || !GameCfg.GameSet.isFC) {
					if (this._KKCount != 0) {
						rate = -rate;
					}
					GameCfg.allRate = (GameCfg.allRate + 1) * (rate + 1) - 1;
				} else {
					GameCfg.allRate = (this.ziChan + this.keMcCount * preClose - GameCfg.ziChan) / GameCfg.ziChan;
				}
				GlobalEvent.emit(EventCfg.UPDATERATE, [0, GameCfg.allRate]);

				GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });

				this.rateItem.end = GameCfg.huizhidatas - 1;

				GameCfg.fill.forEach(el => {
					if (!el.end) {
						el.end = this.rateItem.end;
					}
				});

				if (!GameCfg.GAMEFUPAN) {
					let item;
					if (GameCfg.GameType == pb.GameType.ZhiBiao ||
						GameCfg.GameType == pb.GameType.DingXiang ||
						GameCfg.GameType == pb.GameType.JJ_PK ||
						GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {
						item = {
							opId: pb.GameOperationId.Bid,
							volume: 1,
							kOffset: GameCfg.huizhidatas,
						}
					}
					else if (GameCfg.GameType == pb.GameType.QiHuo) {
						if (this._kdCount > 0) {
							item = {
								opId: pb.GameOperationId.Short,
								volume: 1,
								kOffset: GameCfg.huizhidatas,

							}
						}
						else {
							item = {
								opId: pb.GameOperationId.Ask,
								volume: 1,
								kOffset: GameCfg.huizhidatas,
							}
						}
					}

					UpGameOpt.addOpt(item);

				}
			}
			this._kdCount = 0;
			this._KKCount = 0;
		}
		UpGameOpt.UpGameOpt(1);
	}

	onClickCfBtn(percent) {
		//	if (GameCfg.huizhidatas > this.gpData.length) { return }
		if (!this.gpData[GameCfg.huizhidatas - 1]) { return }
		//买入
		if (this._type == 1) {
			let count = parseInt(percent * this.keMrCount / 100 + '') * 100;
			if (count < 100) {
				count = 100;
			}
			this.keMcCount += count;
			this.keMrCount -= count;
			this.curMrCount.push(count);
			this.ziChan -= count * this.gpData[GameCfg.huizhidatas - 1].close;

			if (!GameCfg.GAMEFRTD && GameCfg.GameSet.isFC) {
				if (this.keMrCount < 100) {
					this.mrBtn.interactable = false;
					this.mrBtn.enableAutoGrayEffect = true;
				}
				this.mcBtn.interactable = true;
				this.mcBtn.enableAutoGrayEffect = false;
			}
			else {
				this.mrBtn.node.active = false;
				this.mcBtn.node.active = true;
			}


			if (this.roundNumber > 0) {
				let item = {
					opId: pb.GameOperationId.Ask,
					volume: percent,
					kOffset: GameCfg.huizhidatas,

				}
				UpGameOpt.addOpt(item);
			}
			this.setRoundNumber('mrBtn');
		}
		//卖出
		else {
			let mc = parseInt(this.keMcCount * percent / 100 + '') * 100;
			if (mc < 100) {
				mc = 100;
			}
			this.keMcCount -= mc;

			this.ziChan += mc * this.gpData[GameCfg.huizhidatas - 1].close;
			this.curMcCount = mc;
			if (!GameCfg.GAMEFRTD && GameCfg.GameSet.isFC) {
				if (this.keMcCount <= 0) {
					this.mcBtn.interactable = false;
					this.mcBtn.enableAutoGrayEffect = true;
				}
				this.mrBtn.interactable = true;
				this.mrBtn.enableAutoGrayEffect = false;
			}
			else {
				this.mrBtn.node.active = true;
				this.mcBtn.node.active = false;
			}


			let item;
			if (this.roundNumber > 0) {
				item = {
					opId: pb.GameOperationId.Bid,
					volume: percent,
					kOffset: GameCfg.huizhidatas,

				}
				UpGameOpt.addOpt(item);
			}
			//	}
			this.setRoundNumber('mcBtn');
		}
	}

	onShowGAMEFUPAN() {

		if (GameCfg.huizhidatas > this.gpData.length) {
			GameCfg.huizhidatas = this.gpData.length;
		}

		this.node.children.forEach(el => {
			el.active = false;
		});
		let node = this.node.getChildByName('fupan1');
		node.active = true;
		if (GameCfg.GameType == pb.GameType.ShuangMang) {
			let node = this.node.getChildByName('fupan');
			node.active = true;
			node.children[0].getComponent(cc.Label).string = GameCfg.data[0].name;
			node.children[1].getComponent(cc.Label).string = ComUtils.formatTime(this.gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(this.gpData[GameCfg.huizhidatas - 1].day);

			let tq = ((this.gpData[GameCfg.huizhidatas - 1].close - this.gpData[GameData.huizhidatas - 1].close) / this.gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);
			node.children[2].getComponent(cc.Label).string = '同期涨幅:' + tq + '%';
			let node1 = this.node.getChildByName('fupan1');
			node1.active = true;
		}
		else if (GameCfg.GameType == pb.GameType.DingXiang) {

			let dxnode = this.node.getChildByName('DXInfo');
			dxnode.active = true;
			dxnode.x = 0;
			let code = GameCfg.data[0].code;
			if (code.length >= 7) {
				code = code.slice(1);
			}
			this.gpName.string = GameCfg.data[0].name + ' ' + code;
			this.timeLabel[0].string = ComUtils.formatTime(this.gpData[GameData.huizhidatas - 1].day);
			this.timeLabel[1].string = ComUtils.formatTime(this.gpData[GameCfg.huizhidatas - 1].day);

			this.moneyLabel[0].string = '总资产    ：' + GameCfg.ziChan;
			this.moneyLabel[1].string = '可用资产：' + GameCfg.finalfund;
			let info = DrawData.getBukoCount();

			this.priceLabel[0].string = '盈利操作次数：' + info.yCount;
			this.priceLabel[1].string = '亏损操作次数：' + info.sCount;
		}

		else if (GameCfg.GameType == pb.GameType.QiHuo) {
			let node = this.node.getChildByName('fupan');
			node.active = true;
			node.children[0].getComponent(cc.Label).string = GameCfg.data[0].name;
			node.children[1].getComponent(cc.Label).string = ComUtils.formatTime(this.gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(this.gpData[GameCfg.huizhidatas - 1].day)
			let tq = ((this.gpData[GameCfg.huizhidatas - 1].close - this.gpData[GameData.huizhidatas - 1].close) / this.gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);
			node.children[2].getComponent(cc.Label).string = '同期涨幅:' + tq + '%';

		}

		else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
			this.xlzb.active = true;
			GlobalEvent.emit(EventCfg.SETMARKCOLOR);
		}
	}

	//游戏复盘操作
	onGameFUPANOPT(opt) {
		if (!opt) {
			return;
		}

		let pkSelf = this.node.getComponent('PKBottomHandle');

		opt.forEach((el, index) => {

			GameCfg.huizhidatas = el.kOffset;

			this.onSetMrCount();
			if (GameCfg.GameType == pb.GameType.DingXiang ||
				GameCfg.GameType == pb.GameType.ZhiBiao ||
				GameCfg.GameType == pb.GameType.JJ_PK ||
				GameCfg.GameType == pb.GameType.JJ_ChuangGuan) {
				if (el.opId == pb.GameOperationId.Ask) {
					this._type = 1;
					this.onClickCfBtn(el.volume);
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: el.kOffset });
				} else if (el.opId == pb.GameOperationId.Bid) {
					this._type = 2;
					this.onClickCfBtn(el.volume);
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: el.kOffset });
				}
				else {
					this.onClick({ target: { name: 'gwBtn' } }, null);
				}
			}
			else if (GameCfg.GameType == pb.GameType.QiHuo) {

				if (el.opId == pb.GameOperationId.Ask) {
					this.onClick({ target: { name: 'qhxl_kd' } }, null);
				}
				else if (el.opId == pb.GameOperationId.Short) {
					this.onClick({ target: { name: 'qhxl_kk' } }, null);
				}
				else if (el.opId == pb.GameOperationId.Bid_Force) {
					this.onClick({ target: { name: 'qhxl_fs' } }, null);
				}
				else if (el.opId == pb.GameOperationId.Wait) {
					this.onClick({ target: { name: 'gwBtn' } }, null);
				}
				else if (el.opId == pb.GameOperationId.Hold) {
					this.onClick({ target: { name: 'cyBtn' } }, null);
				}
			}
			else if (GameCfg.GameType == pb.GameType.JJ_DuoKong) {
				if (el.opId == pb.GameOperationId.Ask) {
					pkSelf.onBtnClick({ target: { name: 'mzBtn' } });
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: el.kOffset });
				}
				else if (el.opId == pb.GameOperationId.Short) {
					pkSelf.onBtnClick({ target: { name: 'mdBtn' } });
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: el.kOffset });
				}
				else if (el.opId == pb.GameOperationId.Long) {
					pkSelf.onBtnClick({ target: { name: 'pcBtn1' } });
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: el.kOffset });
				}
				else if (el.opId == pb.GameOperationId.Bid) {
					pkSelf.onBtnClick({ target: { name: 'pcBtn' } });
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: el.kOffset });
				}

			}
		})

		if (GameCfg.GameType == pb.GameType.ZhiBiao) {
			GlobalEvent.emit(EventCfg.SETMARKCOLOR);
		}

		if ((GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) && GameCfg.GAMEFRTD) {
			GameCfg.huizhidatas = GameData.selfEnterRoomData.players[0].curPos;
		}
		else if ((GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong)) {
			GameCfg.huizhidatas = this.gpData.length;
		}

		GlobalEvent.emit('roundNUmber');
	}

	onEnable() {
		this.gpData = GameCfg.data[0].data;

		if (this.gpData.length <= 0) {
			return;
		}

		this.ziChan = JSON.parse(JSON.stringify(GameCfg.ziChan));
		this.onSetMrCount();
		//分仓
		if (GameCfg.GameSet.isFC) {

			this.mcBtn.node.x = -266;
			this.tipsmc.node.active = true;
			this.tipsmr.node.active = true;

			this.mrBtn.node.active = true;
			this.mcBtn.node.active = true;

			this.keMcCount = 0;
			this.mcBtn.interactable = false;
			this.mcBtn.enableAutoGrayEffect = true;
		}
		//不分仓
		else {

			this.tipsmr.node.active = false;
			this.tipsmc.node.active = false;
			this.mrBtn.node.active = true;
			this.mcBtn.node.active = false;
		}

		//不是复盘的情况
		if (!GameCfg.GAMEFUPAN) {
			if (GameCfg.GameType == pb.GameType.QiHuo) {
				let max = 0;
				this.gpData.forEach(el => {
					if (max < el.close) {
						max = el.close;
					}
				});
				this.ziChan = (max * 3);
			}
		}
		//复盘的情况
		else {
			let opt = UpGameOpt.player1Opt;

			this.onGameFUPANOPT(opt);
		}

		//断线重连的情况
		if (GameCfg.GAMEFRTD) {

			UpGameOpt.ChanagekOffset(GameData.selfEnterRoomData.players[0].ops.items);

			this.onGameFUPANOPT(GameData.selfEnterRoomData.players[0].ops.items);
		}

		this.setLabelData();
		this.onShow();
		this.getRaisingLimit(GameCfg.huizhidatas - 1);
	}

	onSetMrCount() {
		if (this.ziChan > 0 && GameCfg.huizhidatas <= this.gpData.length) {
			if (this.gpData[GameCfg.huizhidatas - 1]) {
				this.keMrCount = parseInt(this.ziChan / (parseFloat(this.gpData[GameCfg.huizhidatas - 1].close) * 100) + '') * 100;
			}
		}
	}

	onShow() {
		if (this.gpData.length <= 0) {
			return;
		}
		if (this.keMcCount > 0) {
			this.cyBtn.node.active = true;
			this.gwBtn.node.active = false;
		} else {
			this.gwBtn.node.active = true;
			this.cyBtn.node.active = false;
		}

		let dxnode = this.node.getChildByName('DXInfo');

		if (GameCfg.GameType == pb.GameType.ShuangMang) {
			this.tipsLabel.node.active = true;
			this.tipsLabel1.node.active = false;

		} else if (GameCfg.GameType == pb.GameType.DingXiang && !GameCfg.JJ_XUNLIAN) {
			this.tipsLabel.node.active = true;
			this.tipsLabel1.node.active = false;
			dxnode.active = true;
			if (!GameCfg.GameSet.isFC || GameCfg.GAMEFUPAN) {
				dxnode.x = 0;
				dxnode.children[2].active = false;
				dxnode.children[1].active = false;
				dxnode.getComponent(cc.Layout).spacingX = 100;
			} else if (GameCfg.GameSet.isFC) {
				dxnode.children[2].active = true;
				dxnode.children[1].active = true;
				this.tipsLabel.node.active = false;
				this.tipsLabel1.node.active = true;
			}
		} else if (GameCfg.GameType == pb.GameType.QiHuo) {
			this.tipsLabel.node.active = true;
			this.tipsLabel1.node.active = false;
			dxnode.active = false;
			this.node.getChildByName('qh').active = true;
			this.node.getChildByName('isFC').active = false;
		}
		else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
			this.tipsLabel.node.active = true;
			this.tipsLabel1.node.active = false;
			dxnode.active = false;
			let info = this.node.getChildByName('ZBInfo');
			info.active = true;
			let name = info.getChildByName('name');
			let sT = info.getChildByName('startTime');
			let et = sT.getChildByName('endTime');
			if (GameCfg.GameSet.search == '随机选股') {
				name.getComponent(cc.Label).string = '股票名称：' + '???? ' + ' ' + ' ???? ';
			} else {
				let code = GameCfg.data[0].code;
				if (code.length >= 7) {
					code = code.slice(1);
				}
				name.getComponent(cc.Label).string = GameCfg.data[0].name + ' ' + code;
			}
			if (GameCfg.GameSet.year == '随机') {
				sT.getComponent(cc.Label).string = '起始时间：' + '????';
				et.getComponent(cc.Label).string = '结束时间: ' + '????';
			} else {
				sT.getComponent(cc.Label).string = this.gpData[GameData.huizhidatas - 1].day.replace(/-/g, '/');
				et.getComponent(cc.Label).string = this.gpData[this.gpData.length - 1].day.replace(/-/g, '/');
			}
		}
		console.log('数据长度' + this.gpData.length);
		console.log(GameCfg.huizhidatas);
		this.roundNumber = this.gpData.length - GameCfg.huizhidatas;

		this.tipsLabel.string = '回合数：' + this.roundNumber;
		this.tipsLabel1.string = '回合数：' + this.roundNumber;

		if (GameCfg.GAMEFUPAN) {
			this.onShowGAMEFUPAN();
		} else {
			let code = GameCfg.data[0].code;
			if (code.length >= 7) {
				code = code.slice(1);
			}

			if (GameCfg.GameSet.search == '随机选股') {
				this.gpName.string = '股票名称：' + '???? ' + ' ' + ' ???? ';
			} else {
				this.gpName.string = GameCfg.data[0].name + ' ' + code;
			}

			if (GameCfg.GameSet.year == '随机') {
				this.timeLabel[0].string = '起始时间：' + '????';
				this.timeLabel[1].string = '结束时间: ' + '????';
			} else {
				this.timeLabel[0].string = this.gpData[GameData.huizhidatas - 1].day.replace(/-/g, '/');
				this.timeLabel[1].string = this.gpData[this.gpData.length - 1].day.replace(/-/g, '/');
			}

			this.moneyLabel[0].string = '总资产    ：' + parseInt(GameCfg.ziChan + '');
			this.moneyLabel[1].string = '可用资产：' + parseInt(this.ziChan + '');

			this.priceLabel[0].string = '买入均价：' + 0;

			if (GameCfg.huizhidatas >= 1) {
				this.priceLabel[1].string = '当前价格：' + this.gpData[GameCfg.huizhidatas - 1].close;
			}
		}
	}

	//回合数
	setLabelData() {
		if (this.roundNumber <= 0) {
			this.roundNumber = 0;
		}

		if (!GameCfg.GAMEFUPAN) {
			this.tipsLabel.string = '回合数：' + this.roundNumber;
			this.tipsLabel1.string = '回合数：' + this.roundNumber;

			this.moneyLabel[1].string = '可用资产：' + parseInt(this.ziChan + '');
			if (GameCfg.huizhidatas < this.gpData.length) {
				this.moneyLabel[0].string = '总资产    ：' + parseInt(this.ziChan + this.keMcCount * this.gpData[GameCfg.huizhidatas].close + '');
			}

			if (GameCfg.huizhidatas >= 1 && this.gpData[GameCfg.huizhidatas]) {
				this.priceLabel[1].string = '当前价格：' + (this.gpData[GameCfg.huizhidatas].close).toFixed(2);
			}

			this.onGameQuit();
		}
	}

	//退出游戲
	onGameQuit() {
		if (this.roundNumber <= 0) {
			GameCfg.huizhidatas = this.gpData.length;
			//pk
			if (GameCfg.GameType == pb.GameType.JJ_PK || GameCfg.GameType == pb.GameType.JJ_DuoKong) {
				PopupManager.LoadTipsBox('tipsBox', '您的操作回合数已经用完，请等候其他用户操作结束');

				GameCfg.GAMEWAIT = true;

				GlobalEvent.emit(EventCfg.GAMEWAIT);

				let rate = this.onCurPositionRete(1);

				if (UpGameOpt.player1Opt[UpGameOpt.player1Opt.length - 1].opId == pb.GameOperationId.Short) {
					rate = -rate;

					let item = {
						opId: pb.GameOperationId.Long,
						volume: 1,
						kOffset: GameCfg.huizhidatas,

					}
					UpGameOpt.addOpt(item);
				}
				else if (UpGameOpt.player1Opt[UpGameOpt.player1Opt.length - 1].opId == pb.GameOperationId.Ask) {
					let item = {
						opId: pb.GameOperationId.Bid,
						volume: 1,
						kOffset: GameCfg.huizhidatas,

					}
					UpGameOpt.addOpt(item);
				}

				GameCfg.allRate = (GameCfg.allRate + 1) * (rate + 1) - 1;

				GlobalEvent.emit(EventCfg.UPDATERATE, [0, GameCfg.allRate]);

				UpGameOpt.UpGameOpt(1);
			}
			else {
				GlobalEvent.emit(EventCfg.GAMEOVEER);
			}
			return;
		}
	}

	onClick(event, data) {
		let name = event.target.name;
		//点击买入卖出
		if (name == 'mrBtn' || name == 'mcBtn') {
			if (GameCfg.GameSet.isFC) {

				let point = event.target.convertToWorldSpaceAR(cc.v2(0, 0));

				GlobalEvent.emit(EventCfg.OPENSELECTBOX, point);
				if (name == 'mrBtn') {
					this._type = 1;
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: GameCfg.huizhidatas });
				} else {
					this._type = 2;
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });
				}
			} else {
				this.flag = !this.flag;
				this.mrBtn.node.active = !this.flag;
				this.mcBtn.node.active = this.flag;
				if (name == 'mrBtn') {
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: GameCfg.huizhidatas });

					this.keMcCount += this.keMrCount;
					this.keMrCount = 0;
					this.ziChan -= this.keMcCount * this.gpData[GameCfg.huizhidatas - 1].close;
					this.curMrCount.push(this.keMcCount);

					this.cyBtn.node.active = true;
					this.gwBtn.node.active = false;
					if (this.roundNumber > 0) {
						let item = {
							opId: pb.GameOperationId.Ask,
							volume: 1,
							kOffset: GameCfg.huizhidatas,

						}
						UpGameOpt.addOpt(item);
					}
				} else {
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });

					this.ziChan += this.keMcCount * this.gpData[GameCfg.huizhidatas - 1].close;

					this.curMcCount = JSON.parse(JSON.stringify(this.keMcCount));

					this.keMcCount = 0;
					this.gwBtn.node.active = true;
					this.cyBtn.node.active = false;
					if (this.roundNumber > 0) {
						let item = {
							opId: pb.GameOperationId.Bid,
							volume: 1,
							kOffset: GameCfg.huizhidatas,

						}
						UpGameOpt.addOpt(item);
					}
				}
				this.setRoundNumber(name);
			}
		}
		//点击观望
		else if (name == 'gwBtn' || name == 'cyBtn') {

			this.setRoundNumber(name);
		}
		else if (name == 'xl_fupan_pre') {
			GlobalEvent.emit(EventCfg.CLICKMOVE, 'pre');
		} else if (name == 'xl_fupan_next') {
			GlobalEvent.emit(EventCfg.CLICKMOVE, 'next');
		}

		//开多
		else if (name == 'qhxl_kd') {

			if (this.roundNumber > 0) {
				let item = {
					opId: pb.GameOperationId.Ask,
					volume: 1,
					kOffset: GameCfg.huizhidatas,
				}
				UpGameOpt.addOpt(item);
			}

			if (this._KKCount != 0) {

				this.curMcCount = 3;
				//this.curMrCount.push(this.curMrCount);
				this.ziChan += (this.curMcCount * this.gpData[GameCfg.huizhidatas - 1].close);
				this._KKCount = 0;
				this._kdCount = 0;


				this.gwBtn.node.active = true;
				this.cyBtn.node.active = false;

				let nodes = this.kdNode.children;
				nodes.forEach(el => {
					el.active = false;
				});
				nodes[this._kdCount].active = true;
				let fsNodes = this.fsNode.children;
				fsNodes[0].active = true;
				fsNodes[1].active = false;

				let kkNodes = this.kkNode.children;
				kkNodes.forEach(el => {
					el.active = false;
				})
				kkNodes[this._KKCount].active = true;
				GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });
				this.setRoundNumber('mcBtn1');
			}

			else {
				this._kdCount += 1;
				this.ziChan -= (1 * this.gpData[GameCfg.huizhidatas - 1].close);
				this.curMrCount.push(1);
				let nodes = this.kdNode.children;
				nodes.forEach(el => {
					el.active = false;
				});
				nodes[this._kdCount].active = true;

				this.cyBtn.node.active = true;
				this.gwBtn.node.active = false;

				let fsNodes = this.fsNode.children;
				fsNodes[0].active = false;
				fsNodes[1].active = true;

				let kkNodes = this.kkNode.children;
				kkNodes.forEach(el => {
					el.active = false;
				})
				kkNodes[4].active = true;
				GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: GameCfg.huizhidatas });
				this.setRoundNumber('mrBtn');
			}

		}
		//反手
		else if (name == 'qhxl_fs') {
			if (this.roundNumber > 0) {
				let item = {
					opId: pb.GameOperationId.Bid_Force,
					volume: 1,
					kOffset: GameCfg.huizhidatas,

				}
				UpGameOpt.addOpt(item);
			}
			GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });
			if (this._kdCount != 0) {
				this.curMcCount = this._kdCount;
				//	this.ziChan += (this.curMcCount * this.gpData[GameCfg.huizhidatas - 1].close);
				this.setRoundNumber('mcBtn', 1);
				this._KKCount = this._kdCount;
				//	this.ziChan -= (this._KKCount * this.gpData[GameCfg.huizhidatas - 1].close);
				this._kdCount = 0;
				this.curMrCount.push(this._KKCount);
				let kkNodes = this.kkNode.children;
				kkNodes.forEach(el => {
					el.active = false;
				})
				kkNodes[this._KKCount].active = true;

				let fsNodes = this.fsNode.children;
				fsNodes[0].active = false;
				fsNodes[1].active = true;

				this.cyBtn.node.active = true;
				this.gwBtn.node.active = false;

				let nodes = this.kdNode.children;
				nodes.forEach(el => {
					el.active = false;
				});
				nodes[4].active = true;
				//	if (!GameCfg.GAMEFUPAN) {
				this.setRoundNumber('mrBtn1');
				//	}

			} else {
				this.curMcCount = this._KKCount;

				this.setRoundNumber('mcBtn1', 1);
				this._kdCount = this._KKCount;
				this._KKCount = 0;
				this.curMrCount.push(this._kdCount);
				let nodes = this.kdNode.children;
				nodes.forEach(el => {
					el.active = false;
				});
				nodes[this._kdCount].active = true;

				this.cyBtn.node.active = true;
				this.gwBtn.node.active = false;

				let fsNodes = this.fsNode.children;
				fsNodes[0].active = false;
				fsNodes[1].active = true;

				let kkNodes = this.kkNode.children;
				kkNodes.forEach(el => {
					el.active = false;
				})
				kkNodes[4].active = true;
				//	if (!GameCfg.GAMEFUPAN) {
				this.setRoundNumber('mrBtn');
				//	}
			}
			GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: GameCfg.huizhidatas });

		}
		else if (name == 'qhxl_kk') {
			if (this.roundNumber > 0) {
				let item = {
					opId: pb.GameOperationId.Short,
					volume: 1,
					kOffset: GameCfg.huizhidatas,

				}
				UpGameOpt.addOpt(item);
			}
			if (this._kdCount != 0) {
				this.curMcCount = 3;
				this.ziChan += (this.curMcCount * this.gpData[GameCfg.huizhidatas - 1].close);
				//this.curMrCount.push(3);
				this._kdCount = 0;
				this._KKCount = 0;

				this.gwBtn.node.active = true;
				this.cyBtn.node.active = false;

				let nodes = this.kdNode.children;
				nodes.forEach(el => {
					el.active = false;
				});
				nodes[this._kdCount].active = true;
				let fsNodes = this.fsNode.children;
				fsNodes[0].active = true;
				fsNodes[1].active = false;

				let kkNodes = this.kkNode.children;
				kkNodes.forEach(el => {
					el.active = false;
				})
				kkNodes[this._KKCount].active = true;
				GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });
				this.setRoundNumber('mcBtn');
			}

			else {
				this._KKCount += 1;
				this.ziChan -= (1 * this.gpData[GameCfg.huizhidatas - 1].close);
				this.curMrCount.push(1);
				let nodes = this.kkNode.children;
				nodes.forEach(el => {
					el.active = false;
				});
				nodes[this._KKCount].active = true;

				this.cyBtn.node.active = true;
				this.gwBtn.node.active = false;

				let fsNodes = this.fsNode.children;
				fsNodes[0].active = false;
				fsNodes[1].active = true;

				let kdNodes = this.kdNode.children;
				kdNodes.forEach(el => {
					el.active = false;
				})
				kdNodes[4].active = true;
				GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: GameCfg.huizhidatas });
				this.setRoundNumber('mrBtn1');
			}

		}

		//
		else if (name == 'zhangBtn' || name == 'dieBtn') {
			if (this.limitUP == 1) {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '涨停板不能买入！');
			} else if (this.limitUP == 2) {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '跌停板不能卖出！');
			}
		}
	}

	setRoundNumber(name?, flag?) {
		//买入卖出回合数
		this.getRaisingLimit(GameCfg.huizhidatas);

		if ((this.roundNumber > 0 && name) || GameCfg.GAMEFUPAN) {

			this.onBuyOrSell(name);
		}
		if (!flag) {
			this.roundNumber -= 1;
			this.setLabelData();
			//绘制下回合的走势线
			GlobalEvent.emit('roundNUmber');
		}

		this.onSetMrCount();

		//事件通知
		GlobalEvent.emit(EventCfg.SLGEVENTNOTICE);

		//
		DrawData.reseleData();

		this.priceLabel[0].string = '买入均价：' + this.onjunjia().toFixed(2);
	}

	onsetCurMrCount(mc) {
		let num = 0;
		this.curMrCount.forEach(el => {
			num += el;
		})
		num -= mc;
		if (num <= 0) {
			this.curMrCount = [];
		} else {
			this.curMrCount = [];
			this.curMrCount.push(num);
		}
	}

	//买入的均价
	onjunjia() {
		let data = this.gpData;
		let mrZE = 0, mrZL = 0;
		if (this.curMrCount.length == 0) {
			return 0;
		}

		this.curMrCount.forEach((el, index) => {
			mrZL += parseInt(el);
			if (index == 0 && this.curMrPJPrice != 0) {
				mrZE += (el * this.curMrPJPrice);
			} else {
				//console.log()
				if (data[this.buyData[index]]) {
					mrZE += (el * data[this.buyData[index]].close);
				}
			}
		})
		return mrZE / mrZL;
	}

	onCurPositionRete(type?) {
		let num = 0;
		if (type) {
			num = 1;
		}
		let data = this.gpData;
		if (!data[GameCfg.huizhidatas - num]) { return 0 }
		let curClose = parseFloat(data[GameCfg.huizhidatas - num].close);

		let preClose = this.onjunjia();
		if (!preClose) {
			return 0;
		}
		let prezl = 0;
		this.curMrCount.forEach((el) => {
			prezl += el;
		})

		let rate = (curClose - preClose) / preClose;

		return rate;
	}

	onAllPositionRete() {

		let data = this.gpData;
		let curClose = parseFloat(data[GameCfg.huizhidatas - 1].close);

		let preClose = this.onjunjia();
		let prezl = 0;
		this.curMrCount.forEach((el) => {
			prezl += el;
		})
		let rate = (curClose * prezl - preClose * prezl) / GameCfg.ziChan;

		return rate;
	}

	onBuyOrSell(state) {

		//买入
		let data = this.gpData;
		if (state == 'mrBtn' || state == 'mrBtn1') {
			this.buyData.push(GameCfg.huizhidatas - 1);

			let rate = this.onCurPositionRete();

			let sign = 1;
			if (state == 'mrBtn1') {
				rate = -rate;
				sign = 2;
			}

			GlobalEvent.emit(EventCfg.UPDATERATE, [rate]);

			this.isFlag = true;
			let start = GameCfg.huizhidatas;

			this.rateItem = {
				rate: rate,
				start: start,
				end: null,
				state: sign,
			};
			if (GameCfg.fill.length > 0 && GameCfg.fill[GameCfg.fill.length - 1].end) {
				GameCfg.fill.push(this.rateItem);
			} else if (GameCfg.fill.length == 0) {
				GameCfg.fill.push(this.rateItem);
			} else {
				GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
			}
			GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);

		}

		//卖出
		else if (state == 'mcBtn' || state == 'mcBtn1') {

			this.saleData.push(GameCfg.huizhidatas - 1);

			let preClose = this.onjunjia();
			//	this.onjunjia('S');
			let prezl = 0;
			this.curMrCount.forEach((el) => {
				prezl += el;
			})

			let rate, allRate;
			rate = this.onCurPositionRete(1);

			if (GameCfg.GameType == pb.GameType.QiHuo || !GameCfg.GameSet.isFC) {

				if (state == 'mcBtn1') {
					rate = -rate;
				}

				GameCfg.allRate = (GameCfg.allRate + 1) * (rate + 1) - 1;
			} else {

				allRate = (this.ziChan + this.keMcCount * preClose - GameCfg.ziChan) / GameCfg.ziChan;
				GameCfg.allRate = allRate;
			}

			this.curMrCount = [];

			GlobalEvent.emit(EventCfg.UPDATERATE, [rate, GameCfg.allRate]);

			if (this.keMcCount == 0) {
				this.isFlag = false;
				this.rateItem.end = GameCfg.huizhidatas - 1;

				GameCfg.fill.forEach(el => {
					if (!el.end) {
						el.end = this.rateItem.end;
					}
				});

				this.curMrPJPrice = 0;
			} else {
				this.curMrPJPrice = preClose;

				this.curMrCount.push(prezl - this.curMcCount);

				this.rateItem.end = GameCfg.huizhidatas - 1;
				let start = GameCfg.huizhidatas;

				this.rateItem = {
					rate: rate,
					start: start,
					end: null,
					state: false,
				};
				GameCfg.fill.push(this.rateItem);

				//下个持仓率
				let rate1 = this.onCurPositionRete();
				GlobalEvent.emit(EventCfg.UPDATERATE, [rate1]);
			}
			this.rateItem.rate = rate;
			if (GameCfg.GameType == pb.GameType.QiHuo) {
				GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
				GameCfg.fill[GameCfg.fill.length - 1].end = GameCfg.huizhidatas - 1;
			} else {

				if (GameCfg.fill[GameCfg.fill.length - 1]) {
					GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
				}

			}

			GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);

			this.buyData = [];
			if (this.curMrCount.length >= 1) {
				this.buyData.push(GameCfg.huizhidatas - 1);
			}

		}

		//观望
		else if (state == 'cyBtn') {
			if (!this.isFlag) {
				return;
			}

			let rate = this.onCurPositionRete();

			if (this._KKCount > 0) {
				rate = -rate;
			}

			GlobalEvent.emit(EventCfg.UPDATERATE, [rate]);

			GameCfg.fill[GameCfg.fill.length - 1].rate = rate;

			GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
		}
	}

	onDestroy() {
		if (GameCfg.GameType == pb.GameType.JJ_PK) {
			LoadUtils.releaseRes('Prefabs/tipsBox');
		}

		GlobalEvent.off(EventCfg.GAMEOVEER);
		GlobalEvent.off(EventCfg.GAMEFUPAN);
		GlobalEvent.off('HIDEBOTTOMNODE');

		GlobalEvent.off(EventCfg.CLICKFCBTN);
		GlobalEvent.off(EventCfg.GAMEFUPANOPT);

	}

	//获取涨停板
	getRaisingLimit(number) {
		this.zhangting.active = false;
		this.dieting.active = false;
		this.limitUP = 0;

		this.limitUP = DrawData.getRaisingLimit(number, true);
		if (this.limitUP == 1) {
			this.zhangting.active = true;
		}
		else if (this.limitUP == 2) {
			this.dieting.active = true;
		}

		GlobalEvent.emit(EventCfg.RAISINGLIMIT, this.limitUP);
	}
}
