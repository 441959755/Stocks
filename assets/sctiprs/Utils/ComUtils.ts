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

		if (GameCfg.GameType == pb.GameType.QiHuo) {
			if ((time + '').length < 10) {
				time = time + '';
				let year = time.slice(0, 4);
				let month = time.slice(4, 6);
				let day = time.slice(6);
				time = year + '/' + month + '/' + day;
			} else {
				let f = new Date(time);
				let year = f.getFullYear();
				let month = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

				let day = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
				time = year + '/' + month + '/' + day;
			}
		} else {
			time = ((time + '').replace(/-/g, '/'));
		}
		return time;

	}

	/**
	 * 
	 * @param time 
	 * return yymmdd   200010101
	 */
	public static fromatTime1(time) {
		if (GameCfg.GameType == pb.GameType.QiHuo) {
			if ((time + '').length < 10) {
				time = time + '';
				let year = time.slice(0, 4);
				let month = time.slice(4, 6);
				let day = time.slice(6);
				time = year + '' + month + '' + day;
			} else {
				let f = new Date(time);
				let year = f.getFullYear();
				let month = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);

				let day = f.getDate() >= 10 ? f.getDate() : '0' + f.getDate();
				time = year + '' + month + '' + day;
			}
		} else {

			// let ye = time.getFullYear();
			// let mon = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);

			// let da = time.getDate() >= 10 ? time.getDate() : '0' + (time.getDate());

			// time = ye + '' + mon + '' + da;
			time = ((time + '').replace(/-/g, ''));
		}
		return time;
	}

}
