
import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	DCArr = null; //大连商品交易所
	SCArr = null; //上海期货交易所
	ZCArr = null; //郑州商品交易所
	XJArr = null; //中金所

	@property(cc.Node)
	preItem: cc.Node = null;

	@property([cc.Node])
	box: cc.Node[] = [];

	@property([cc.Node])
	downBox: cc.Node[] = [];

	_tid = 0;

	curCount = 0;

	curState = 0;

	@property(cc.Label)
	tipsLabel1: cc.Label = null;

	@property(cc.Label)
	tipsLabel2: cc.Label = null;

	onLoad() {
		this.DCArr = {
			name: '大连商品',

			type: [

			],
			main: [

			],

			index: [

			],
		};


		this.SCArr = {
			name: '上海商品',

			type: [],
			main: [

			],

			index: [

			],

		};

		this.ZCArr = {
			name: '郑州商品',

			type: [

			],
			main: [

			],

			index: [

			],

		};

		this.XJArr = {
			name: '中金所',
			type: [],
			main: [],
			index: [

			],
		};

		GameCfgText.qihuoList.forEach(el => {
			let items = el.split('|');
			if (items[4] == 'DC') {
				let str = items[1].slice(-items.length, -2);
				if (this.DCArr.type.indexOf(str) == -1) {
					this.DCArr.type.push(str);
				} else {
					let t = this.DCArr.type.indexOf(str);
					if (!this.DCArr.main[t]) {
						this.DCArr.main[t] = items[1];
					} else {
						this.DCArr.index[t] = items[1];
					}
				}
				if (!this.DCArr.main[this.DCArr.type.length - 1]) {
					this.DCArr.main.push(items[1]);
				} else {
					this.DCArr.index.push(items[1]);
				}
			}
			else if (items[4] == 'SC') {
				let str = items[1].slice(-items.length, -2);
				if (this.SCArr.type.indexOf(str) == -1) {
					this.SCArr.type.push(str);
				} else {
					let t = this.SCArr.type.indexOf(str);
					if (!this.SCArr.main[t]) {
						this.SCArr.main[t] = items[1];
					} else {
						this.SCArr.index[t] = items[1];
					}
				}
				if (!this.SCArr.main[this.SCArr.type.length - 1]) {
					this.SCArr.main.push(items[1]);
				} else {
					this.SCArr.index.push(items[1]);
				}
			}
			else if (items[4] == 'ZC') {
				let str = items[1].slice(-items.length, -2);
				if (this.ZCArr.type.indexOf(str) == -1) {
					this.ZCArr.type.push(str);
				} else {
					let t = this.ZCArr.type.indexOf(str);
					if (!this.ZCArr.main[t]) {
						this.ZCArr.main[t] = items[1];
					} else {
						this.ZCArr.index[t] = items[1];
					}
				}
				if (!this.ZCArr.main[this.ZCArr.type.length - 1]) {
					this.ZCArr.main.push(items[1]);
				} else {
					this.ZCArr.index.push(items[1]);
				}

			} else if (items[4] == 'ZJS') {
				let str = items[1].slice(-items.length, -2);
				//	if (this.XJArr.type.indexOf(str) == -1) {
				this.XJArr.type.push(str);
				//	}
				//	if (!this.XJArr.main[this.XJArr.type.length - 1]) {
				this.XJArr.main.push(items[1]);
				// } else {
				//this.XJArr.index.push(items[1]);
				// }
			}
		});

		GlobalEvent.on(EventCfg.GMAECOUNTERSCHANGE, this.onGameCountSow.bind(this), this);
	}

	onGameCountSow() {
		if (!GameData.properties[pb.GamePropertyId.UnlockQhxl] && (new Date().getTime() / 1000 > GameData.properties[pb.GamePropertyId.VipExpiration])) {
			this.tipsLabel1.node.active = true;
			this.tipsLabel2.node.active = true;
			this.curCount = GameCfgText.gameTextCfg.qhxl.free - GameData.todayGameCount[pb.GameType.QiHuo];
			if (this.curCount > 0) {
				this.tipsLabel1.string = '今日剩余次数：' + this.curCount + '次';
				this.tipsLabel2.string = '训练费用：' + Math.abs(GameCfgText.gameTextCfg.qhxl.cost[0].v) + '金币';
				this.curState = 1;
			}
			else {

				this.curCount = GameCfgText.gameTextCfg.qhxl.ad + this.curCount;
				if (this.curCount > 0) {
					this.tipsLabel1.string = '今日看视频获取次数：' + this.curCount + '次';
					this.tipsLabel2.string = '训练费用：' + Math.abs(GameCfgText.gameTextCfg.qhxl.cost[0].v) + '金币';
					this.curState = 2;
				}
				else {
					this.tipsLabel1.string = '今日次数已用完';
					this.tipsLabel2.string = '开启VIP或解锁该功能取消次数限制';
					this.curState = 3;
				}
			}
		} else {
			this.tipsLabel1.node.active = false;
			this.tipsLabel2.node.active = false;
			this.curState = 0;
		}
		this.curState = 0;
	}

	onDestroy() {
		GlobalEvent.off(EventCfg.GMAECOUNTERSCHANGE);
	}

	onEnable() {

		GlobalEvent.emit(EventCfg.LOADINGHIDE);
		GameCfg.GameType = pb.GameType.QiHuo;
		let setDatas = GameData.QHSet;
		this.box[0].getChildByName('label').getComponent(cc.Label).string = setDatas.JYS;
		this.box[1].getChildByName('label').getComponent(cc.Label).string = setDatas.LXPZ;
		this.box[2].getChildByName('label').getComponent(cc.Label).string = setDatas.HY;
		this.box[3].getChildByName('label').getComponent(cc.Label).string = setDatas.year;
		this.box[4].getChildByName('label').getComponent(cc.Label).string = setDatas.month;
		this.box[5].getChildByName('label').getComponent(cc.Label).string = setDatas.day;
		this.box[6].getChildByName('label').getComponent(cc.Label).string = setDatas.KLine;
		this.box[7].getChildByName('label').getComponent(cc.Label).string = setDatas.ZLine;

		this.onGameCountSow();
	}

	/**
 * 根据期货的名字获取股票的范围
 */
	getQHTimeByCodeName(index) {
		let year = this.box[3].getChildByName('label').getComponent(cc.Label).string;
		let month = this.box[4].getChildByName('label').getComponent(cc.Label).string;
		let day = this.box[5].getChildByName('label').getComponent(cc.Label).string;
		let downBox = this.downBox[index];
		let content = cc.find('New ScrollView/view/content', downBox);

		if (GameData.QHSet.HY == '随机') {
			let f = new Date();
			let y = f.getFullYear() + '';
			let m = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);
			let d = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
			let sc = ComUtils.GetPreMonthDay(y + '-' + m + '-' + d, 2);
			y = sc.y;
			m = sc.m;
			d = sc.d;
			let t;
			if (index == 3) {
				t = y;
			} else if (index == 4) {
				if (year != '随机' && year == y) {
					t = m;
				} else {
					t = 12;
				}
			} else if (index == 5) {
				if (year == y && parseInt(month) == m) {
					t = d;
				} else {
					var temp = new Date(parseInt(year), parseInt(month + ''), 0);
					let day1 = temp.getDate();
					t = day1;
				}
			}
			content.children.forEach(el => {
				let str = el.getComponent(cc.Label).string;
				if (str == '随机') {
				} else if (parseInt(str) > t) {
					el.color = new cc.Color().fromHEX('#a0a0a0');
					el.getComponent(cc.Button).interactable = false;
					el.getComponent(cc.Button).enableAutoGrayEffect = true;
				} else {
					el.color = cc.Color.WHITE;
					el.getComponent(cc.Button).interactable = true;
					el.getComponent(cc.Button).enableAutoGrayEffect = false;
				}
			})

			let downBox1 = this.downBox[7];
			let content1 = cc.find('New ScrollView/view/content', downBox1);
			content1.children.forEach(el => {
				el.color = cc.Color.WHITE;
				el.getComponent(cc.Button).interactable = true;
				el.getComponent(cc.Button).enableAutoGrayEffect = false;
				//}
			})

		} else {
			let date = GameCfgText.QHGetTimeByCodeName(GameData.QHSet.HY);
			let ly = date.start.slice(0, 4);
			let lm = date.start.slice(4, 6);
			let ld = date.start.slice(6);

			let cy = date.end.slice(0, 4);
			let cm = date.end.slice(4, 6);
			let cd = date.end.slice(6);
			let min, max;
			if (index == 3) {
				min = ly;
				max = cy;
			} else if (index == 4) {
				if (parseInt(year) == parseInt(ly)) {
					min = lm;
					max = 12;
				} else if (parseInt(year) == parseInt(cy)) {
					max = cm;
					min = 1;
				} else {
					min = 1;
					max = 12;
				}

			} else if (index == 5) {
				if (parseInt(year) == parseInt(ly) && parseInt(month) == parseInt(lm)) {
					min = ld;
					var temp = new Date(parseInt(year), parseInt(month), 0);
					let day = temp.getDate();
					max = day;
				} else if (parseInt(year) == parseInt(cy) && parseInt(month) == parseInt(cm)) {
					max = cd;
					min = 1;
				} else {
					var temp = new Date(parseInt(year), parseInt(month), 0);
					let day1 = temp.getDate();
					min = 1;
					max = day1;
				}
			}
			content.children.forEach(el => {
				let str = el.getComponent(cc.Label).string;
				if (str == '随机') {

				} else if (parseInt(str) < parseInt(min) || parseInt(str) > parseInt(max)) {
					el.color = new cc.Color().fromHEX('#a0a0a0');
					el.getComponent(cc.Button).interactable = false;
					el.getComponent(cc.Button).enableAutoGrayEffect = true;
				} else {
					el.color = cc.Color.WHITE;
					el.getComponent(cc.Button).interactable = true;
					el.getComponent(cc.Button).enableAutoGrayEffect = false;
				}
			})

			// let downBox1 = this.downBox[7];
			// let content1 = cc.find('New ScrollView/view/content', downBox1);
			// if (index == 2) {
			// 	content1.children.forEach(el => {
			// 		let str = el.getComponent(cc.Label).string;
			// 		if (str == '随机') {

			// 		} else if (str == '日线') {
			// 			this.box[7].getChildByName('label').getComponent(cc.Label).string = '5分钟K';
			// 			GameData.QHSet.ZLine = '5分钟K';
			// 			el.color = new cc.Color().fromHEX('#a0a0a0');
			// 			el.getComponent(cc.Button).interactable = false;
			// 			el.getComponent(cc.Button).enableAutoGrayEffect = true;
			// 		} else {
			// 			el.color = cc.Color.WHITE;
			// 			el.getComponent(cc.Button).interactable = true;
			// 			el.getComponent(cc.Button).enableAutoGrayEffect = false;
			// 		}
			// 	})
			// } else {

			// 	content1.children.forEach(el => {
			// 		let str = el.getComponent(cc.Label).string;
			// 		// if (str == '随机') {

			// 		// } else if (str == '日线') {
			// 		// 	this.box[7].getChildByName('label').getComponent(cc.Label).string = '5分钟K';
			// 		// 	GameData.QHSet.ZLine = '5分钟K';
			// 		// 	el.color = new cc.Color().fromHEX('#a0a0a0');
			// 		// 	el.getComponent(cc.Button).interactable = false;
			// 		// 	el.getComponent(cc.Button).enableAutoGrayEffect = true;
			// 		// } else {
			// 		el.color = cc.Color.WHITE;
			// 		el.getComponent(cc.Button).interactable = true;
			// 		el.getComponent(cc.Button).enableAutoGrayEffect = false;
			// 		//	}
			// 	})
			// }

		}

	}

	onSelectBoxClick(evetn, data) {
		this._tid = parseInt(data);
		this.downBox[this._tid].active = true;
		let content = cc.find('New ScrollView/view/content', this.downBox[this._tid]);
		let nodes = content.children;

		if (this._tid == 1) {

			if (GameData.QHSet.JYS == '随机') {
				if (nodes.length == 0) {
					let node = cc.instantiate(this.preItem);
					content.addChild(node);
					node.x = 0;
				}
				nodes = content.children;
				nodes.forEach((el, index) => {
					if (index == 0) {
						el.getComponent(cc.Label).string = '随机';
					} else {
						el.active = false;
					}
				});
			}
			else if (GameData.QHSet.JYS == '大连商品') {
				if (nodes.length < this.DCArr.type.length) {
					let tt = this.DCArr.type.length - nodes.length
					for (let i = 0; i < tt; i++) {
						let node = cc.instantiate(this.preItem);
						content.addChild(node);
						node.x = 0;
					}
				}
				nodes = content.children;
				nodes.forEach((el, index) => {
					if (index >= this.DCArr.type.length) {
						el.active = false;
					} else {
						el.active = true;
						el.getComponent(cc.Label).string = this.DCArr.type[index];
					}
				})
			}
			else if (GameData.QHSet.JYS == '上海商品') {
				if (nodes.length < this.SCArr.type.length) {
					let tt = this.SCArr.type.length - nodes.length;
					for (let i = 0; i < tt; i++) {
						let node = cc.instantiate(this.preItem);
						content.addChild(node);
						node.x = 0;
					}
				}
				nodes = content.children;
				nodes.forEach((el, index) => {
					if (index >= this.SCArr.type.length) {
						el.active = false;
					} else {
						el.active = true;
						el.getComponent(cc.Label).string = this.SCArr.type[index];
					}
				})
			}
			else if (GameData.QHSet.JYS == '郑州商品') {
				if (nodes.length < this.ZCArr.type.length) {
					let tt = this.ZCArr.type.length - nodes.length;
					for (let i = 0; i < tt; i++) {
						let node = cc.instantiate(this.preItem);
						content.addChild(node);
						node.x = 0;
					}
				}
				nodes = content.children;
				nodes.forEach((el, index) => {
					if (index >= this.ZCArr.type.length) {
						el.active = false;
					} else {
						el.active = true;
						el.getComponent(cc.Label).string = this.ZCArr.type[index];
					}
				})
			}
			else if (GameData.QHSet.JYS == '中金所') {
				if (nodes.length < this.XJArr.type.length) {
					let tt = this.XJArr.type.length - nodes.length;
					for (let i = 0; i < tt; i++) {
						let node = cc.instantiate(this.preItem);
						content.addChild(node);
						node.x = 0;
					}
				}
				nodes = content.children;
				nodes.forEach((el, index) => {
					if (index >= this.XJArr.type.length) {
						el.active = false;
					} else {
						el.active = true;
						el.getComponent(cc.Label).string = this.XJArr.type[index];
					}
				})
			}

		}
		else if (this._tid == 2) {

			if (GameData.QHSet.JYS == '随机') {
				nodes = content.children;
				nodes.forEach((el, index) => {
					if (index == 0) {
						el.active = true;
						el.getComponent(cc.Label).string = '随机';
					} else {
						el.active = false;
					}
				});
			}
			else if (GameData.QHSet.LXPZ != '随机') {
				let arr = [];
				if (this.DCArr.type.indexOf(GameData.QHSet.LXPZ) != -1) {
					let index = this.DCArr.type.indexOf(GameData.QHSet.LXPZ);
					this.DCArr.main[index] && arr.push(this.DCArr.main[index]);
					this.DCArr.index[index] && arr.push(this.DCArr.index[index]);
				}
				else if (this.SCArr.type.indexOf(GameData.QHSet.LXPZ) != -1) {
					let index = this.SCArr.type.indexOf(GameData.QHSet.LXPZ);
					this.SCArr.main[index] && arr.push(this.SCArr.main[index]);
					this.SCArr.index[index] && arr.push(this.SCArr.index[index]);
				}
				else if (this.XJArr.type.indexOf(GameData.QHSet.LXPZ) != -1) {
					let index = this.XJArr.type.indexOf(GameData.QHSet.LXPZ);
					this.XJArr.main[index] && arr.push(this.XJArr.main[index]);
					this.XJArr.index[index] && arr.push(this.XJArr.index[index]);
				}
				else if (this.ZCArr.type.indexOf(GameData.QHSet.LXPZ) != -1) {
					let index = this.ZCArr.type.indexOf(GameData.QHSet.LXPZ);
					this.ZCArr.main[index] && (arr.push(this.ZCArr.main[index]));
					this.ZCArr.index[index] && (arr.push(this.ZCArr.index[index]));
				}

				if (nodes.length < arr.length) {
					let tt = arr.length - nodes.length
					for (let i = 0; i < tt; i++) {
						let node = cc.instantiate(this.preItem);
						content.addChild(node);
						node.x = 0;
					}
				}
				nodes = content.children;
				nodes.forEach((el, index) => {
					if (index >= arr.length) {
						el.active = false;
					} else {
						el.active = true;
						el.getComponent(cc.Label).string = arr[index];
					}
				})
			}

		}

		else if (this._tid == 5 || this._tid == 3 || this._tid == 4) {
			let year = this.box[3].getChildByName('label').getComponent(cc.Label).string;
			let month = this.box[4].getChildByName('label').getComponent(cc.Label).string;
			if (this._tid == 4 || this._tid == 5) {
				if (year == '随机') {
					content.children.forEach(el => {

						el.color = new cc.Color().fromHEX('#a0a0a0');
						el.getComponent(cc.Button).interactable = false;
						el.getComponent(cc.Button).enableAutoGrayEffect = true;
					})
					return;
				}
			}
			this.getQHTimeByCodeName(this._tid);
			// if (year == '随机' || month == '--') {
			// 	return;
			// }
			// var temp = new Date(parseInt(year), parseInt(month), 0);
			// let day = temp.getDate();
			// if (this._tid == 5) {
			// 	let content = cc.find('New ScrollView/view/content', this.downBox[this._tid]);
			// 	content.children.forEach(el => {
			// 		let str = el.getComponent(cc.Label).string;
			// 		if (parseInt(str) > day) {
			// 			if (this._tid == 5) {
			// 				el.color = new cc.Color().fromHEX('#a0a0a0');
			// 				el.getComponent(cc.Button).interactable = false;
			// 				el.getComponent(cc.Button).enableAutoGrayEffect = true;
			// 			} else {
			// 				this.box[5].getChildByName('label').getComponent(cc.Label).string = day + '';
			// 			}
			// 		} else {
			// 			if (this._tid == 5) {
			// 				el.color = cc.Color.WHITE;
			// 				el.getComponent(cc.Button).interactable = true;
			// 				el.getComponent(cc.Button).enableAutoGrayEffect = false;
			// 			} else {
			// 				this.box[5].getChildByName('label').getComponent(cc.Label).string = day + '';
			// 			}
			// 		}
			// 	});
			// }

		}
	}

	onAutoSetTime() {
		if (GameData.QHSet.year != '随机') {
			if (GameData.QHSet.HY != '随机') {
				let date = GameCfgText.QHGetTimeByCodeName(GameData.QHSet.HY);
				let ly = date.start.slice(0, 4);
				let lm = date.start.slice(4, 6);
				let ld = date.start.slice(6);
				let st;
				st = GameData.QHSet.year;
				if (GameData.QHSet.month.length == 1) {
					st += ('0' + GameData.QHSet.month);
				} else {
					st += (GameData.QHSet.month);
				}

				if (GameData.QHSet.day.length == 1) {
					st += ('0' + GameData.QHSet.day)
				} else {
					st += GameData.QHSet.day;
				}


				if (parseInt(st) < parseInt(date.start) || parseInt(st) > parseInt(date.end)) {
					GameData.QHSet.year = ly;
					GameData.QHSet.month = lm;
					GameData.QHSet.day = ld;
					this.box[3].getChildByName('label').getComponent(cc.Label).string = ly;
					this.box[4].getChildByName('label').getComponent(cc.Label).string = lm;
					this.box[5].getChildByName('label').getComponent(cc.Label).string = ld;
				}
			}
		}
	}

	onBtnClick(event, data) {
		let name = event.target.name;

		//设置
		if (name == 'setQHBtnDX') {

			GlobalEvent.emit(EventCfg.OPENSETLAYER);

		}
		//记录
		else if (name == 'historyQHBtn') {

			GlobalEvent.emit(EventCfg.OPENHISTORYLAYER);
		}
		//
		else if (name == 'item') {
			let la = this.box[this._tid].getChildByName('label').getComponent(cc.Label);

			let str = event.target.getComponent(cc.Label).string;
			la.string = str;
			this.downBox[this._tid].active = false;
			if (this._tid == 0) {
				GameData.QHSet.JYS = str;
				this.box[1].getChildByName('label').getComponent(cc.Label).string = '随机';
				this.box[2].getChildByName('label').getComponent(cc.Label).string = '随机';
				GameData.QHSet.HY = '随机';
				GameData.QHSet.LXPZ = '随机';
			} else if (this._tid == 1) {
				GameData.QHSet.LXPZ = str;
				if (this.DCArr.type.indexOf(str) != -1) {
					let t = this.DCArr.type.indexOf(str);
					this.box[2].getChildByName('label').getComponent(cc.Label).string = this.DCArr.main[t];
					GameData.QHSet.HY = this.DCArr.main[t];
				} else if (this.SCArr.type.indexOf(str) != -1) {
					let t = this.SCArr.type.indexOf(str);
					this.box[2].getChildByName('label').getComponent(cc.Label).string = this.SCArr.main[t];
					GameData.QHSet.HY = this.SCArr.main[t];
				} else if (this.XJArr.type.indexOf(str) != -1) {
					let t = this.XJArr.type.indexOf(str);
					this.box[2].getChildByName('label').getComponent(cc.Label).string = this.XJArr.main[t];
					GameData.QHSet.HY = this.XJArr.main[t];
				} else if (this.ZCArr.type.indexOf(str) != -1) {
					let t = this.ZCArr.type.indexOf(str);
					this.box[2].getChildByName('label').getComponent(cc.Label).string = this.ZCArr.main[t];
					GameData.QHSet.HY = this.ZCArr.main[t];
				}
				this.onAutoSetTime();
				this.getQHTimeByCodeName(this._tid);

			} else if (this._tid == 2) {
				GameData.QHSet.HY = str;
				this.onAutoSetTime();
				this.getQHTimeByCodeName(this._tid);

			} else if (this._tid == 3 || this._tid == 4 || this._tid == 5) {
				if (this._tid == 3) {
					GameData.QHSet.year = str;
					if (GameData.QHSet.year == '随机') {
						this.box[4].getChildByName('label').getComponent(cc.Label).string = '随机';
						this.box[5].getChildByName('label').getComponent(cc.Label).string = '随机';
						GameData.QHSet.month = '随机';
						GameData.QHSet.day = '随机';
					} else {
						if (GameData.QHSet.HY != '随机') {
							let date = GameCfgText.QHGetTimeByCodeName(GameData.QHSet.HY);

							let ly = date.start.slice(0, 4);
							let lm = date.start.slice(4, 6);
							let ld = date.start.slice(6);

							let cy = date.end.slice(0, 4);
							let cm = date.end.slice(4, 6);
							let cd = date.end.slice(6);
							if (GameData.QHSet.year == ly) {
								GameData.QHSet.month = lm;
								GameData.QHSet.day = ld;
								this.box[4].getChildByName('label').getComponent(cc.Label).string = lm;
								this.box[5].getChildByName('label').getComponent(cc.Label).string = ld;
							} else if (GameData.QHSet.year == cy) {
								GameData.QHSet.month = '4';
								GameData.QHSet.day = '5';
								this.box[4].getChildByName('label').getComponent(cc.Label).string = '4';
								this.box[5].getChildByName('label').getComponent(cc.Label).string = '5';
							} else {
								GameData.QHSet.month = '9';
								GameData.QHSet.day = '10';
								this.box[4].getChildByName('label').getComponent(cc.Label).string = '9';
								this.box[5].getChildByName('label').getComponent(cc.Label).string = '10';
							}

						} else {
							GameData.QHSet.month = '4';
							GameData.QHSet.day = '5';
							this.box[4].getChildByName('label').getComponent(cc.Label).string = '4';
							this.box[5].getChildByName('label').getComponent(cc.Label).string = '5';
						}

					}
				} else if (this._tid == 4) {

					GameData.QHSet.month = str;
				} else if (this._tid == 5) {
					GameData.QHSet.day = str;
				}

				let year = this.box[3].getChildByName('label').getComponent(cc.Label).string;
				let month = this.box[4].getChildByName('label').getComponent(cc.Label).string;
				if (year == '随机' || month == '--') {
					return;
				}
				var temp = new Date(parseInt(year), parseInt(month), 0);
				let day = temp.getDate();
				let downBox = this.downBox[5];
				let content = cc.find('New ScrollView/view/content', downBox);
				let str1 = this.box[5].getChildByName('label').getComponent(cc.Label).string
				content.children.forEach(el => {

					if (parseInt(str1) > day) {
						this.box[5].getChildByName('label').getComponent(cc.Label).string = day + '';
					} else {
						//this.box[5].getChildByName('label').getComponent(cc.Label).string = day + '';
					}
				});
			}
			else if (this._tid == 6) {
				GameData.QHSet.KLine = parseInt(str);
			} else if (this._tid == 7) {
				GameData.QHSet.ZLine = str;
			}

		}
		//
		else if (name == 'DCnode') {
			this.downBox.forEach(el => {
				el.active = false;
			});
		}
		else if (name == 'startQHBtn') {

			if (GameData.properties[pb.GamePropertyId.Gold] < GameCfgText.gameTextCfg.qhxl.cost[0].v) {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
				return;
			}
			else if (this.curState == 3) {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,开启VIP或解锁该功能取消次数限制');
				return;
			}

			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			GameCfg.GAMEFUPAN = false;
			GameCfg.GameSet = GameData.QHSet;
			GameCfg.GameType = pb.GameType.QiHuo;
			GameCfg.ziChan = 100000;
			this.QHStartGameSet();
		}
		else if (name == 'blackbtn') {
			this.node.active = false;
			GameCfg.GameType = null;
		}

		else if (name == 'sys_helpbig1') {
			GlobalEvent.emit(EventCfg.OPENHELPLAYER);
		}
	}

	QHStartGameSet() {

		let data = {
			ktype: null,
			kstyle: pb.KStyle.Random,
			code: null,
			from: null,
			total: parseInt(GameData.QHSet.KLine) + 100,
			to: 0,
			reserve: 100,
		};

		let jys, lxpz, hy, rom, rom1, rom2;

		if (GameData.QHSet.JYS == '随机') {
			rom = parseInt(Math.random() * 4 + '');
			if (rom == 0) {
				jys = '大连商品';
			} else if (rom == 1) {
				jys = '上海商品';
			} else if (rom == 2) {
				jys = '郑州商品';
			} else if (rom == 3) {
				jys = '中金所';
			}
		}
		else {
			jys = GameData.QHSet.JYS;
			if (jys == '大连商品') {
				rom = 0;
			} else if (jys == '上海商品') {
				rom = 1;
			} else if (jys == '郑州商品') {
				rom = 2;
			} else if (jys == '中金所') {
				rom = 3;
			}
		}

		if (GameData.QHSet.LXPZ == '随机') {
			if (rom == 0) {
				rom1 = parseInt(Math.random() * this.DCArr.type.length + '');
				lxpz = this.DCArr.type[rom1];
			} else if (rom == 1) {
				rom1 = parseInt(Math.random() * this.SCArr.type.length + '');
				lxpz = this.SCArr.type[rom1];
			} else if (rom == 2) {
				rom1 = parseInt(Math.random() * this.ZCArr.type.length + '');
				lxpz = this.ZCArr.type[rom1];
			} else if (rom == 3) {
				rom1 = parseInt(Math.random() * this.XJArr.type.length + '');
				lxpz = this.XJArr.type[rom1];
			}
		} else {
			lxpz = GameData.QHSet.LXPZ;
			if (jys == '大连商品') {
				rom1 = this.DCArr.type.indexOf(lxpz);
			} else if (jys == '上海商品') {
				rom1 = this.SCArr.type.indexOf(lxpz);
			} else if (jys == '郑州商品') {
				rom1 = this.ZCArr.type.indexOf(lxpz);
			} else if (jys == '中金所') {
				rom1 = this.XJArr.type.indexOf(lxpz);
			}
		}

		if (GameData.QHSet.HY == '随机') {
			rom2 = parseInt(Math.random() * 2 + '');
			if (rom == 0) {

				if (rom2 == 0) {
					hy = this.DCArr.main[rom1];
				} else {
					hy = this.DCArr.index[rom1];
				}

			} else if (rom == 1) {

				if (rom2 == 0) {
					hy = this.SCArr.main[rom1];
				} else {
					hy = this.SCArr.index[rom1];
				}
			} else if (rom == 3) {

				hy = this.XJArr.main[rom1];

			} else if (rom == 2) {
				if (rom2 == 0) {
					hy = this.ZCArr.main[rom1];
				} else {
					hy = this.ZCArr.index[rom1];
				}
			}

		} else {
			hy = GameData.QHSet.HY;
		}


		let items, index;


		items = GameCfgText.getQHItemInfo(hy);
		if (!items) {
			return;
		}
		data.code = items[0];

		// 合约代码|合约中文名称|合约英文名称|合约种类|所在交易所|第一个日K日期（YYYYMMDD）|最后一个日K//日期（YYYYMMDD）|第一个分时时间戳（精确到秒）|最后一个分时时间戳（精确到秒）

		let tim = GameCfgText.QHGetTimeByCodeName(data.code)

		if (GameData.QHSet.year == '随机') {

			if (GameData.QHSet.ZLine == '日线') {

				let start = tim.start, end = tim.end, sc;

				if (end == 0) {
					sc = new Date().getTime() - data.total * 24 * 60 * 60 * 1000;
				} else {
					let year = end.slice(0, 4);
					let month = end.slice(4, 6);
					let day = end.slice(6);

					let d = new Date(year + '-' + month + '-' + day);
					sc = d.getTime() - data.total * 24 * 60 * 60 * 1000;
				}
				let f;
				if (start == 0) {
					f = new Date(sc);
				} else {
					let year = start.slice(0, 4);
					let month = start.slice(4, 6);
					let day = start.slice(6);

					let d = new Date(year + '-' + month + '-' + day);

					let t = d.getTime() + 50 * 24 * 60 * 60 * 1000;

					let s = Math.random() * (sc - t) + t;

					f = new Date(s);
				}
				{
					let ye = f.getFullYear();
					let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

					let da = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();

					data.from = ye + '' + mon + '' + da;
				}

			} else {

				let start = parseInt(ComUtils.getTimestamp(tim.start)), end = parseInt(ComUtils.getTimestamp(tim.end)), sc;

				let tt;
				if (GameData.QHSet.ZLine == '60分钟K') {
					tt = 60;
				} else if (GameData.QHSet.ZLine == '30分钟K') {
					tt = 30;
				} else if (GameData.QHSet.ZLine == '15分钟K') {
					tt = 15;
				} else if (GameData.QHSet.ZLine == '5分钟K') {
					tt = 5;
				}

				if (end == 0) {
					sc = new Date().getTime() / 1000 - data.total * tt * 60;
				} else {
					sc = end - data.total * tt * 60;
				}

				start = start + 50 * tt * 60;



				let f = parseInt(Math.random() * (sc - start) + start + '');


				{
					data.from = f;
				}

			}
		} else {
			//	if (GameData.QHSet.ZLine == '日线') {
			let start = items[5], end = items[6], sc;

			start = tim.start;

			end = tim.end;

			let year, month, day;
			year = GameData.QHSet.year;
			if (GameData.QHSet.month == '随机') {
				month = '01';
			} else {
				if (GameData.QHSet.month.length <= 1) {
					month = '0' + GameData.QHSet.month;
				} else {
					month = GameData.QHSet.month;
				}
			}

			if (GameData.QHSet.day == '随机') {
				day = '01';
			} else {
				if (GameData.QHSet.day.length <= 1) {
					day = '0' + GameData.QHSet.day;
				} else {
					day = GameData.QHSet.day;
				}
			}

			if (parseInt(start) > parseInt(year + month + day)) {
				if (GameData.QHSet.HY == '随机') {
					this.QHStartGameSet();

				} else {
					GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '时间不能早与期货创建时间');
					GlobalEvent.emit(EventCfg.LOADINGHIDE);
				}
				return;
			} else if (parseInt(end) < parseInt(year + month + day)) {
				if (GameData.QHSet.HY == '随机') {
					this.QHStartGameSet();
				}
				else {
					GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '时间不能大与期货结束时间');
					GlobalEvent.emit(EventCfg.LOADINGHIDE);
				}
				return;
			}

			if (GameData.QHSet.ZLine == '日线') {
				data.from = year + month + day;
			} else {
				data.from = new Date(year + '-' + month + '-' + day).getTime() / 1000;
			}

		}

		if (GameData.QHSet.ZLine == '日线') {
			data.ktype = pb.KType.Day;
		} else {
			data.ktype = pb.KType.Min5;
			if (GameData.QHSet.ZLine == '60分钟K') {
				data.total *= 12;
			} else if (GameData.QHSet.ZLine == '30分钟K') {
				data.total *= 6;
			} else if (GameData.QHSet.ZLine == '15分钟K') {
				data.total *= 3;
			}
		}

		GameCfg.data[0].code = items[0];
		GameCfg.data[0].data = [];
		GameCfg.data[0].name = items[1] + '  ' + items[2] + items[3];
		console.log(JSON.stringify(data));
		GameCfg.enterGameCache = data;

		GlobalEvent.emit(EventCfg.CmdQuoteQueryFuture, data, () => {
			// GameData.huizhidatas = GameCfg.data[0].data.length - (GameCfg.data[0].data.length - 100);
			// GameCfg.huizhidatas = GameCfg.data[0].data.length - (GameCfg.data[0].data.length - 100);
			// if (GameData.huizhidatas <= 0) {
			// 	GameData.huizhidatas = GameCfg.data[0].data.length - 50;
			// 	GameCfg.huizhidatas = GameCfg.data[0].data.length - 50;
			// }
			GameData.huizhidatas = 0;
			GameCfg.huizhidatas = 0;
			let fm = data.from;
			while (!GameData.huizhidatas) {

				GameCfg.data[0].data.forEach((el, index) => {
					if ((el.day).replace(/-/g, '') == fm) {
						GameData.huizhidatas = index + 1;
						GameCfg.huizhidatas = index + 1;
					}
				})

				if (!GameData.huizhidatas) {
					fm = (parseInt(fm) - 1) + '';
				}
			}

			GlobalEvent.emit('LOADGAME');
		});

	}

	//http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js?TYPE=m30k&rtntype=5&authorityType=fa&id=3008032

	// //获取周K

	// getWkData() {
	//     let url = 'http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js';

	//     let code = GameCfg.data[0].code[0] == '6' ? GameCfg.data[0].code + '1' : GameCfg.data[0].code + '2';

	//     let TYPE;
	//     if (GameData.DXSet.ZLine == '周线') {
	//         TYPE = 'wk'
	//     } else if (GameData.DXSet.ZLine == '30分钟K') {
	//         TYPE = 'm30k';
	//     } else if (GameData.DXSet.ZLine == '60分钟K') {
	//         TYPE = 'm60k';
	//     }
	//"ktype":10,"kstyle":null,"code":"2000001","from":"20141201","total":200,"to":0
	// }
}
