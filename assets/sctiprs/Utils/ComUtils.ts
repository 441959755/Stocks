
import LoadUtils from './LoadUtils';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto'
import GameData from '../GameData';
import LLWConfig from '../common/config/LLWConfig';
import PlatDefine from '../common/config/PlatDefine';

export default class ComUtils {


	public static call = null;
	public static VIPTimeCall = [];

	//获取vip结束时间
	public static getVIPDisTime(call) {

		let obj = {
			day: null,
			hours: null,
			minute: null,
		}

		this.VIPTimeCall.push(call);

		let dis = GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000;

		//	let f = new Date(dis * 1000);

		obj.day = parseInt(dis / (60 * 60 * 24) + '');


		dis = dis - obj.day * (60 * 60 * 24);

		obj.hours = parseInt(dis / (60 * 60) + '');

		dis = dis - obj.hours * (60 * 60);

		obj.minute = parseInt(dis / (60) + '');

		call(obj);

		if (!this.call) {
			this.call = setInterval(() => {

				let dis = GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000;
				obj.day = parseInt(dis / (60 * 60 * 24) + '');

				dis = dis - obj.day * (60 * 60 * 24);

				obj.hours = parseInt(dis / (60 * 60) + '');

				dis = dis - obj.hours * (60 * 60);

				obj.minute = parseInt(dis / (60) + '');

				this.VIPTimeCall.forEach(el => {
					el && (el(obj));
				})

			}, 60 * 1000);
		}

	}

