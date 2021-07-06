import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto';
import GameData from '../GameData';
import LoadUtils from '../Utils/LoadUtils';
import GlobalHandle from '../global/GlobalHandle';
import EnterGameControl from '../global/EnterGameControl';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	@property([cc.Toggle])
	toggles: cc.Toggle[] = [];

	@property([cc.Node])
	Layers: cc.Node[] = [];

	flags = [];

	@property(cc.Sprite)
	userHead: cc.Sprite = null;

	@property(cc.Label)
	UserName: cc.Label = null;

	@property(cc.Label)
	userLevel: cc.Label = null;

	@property(cc.Node)
	girlNode: cc.Node = null;

	protected onLoad() {
		GlobalEvent.on(EventCfg.BLACKGOTOLAYER, (event) => {
			this.onBtnClick(event, null);
		}, this);

		GlobalEvent.on(EventCfg.GENDERCHANGE, () => {
			if (GameData.gender == 1) {
				this.girlNode.active = false;
			} else {
				this.girlNode.active = true;
			}
		}, this);

		GlobalEvent.on(EventCfg.HEADIMGCHANGE, () => {
			this.userHead.spriteFrame = GameData.headImg;
		}, this);
	}

	start() {
		this.initToggle();
		//设置用户信息
		this.setUserInfo();
		//设置用户头像
		this.setHeadImg();
	}

	setHeadImg() {
		let headUrl = GameData.headimgurl;
		if (headUrl) {
			if (headUrl.indexOf('.jpg') != -1) {
				LoadUtils.load(headUrl, texture => {
					let spriteFrame = new cc.SpriteFrame(texture);
					this.userHead.spriteFrame = spriteFrame;
					GameData.headImg = spriteFrame;
				});
			} else {
				LoadUtils.load({ url: headUrl, type: 'png' }, texture => {
					let spriteFrame = new cc.SpriteFrame(texture);
					this.userHead.spriteFrame = spriteFrame;
					GameData.headImg = spriteFrame;
				});
			}
		}
	}

	setUserInfo() {
		// this.userExp.string = GameData.properties[1] + '/' + GameData.maxExp;
		this.userLevel.string = 'LV:' + (GameData.properties[pb.GamePropertyId.Level] || 1) + '';
		//  this.gold.string = GameData.properties[0] || 0 + '';
		//  this.brick.string = GameData.properties[4] || 0 + '';
		this.UserName.string = GameData.userName || GameData.userID;

		if (GameData.gender == 1) {
			this.girlNode.active = false;
		} else {
			this.girlNode.active = true;
		}

		//    this.progr.progress = GameData.properties[1] / GameData.maxExp;
	}

	initToggle() {
		this.toggles.forEach((el, index) => {
			this.flags[index] = el.isChecked;
			this.Layers[index].active = el.isChecked;
		});
	}

	onToggleClick(event, data) {
		this.initToggle();
	}

	onBtnClick(event, data) {
		let name = event.target.name;
		//双盲
		if (name == 'main_xl_smxl') {
			GlobalEvent.emit(EventCfg.OPENSMLAYER);
			GameCfg.GameType = pb.GameType.ShuangMang;
		}
		//指标
		else if (name == 'main_xl_zbxl') {
			GlobalEvent.emit(EventCfg.OPENZBLAYER);
			GameCfg.GameType = pb.GameType.ZhiBiao;
		}
		//定向
		else if (name == 'main_xl_dxxl') {
			GlobalEvent.emit(EventCfg.OPENDXLAYER);
			GameCfg.GameType = pb.GameType.DingXiang;
		}
		//期货
		else if (name == 'main_xl_qhxl') {
			GlobalEvent.emit(EventCfg.OPENQHLAYER);
			GameCfg.GameType = pb.GameType.QiHuo;
		}
		//分时
		else if (name == 'main_xl_fsxl') {
		}
		//条件
		else if (name == 'main_xl_tjdxl') {
		}
		//打开个人中心
		else if (name == 'userinfobg') {
			GlobalEvent.emit(EventCfg.OPENPLAYERINFO);
		}

		//pk
		else if (name == 'main_jj_pkdz') {
			if (EnterGameControl.onCurPKEnterGame()) {
				GameCfg.GameType = pb.GameType.JJ_PK;
				GameCfg.GameSet = GameData.JJPKSet;
				GlobalEvent.emit(EventCfg.OPENMATCHPK);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您没有金币进入该游戏场');
			}

		}
		else if (name == 'main_jj_dkdz') {
			if (EnterGameControl.onCurPKEnterGame()) {
				GameCfg.GameType = pb.GameType.JJ_DuoKong;
				GameCfg.GameSet = GameData.JJPKSet;
				GlobalEvent.emit(EventCfg.OPENMATCHPK);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您没有金币进入该游戏场');
			}

		}
	}

	onDestroy() {
		GlobalEvent.off(EventCfg.BLACKGOTOLAYER);
		GlobalEvent.off(EventCfg.GENDERCHANGE);
		GlobalEvent.off(EventCfg.HEADIMGCHANGE);
	}

}
