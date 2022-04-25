import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import { pb } from '../../protos/proto';
import GameData from '../GameData';
import GameCfgText from '../GameText';
import LLWSDK from '../common/sdk/LLWSDK';
import PopupManager from '../Utils/PopupManager';
import GameCfg from '../game/GameCfg';
import ComUtils from '../Utils/ComUtils';
import GlobalHandle from '../global/GlobalHandle';
import ActionUtils from '../Utils/ActionUtils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class HallContent extends cc.Component {

	@property([cc.Toggle])
	toggles: cc.Toggle[] = [];

	@property([cc.Node])
	Layers: cc.Node[] = [];

	//提示
	@property(cc.Label)
	pkLabel: cc.Label = null;

	//提示
	@property(cc.Label)
	dkLabel: cc.Label = null;

	@property(cc.Node)
	userInfo: cc.Node = null;

	onLoad() {
		//发放奖励动画
		GlobalEvent.on('CmdGoldAwardPrompt', this.CmdGoldAwardPrompt.bind(this), this);
	}


	start() {

		this.initToggle();

		//首次上传用户信息
		this.upLoadUserInfo();

		//
		if (GameCfg.GameType == 'STUDY') {
			this.changeToggle(3);
		}

		//是否首次登入
		if (GameData.firstGame) {
			GameData.firstGame = false;
			setTimeout(() => {
				this.showFirstBox();
			}, 200);
		}

		//奖励弹窗
		if (GameData.goldAwardPrompt) {
			setTimeout(() => {
				this.CmdGoldAwardPrompt();
			}, 500)
		}

		let userInfoHandle = this.userInfo.getComponent('UserInfo');
		userInfoHandle.userInfo = {
			userID: GameData.userID,
		}
	}

	CmdGoldAwardPrompt() {
		PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/fl/leadgoldAn', 100, null);
	}

	//首次登入弹框
	showFirstBox() {
		this.changeToggle(4);
		PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/fl/dailyWelfare', 10, (node) => {
			let handle = node.getComponent('DailyWelfare');
			handle && (handle.onShow());
		});
	}

	//首次上传用户信息
	upLoadUserInfo() {

		if (!LLWSDK.getSDK().loginPlat) { return }

		if (GameData.gameData.is_edited_nick) {
			{
				let data = {
					uid: GameData.userID,
					nick: GameData.userName,
				}
				socket.send(pb.MessageId.Req_Hall_EditNick, PB.onCmdEditInfoConvertToBuff(data), (info) => {
					console.log('GameData.userName:' + JSON.stringify(info));
				})
			}

			{
				let data = {
					uid: GameData.userID,
					gender: GameData.gender + '',
				}
				socket.send(pb.MessageId.Req_Hall_EditGender, PB.onCmdEditInfoConvertToBuff(data), (info) => {
					console.log('GameData.gender:' + JSON.stringify(info));
				})
			}
		}

		// {
		// 	let data = {
		// 		uid: GameData.userID,
		// 		//icon: new Uint8Array(GameData.headimgurl),
		// 		icon: GameData.headimgurl,
		// 	}
		// 	let CmdUploadIcon = pb.CmdUploadIcon;
		// 	let message = CmdUploadIcon.create(data);
		// 	let buff = CmdUploadIcon.encode(message).finish();

		// 	socket.send(pb.MessageId.Req_Hall_UploadIcon, buff, (info) => {
		// 		console.log('GameData.headImg:' + JSON.stringify(info));
		// 	})
		// }
	}



	initToggle() {
		this.toggles.forEach((el, index) => {
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
			//开关
			GameCfgText.getSwitchModule(1, () => {
				GameCfg.GameType = pb.GameType.ShuangMang;
				GlobalEvent.emit(EventCfg.OPENSMLAYER);
			})
		}

		//指标
		else if (name == 'main_xl_zbxl') {

			GameCfgText.getSwitchModule(4, () => {
				GameCfg.GameType = pb.GameType.ZhiBiao;
				GlobalEvent.emit(EventCfg.OPENZBLAYER);

			})
		}

		//定向
		else if (name == 'main_xl_dxxl') {

			GameCfgText.getSwitchModule(2, () => {
				GameCfg.GameType = pb.GameType.DingXiang;
				GlobalEvent.emit(EventCfg.OPENDXLAYER);

			})
		}

		//期货
		else if (name == 'main_xl_qhxl') {

			GameCfgText.getSwitchModule(3, () => {
				GameCfg.GameType = pb.GameType.QiHuo;
				GlobalEvent.emit(EventCfg.OPENQHLAYER);
			})

		}

		//分时
		else if (name == 'main_xl_fsxl') {

			GameCfgText.getSwitchModule(6, () => {
				GameCfg.GameType = pb.GameType.FenShi;
				GlobalEvent.emit(EventCfg.OPENFENSHI);
			})
		}

		//条件
		else if (name == 'main_xl_tjdxl') {

			GameCfgText.getSwitchModule(5, () => {
				GameCfg.GameType = pb.GameType.TiaoJianDan;
				GlobalEvent.emit(EventCfg.OPENTIAOJIANDAN);
			})
		}



		//pk
		else if (name == 'main_jj_pkdz') {

			GameCfgText.getSwitchModule(7, () => {
				if (GameData.properties[pb.GamePropertyId.Gold] < 500) {
					GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
					GlobalEvent.emit('onShowGobroke');
					return;
				}

				GameCfg.GameType = pb.GameType.JJ_PK;
				// let gameStatus = EnterGameControl.onCurWXIsEnterGame();
				// if (gameStatus.status == 3) {
				// 	GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,请点击在线客服,体验完整版APP');
				// 	return;
				// }
				// else {
				// 	let cb = () => {
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				GameCfg.GameSet = GameData.JJPKSet;
				GlobalEvent.emit(EventCfg.OPENMATCHPK);
				// }
				// 		if (GameData.adSucceed) {
				// 	cb && cb();
				// }
				// else {
				// 	PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/unlockBox', 22, (node) => {
				// 		node.getComponent('UnlockBox').callback = cb;
				// 	});
				// }
				//}
			})
		}

		else if (name == 'main_jj_dkdz') {
			GameCfgText.getSwitchModule(8, () => {
				//s	if (EnterGameControl.onCurPKEnterGame()) {
				// LLWSDK.getSDK().showVideoAd((flag) => {
				// 	if (flag) {
				if (GameData.properties[pb.GamePropertyId.Gold] < 500) {
					GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '金币不足');
					GlobalEvent.emit('onShowGobroke');
					return;
				}

				GameCfg.GameType = pb.GameType.JJ_DuoKong;
				// let gameStatus = EnterGameControl.onCurWXIsEnterGame();
				// if (gameStatus.status == 3) {
				// 	GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '今日次数已用完,请点击在线客服,体验完整版APP');
				// 	return;
				// }
				// else {
				// 	let cb = () => {
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				GameCfg.GameSet = GameData.JJPKSet;
				GlobalEvent.emit(EventCfg.OPENMATCHPK);
				// 	}
				// 	if (GameData.adSucceed) {
				// 		cb && cb();
				// 	}
				// 	else {
				// 		PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/unlockBox', 22, (node) => {
				// 			node.getComponent('UnlockBox').callback = cb;
				// 		});
				// 	}
				// }
			})
		}

		//打开闯关赛
		else if (name == 'main_jj_cgs') {
			GameCfgText.getSwitchModule(9, () => {
				GameCfg.GameType = pb.GameType.JJ_ChuangGuan;
				GameCfg.GameSet = GameData.JJPKSet;
				GlobalEvent.emit(EventCfg.OPENCHUANGUAN);
			})
		}

		// //点击竞技
		// else if (name == 'toggle1' || name == 'toggle2' || name == 'toggle3') {
		// 	let index = parseInt(name.slice(-1));
		// 	this.changeToggle(index);
		// }

		//点击创建对战
		else if (name == 'main_jj_cjdz') {
			// GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '暂不开放，敬请期待！');
			// return;
			GameCfgText.getSwitchModule(10, () => {
				//	if (LLWConfig.PLATTYPE == PlatDefine.PLAT_WECHAT) {
				GameData.Players = [];

				let info = {
					game: pb.GameType.JJ_PK,
					uid: GameData.userID,
					capital: 0,
					junXian: ComUtils.getJJXunXian(),
				}
				let CmdRoomCreate = pb.CmdRoomCreate;
				let message = CmdRoomCreate.create(info);
				let buff = CmdRoomCreate.encode(message).finish();

				socket.send(pb.MessageId.Req_Room_Create, buff, (res) => {
					console.log('创建房间应答' + JSON.stringify(res));
					GlobalEvent.emit(EventCfg.LOADINGHIDE);
					if (res && res.err) {
						let err = GlobalHandle.getErrorCodeByCode(res.err.code);
						GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, err);
						return;
					}
					GameData.RoomType = 1;
					GameData.roomId = res.id;
					GlobalEvent.emit(EventCfg.OPENROOM);
				})
			})
		}

		//加入对战
		else if (name == 'main_jj_jrdz') {
			// GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '暂不开放，敬请期待！');
			// return;
			GameCfgText.getSwitchModule(11, () => {
				GlobalEvent.emit(EventCfg.OPENJRDZ);
			})
		}

		//智能选股
		else if (name == 'main_sp_znxg') {
			GameCfgText.getSwitchModule(13, () => {
				GlobalEvent.emit(EventCfg.OPENZNXG);
			})
		}

		//模拟炒股
		else if (name == 'main_sp_mncg') {
			GameCfgText.getSwitchModule(14, () => {
				GlobalEvent.emit(EventCfg.OPENMNXG);
			})
		}

		else if (name == 'main_sp_cgds') {
			GameCfgText.getSwitchModule(15, () => {
				GlobalEvent.emit(EventCfg.OPENCGDS);
			})
		}

		//大盘竞猜
		else if (name == 'main_sp_dpjc') {
			GameCfgText.getSwitchModule(16, () => {
				GameCfg.GameType = pb.GameType.DaPanJingChai;
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				cc.director.loadScene('guess');
			})
		}

		//个股竞猜
		else if (name == 'main_sp_ggjc') {
			GameCfgText.getSwitchModule(16, () => {
				GameCfg.GameType == pb.GameType.GeGuJingChai;
				GlobalEvent.emit(EventCfg.LOADINGSHOW);
				cc.director.loadScene('guess');
			})
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

		//免费砖石
		else if (name == 'main_fl_mfzs') {
			PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/fl/dailyWelfare', 10, (node) => {
				let handle = node.getComponent('DailyWelfare');
				handle && (handle.onShow());
			});
		}

		//每周豪礼
		else if (name == 'main_fl_mzhl') {
			PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/fl/weeklyHaoLI', 10, null);
		}

		//7日奖励
		else if (name == 'main_fl_7day') {
			PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/fl/signIn', 10, null);
		}

		else if (name == 'main_fl_yqjl') {
			PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/InviteLayer', 11, (node) => {
				ActionUtils.openBox(node);
			})
		}
	}

	onDestroy() {
		GlobalEvent.off('CmdGoldAwardPrompt');
	}
}
