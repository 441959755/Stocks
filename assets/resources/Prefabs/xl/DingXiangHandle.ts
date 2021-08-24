
import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import EnterGameControl from "../../../sctiprs/global/EnterGameControl";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	@property([cc.Node])
	boxs: cc.Node[] = [];

	@property([cc.Node])
	downBoxs: cc.Node[] = [];

	@property(cc.Toggle)
	toggle: cc.Toggle = null;

	@property(cc.EditBox)
	edit: cc.EditBox = null;

	@property([cc.Toggle])
	hangqingToggle: cc.Toggle[] = [];

	_tipsLa = null;

	setProId = 0;

	@property(cc.Node)
	item: cc.Node = null;

	@property(cc.Node)
	content: cc.Node = null;

	@property(cc.Label)
	tipsLabel1: cc.Label = null;

	@property(cc.Label)
	tipsLabel2: cc.Label = null;

	curState = 0;

	onLoad() {
		this._tipsLa = this.edit.node.getChildByName('tipslabel');
		this.edit.node.on(
			'editing-did-ended',
			edit => {
				if (!this.onTipsInfo()) {
					edit.string = '';
					GameData.DXSet.search = '随机选股';
					GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, GameData.DXSet.market + '不支持自定义当前选项');
					return;
				}
				let str = edit.string;
				if (str == '') {
					return;
				} else {
					let datas = GameCfgText.stockList;
					let flag = false,
						tt = [];
					for (let i = 0; i < datas.length; i++) {
						let arr1 = datas[i].split('|');
						let str1 = arr1[0];
						if (arr1[0].length >= 7) {
							str1 = arr1[0].slice(1);
						}
						if (tt.length >= 100) {
							break;
						}
						if (str1.indexOf(str) != -1) {
							tt.push(datas[i]);
							flag = true;
							//  break;
						} else if (arr1[1].indexOf(str) != -1) {
							tt.push(datas[i]);
							flag = true;
							//  break;
						}
					}
					if (!flag) {
						this._tipsLa.color = cc.Color.RED;
						GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '没有找查到您要的股票.');
						edit.string = '';
					} else {
						this.content.removeAllChildren();
						this.downBoxs[8].active = true;
						this.setProId = 1;
						this._tipsLa.color = new cc.Color().fromHEX('#BBBBBB');
						this._tipsLa.active = false;
						// let item = cc.find('downBox/New ScrollView/view/content/item', this.downBoxs[1]);
						// let content = cc.find('downBox/New ScrollView/view/content', this.downBoxs[1]);
						for (let i = 0; i < tt.length; i++) {
							let arr = tt[i].split('|');
							let str = arr[0];
							if (arr[0].length >= 7) {
								str = arr[0].slice(1);
							}
							if (i == 0) {
								this.boxs[1].getChildByName('label').getComponent(cc.Label).string = str + '  ' + arr[1];
								GameData.DXSet.search = arr[0];
							}
							let node = cc.instantiate(this.item);
							this.content.addChild(node);
							node.getComponent(cc.Label).string = str + '  ' + arr[1];
						}

						edit.string = '';
					}
				}
			},
			this
		);

		if (GameData.DXHistoryInfo.length > 0) {

			let content = cc.find('New ScrollView/view/content', this.downBoxs[1]);

			let item = content.children[0];

			GameData.DXHistoryInfo.forEach(el => {
				let node = cc.instantiate(item);
				content.addChild(node);

				node.getComponent(cc.Label).string = el;
			})
		}
		GameData.DXSet.search = '随机选股';
	}

	onEnable() {

		this.tipsLabel1.node.active = false;
		this.tipsLabel2.node.active = false;

		let gameCount = EnterGameControl.onCurDXIsEnterGame();

		if (gameCount.status == 0) {
			this.curState = 0;
		} else if (gameCount.status == 1) {
			this.tipsLabel1.node.active = true;
			this.tipsLabel2.node.active = true;
			this.tipsLabel1.string = '今日剩余次数：' + gameCount.count + '次';
			this.tipsLabel2.string = '训练费用：' + Math.abs(GameCfgText.gameTextCfg.dxxl.cost[0].v) + '金币';
			this.curState = 1;
		}
		else if (gameCount.status == 2) {
			this.tipsLabel1.node.active = true;
			this.tipsLabel2.node.active = true;
			this.tipsLabel1.string = '今日看视频获取次数：' + gameCount.count + '次';
			this.tipsLabel2.string = '训练费用：' + Math.abs(GameCfgText.gameTextCfg.dxxl.cost[0].v) + '金币';
			this.curState = 2;
		} else if (gameCount.status == 3) {
			this.tipsLabel1.node.active = true;
			this.tipsLabel2.node.active = true;
			this.tipsLabel1.string = '今日次数已用完';
			this.tipsLabel2.string = '开启VIP或解锁该功能取消次数限制';
			this.curState = 3;
		}

		GlobalEvent.emit(EventCfg.LOADINGHIDE);
		this.onShow();
	}

	onShow() {
		if (!GameData.DXSet) {
			return;
		}

		this.boxs.forEach((el, index) => {
			let la;
			if (index != 0) {
				la = el.getChildByName('label').getComponent(cc.Label);
			}

			if (index == 0) {
				// la.string = GameData.DXSet.market;
				if (GameData.DXSet.market == '随机行情') {
					this.hangqingToggle[0].isChecked = true;
				} else if (GameData.DXSet.market == '单边上涨') {
					this.hangqingToggle[1].isChecked = true;
				} else if (GameData.DXSet.market == '单边下跌') {
					this.hangqingToggle[2].isChecked = true;
				} else if (GameData.DXSet.market == '震荡行情') {
					this.hangqingToggle[3].isChecked = true;
				}
			} else if (index == 1) {
				la.string = GameData.DXSet.search;
				//	la.string = '随机选股';
			} else if (index == 2) {
				la.string = GameData.DXSet.year;
			} else if (index == 3) {
				la.string = GameData.DXSet.month;
				if (GameData.DXSet.year == '随机') {
					la.string = '随机';
				}
			} else if (index == 4) {
				la.string = GameData.DXSet.day;
				if (GameData.DXSet.year == '随机') {
					la.string = '随机';
				}
			} else if (index == 5) {
				la.string = GameData.DXSet.line;
			} else if (index == 6) {
				la.string = GameData.DXSet.KLine;
			} else if (index == 7) {
				la.string = GameData.DXSet.ZLine;
			}
		});
		this.toggle.isChecked = GameData.DXSet.isFC;

	}

	onTipsInfo() {
		if (GameData.DXSet.market != '随机行情') {
			return false;
		}
		return true;
	}

	/**
	 * 根据股票的名字获取股票的范围
	 */
	getTimeByCodeName(index) {

		let year = this.boxs[2].getChildByName('label').getComponent(cc.Label).string;
		let month = this.boxs[3].getChildByName('label').getComponent(cc.Label).string;
		let day = this.boxs[4].getChildByName('label').getComponent(cc.Label).string;
		let downBox = this.downBoxs[index];
		let content = cc.find('New ScrollView/view/content', downBox);
		if (GameData.DXSet.search == '随机选股') {

			//	let sc = new Date().getTime();
			let f = new Date();
			let y = f.getFullYear() + '';
			let m = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);
			let d = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
			let sc = ComUtils.GetPreMonthDay(y + '-' + m + '-' + d, 2);
			y = sc.y;
			m = sc.m;
			d = sc.d;
			let t;
			if (index == 2) {
				t = y;
			} else if (index == 3) {
				if (year != '随机' && year == y) {
					t = m;
				} else {
					t = 12;
				}
			} else if (index == 4) {
				if (year == y && parseInt(month) == m) {
					t = d;
				} else {
					var temp = new Date(parseInt(year), parseInt(month + ''), 0);
					let day = temp.getDate();
					t = day;
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
		} else {
			let date = GameCfgText.getTimeByCodeName(GameData.DXSet.search);
			let ly = date.start.slice(0, 4);
			let lm = date.start.slice(4, 6);
			let ld = date.start.slice(6);

			let cy = date.end.slice(0, 4);
			let cm = date.end.slice(4, 6);
			let cd = date.end.slice(6);
			let min, max;
			if (index == 2) {
				min = ly;
				max = cy;
			} else if (index == 3) {
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

			} else if (index == 4) {
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
					let day = temp.getDate();
					min = 1;
					max = day;
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

		}
	}

	onBoxSelectClick(event, data) {
		let index = parseInt(data);
		if (data == 1 || data == 2 || data == 3 || data == 4 || data == 6 || data == 7) {
			if (!this.onTipsInfo()) {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, GameData.DXSet.market + '不支持自定义当前选项');
				return;
			}
		}
		let downBox = this.downBoxs[index];
		downBox.active = true;
		this.setProId = data;

		//当前年月的天数
		if (index == 2 || index == 3 || index == 4) {
			let year = this.boxs[2].getChildByName('label').getComponent(cc.Label).string;
			let month = this.boxs[3].getChildByName('label').getComponent(cc.Label).string;
			if (index == 3 || index == 4) {
				if (year == '随机') {
					let content = cc.find('New ScrollView/view/content', downBox);
					content.children.forEach(el => {

						el.color = new cc.Color().fromHEX('#a0a0a0');
						el.getComponent(cc.Button).interactable = false;
						el.getComponent(cc.Button).enableAutoGrayEffect = true;
					})
					return;
				}
			}
			this.getTimeByCodeName(index);
		}
	}

	onBtnClick(event, data) {
		let name = event.target.name;
		if (name == 'DCnode') {
			event.target.parent.active = false;
		} else if (name == 'item') {
			let str = event.target.getComponent(cc.Label).string;
			this.boxs[this.setProId].getChildByName('label').getComponent(cc.Label).string = str;
			//  this.downBoxs[this.setProId].active = false;
			this.downBoxs.forEach(el => {
				el.active = false;
			});
			if (this.setProId == 2 || this.setProId == 3 || this.setProId == 4) {
				let downBox = this.downBoxs[4];
				let year = this.boxs[2].getChildByName('label').getComponent(cc.Label).string;
				let month = this.boxs[3].getChildByName('label').getComponent(cc.Label).string;
				// if (year == '随机' || month == '--') {
				// 	return;
				// }

				var temp = new Date(parseInt(year), parseInt(month), 0);
				let day = temp.getDate();
				let content = cc.find('New ScrollView/view/content', downBox);
				let str = this.boxs[4].getChildByName('label').getComponent(cc.Label).string
				content.children.forEach(el => {
					if (parseInt(str) > day) {
						this.boxs[4].getChildByName('label').getComponent(cc.Label).string = day + '';
					} else {
						//this.boxs[4].getChildByName('label').getComponent(cc.Label).string = day + '';
					}
				});
			} else if (this.setProId == 1) {
				if (str == '随机选股') {
					this._tipsLa.active = true;
				} else {
					this._tipsLa.active = false;
				}
			}

			if (this.setProId == 0) {
				GameData.DXSet.market = str;
			} else if (this.setProId == 1) {
				GameData.DXSet.search = str;
				if (GameData.DXSet.year != '随机') {
					if (GameData.DXSet.search != '随机选股') {
						let date = GameCfgText.getTimeByCodeName(GameData.DXSet.search);
						let ly = date.start.slice(0, 4);
						let lm = date.start.slice(4, 6);
						let ld = date.start.slice(6);

						// let cy = date.end.slice(0, 4);
						// let cm = date.end.slice(4, 6);
						// let cd = date.end.slice(6);
						let st;
						st = GameData.DXSet.year;
						if (GameData.DXSet.month.length == 1) {
							st += ('0' + GameData.DXSet.month);
						} else {
							st += (GameData.DXSet.month);
						}

						if (GameData.DXSet.day.length == 1) {
							st += ('0' + GameData.DXSet.day)
						} else {
							st += GameData.DXSet.day;
						}

						if (parseInt(st) < parseInt(date.start) || parseInt(st) > parseInt(date.end)) {
							GameData.DXSet.year = ly;
							GameData.DXSet.month = lm;
							GameData.DXSet.day = ld;
							this.boxs[2].getChildByName('label').getComponent(cc.Label).string = ly;
							this.boxs[3].getChildByName('label').getComponent(cc.Label).string = lm;
							this.boxs[4].getChildByName('label').getComponent(cc.Label).string = ld;
						}
					}

				}

			} else if (this.setProId == 2) {
				GameData.DXSet.year = str;
				if (GameData.DXSet.year == '随机') {
					this.boxs[3].getChildByName('label').getComponent(cc.Label).string = '随机';
					this.boxs[4].getChildByName('label').getComponent(cc.Label).string = '随机';
					GameData.DXSet.month = '随机';
					GameData.DXSet.day = '随机';
				} else {
					if (GameData.DXSet.search != '随机选股') {
						let date = GameCfgText.getTimeByCodeName(GameData.DXSet.search);
						let ly = date.start.slice(0, 4);
						let lm = date.start.slice(4, 6);
						let ld = date.start.slice(6);

						let cy = date.end.slice(0, 4);
						let cm = date.end.slice(4, 6);
						let cd = date.end.slice(6);
						if (GameData.DXSet.year == ly) {
							if (parseInt(lm) > parseInt(GameData.DXSet.month)) {
								GameData.DXSet.month = lm;
								GameData.DXSet.day = ld;
								this.boxs[3].getChildByName('label').getComponent(cc.Label).string = lm;
								this.boxs[4].getChildByName('label').getComponent(cc.Label).string = ld;
							}
						} else if (GameData.DXSet.year == cy) {
							GameData.DXSet.month = '1';
							GameData.DXSet.day = '1';
							this.boxs[3].getChildByName('label').getComponent(cc.Label).string = '1';
							this.boxs[4].getChildByName('label').getComponent(cc.Label).string = '1';
						} else {
							GameData.DXSet.month = '9';
							GameData.DXSet.day = '10';
							this.boxs[3].getChildByName('label').getComponent(cc.Label).string = '9';
							this.boxs[4].getChildByName('label').getComponent(cc.Label).string = '10';
						}

					} else {
						GameData.DXSet.month = '1';
						GameData.DXSet.day = '1';
						this.boxs[3].getChildByName('label').getComponent(cc.Label).string = '1';
						this.boxs[4].getChildByName('label').getComponent(cc.Label).string = '1';
					}

				}
			} else if (this.setProId == 3) {
				GameData.DXSet.month = str;
			} else if (this.setProId == 4) {
				GameData.DXSet.day = str;
			} else if (this.setProId == 5) {
				GameData.DXSet.line = str;
			} else if (this.setProId == 6) {
				GameData.DXSet.KLine = str;
			} else if (this.setProId == 7) {
				GameData.DXSet.ZLine = str;

				//   if(GameData.DXSet.ZLine!='')
			}
		} else if (name == 'setDXBtnDX') {
			GlobalEvent.emit(EventCfg.OPENSETLAYER);
		} else if (name == 'historyDXBtn') {
			GameCfg.GameType = pb.GameType.DingXiang;
			GlobalEvent.emit(EventCfg.OPENHISTORYLAYER);
		} else if (name == 'startDXBtn') {
			if (GameData.properties[pb.GamePropertyId.Gold] < GameCfgText.gameTextCfg.dxxl.cost[0].v) {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
				return;
			}
			else if (this.curState == 3) {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,开启VIP或解锁该功能取消次数限制');
				return;
			}

			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			GameCfg.GAMEFUPAN = false;
			GameCfg.GameType = pb.GameType.DingXiang;
			GameCfg.GameSet = GameData.DXSet;
			GameCfg.ziChan = 100000;
			this.DXStartGameSet();
		} else if (name == 'blackbtn') {
			this.node.active = false;
			GameCfg.GameType = null;
		}

		else if (name == 'sys_helpbig1') {
			GlobalEvent.emit(EventCfg.OPENHELPLAYER);
		}
	}

	onToggleClick() {
		GameData.DXSet.isFC = this.toggle.isChecked;
	}

	onHangQingToggleClick(event, data) {
		if (data == 0) {
			GameData.DXSet.market = '随机行情';
		} else if (data == 1) {
			GameData.DXSet.market = '单边上涨';
		} else if (data == 2) {
			GameData.DXSet.market = '单边下跌';
		} else if (data == 3) {
			GameData.DXSet.market = '震荡行情';
		}

		if (data != 0) {
			GameData.DXSet.search = '随机选股';
			GameData.DXSet.year = '随机';
			GameData.DXSet.month = '随机';
			GameData.DXSet.day = '随机';
			GameData.DXSet.KLine = '100';
			GameData.DXSet.ZLine = '日线';

			this.onShow();
		}
	}

	onDisable() {
		GameData.DXSet = GameData.DXSet;
	}

	DXStartGameSet() {
		let data = {
			ktype: null,
			kstyle: null,
			code: null,
			from: null,
			total: parseInt(GameData.DXSet.KLine) + 1,
			to: 0
		};
		let items;
		//   console.log(JSON.stringify(GameCfgText.stockList));
		if (GameData.DXSet.search == '随机选股' || GameData.DXSet.search == '') {
			if (GameData.DXSet.year == '随机') {
				let le = parseInt(Math.random() * GameCfgText.stockList.length + '');

				items = GameCfgText.stockList[le].split('|');
				data.code = items[0];
			}
			else {
				let m, d;
				if (GameData.DXSet.month.length < 2) {
					m = '0' + GameData.DXSet.month.length;
				} else {
					m = GameData.DXSet.month;
				}
				if (GameData.DXSet.day.length < 2) {
					d = '0' + GameData.DXSet.day;
				} else {
					d = GameData.DXSet.day;
				}
				let seletTime = GameData.DXSet.year + '' + m + '' + d;
				items = GameCfgText.getItemsByTime(seletTime);
				data.code = items[0];
			}

		} else {
			let dex = -1;
			let arrStr = (GameData.DXSet.search + '').split(' ');
			//	data.code = arrStr[0];
			items = GameCfgText.getGPItemInfo(arrStr[0])
			data.code = items[0];

			let code = data.code + '';
			if (code.length >= 7) {
				code = code.slice(1, 7);
			}

			ComUtils.saveHistory(code + ' ' + items[1]);
		}

		if (GameData.DXSet.market == '随机行情') {
			data.kstyle = pb.KStyle.Random;
		} else if (GameData.DXSet.market == '震荡行情') {
			data.kstyle = pb.KStyle.Wave;
		} else if (GameData.DXSet.market == '单边上涨') {
			data.kstyle = pb.KStyle.Up;
		} else if (GameData.DXSet.market == '单边下跌') {
			data.kstyle = pb.KStyle.Down;
		}

		if (GameData.DXSet.year != '随机') {
			if (GameData.DXSet.month == '随机') {
				GameData.DXSet.month = '01';
			}
			if (GameData.DXSet.day == '随机') {
				GameData.DXSet.day = '01';
			}
			if (GameData.DXSet.month.length == 1) {
				GameData.DXSet.month = '0' + GameData.DXSet.month;
			}
			if (GameData.DXSet.day.length == 1) {
				GameData.DXSet.day = '0' + GameData.DXSet.day;
			}

			let seletTime = GameData.DXSet.year + '' + GameData.DXSet.month + '' + GameData.DXSet.day;
			if (parseInt(seletTime) < parseInt(items[2])) {
				if (GameData.DXSet.search == '随机选股') {
					this.DXStartGameSet();
				} else {
					GlobalEvent.emit(EventCfg.LOADINGHIDE);
					GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '时间不能早与股票创建时间');
				}
				console.log('时间不能早与股票创建时间');
				return;
			} else if (parseInt(seletTime) > parseInt(items[3])) {
				if (parseInt(items[3]) != 0) {
					if (GameData.DXSet.search == '随机选股') {
						this.DXStartGameSet();
					} else {
						GlobalEvent.emit(EventCfg.LOADINGHIDE);
						GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '时间不能大与股票结束时间');
					}
					console.log('时间不能大与股票结束时间');
					return;
				}
			}
			data.from = seletTime;
		} else {
			let start = items[2],
				end = items[3],
				sc;
			if (end == 0) {
				if (GameData.DXSet.ZLine == '周线') {
					sc = new Date().getTime() - data.total * 24 * 60 * 60 * 1000 * 7;
				} else {
					sc = new Date().getTime() - data.total * 24 * 60 * 60 * 1000;
				}
			} else {
				let year = end.slice(0, 4);
				let month = end.slice(4, 6);
				let day = end.slice(6);

				let d = new Date(year + '-' + month + '-' + day);

				if (GameData.DXSet.ZLine == '周线') {
					sc = d.getTime() - data.total * 24 * 60 * 60 * 1000 * 7;
				} else {
					sc = d.getTime() - data.total * 24 * 60 * 60 * 1000;
				}
			}
			let year = start.slice(0, 4);
			let month = start.slice(4, 6);
			let day = start.slice(6);

			let d = new Date(year + '-' + month + '-' + day);
			///console.log(d);
			let t;
			if (GameData.DXSet.ZLine == '周线') {
				t = d.getTime() + 24 * 60 * 60 * 1000 * 100 * 7;
			} else {
				t = d.getTime() + 24 * 60 * 60 * 1000 * 100;
			}

			if (sc < t && GameData.DXSet.year == '随机' && GameData.DXSet.search == '随机选股') {
				this.DXStartGameSet();
				return;
			}

			let s = Math.random() * (sc - t) + t;

			let f = new Date(s);

			{
				let ye = f.getFullYear();
				let mon = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

				let da = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();

				data.from = ye + '' + mon + '' + da;
			}
		}

		GameCfg.data[0].code = items[0];


		GameCfg.data[0].data = [];
		GameCfg.data[0].name = items[1];

		GameCfg.data[0].circulate = items[4];

		console.log('给的数据:' + JSON.stringify(data));

		if (GameData.DXSet.ZLine == '日线') {
			data.ktype = pb.KType.Day;

		} else if (GameData.DXSet.ZLine == '周线') {
			data.ktype = pb.KType.Day7;
		} else if (GameData.DXSet.ZLine == '30分钟K') {
			data.ktype = pb.KType.Min;
		} else if (GameData.DXSet.ZLine == '60分钟K') {
			data.ktype = pb.KType.Min;
		}
		GameCfg.enterGameCache = data;

		GlobalEvent.emit(EventCfg.onCmdQuoteQuery, data);
	}
}
