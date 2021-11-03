import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto';
import GameData from '../GameData';
import EnterGameControl from '../global/EnterGameControl';
import { LocationPoint } from '../global/LocationPoint';
import GameCfgText from '../GameText';

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
		//回到进入游戏的界面
		GlobalEvent.on(EventCfg.BLACKGOTOLAYER, this.onBtnClick.bind(this), this);

		//性别更改
		GlobalEvent.on(EventCfg.GENDERCHANGE, this.setUserGender.bind(this), this);

		//头像更改
		GlobalEvent.on(EventCfg.HEADIMGCHANGE, this.setUserHead.bind(this), this);

		GlobalEvent.on(EventCfg.NAMECHANGE, this.setUserInfo.bind(this), this);

		GlobalEvent.on(EventCfg.LEVELCHANGE, this.setUserInfo.bind(this), this);

	}

	setUserHead() {
		this.userHead.spriteFrame = GameData.headImg;
	}

	setUserGender() {
		if (GameData.gender == 1) {
			this.girlNode.active = false;
		} else {
			this.girlNode.active = true;
		}
	}

	start() {

		this.initToggle();
		//设置用户信息
		this.setUserInfo();
		//设置用户头像
		this.setUserHead();
		//	this.setHeadImg();

		if (!GameCfg.JJ_XUNLIAN && (GameCfg.GameType == pb.GameType.JJ_ChuangGuan || GameData.locationLayer == LocationPoint.JJ_ChuangGuanOtherHis)) {
			this.onBtnClick({ target: { name: 'main_jj_cgs' } }, null);
		}

		if (GameCfg.JJ_XUNLIAN) {
			GameCfg.JJ_XUNLIAN = false;
		}

		//
		this.upLoadUserInfo();

		if (GameCfg.GameType == 'STUDY') {
			this.changeToggle(3);
		}
	}

	upLoadUserInfo() {
		let WeChatInfo;
		if (!llwSDK.loginPlat) { return }
		if (llwSDK.loginPlat == pb.LoginType.QQ) {
			WeChatInfo = cc.sys.localStorage.getItem('QQInfo');
			cc.sys.localStorage.setItem('QQInfo', 1);
		}

		else if (llwSDK.loginPlat == pb.LoginType.WeChat) {
			WeChatInfo = cc.sys.localStorage.getItem('WeChatInfo');
			cc.sys.localStorage.setItem('WeChatInfo', 1);
		}

		if (!WeChatInfo) {

			{
				let data = {
					uid: GameData.userID,
					nick: GameData.userName,
				}
				socket.send(pb.MessageId.Req_Hall_EditNick, PB.onCmdEditInfoConvertToBuff(data), (info) => {
					console.log('GameData.userName:');
				})
			}

			{
				let data = {
					uid: GameData.userID,
					gender: GameData.gender + '',
				}
				socket.send(pb.MessageId.Req_Hall_EditGender, PB.onCmdEditInfoConvertToBuff(data), (info) => {
					console.log('GameData.gender:');
				})
			}

			{
				if (jsb) {
					let data = {
						uid: GameData.userID,
						icon: new Uint8Array(GameData.headimgurl),
					}

					let CmdUploadIcon = pb.CmdUploadIcon;
					let message = CmdUploadIcon.create(data);
					let buff = CmdUploadIcon.encode(message).finish();

					socket.send(pb.MessageId.Req_Hall_UploadIcon, buff, (info) => {
						console.log('GameData.headImg:' + JSON.stringify(info));
					})
				}
			}
		}
	}


	setUserInfo() {
		this.userLevel.string = 'LV:' + (GameData.properties[pb.GamePropertyId.Level] || 1) + '';

		this.UserName.string = GameData.userName || GameData.userID;

		this.setUserGender();

	}

	initToggle() {
		this.toggles.forEach((el, index) => {
			this.flags[index] = el.isChecked;
			this.Layers[index].active = el.isChecked;
		});
	}

	changeToggle(index) {
		this.toggles.forEach((el, i) => {
			el.isChecked = false;
			if (index == i) {
				el.isChecked = true;
			}
		})

		this.initToggle();
	}


	onToggleClick(event, data) {
		this.initToggle();
	}

	onBtnClick(event, data) {
		let name = event.target.name;
		//双盲
		if (name == 'main_xl_smxl') {
			if (!GameCfgText.getSwitchModule(1)) {
				GlobalEvent.emit(EventCfg.OPENSMLAYER);
				GameCfg.GameType = pb.GameType.ShuangMang;
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//指标
		else if (name == 'main_xl_zbxl') {
			if (!GameCfgText.getSwitchModule(4)) {
				GlobalEvent.emit(EventCfg.OPENZBLAYER);
				GameCfg.GameType = pb.GameType.ZhiBiao;
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//定向
		else if (name == 'main_xl_dxxl') {
			if (!GameCfgText.getSwitchModule(2)) {
				GlobalEvent.emit(EventCfg.OPENDXLAYER);
				GameCfg.GameType = pb.GameType.DingXiang;
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//期货
		else if (name == 'main_xl_qhxl') {
			if (!GameCfgText.getSwitchModule(3)) {
				GlobalEvent.emit(EventCfg.OPENQHLAYER);
				GameCfg.GameType = pb.GameType.QiHuo;
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//分时
		else if (name == 'main_xl_fsxl') {
			if (!GameCfgText.getSwitchModule(6)) {
				GameCfg.GameType = pb.GameType.FenShi;
				GlobalEvent.emit(EventCfg.OPENFENSHI);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//条件
		else if (name == 'main_xl_tjdxl') {
			if (!GameCfgText.getSwitchModule(5)) {
				GameCfg.GameType = pb.GameType.TiaoJianDan;
				GlobalEvent.emit(EventCfg.OPENTIAOJIANDAN);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//打开个人中心
		else if (name == 'userinfobg') {
			GlobalEvent.emit(EventCfg.OPENPLAYERINFO);
		}

		//pk
		else if (name == 'main_jj_pkdz') {
			if (!GameCfgText.getSwitchModule(7)) {
				if (EnterGameControl.onCurPKEnterGame()) {
					GameCfg.GameType = pb.GameType.JJ_PK;
					GameCfg.GameSet = GameData.JJPKSet;
					GlobalEvent.emit(EventCfg.OPENMATCHPK);
				}
				else {
					GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您没有金币进入该游戏场');
				}

			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		else if (name == 'main_jj_dkdz') {
			if (!GameCfgText.getSwitchModule(8)) {
				if (EnterGameControl.onCurPKEnterGame()) {
					GameCfg.GameType = pb.GameType.JJ_DuoKong;
					GameCfg.GameSet = GameData.JJPKSet;
					GlobalEvent.emit(EventCfg.OPENMATCHPK);
				}
				else {
					GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您没有金币进入该游戏场');
				}
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//打开闯关赛
		else if (name == 'main_jj_cgs') {
			if (!GameCfgText.getSwitchModule(9)) {
				GameCfg.GameType = pb.GameType.JJ_ChuangGuan;
				GameCfg.GameSet = GameData.JJPKSet;
				GlobalEvent.emit(EventCfg.OPENCHUANGUAN);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}

		}
		//点击竞技
		else if (name == 'toggle1' || name == 'toggle2' || name == 'toggle3') {
			let index = parseInt(name.slice(-1));
			this.changeToggle(index);
		}

		//点击创建对战
		else if (name == 'main_jj_cjdz') {
			if (!GameCfgText.getSwitchModule(10)) {
				GlobalEvent.emit(EventCfg.OPENCJDZ);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//加入对战
		else if (name == 'main_jj_jrdz') {
			if (!GameCfgText.getSwitchModule(11)) {
				GlobalEvent.emit(EventCfg.OPENJRDZ);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//智能选股
		else if (name == 'main_sp_znxg') {
			if (!GameCfgText.getSwitchModule(13)) {
				GlobalEvent.emit(EventCfg.OPENZNXG);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//模拟炒股
		else if (name == 'main_sp_mncg') {
			if (!GameCfgText.getSwitchModule(14)) {
				GlobalEvent.emit(EventCfg.OPENMNXG);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		else if (name == 'main_sp_cgds') {
			if (!GameCfgText.getSwitchModule(15)) {
				GlobalEvent.emit(EventCfg.OPENCGDS);
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//大盘竞猜
		else if (name == 'main_sp_dpjc') {
			if (!GameCfgText.getSwitchModule(16)) {
				GameCfg.GameType = pb.GameType.DaPanJingChai;
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				cc.director.loadScene('guess');
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//个股竞猜
		else if (name == 'main_sp_ggjc') {
			if (!GameCfgText.getSwitchModule(16)) {
				GameCfg.GameType == pb.GameType.GeGuJingChai;
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				cc.director.loadScene('guess');
			}
			else {
				GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, "该功能暂未开放，敬请期待");
			}
		}

		//学习
		else if (name == 'main_study_kxrm' || name == 'main_study_jx' ||
			name == 'main_study_cjl' || name == 'main_study_macd' ||
			name == 'main_study_kdj' || name == 'main_study_boll' ||
			name == 'main_study_rsi' || name == 'main_study_expma') {
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			GameCfg.GameType = 'STUDY';
			GameData.schoolProgress = data;
			cc.director.loadScene('school');
		}

	}

	onDestroy() {
		GlobalEvent.off(EventCfg.BLACKGOTOLAYER);
		GlobalEvent.off(EventCfg.GENDERCHANGE);
		GlobalEvent.off(EventCfg.HEADIMGCHANGE);
		GlobalEvent.off(EventCfg.NAMECHANGE);
		GlobalEvent.off(EventCfg.LEVELCHANGE)
	}

}
