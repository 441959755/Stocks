import GameData from "../GameData";
import Socket from "../common/net/socket";
import GameCfg from "../game/GameCfg";
import GameCfgText from '../GameText';
import AudioUtils from '../Utils/AudioUtils';
import LLLog from '../common/utils/LLLog'
import PopupManager from '../Utils/PopupManager';

cc.Class({
	extends: cc.Component,

	init() {
		window.global = window;

		let PBHelper = require('pbhelper');

		let pbhelper = new PBHelper();

		global.PB = pbhelper;

		//	global.socket = null;

		global.socket = Socket;

	},

	onLoad() {
		this.init();

		AudioUtils.getAudioVolume();

		AudioUtils.loadAudios('audios');

		PopupManager.init();

		GameCfgText.LoadGameConf();

		LLLog.reConsole();

		cc.macro.ENABLE_MULTI_TOUCH = false;

		cc.Button.prototype._onTouchEnded = function (t) {
			if (this.interactable && this.enabledInHierarchy) {
				AudioUtils.playEffect("click", false);
				if (this._pressed) {
					cc.Component.EventHandler.emitEvents(this.clickEvents, t);
					this.node.emit("click", this);
				}
				this._pressed = !1;
				this._updateState();
				t.stopPropagation();
			}
		}

		cc.director.preloadScene('hall', () => {
			console.log('hall 场 景 加 载 完 成');
		})

	},

	start() {
		this.initData();
	},

	initData() {
		let SMSet = cc.sys.localStorage.getItem('SMSET');
		if (!SMSet) {
			SMSet = {
				KLine: '150',
				ZLine: '日线',
				year: '随机',
				month: '随机',
				day: '随机',
				isShowVol: true,
				isBW: true,
				isMA1: true,
				MA1Date: 5,
				isMA2: true,
				MA2Date: 10,
				isMA3: true,
				MA3Date: 20,
				isMA4: true,
				MA4Date: 30,
				isMA5: true,
				MA5Date: 60,
				isMA6: true,
				MA6Date: 120,
				isFC: false,

			}
			GameData.SMSet = SMSet;
		} else {
			GameData.SMSet = JSON.parse(SMSet);
		}

		let JJPKSet = cc.sys.localStorage.getItem('JJPKSET');
		if (!JJPKSet) {
			JJPKSet = {
				KLine: '150',
				ZLine: '日线',
				year: '随机',
				month: '随机',
				day: '随机',
				isShowVol: true,
				isBW: true,
				isMA1: true,
				MA1Date: 5,
				isMA2: true,
				MA2Date: 10,
				isMA3: true,
				MA3Date: 20,
				isMA4: true,
				MA4Date: 30,
				isMA5: true,
				MA5Date: 60,
				isMA6: true,
				MA6Date: 120,
				isFC: false,

			}
			GameData.JJPKSet = JJPKSet;
		} else {
			GameData.JJPKSet = JSON.parse(JJPKSet);
		}

		let DXSet = cc.sys.localStorage.getItem('DXSET');
		if (!DXSet) {
			DXSet = {
				k_notice: true,
				jx_notice: true,
				StopCheck_notice: true,
				isShowVol: true,
				isBW: true,
				isMA1: true,
				MA1Date: 5,
				isMA2: true,
				MA2Date: 10,
				isMA3: true,
				MA3Date: 20,
				isMA4: true,
				MA4Date: 30,
				isMA5: true,
				MA5Date: 60,
				isMA6: true,
				MA6Date: 120,
				market: '随机行情',
				search: '随机选股',
				year: '随机',
				month: '随机',
				day: '随机',
				line: 'K线',
				KLine: 100,
				ZLine: '日线',
				isFC: false,
			}
			GameData.DXSet = DXSet;
		} else {
			GameData.DXSet = JSON.parse(DXSet);
		}

		let ZBSet = cc.sys.localStorage.getItem('ZBSet');
		if (!ZBSet) {
			ZBSet = {
				select: 'MACD',
				strategy: 'MACD金叉',
				search: '随机选股',
				year: '随机',
				month: '随机',
				day: '随机',
				KLine: 150,
				ZLine: '日线',
				showSign: true,
				MA: [20, 10, 30, -8],
				VOL: [5, 20],
				MACD: [12, 26, 9],
				BOLL: [20],
				KDJ: [9],
				RSI: [6, 12, 24],
				EXPMA: [12, 50],
				isShowVol: true,
				isBW: true,
			}
			GameData.ZBSet = ZBSet;
		} else {
			GameData.ZBSet = JSON.parse(ZBSet);
		}

		{
			let str = cc.sys.localStorage.getItem('TIMETEMP');
			if (str) {
				GameCfg.TIMETEMP = JSON.parse(str);
				//上个月的数据清除
				if (GameCfg.TIMETEMP.length > 0) {
					var data = new Date(); //本月
					data.setDate(1);
					data.setHours(0);
					data.setSeconds(0);
					data.setMinutes(0);

					let time = data.getTime() / 1000;
					let arr = [];
					GameCfg.TIMETEMP.forEach(el => {
						if (el <= time) {

							cc.sys.localStorage.removeItem(el + 'cache');
						} else {
							arr.push(el);
						}
					})

					GameCfg.TIMETEMP = arr;
					cc.sys.localStorage.setItem('TIMETEMP', JSON.stringify(GameCfg.TIMETEMP))
				} else {
					console.log('in login' + '还没缓存数据');
				}
			}
		}

		//期货设置
		{
			let QHSet = cc.sys.localStorage.getItem('QHSET');
			if (!QHSet) {
				QHSet = {
					isShowVol: true,
					isBW: true,
					isMA1: true,
					MA1Date: 5,
					isMA2: true,
					MA2Date: 10,
					isMA3: true,
					MA3Date: 20,
					isMA4: true,
					MA4Date: 30,
					isMA5: true,
					MA5Date: 60,
					isMA6: true,
					MA6Date: 120,
					isFC: false,
					JYS: '随机',
					LXPZ: '随机',
					HY: '随机',
					year: '随机',
					month: '随机',
					day: '随机',
					KLine: 120,
					ZLine: '日线',

				}
				GameData.QHSet = QHSet;
			} else {
				GameData.QHSet = JSON.parse(QHSet);
			}
		}

		//条件单
		{
			let TJDSet = cc.sys.localStorage.getItem('TJDSET');
			if (!TJDSet) {
				TJDSet = {
					isShowVol: true,
					isBW: true,
					isMA1: true,
					MA1Date: 5,
					isMA2: true,
					MA2Date: 10,
					isMA3: true,
					MA3Date: 20,
					isMA4: true,
					MA4Date: 30,
					isMA5: true,
					MA5Date: 60,
					isMA6: true,
					MA6Date: 120,
					isFC: true,
					KLine: 150,
					ZLine: '日线',
					KSpeed: 0.2,
					line: 'K线',
				}
				GameData.TJDSet = TJDSet;
			} else {
				GameData.TJDSet = JSON.parse(TJDSet);
			}

		}

		//选择的股票信息
		let DXHistoryInfo = cc.sys.localStorage.getItem('DXHISTORYINFO');
		if (!DXHistoryInfo) {
			GameData.DXHistoryInfo = [];
		} else {
			GameData.DXHistoryInfo = JSON.parse(DXHistoryInfo);

		}

		let QHHistoryInfo = cc.sys.localStorage.getItem('QHHISTORYINFO');
		if (!QHHistoryInfo) {
			GameData.QHHistoryInfo = [];
		} else {
			GameData.QHHistoryInfo = JSON.parse(QHHistoryInfo);
		}

		let ZBHistoryInfo = cc.sys.localStorage.getItem('ZBHISTORYINFO');
		if (!ZBHistoryInfo) {
			GameData.ZBHistoryInfo = [];
		} else {
			GameData.ZBHistoryInfo = JSON.parse(ZBHistoryInfo);
		}

		//获取DX今天的看广告的次数
		{
			let str = new Date().toLocaleDateString();
			let ADCount = cc.sys.localStorage.getItem('DINGXIANGADCOUNT' + str);
			if (!ADCount) {
				GameData.DingXiangADCount = 0;
			}
			else {
				GameData.DingXiangADCount = parseInt(ADCount);
			}

			let str1 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString();

			cc.sys.localStorage.removeItem('DINGXIANGADCOUNT' + str1);
		}

		//获取QH今天看广告的次数
		{
			let str = new Date().toLocaleDateString();
			let ADCount = cc.sys.localStorage.getItem('QHADCOUNT' + str);
			if (!ADCount) {
				GameData.QHADCount = 0;
			}
			else {
				GameData.QHADCount = parseInt(ADCount);
			}

			let str1 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString();

			cc.sys.localStorage.removeItem('QHADCOUNT' + str1);
		}

		//获取TJ今天看广告的次数
		{
			let str = new Date().toLocaleDateString();
			let ADCount = cc.sys.localStorage.getItem('TJADCOUNT' + str);
			if (!ADCount) {
				GameData.TJADCount = 0;
			}
			else {
				GameData.TJADCount = parseInt(ADCount);
			}

			let str1 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString();

			cc.sys.localStorage.removeItem('TJADCOUNT' + str1);
		}

		{
			let SelectBk = cc.sys.localStorage.getItem('SELECTBK');
			if (!SelectBk) {
				GameData.SelectBk = [1, 1, 1, 1, 1, 1];
			}
			else {
				GameData.SelectBk = JSON.parse(SelectBk);
				//	GameData.SelectBk = SelectBk;
			}
		}

	},

	onDestroy() {
		GameCfgText.releaseRes();
		PopupManager.delPopupNode();
	}
});
