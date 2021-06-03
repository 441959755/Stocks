import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import LoadUtils from './LoadUtils';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto'

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
		//	} else {
		//time = ((time + '').replace(/-/g, '/'));
		//	}
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
		// } else {

		// 	// let ye = time.getFullYear();
		// 	// let mon = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);

		// 	// let da = time.getDate() >= 10 ? time.getDate() : '0' + (time.getDate());

		// 	// time = ye + '' + mon + '' + da;
		// 	time = ((time + '').replace(/-/g, ''));
		// }
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
		code += '';
		if (code.length >= 7) {
			code = code.slice(1, 7);
		}
		if (GameCfg.GameType == pb.GameType.DingXiang) {


		}

	}



}
