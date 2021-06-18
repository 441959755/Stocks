import GameData from "../GameData";
import LLWSDK from "../common/sdk/LLWSDK";

import Socket from "../common/net/socket";
import GameCfg from "../game/GameCfg";

import GameCfgText from '../GameText';
import ComUtils from '../Utils/ComUtils';
import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import AudioUtils from '../Utils/AudioUtils';
import LLLog from '../common/utils/LLLog'

window.global = window;

cc.ext = {};

cc.Class({
	extends: cc.Component,

	properties: {

	},

	init() {
		let PBHelper = require('pbhelper');

		let pbhelper = new PBHelper();

		global.PB = pbhelper;
	},

	onLoad() {
		this.init();
		//AudioUtils.LoadAudios('audios');
		ComUtils.onLoadNode();
		ComUtils.onEvent();

		//游戏配置
		GameCfgText.getOtherCfg();

		//股票配置
		GameCfgText.getStocktList();
		//期货配置
		GameCfgText.getQIHuoList();

		LLLog.reConsole();

		cc.macro.ENABLE_MULTI_TOUCH = false;

	},

	start() {
		this.initData();
		let self = this;
		// //TODO  接DSK
		let llwSDK = LLWSDK.getSDK()
		global.llwSDK = llwSDK;
		llwSDK.login((decoded) => {
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			console.log(decoded.token + decoded.uid + decoded.gameAddr);
			if (decoded) {
				decoded.token && (GameData.token = decoded.token);
				decoded.uid && (GameData.userID = decoded.uid);
				if (decoded.gameAddr) {
					let socket = Socket(decoded.gameAddr);
					global.socket = socket;
				}
			} else {
				console.log('login err');
				GlobalEvent.emit(EventCfg.LOADINGHIDE);
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '网络连接错误，请检查网络是否连接.');
			}
		})
	},

	initData() {
		let SMSet = cc.sys.localStorage.getItem('SMSET');
		if (!SMSet) {
			SMSet = {
				KLine: '150',
				ZLine: '日线',
				year: '随机',
				month: '--',
				day: '--',
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
				month: '--',
				day: '--',
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
				month: '--',
				day: '--',
				KLine: 150,
				ZLine: '日线',
				showSign: true,
				MA: [20, 10, 20, -8],
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

	},

	onDestroy() {
		GameCfgText.releaseRes();
		ComUtils.onDestory();
	}
});
