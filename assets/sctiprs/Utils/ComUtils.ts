import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import LoadUtils from './LoadUtils';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto'
import GameData from '../GameData';
import LLWConfig from '../common/config/LLWConfig';
import PlatDefine from '../common/config/PlatDefine';
export default class ComUtils {
	private static loading = null;

	private static tipsText = null;

	public static onEvent() {
		//显示加载
		GlobalEvent.on(
			EventCfg.LOADINGSHOW,
			() => {
				this.loading && (this.loading.active = true);
			},
			this
		);

		//关闭加载
		GlobalEvent.on(
			EventCfg.LOADINGHIDE,
			() => {
				this.loading && (this.loading.active = false);
			},
			this
		);

		//提示
		GlobalEvent.on(EventCfg.TIPSTEXTSHOW, (content) => {
			if (this.tipsText) {
				this.tipsText.active = true;
				this.tipsText.getComponent('TipsTextHandle').textData = content;
				this.tipsText.getComponent('TipsTextHandle').onShow();
			} else {
				console.log('ComUtils 中节点加载错误！');
			}
		}, this);

		//提示关闭
		GlobalEvent.on(EventCfg.TIPSTEXTHIDE, () => {
			this.tipsText && (this.tipsText.active = false);
		}, this);
	}

	public static onLoadNode() {
		if (!this.loading) {
			LoadUtils.loadRes('Prefabs/loading', pre => {
				this.loading = cc.instantiate(pre);
				cc.find('Canvas').addChild(this.loading, 99, 'loading');
				this.loading.active = false;
			});
		}

		if (!this.tipsText) {
			LoadUtils.loadRes('Prefabs/tipsText', pre => {
				this.tipsText = cc.instantiate(pre);
				cc.find('Canvas').addChild(this.tipsText, 98, 'tipsText');
				this.tipsText.active = false;
			})
		}

	}

	public static onDestory() {
		GlobalEvent.off(EventCfg.LOADINGHIDE);
		GlobalEvent.off(EventCfg.LOADINGSHOW);
		LoadUtils.releaseRes('Prefabs/loading');
		this.loading = null;
		GlobalEvent.off(EventCfg.TIPSTEXTSHOW);
		LoadUtils.releaseRes('Prefabs/tipsText');
		this.tipsText = null;

		GlobalEvent.off(EventCfg.TIPSTEXTHIDE);
	}

	public static BitmapToByte(img) {
		// let buf = null;
		// let ms = new MemoryStream();
		// img.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
		// buf = ms.GetBuffer();
		// return buf;
		//var base64str = new Buffer(img).toString('base64');
	}

	/**
	 * 
	 * @param time 
	 * return 2001/01/02
	 */
	public static formatTime(time) {
		time = (time + '').replace(/-/g, '');
		//if (GameCfg.GameType == pb.GameType.QiHuo) {
		if (time.length < 10) {
			time = time + '';
			let year = time.slice(0, 4);
			let month = time.slice(4, 6);
			let day = time.slice(6);
			time = year + '/' + month + '/' + day;
		} else if (time.length >= 10) {

			let f = new Date(parseInt(time) * 1000);
			let year = f.getFullYear();
			let month = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

			let day = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();

			if (GameCfg.selectZline == pb.KType.Min5) {
				var h = f.getHours() >= 10 ? f.getHours() : '0' + f.getHours();
				var mm = f.getMinutes() >= 10 ? f.getMinutes() : '0' + f.getMinutes();
				time = year + '/' + month + '/' + day + ' ' + h + ':' + mm;
			} else {
				time = year + '/' + month + '/' + day;
			}
		}
		return time;

	}

	/**
	 * 
	 * @param time 
	 * return yymmdd   200010101
	 */
	public static fromatTime1(time) {
		time = time + '';
		time = ((time + '').replace(/-/g, ''));
		//	if (GameCfg.GameType == pb.GameType.QiHuo) {
		if ((time + '').length < 10) {
			time = time + '';
			let year = time.slice(0, 4);
			let month = time.slice(4, 6);
			let day = time.slice(6);
			time = year + '' + month + '' + day;
		} else {
			let f = new Date(time * 1000);
			let year = f.getFullYear();
			let month = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

			let day = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
			time = year + '' + month + '' + day;
		}

		return time;
	}

	/**
	 * 获取当前年月日
	 */
	public static getCurYearMonthDay() {
		let f = new Date();
		let year = f.getFullYear();
		let month = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

		let day = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
		let str = year + '' + month + '' + day;
		return str;

	}

