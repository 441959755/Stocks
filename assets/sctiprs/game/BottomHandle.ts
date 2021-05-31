import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from './GameCfg';
import { pb } from '../../protos/proto';
import ComUtils from '../Utils/ComUtils';
import DrawData from './DrawData';
import GameData from '../GameData';

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

	@property(cc.Node)
	selectBox: cc.Node = null;

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

	rateItem = null;

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

	//	allButData = [];

	onLoad() {
		this.gpData = GameCfg.data[0].data;

		if (this.gpData.length <= 0) {
			return;
		}

		GlobalEvent.on(
			EventCfg.GAMEOVEER,
			(flag) => {
				let count = 1;
				//	if (!flag) { count = 1 }
				if (this.keMcCount > 0 || (this._KKCount != 0 || this._kdCount != 0)) {

					this.ziChan += this.keMcCount * this.gpData[GameCfg.huizhidatas - count].close;

					this.moneyLabel[0].string = '总资产    ：' + parseInt(this.ziChan + '');
					this.moneyLabel[1].string = '可用资产：' + parseInt(this.ziChan + '');
					this.moneyLabel[1].string = '可用资产：' + parseInt(this.ziChan + '');
					this.keMcCount = 0;
					let curClose = parseFloat(this.gpData[GameCfg.huizhidatas - count].close);
					//	let preClose = parseFloat(this.gpData[this.buyData[this.buyData.length - 1]].close);
					let preClose = this.onjunjia();

					let rate = this.onCurPositionRete(count);

					//	let rate = (this.ziChan + this.keMcCount * preClose - GameCfg.ziChan) / GameCfg.ziChan;

					if (GameCfg.GameType == pb.GameType.QiHuo || !GameCfg.GameSet.isFC) {
						//	rate = this.onAllPositionRete();
						if (this._KKCount != 0) {
							rate = -rate;
							//	this.ziChan = rate * GameCfg.ziChan + GameCfg.ziChan;
						}
						GameCfg.allRate = (GameCfg.allRate + 1) * (rate + 1) - 1;
					} else {
						GameCfg.allRate = (this.ziChan + this.keMcCount * preClose - GameCfg.ziChan) / GameCfg.ziChan;
					}

					if (rate < 0) {
						GameCfg.lossCount++;
					} else {
						GameCfg.profitCount++;
					}

					GlobalEvent.emit('updateRate', [0, GameCfg.allRate]);

					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });

				}
				GameCfg.finalfund = this.ziChan;

				this.curMrPJPrice = 0;   //当前平均买入价格

				this.curMrCount = [];

				this.curMcCount = 0;
				//	this.allButData = [];
				this.buyData = [];
				//	this.saleData = [];

			},
			this
		);

		GlobalEvent.on(
			EventCfg.GAMEFUPAN,
			() => {
				this.node.children.forEach(el => {
					el.active = false;
				});
				if (GameCfg.GameType == pb.GameType.ShuangMang) {
					let node = this.node.getChildByName('fupan');
					node.active = true;
					node.children[0].getComponent(cc.Label).string = GameCfg.data[0].name;
					node.children[1].getComponent(cc.Label).string = ComUtils.formatTime(this.gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(this.gpData[GameCfg.huizhidatas - 1].day);

					let tq = ((this.gpData[GameCfg.huizhidatas - 1].close - this.gpData[GameData.huizhidatas - 1].close) / this.gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);
					node.children[2].getComponent(cc.Label).string = '同期涨幅:' + tq + '%';
					let node1 = this.node.getChildByName('fupan1');
					node1.active = true;
				} else if (GameCfg.GameType == pb.GameType.DingXiang) {
					let node = this.node.getChildByName('fupan1');
					node.active = true;
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
					// dxnode.getComponent(cc.Layout).spacingX = 100;
				}
				else if (GameCfg.GameType == pb.GameType.QiHuo) {
					let node = this.node.getChildByName('fupan');
					node.active = true;
					node.children[0].getComponent(cc.Label).string = GameCfg.data[0].name;
					// node.children[1].getComponent(cc.Label).string = this.gpData[0].day.replace(/-/g, '/') + '--' + this.gpData[this.gpData.length - 1].day.replace(/-/g, '/');
					node.children[1].getComponent(cc.Label).string = ComUtils.formatTime(this.gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(this.gpData[GameCfg.huizhidatas - 1].day)
					let tq = ((this.gpData[GameCfg.huizhidatas - 1].close - this.gpData[GameData.huizhidatas - 1].close) / this.gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);
					node.children[2].getComponent(cc.Label).string = '同期涨幅:' + tq + '%';
					let node1 = this.node.getChildByName('fupan1');
					node1.active = false;
					let node = this.node.getChildByName('fupan1');
					node.active = true;
				}
			},
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
	}

	protected start() {
		if (!GameCfg.GAMEFUPAN) {
			if (GameCfg.GameType == pb.GameType.QiHuo) {
				let max = 0;
				this.gpData.forEach(el => {
					if (max < el.close) {
						max = el.close;
					}
				});
				this.ziChan = (max * 3);
			} else {
				this.ziChan = JSON.parse(JSON.stringify(GameCfg.ziChan));
			}

		} else {
			this.ziChan = GameCfg.finalfund;
		}

		this.selectBox.active = false;
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
		this.onSetMrCount();
		this.setLabelData();
		this.onShow();
	}

	onSetMrCount() {
		if (this.ziChan > 0 && GameCfg.huizhidatas <= this.gpData.length) {
			if (this.gpData[GameCfg.huizhidatas - 1]) {
				this.keMrCount = parseInt(this.ziChan / (parseFloat(this.gpData[GameCfg.huizhidatas - 1].close) * 100) + '') * 100;
				//	console.log(this.gpData[GameCfg.huizhidatas - 1].close);
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

		let dxnode = this.timeLabel[0].node.parent.parent;

		if (GameCfg.GameType == pb.GameType.ShuangMang) {
			this.tipsLabel.node.active = true;
			this.tipsLabel1.node.active = false;
			dxnode.active = false;
		} else if (GameCfg.GameType == pb.GameType.DingXiang) {

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
				et.getComponent(cc.Label).string = '结束时间:' + '????';
			} else {
				sT.getComponent(cc.Label).string = ComUtils.formatTime(this.gpData[GameData.huizhidatas - 1].day);
				et.getComponent(cc.Label).string = this.gpData[this.gpData.length - 1].day.replace(/-/g, '/');
			}
		}

		this.roundNumber = this.gpData.length - GameCfg.huizhidatas;

		this.tipsLabel.string = '回合数：' + this.roundNumber;
		this.tipsLabel1.string = '回合数：' + this.roundNumber;

		if (GameCfg.GAMEFUPAN) {
			this.node.children.forEach(el => {
				el.active = false;
			});
			let node = this.node.getChildByName('fupan1');
			node.active = true;

			if (GameCfg.GameType == pb.GameType.QiHuo) {

				let node = this.node.getChildByName('fupan');
				node.active = true;
				node.children[0].getComponent(cc.Label).string = GameCfg.data[0].name;
				// node.children[1].getComponent(cc.Label).string = this.gpData[0].day.replace(/-/g, '/') + '--' + this.gpData[this.gpData.length - 1].day.replace(/-/g, '/');
				node.children[1].getComponent(cc.Label).string = ComUtils.formatTime(this.gpData[GameData.huizhidatas - 1].day) + '--' + ComUtils.formatTime(this.gpData[GameCfg.huizhidatas - 1].day)
				let tq = ((this.gpData[GameCfg.huizhidatas - 1].close - this.gpData[GameData.huizhidatas - 1].close) / this.gpData[GameData.huizhidatas - 1].close * 100).toFixed(2);
				// ((gpData[GameCfg.huizhidatas - 1].close - gpData[GameData.huizhidatas - 1].close) / gpData[0].close).toFixed(2),
				node.children[2].getComponent(cc.Label).string = '同期涨幅:' + tq + '%';
				let node1 = this.node.getChildByName('fupan1');
				node1.active = false;
				// let node = this.node.getChildByName('fupan1');
				// node.active = true;
			}

			else if (GameCfg.GameType == pb.GameType.DingXiang) {
				dxnode.active = true;
				let code = GameCfg.data[0].code;
				if (code.length >= 7) {
					code = code.slice(1);
				}

				this.gpName.string = GameCfg.data[0].name + ' ' + code;
				this.timeLabel[0].string = ComUtils.formatTime(this.gpData[GameData.huizhidatas - 1].day);
				this.timeLabel[1].string = this.gpData[GameCfg.huizhidatas - 1].day.replace(/-/g, '/');

				this.moneyLabel[0].string = '总资产    ：' + GameCfg.ziChan;
				this.moneyLabel[1].string = '可用资产：' + GameCfg.finalfund;

				let datas = GameCfg.history.deal;

				console.log(JSON.stringify(datas));
				let count = 0,
					yingcount = 0,
					kuiCount = 0;
				for (let i = 0; i < datas.length; i++) {
					if (datas[i][2] >= 0) {
						yingcount++;
					} else {
						kuiCount++;
					}
				}
				this.priceLabel[0].string = '盈利操作次数：' + yingcount;
				this.priceLabel[1].string = '亏损操作次数：' + kuiCount;
			}
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
				this.timeLabel[1].string = '结束时间:' + '????';
			} else {
				this.timeLabel[0].string = ComUtils.formatTime(this.gpData[GameData.huizhidatas - 1].day);
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
			//    if (!GameCfg.GAMEFUPAN) {
			this.moneyLabel[1].string = '可用资产：' + parseInt(this.ziChan + '');
			if (GameCfg.huizhidatas < this.gpData.length) {
				this.moneyLabel[0].string = '总资产    ：' + parseInt(this.ziChan + this.keMcCount * this.gpData[GameCfg.huizhidatas].close + '');
			}

			if (GameCfg.huizhidatas >= 1 && this.gpData[GameCfg.huizhidatas]) {
				this.priceLabel[1].string = '当前价格：' + (this.gpData[GameCfg.huizhidatas].close).toFixed(2);
			}

			if (this.roundNumber <= 0) {
				GameCfg.huizhidatas = this.gpData.length;
				GlobalEvent.emit(EventCfg.GAMEOVEER, true);
				return;
			}
		}
	}

	onClick(event, data) {
		let name = event.target.name;
		//点击买入卖出
		if (name == 'mrBtn' || name == 'mcBtn') {
			if (GameCfg.GameSet.isFC) {
				this.selectBox.active = true;
				let point = event.target.convertToWorldSpaceAR(cc.v2(0, 0));

				this.selectBox.x = this.selectBox.parent.convertToNodeSpaceAR(point).x;

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
				} else {
					GlobalEvent.emit(EventCfg.ONADDMARK, { type: 3, index: GameCfg.huizhidatas });

					this.ziChan += this.keMcCount * this.gpData[GameCfg.huizhidatas - 1].close;
					//   console.log(this.gpData[GameCfg.huizhidatas - 1].close);
					//	this.curMrCount = [];
					this.curMcCount = JSON.parse(JSON.stringify(this.keMcCount));
					//	console.log(JSON.stringify(this.curMcCount));

					this.keMcCount = 0;
					this.gwBtn.node.active = true;
					this.cyBtn.node.active = false;
				}
				this.setRoundNumber(name);
			}
		}
		//点击观望
		else if (name == 'gwBtn' || name == 'cyBtn') {
			this.setRoundNumber(name);
		}
		//全仓
		else if (name == 'fcBtn') {
			//买入
			if (this._type == 1) {
				this.keMcCount += this.keMrCount;

				this.ziChan -= this.keMrCount * this.gpData[GameCfg.huizhidatas - 1].close;
				this.curMrCount.push(this.keMrCount);
				this.keMrCount = 0;
				// console.log(this.gpData[GameCfg.huizhidatas - 2].open);

				//	console.log(JSON.stringify(this.curMrCount));
				this.mrBtn.interactable = false;
				this.mrBtn.enableAutoGrayEffect = true;
				this.mcBtn.interactable = true;
				this.mcBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mrBtn');
			}
			//卖出
			else {
				this.mrBtn.interactable = true;
				this.mrBtn.enableAutoGrayEffect = false;
				this.mcBtn.interactable = false;
				this.mcBtn.enableAutoGrayEffect = true;
				this.ziChan += this.keMcCount * this.gpData[GameCfg.huizhidatas - 1].close;
				//	this.curMrCount = [];
				//    console.log(this.gpData[GameCfg.huizhidatas - 1].close);
				this.curMcCount = JSON.parse(JSON.stringify(this.keMcCount));
				//console.log(JSON.stringify(this.curMcCount));
				this.keMcCount = 0;
				this.setRoundNumber('mcBtn');
			}
			this.selectBox.active = false;
		}
		//3/4
		else if (name == 'fcBtn1') {
			if (this._type == 1) {
				// this.keMcCount += parseFloat(this.ziChan * (3 / 4) / this.gpData[GameCfg.huizhidatas - 1].open + '');
				let count = parseInt(((3 / 4) * this.keMrCount) / 100 + '') * 100;
				if (count < 100) {
					count = 100;
				}

				this.keMcCount += count;
				this.keMrCount -= count;
				this.curMrCount.push(count);
				this.ziChan -= count * this.gpData[GameCfg.huizhidatas - 1].close;
				//  this.keMrCount -= this.keMrCount * (3 / 4);

				if (this.keMrCount < 100) {
					this.mrBtn.interactable = false;
					this.mrBtn.enableAutoGrayEffect = true;
				}
				this.mcBtn.interactable = true;
				this.mcBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mrBtn');
			} else {
				let mc = parseInt((this.keMcCount * (3 / 4)) / 100 + '') * 100;
				if (mc <= 100) {
					mc = 100;
				}
				this.keMcCount -= mc;

				this.ziChan += mc * this.gpData[GameCfg.huizhidatas - 1].close;
				//  this.keMcCount -= this.keMcCount * (3 / 4);
				this.curMcCount = mc;
				if (this.keMcCount <= 0) {
					this.mcBtn.interactable = false;
					this.mcBtn.enableAutoGrayEffect = true;
				}
				this.mrBtn.interactable = true;
				this.mrBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mcBtn');
				//	this.onsetCurMrCount(mc);
			}
			this.selectBox.active = false;
		} else if (name == 'fcBtn2') {
			if (this._type == 1) {
				//  this.keMcCount += parseFloat(this.ziChan * (2 / 3) / this.gpData[GameCfg.huizhidatas - 1].open + '');
				let count = parseInt(((2 / 3) * this.keMrCount) / 100 + '') * 100;
				if (count < 100) {
					count = 100;
				}
				this.keMcCount += count;
				this.keMrCount -= count;
				this.ziChan -= count * this.gpData[GameCfg.huizhidatas - 1].close;
				this.curMrCount.push(count);
				if (this.keMrCount < 100) {
					this.mrBtn.interactable = false;
					this.mrBtn.enableAutoGrayEffect = true;
				}
				this.mcBtn.interactable = true;
				this.mcBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mrBtn');
			} else {
				let mc = parseInt((this.keMcCount * (2 / 3)) / 100 + '') * 100;
				if (mc <= 100) {
					mc = 100;
				}
				this.keMcCount -= mc;

				this.ziChan += mc * this.gpData[GameCfg.huizhidatas - 1].close;
				this.curMcCount = mc;
				if (this.keMcCount <= 0) {
					this.mcBtn.interactable = false;
					this.mcBtn.enableAutoGrayEffect = true;
				}
				this.mrBtn.interactable = true;
				this.mrBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mcBtn');
				//	this.onsetCurMrCount(mc);
			}
			this.selectBox.active = false;
		} else if (name == 'fcBtn3') {
			if (this._type == 1) {
				let count = parseInt(((1 / 2) * this.keMrCount) / 100 + '') * 100;
				if (count < 100) {
					count = 100;
				}
				this.keMcCount += count;
				this.keMrCount -= count;
				this.ziChan -= count * this.gpData[GameCfg.huizhidatas - 1].close;
				this.curMrCount.push(count);
				if (this.keMrCount < 100) {
					this.mrBtn.interactable = false;
					this.mrBtn.enableAutoGrayEffect = true;
				}
				this.mcBtn.interactable = true;
				this.mcBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mrBtn');
			} else {
				let mc = parseInt((this.keMcCount * (1 / 2)) / 100 + '') * 100;
				if (mc <= 100) {
					mc = 100;
				}
				this.keMcCount -= mc;

				this.ziChan += mc * this.gpData[GameCfg.huizhidatas - 1].close;
				this.curMcCount = mc;
				if (this.keMcCount <= 0) {
					this.mcBtn.interactable = false;
					this.mcBtn.enableAutoGrayEffect = true;
				}
				this.mrBtn.interactable = true;
				this.mrBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mcBtn');
				//this.onsetCurMrCount(mc);
			}
			this.selectBox.active = false;
		} else if (name == 'fcBtn4') {
			if (this._type == 1) {
				let count = parseInt(((1 / 3) * this.keMrCount) / 100 + '') * 100;
				if (count < 100) {
					count = 100;
				}
				this.keMcCount += count;
				this.keMrCount -= count;
				this.ziChan -= count * this.gpData[GameCfg.huizhidatas - 1].close;
				this.curMrCount.push(count);
				if (this.keMrCount < 100) {
					this.mrBtn.interactable = false;
					this.mrBtn.enableAutoGrayEffect = true;
				}
				this.mcBtn.interactable = true;
				this.mcBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mrBtn');
			} else {
				let mc = parseInt((this.keMcCount * (1 / 3)) / 100 + '') * 100;
				if (mc <= 100) {
					mc = 100;
				}
				this.keMcCount -= mc;

				this.ziChan += mc * this.gpData[GameCfg.huizhidatas - 1].close;
				this.curMcCount = mc;
				if (this.keMcCount <= 0) {
					this.mcBtn.interactable = false;
					this.mcBtn.enableAutoGrayEffect = true;
				}
				this.mrBtn.interactable = true;
				this.mrBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mcBtn');
				//	this.onsetCurMrCount(mc);
			}
			this.selectBox.active = false;
		} else if (name == 'fcBtn5') {
			if (this._type == 1) {
				let count = parseInt(((1 / 4) * this.keMrCount) / 100 + '') * 100;
				if (count < 100) {
					count = 100;
				}
				this.keMcCount += count;
				this.keMrCount -= count;
				this.ziChan -= count * this.gpData[GameCfg.huizhidatas - 1].close;
				this.curMrCount.push(count);
				if (this.keMrCount < 100) {
					this.mrBtn.interactable = false;
					this.mrBtn.enableAutoGrayEffect = true;
				}
				this.mcBtn.interactable = true;
				this.mcBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mrBtn');
			} else {
				let mc = parseInt((this.keMcCount * (1 / 4)) / 100 + '') * 100;

				if (mc <= 100) {
					mc = 100;
				}

				this.keMcCount -= mc;

				this.ziChan += mc * this.gpData[GameCfg.huizhidatas - 1].close;
				this.curMcCount = mc;
				if (this.keMcCount <= 0) {
					this.mcBtn.interactable = false;
					this.mcBtn.enableAutoGrayEffect = true;
				}
				this.mrBtn.interactable = true;
				this.mrBtn.enableAutoGrayEffect = false;
				this.setRoundNumber('mcBtn');
				//	this.onsetCurMrCount(mc);
			}
			this.selectBox.active = false;
		} else if (name == 'xl_fupan_pre') {
			GlobalEvent.emit(EventCfg.CLICKMOVE, 'pre');
		} else if (name == 'xl_fupan_next') {
			GlobalEvent.emit(EventCfg.CLICKMOVE, 'next');
		}

		//开多
		else if (name == 'qhxl_kd') {

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
				this.setRoundNumber('mrBtn1');
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
				this.setRoundNumber('mrBtn');
			}
			GlobalEvent.emit(EventCfg.ONADDMARK, { type: 2, index: GameCfg.huizhidatas });
		}
		else if (name == 'qhxl_kk') {

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

	}

	setRoundNumber(name?, flag?) {
		//买入卖出回合数
		if (this.roundNumber > 0 && name) {
			//  GlobalEvent.emit('onBuyOrSell', name);
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
				if (this.buyData[index] && data[this.buyData[index]]) {
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
		let curClose = parseFloat(data[GameCfg.huizhidatas - num].close);

		let preClose = this.onjunjia();
		let prezl = 0;
		this.curMrCount.forEach((el) => {
			prezl += el;
		})
		//	console.log(JSON.stringify(this.curMrCount));

		let rate = (curClose - preClose) / preClose;

		// console.log('(' + curClose + '-' + preClose + ')' + '/' + preClose);
		// console.log('rete=' + rate);
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
			//	this.allButData.push(GameCfg.huizhidatas - 1);

			let rate = this.onCurPositionRete();

			if (state == 'mrBtn1') {
				rate = -rate;
			}
			//   console.log('(' + curClose + '-' + preClose + ')' + "/" + preClose);
			GlobalEvent.emit('updateRate', [rate]);

			this.isFlag = true;
			let start = GameCfg.huizhidatas;


			this.rateItem = {
				rate: rate,
				start: start,
				end: null
			};

			GameCfg.history.deal[GameCfg.history.deal.length] = [GameCfg.huizhidatas - 1, null, null];

			//	if (GameCfg.GameType == pb.GameType.QiHuo) {
			if (GameCfg.fill.length > 0 && GameCfg.fill[GameCfg.fill.length - 1].end) {
				GameCfg.fill.push(this.rateItem);
			} else if (GameCfg.fill.length == 0) {
				GameCfg.fill.push(this.rateItem);
			} else {
				GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
			}

			//	} else {
			//GameCfg.fill.push(this.rateItem);
			//	}


			GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
		}

		//卖出
		else if (state == 'mcBtn' || state == 'mcBtn1') {

			// if (this.curMcCount == 0) {
			// 	GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '卖出要100股起哦');
			// 	return
			// }

			this.saleData.push(GameCfg.huizhidatas - 1);

			let curClose = parseFloat(data[GameCfg.huizhidatas - 1].close);

			//let preClose = parseFloat(data[this.buyData[this.buyData.length - 1]].close);
			// let mrZE = 0, mrZL = 0;
			// this.curMrCount.forEach((el, index) => {
			// 	mrZL += el;
			// 	mrZE += (el * data[this.buyData[index]].close);
			// })
			// let preClose = mrZE / mrZL;
			let preClose = this.onjunjia();
			//	this.onjunjia('S');
			let prezl = 0;
			this.curMrCount.forEach((el) => {
				prezl += el;
			})

			//	let rate = (curClose * this.curMcCount - preClose * this.curMcCount) / (preClose * prezl);
			//let rate = (curClose * this.curMcCount - preClose * this.curMcCount) / GameCfg.ziChan;
			let rate, allRate;
			rate = this.onCurPositionRete(1);
			if (GameCfg.GameType == pb.GameType.QiHuo) {
				// 	rate = this.onAllPositionRete();
				if (state == 'mcBtn1') {
					rate = -rate;
					// 		//	this.ziChan = rate * GameCfg.ziChan + GameCfg.ziChan;
				}
				GameCfg.allRate = (GameCfg.allRate + 1) * (rate + 1) - 1;
			} else {

				allRate = (this.ziChan + this.keMcCount * preClose - GameCfg.ziChan) / GameCfg.ziChan;
				GameCfg.allRate = allRate;
			}


			this.curMrCount = [];
			//	if (prezl - this.curMcCount > 0) {
			// this.curMrPJPrice = (preClose * prezl - curClose * this.curMcCount) / (prezl - this.curMcCount);

			//	}

			// if (state == 'mcBtn1') {
			// 	rate = -rate;
			// 	//	this.ziChan = rate * GameCfg.ziChan + GameCfg.ziChan;

			// } else {

			//	}
			//  console.log('(' + curClose + '-' + preClose + ')' + "/" + preClose);
			///	GameCfg.allRate = (GameCfg.allRate + 1) * (rate + 1) - 1;


			//盈利亏损次数
			if (rate < 0) {
				GameCfg.lossCount++;
			} else {
				GameCfg.profitCount++;
			}

			GlobalEvent.emit('updateRate', [rate, GameCfg.allRate]);

			if (this.keMcCount == 0) {
				this.isFlag = false;
				this.rateItem.end = GameCfg.huizhidatas - 1;

				GameCfg.fill.forEach(el => {
					if (!el.end) {
						el.end = this.rateItem.end;
					}
				});

				GameCfg.history.deal[GameCfg.history.deal.length - 1][1] = GameCfg.huizhidatas - 2;
				GameCfg.history.deal[GameCfg.history.deal.length - 1][2] = rate;
				this.curMrPJPrice = 0;
			} else {
				this.curMrPJPrice = preClose;

				this.curMrCount.push(prezl - this.curMcCount);

				this.rateItem.end = GameCfg.huizhidatas - 1;
				let start = GameCfg.huizhidatas;

				this.rateItem = {
					rate: rate,
					start: start,
					end: null
				};
				GameCfg.fill.push(this.rateItem);

				GameCfg.history.deal[GameCfg.history.deal.length - 1][1] = GameCfg.huizhidatas - 2;
				GameCfg.history.deal[GameCfg.history.deal.length - 1][2] = rate;
				GameCfg.history.deal[GameCfg.history.deal.length] = [GameCfg.history.deal[GameCfg.history.deal.length - 1][0]];
				//   GameCfg.history.deal[GameCfg.history.deal.length][0] = GameCfg.history.deal[GameCfg.history.deal.length - 1][0];
				// GameCfg.history.deal[GameCfg.history.deal.length][1] = [rate];

				//下个持仓率
				let rate1 = this.onCurPositionRete();
				GlobalEvent.emit('updateRate', [rate1]);
			}
			this.rateItem.rate = rate;
			if (GameCfg.GameType == pb.GameType.QiHuo) {
				GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
				GameCfg.fill[GameCfg.fill.length - 1].end = GameCfg.huizhidatas - 1;
			} else {
				GameCfg.fill[GameCfg.fill.length - 1].rate = rate;
				//GameCfg.fill[GameCfg.fill.length - 1].end = GameCfg.huizhidatas - 1;
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
			let curClose = parseFloat(data[GameCfg.huizhidatas].close);
			//let preClose = parseFloat(data[this.buyData[this.buyData.length - 1]].close);
			let preClose = this.onjunjia();
			//let rate = (curClose - preClose) / preClose;
			let rate = this.onCurPositionRete();
			if (this._KKCount > 0) {
				rate = -rate;
			}
			GlobalEvent.emit('updateRate', [rate]);

			//	this.rateItem.rate = rate;
			GameCfg.fill[GameCfg.fill.length - 1].rate = rate;

			GlobalEvent.emit(EventCfg.ADDFILLCOLOR, GameCfg.fill);
		}
	}

	onDestroy() {
		GlobalEvent.off(EventCfg.GAMEOVEER);
		GlobalEvent.off(EventCfg.GAMEFUPAN);
		GlobalEvent.off('HIDEBOTTOMNODE');
	}
}