	public static onDestory() {
		this.call && (clearInterval(this.call))
		this.call = null;
		this.VIPTimeCall = [];
		this.VIPTimeCall.length = 0;
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
	 * @param time 时间戳
	 * return 时：分：秒
	 */
	public static getSFMTamp(time1) {
		let time = new Date(parseInt(time1) * 1000);
		let hours, minute, second;
		hours = time.getHours(),
			minute = time.getMinutes(),
			second = time.getSeconds();

		if (hours < 10) { hours = '0' + hours; }
		if (minute < 10) { minute = '0' + minute; }
		if (second < 10) { second = '0' + second; }
		return hours + ':' + minute + ':' + second;
	}

	/**
 * 
 * @param time 时间戳
 * return 时：分：秒
 */
	public static getSFMTamp1(time1) {
		let time = new Date(parseInt(time1) * 1000);
		let hours, minute, second;
		hours = time.getHours(),
			minute = time.getMinutes();
		//	second = time.getSeconds();

		if (hours < 10) { hours = '0' + hours; }
		if (minute < 10) { minute = '0' + minute; }
		//	if (second < 10) { second = '0' + second; }
		return hours + ':' + minute;
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
	public static GetAddDay(date, dayNum) {
		var dateArr = date.split('-');
		var year = dateArr[0]; //获取当前日期的年份
		var month = dateArr[1]; //获取当前日期的月份
		var day = dateArr[2]; //获取当前日期的日
		let day1 = new Date(year, month, day);
		let days = day1.getTime(); //获取当前日期中月的天数

		let f = new Date(days + 24 * 60 * 60 * 100 * dayNum);

		let year2 = f.getFullYear();

		let month2 = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

		let day2 = f.getDate() >= 10 ? f.getDate() : '0' + (f.getDate());

		let data = {
			y: year2,
			m: month2,
			d: day2,
		}
		return data;
	}

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
		return num.toFixed(2);
	}

	//保留2位小数
	public static changeTwoDecimal1(num) {
		if (!num) { return 0 };
		return num.toFixed(2);
	}

	//加载头像
	public static onLoadHead(name, call) {
		if (!name) {
			name = 0;
		}

		let url = LLWConfig.LOADIMGURL + 'icon/' + name + '.png';

		LoadUtils.load(url, (res) => {
			call && call(res);
		})
	}

	public static getJJXunXian() {
		let arr = [];
		let smArr;

		smArr = GameData.JJPKSet;

		if (smArr.isMA1 && arr.indexOf(smArr.MA1Date) == -1) {
			arr.push(smArr.MA1Date);
		}
		else {
			arr.push(0);
		}

		if (smArr.isMA2 && arr.indexOf(smArr.MA2Date) == -1) {
			arr.push(smArr.MA2Date);
		}
		else {
			arr.push(0);
		}

		if (smArr.isMA3 && arr.indexOf(smArr.MA3Date) == -1) {
			arr.push(smArr.MA3Date);
		}
		else {
			arr.push(0);
		}

		if (smArr.isMA4 && arr.indexOf(smArr.MA4Date) == -1) {
			arr.push(smArr.MA4Date);
		}
		else {
			arr.push(0);
		}

		if (smArr.isMA5 && arr.indexOf(smArr.MA5Date) == -1) {
			arr.push(smArr.MA5Date);
		}
		else {
			arr.push(0);
		}

		if (smArr.isMA6 && arr.indexOf(smArr.MA6Date) == -1) {
			arr.push(smArr.MA6Date);
		}

		else {
			arr.push(0);
		}
		arr = Array.from(new Set(arr));
		return arr;
	}

	public static numberConvertUnit(number) {
		let str;
		str = parseInt(number);
		if (number >= 100000000) {
			str = (this.changeTwoDecimal(number / 100000000) + '') + '亿';
		}
		else if (number >= 10000) {
			str = (this.changeTwoDecimal(number / 10000) + '') + '万';
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

	public static getChenghaoByFame(fame) {
		let str;
		if (fame <= 99) {
			str = '股市小白';
		}
		else if (fame <= 249) {
			str = '股市新手';
		}
		else if (fame <= 499) {
			str = '股市菜鸡';
		}
		else if (fame <= 999) {
			str = '初级股民';
		}
		else if (fame <= 1999) {
			str = '中级股民';
		}
		else if (fame <= 2999) {
			str = '高级股民';
		}
		else if (fame <= 3999) {
			str = '股市牛人';
		}
		else if (fame <= 4999) {
			str = '股市大神';
		}
		else if (fame >= 5000) {
			str = '股市至尊';
		}
		return str;
	}

	public static getClass(o) { //判断数据类型
		return Object.prototype.toString.call(o).slice(8, -1);
	}

	public static deepCopy(obj) {

		var result, oClass = this.getClass(obj);

		if (oClass == "Object") result = {}; //判断传入的如果是对象，继续遍历
		else if (oClass == "Array") result = []; //判断传入的如果是数组，继续遍历
		else return obj; //如果是基本数据类型就直接返回

		for (var i in obj) {
			var copy = obj[i];

			if (this.getClass(copy) == "Object") result[i] = this.deepCopy(copy); //递归方法 ，如果对象继续变量obj[i],下一级还是对象，就obj[i][i]
			else if (this.getClass(copy) == "Array") result[i] = this.deepCopy(copy); //递归方法 ，如果对象继续数组obj[i],下一级还是数组，就obj[i][i]
			else result[i] = copy; //基本数据类型则赋值给属性
		}

		return result;
	}

	public static stringify(org) {
		var cache = [];
		var str = JSON.stringify(org, function (key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					// Circular reference found, discard key
					return;
				}
				// Store value in our collection
				cache.push(value);
			}
			return value;
		});
		cache = null; // Enable garbage collection
		return str;
	}


	public static getYMDHMS(time) {
		time = new Date(time);
		var year = time.getFullYear(),
			month = time.getMonth() + 1,
			date = time.getDate(),
			hours = time.getHours(),
			minute = time.getMinutes(),
			second = time.getSeconds();

		if (month < 10) { month = '0' + month; }
		if (date < 10) { date = '0' + date; }
		if (hours < 10) { hours = '0' + hours; }
		if (minute < 10) { minute = '0' + minute; }
		if (second < 10) { second = '0' + second; }

		return {
			year: year,
			month: month,
			date: date,
			hours: hours,
			minute: minute,
			second: second
		}
	}

	public static resetSize(cav) {
		//cc.view.setDesignResolutionSize(1280,720, cc.ResolutionPolicy.EXACT_FIT );
		let frameSize = cc.view.getFrameSize();
		let designSize = cc.view.getDesignResolutionSize();

		if (frameSize.width / frameSize.height > designSize.width / designSize.height) {
			cav.width = designSize.height * frameSize.width / frameSize.height;
			cav.height = designSize.height;
			cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
		} else {
			cav.width = designSize.width;
			cav.height = designSize.width * frameSize.height / frameSize.width;
			cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
		}
		this.fitScreen(cav, designSize);
	}
	/**
	 * 背景适配
	 * @param canvasnode
	 * @param designSize
	 */
	public static fitScreen(canvasnode, designSize) {
		let scaleW = canvasnode.width / designSize.width;
		let scaleH = canvasnode.height / designSize.height;

		let bgNode = canvasnode.getChildByName('bg');
		let bgScale = canvasnode.height / bgNode.height;
		bgNode.width *= bgScale;
		bgNode.height *= bgScale;
		if (scaleW > scaleH) {
			bgScale = canvasnode.width / bgNode.width;
			bgNode.width *= bgScale;
			bgNode.height *= bgScale;
		}
	}



}