	/**
	 *获取几个月前的输入日期
	 *{param:DateTime} date 输入日期(YYYY-MM-DD)
	 *{param:number } monthNum 月数
	 */
	public static GetPreMonthDay(date, monthNum) {
		var dateArr = date.split('-');
		var year = dateArr[0]; //获取当前日期的年份
		var month = dateArr[1]; //获取当前日期的月份
		var day = dateArr[2]; //获取当前日期的日
		let day1 = new Date(year, month, 0);
		let days = day1.getDate(); //获取当前日期中月的天数
		var year2 = year;
		var month2 = parseInt(month) - monthNum;
		if (month2 <= 0) {
			var absM = Math.abs(month2);
			year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM + '') / 12);
			month2 = 12 - (absM % 12);
		}
		var day2 = day;
		let days21 = new Date(year2, month2, 0);
		let days2 = days21.getDate();
		if (day2 > days2) {
			day2 = days2;
		}
		// let month3
		// if (month2 < 10) {
		// 	month3 = '0' + month2;
		// }
		//var t2 = year2 + '-' + month2 + '-' + day2;
		let data = {
			y: year2,
			m: month2,
			d: day2,
		}
		return data;
	}

	//获取时间戳
	public static getTimestamp(time) {
		if (time == 0) {
			return 0;
		}
		time = ((time + '').replace(/-/g, ''));
		if (time.length == 10) {
			return time;
		}
		let year = time.slice(0, 4);
		let month = time.slice(4, 6);
		let day = time.slice(6);

		let d = new Date(year + '-' + month + '-' + day);
		let t = d.getTime() / 1000;
		return t;

	}

	//保存缓存
	public static saveHistory(code) {

		if (GameCfg.GameType == pb.GameType.DingXiang) {

			if (GameData.DXHistoryInfo.indexOf(code) == -1) {
				GameData.DXHistoryInfo.push(code);
			}

			if (GameData.DXHistoryInfo.length > 20) {
				GameData.DXHistoryInfo.shift();
			}

			GameData.DXHistoryInfo = GameData.DXHistoryInfo;

		}
		else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
			if (GameData.ZBHistoryInfo.indexOf(code) == -1) {
				GameData.ZBHistoryInfo.push(code);
			}

			if (GameData.ZBHistoryInfo.length > 20) {
				GameData.ZBHistoryInfo.shift();
			}

			GameData.ZBHistoryInfo = GameData.ZBHistoryInfo;
		}

	}

	//iphoneX位置适配
	changeIphoneXAdWidth() {
		if (LLWConfig.PLATTYPE != PlatDefine.PLAT_WECHAT) {
			return;
		}
		let winSize = wx.getSystemInfoSync();
		let name = winSize.model.toString().indexOf('x');

		if (name != -1) {

			console.log('IphoneX');
		} else {

			console.log('node IphoneX');
		}
	}


	//数字变成02：00
	public static onNumChangeTime(sec) {

		let hour, minute, second;
		hour = Math.floor(sec / 3600);
		minute = Math.floor((sec - hour * 3600) / 60);
		second = sec - hour * 3600 - minute * 60;
		if (hour < 10) {
			hour = "0" + hour;
		}
		if (minute < 10) {
			minute = "0" + minute;
		}
		if (second < 10) {
			second = "0" + second;
		}
		return minute + ":" + second;

	}

	//保留2位小数
	public static changeTwoDecimal(num) {
		if (!num) { return 0 };

		return (parseInt(num * 100 + '') / 100).toFixed(2);
	}

	//加载头像
	public static onLoadHead(name, call) {
		let url = LLWConfig.LOADHEADURL + name + '.png';
		LoadUtils.load(url, (res) => {
			call && call(res);
		})
	}

	public static getJJXunXian() {
		let arr = [];
		let smArr = GameData.JJPKSet;
		if (smArr.isMA1 && arr.indexOf(smArr.MA1Date) == -1) {
			arr.push(smArr.MA1Date);
		}
		if (smArr.isMA2 && arr.indexOf(smArr.MA2Date) == -1) {
			arr.push(smArr.MA2Date);
		}
		if (smArr.isMA3 && arr.indexOf(smArr.MA3Date) == -1) {
			arr.push(smArr.MA3Date);
		}
		if (smArr.isMA4 && arr.indexOf(smArr.MA4Date) == -1) {
			arr.push(smArr.MA4Date);
		}
		if (smArr.isMA5 && arr.indexOf(smArr.MA5Date) == -1) {
			arr.push(smArr.MA5Date);
		}
		if (smArr.isMA6 && arr.indexOf(smArr.MA6Date) == -1) {
			arr.push(smArr.MA6Date);
		}
		arr = Array.from(new Set(arr));
		return arr;
	}

	public static numberConvertUnit(number) {
		let str = number;
		if (number >= 100000000) {
			str = this.changeTwoDecimal(number / 100000000) + '亿';
		}
		else if (number >= 10000) {
			str = this.changeTwoDecimal(number / 10000) + '万';
		}
		return str;

	}

	/**
	 * 判断是否是当天
	 * @param str \ 时间戳
	 * @returns   true 当天  反之
	 */
	public static isToday(str) {
		if (new Date(str).toDateString() === new Date().toDateString()) {
			//今天
			return true;
		} else if (new Date(str) < new Date()) {
			//之前
			return false;
		}
	}

}
