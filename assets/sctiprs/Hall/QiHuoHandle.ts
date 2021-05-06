import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameData from '../GameData';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto';

import GameCfgText from '../GameText';
import HttpUtils from '../common/net/HttpUtils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	DCArr = null; //大连商品交易所
	SCArr = null; //上海期货交易所
	ZCArr = null; //郑州商品交易所
	XJArr = null; //中金所

	@property(cc.Node)
	preItem: cc.Node = null;

	@property([cc.Node])
	box: cc.Node[] = [];

	@property([cc.Node])
	downBox: cc.Node[] = [];

	_id = 0;

	onLoad() {
		this.DCArr = {
			name: '大连商品',
			code: ['A', 'B', 'C', 'CS', 'M', 'Y', 'L', 'V', 'BB', 'FB', 'I', 'J', 'JM', 'JD', 'P', 'PP', 'EB', 'EG', 'RR'],
			type: [
				'黄大豆一号',
				'黄大豆二号',
				'黄玉米',
				'玉米淀粉',
				'豆粕',
				'豆油',
				'聚乙烯',
				'聚氯乙烯',
				'胶合板',
				'纤维板',
				'铁矿石',
				'焦炭',
				'焦煤',
				'鸡蛋',
				'棕榈油',
				'聚丙烯',
				'苯乙烯',
				'乙二醇',
				'硬米'
			],
			main: [
				'豆一主连',
				'豆二主连',
				'玉米主连',
				'淀粉主连',
				'豆粕主连',
				'豆油主连',
				'聚乙烯主连',
				'PVC主连',
				'胶板主连',
				'纤板主连',
				'铁矿主连',
				'焦炭主连',
				'焦煤主连',
				'鸡蛋主连',
				'棕榈主连',
				'聚丙烯主连',
				'苯乙烯主连',
				'乙二醇主连',
				'硬米主连'
			],
			mainCode: ['AL1', 'BL1', 'CL1', 'CSL1', 'ML1', 'YL1', 'LL1', 'VL1', 'BBL1', 'FBL1', 'IL1', 'JL1', 'JML1', 'JDL1', 'PL1', 'PPL1', 'EBL1', 'EGL1', 'RRL1'],
			index: [
				'豆一指数',
				'豆二指数',
				'玉米指数',
				'淀粉指数',
				'豆粕指数',
				'豆油指数',
				'聚乙烯指数',
				'PVC指数',
				'胶板指数',
				'纤板指数',
				'铁矿指数',
				'焦炭指数',
				'焦煤指数',
				'鸡蛋指数',
				'棕榈指数',
				'聚丙烯指数',
				'苯乙烯指数',
				'乙二醇指数',
				'硬米指数'
			],
			indexCode: ['AL9', 'BL9', 'CL9', 'CSL9', 'ML9', 'YL9', 'LL9', 'VL9', 'BBL9', 'FBL9', 'IL9', 'JL9', 'JML9', 'JDL9', 'PL9', 'PPL9', 'EBL9', 'EGL9', 'RRL9']
		};

		this.SCArr = {
			name: '上海期货',
			code: ['RU', 'AG', 'AU', 'AL', 'BU', 'CU', 'PB', 'NI', 'RB', 'FU', 'WR', 'SN', 'ZN', 'HC', 'SS', 'SP', 'SC'],
			type: ['天然橡胶', '白银', '黄金', '沪铝', '石油沥青', '沪铜', '沪铅', '沪镍', '螺纹钢', '燃料油', '线材', '锡', '沪锌', '热轧卷板', '不锈钢', '纸浆', '原油'],
			main: [
				'橡胶主连',
				'白银主连',
				'黄金主连',
				'沪铝主连',
				'沥青主连',
				'沪铜主连',
				'沪铅主连',
				'沪镍主连',
				'螺纹钢主连',
				'燃料油主连',
				'线材主连',
				'沪锡主连',
				'沪锌主连',
				'热卷板主连',
				'不锈钢主连',
				'纸浆主连',
				'原油主连'
			],
			mainCode: ['RUL1', 'AGL1', 'AUL1', 'ALL1', 'BUL1', 'CUL1', 'PBL1', 'NIL1', 'RBL1', 'FUL1', 'WRL1', 'SNL1', 'ZNL1', 'HCL1', 'SSL1', 'SPL1', 'SCL1？'],
			index: [
				'橡胶指数',
				'白银指数',
				'黄金指数',
				'沪铝指数',
				'沥青指数',
				'沪铜指数',
				'沪铅指数',
				'沪镍指数',
				'螺纹钢指数',
				'燃料油指数',
				'线材指数',
				'沪锡指数',
				'沪锌指数',
				'热卷板指数',
				'不锈钢指数',
				'纸浆指数',
				'原油指数'
			],
			indexCode: ['RUL9', 'AGL9', 'AUL9', 'ALL9', 'BUL9', 'CUL9', 'PBL9', 'NIL9', 'RBL9', 'FUL9', 'WRL9', 'SNL9', 'ZNL9', 'HCL9', 'SSL9', 'SPL9', 'SCL9']
		};

		this.ZCArr = {
			name: '郑州商品',
			code: [
				'RI',
				'LR',
				'JR',
				'WS',
				'WT',
				'WH',
				'PM',
				'CF',
				'CY',
				'RS',
				'RM',
				'RO',
				'SR',
				'MA',
				'ME',
				'FG',
				'SF',
				'SM',
				'TA',
				'TC',
				'AP',
				'ER',
				'OI',
				'ZC',
				'CJ',
				'UR',
				'SA'
			],
			type: [
				'早籼稻',
				'晚籼稻',
				'粳稻',
				'强麦1',
				'硬麦',
				'强麦2',
				'普通小麦',
				'一号棉花',
				'棉纱',
				'菜籽',
				'菜粕',
				'菜油',
				'白糖',
				'甲醇2',
				'甲醇1',
				'玻璃',
				'硅铁',
				'锰硅',
				'PTA',
				'动力煤',
				'苹果',
				'籼稻',
				'菜籽油',
				'动力煤(新)',
				'红枣',
				'尿素',
				'纯碱'
			],
			main: [
				'早籼稻主连',
				'晚籼稻主连',
				'粳稻主连',
				'强麦1主连',
				'硬麦',
				'强麦主连',
				'普麦主连',
				'棉花主连',
				'棉纱主连',
				'油菜籽主连',
				'菜籽粕主连',

				'白糖主连',
				'新甲醇主连',
				'甲醇1主连',
				'玻璃主连',
				'硅铁主连',
				'锰硅主连',
				'PTA主连',
				'动力煤主连',
				'苹果主连',
				'籼稻主连',
				'菜籽油主连',
				'新动煤主连',
				'红枣主连',
				'尿素主连',
				'纯碱主连'
			],
			mainCode: [
				'RIL1',
				'LRL1',
				'JRL1',
				'WSL1',
				'WTL1',
				'WHL1',
				'PML1',
				'CFL1',
				'CYL1',
				'RSL1',
				'RML1',

				'SRL1',
				'MAL1',
				'MEL1',
				'FGL1',
				'SFL1',
				'SML1',
				'TAL1',
				'TCL1',
				'APL1',
				'ERL1',
				'OIL1',
				'ZCL1',
				'CJL1',
				'URL1',
				'SAL1'
			],
			index: [
				'早籼稻指数',
				'晚籼稻指数',
				'粳稻指数',
				'强麦1指数',
				'硬麦',
				'强麦指数',
				'普麦指数',
				'棉花指数',
				'棉纱指数',
				'油菜籽指数',
				'菜籽粕指数',

				'白糖指数',
				'新甲醇指数',
				'甲醇1指数',
				'玻璃指数',
				'硅铁指数',
				'锰硅指数',
				'PTA指数',
				'动力煤指数',
				'苹果指数',
				'籼稻指数',
				'菜籽油指数',
				'新动煤指数',
				'红枣指数',
				'尿素指数',
				'纯碱指数'
			],
			indexCode: [
				'RIL9',
				'LRL9',
				'JRL9',
				'WSL9',
				'WTL9',
				'WHL9',
				'PML9',
				'CFL9',
				'CYL9',
				'RSL9',
				'RML9',

				'SRL9',
				'MAL9',
				'MEL9',
				'FGL9',
				'SFL9',
				'SML9',
				'TAL9',
				'TCL9',
				'APL9',
				'ERL9',
				'OIL9',
				'ZCL9',
				'CJL9',
				'URL9',
				'SAL9'
			]
		};

		this.XJArr = {
			name: '中金所',
			code: ['IF', 'IH', 'IC', 'SC'],
			type: ['沪深300指数', '上证50指数', '中证500指数', '原油'],
			main: ['沪深300', '沪深主连', '上证50', '上证主连', '中证500', '中证主连', '二债主连', '五债主连', '十债主连'],
			mainCode: ['IF300', 'IFL8', 'IH50', 'IHL8', 'IC500', 'ICL8', 'TSL8', 'TFL8', 'TL8']
		};
	}

	start() {}

	onEnable() {
		GameCfg.GameType=pb.GameType.QiHuo;
		let setDatas = GameData.QHSet;
	}

	onSelectBoxClick(evetn, data) {
		this._id = parseInt(data);
		this.downBox[this._id].active = true;
		let content = cc.find('New ScrollView/view/content', this.downBox[this._id]);
		let nodes = content.children;
	
		if (this._id == 1) {
		
			if (GameData.QHSet.JYS == '随机') {
				nodes = content.children;
				nodes.forEach((el, index) => {
					if (index == 0) {
						el.getComponent(cc.Label).string = '随机';
					} else {
						el.active = false;
					}
				});
			}else if(GameData.QHSet.JYS=='大连商品'){
				if(nodes.length<this.DCArr.type.length){
					let tt=this.DCArr.type.length-nodes.length
					for(let i=0;i< tt;i++){
						let node=cc.instantiate(this.preItem);
						content.addChild(node);
					}
				}
				nodes = content.children;
				nodes.forEach((el,index)=>{
					if(index>=this.DCArr.type.length){
						el.active=false;
					}else{
						el.active=true;
						el.getComponent(cc.Label).string=this.DCArr.type[index];
					}
				})
			}else if(GameData.QHSet.JYS=='上海期货'){
				if(nodes.length<this.SCArr.type.length){
						let tt=this.SCArr.type.length-nodes.length;
					for(let i=0;i<tt;i++){
						let node=cc.instantiate(this.preItem);
						content.addChild(node);
					}
				}
				nodes = content.children;
				nodes.forEach((el,index)=>{
					if(index>=this.SCArr.type.length){
						el.active=false;
					}else{
						el.active=true;
						el.getComponent(cc.Label).string=this.SCArr.type[index];
					}
				})
			}else if(GameData.QHSet.JYS=='郑州商品'){
				if(nodes.length<this.ZCArr.type.length){
						let tt=this.ZCArr.type.length-nodes.length;
					for(let i=0;i<tt;i++){
						let node=cc.instantiate(this.preItem);
						content.addChild(node);
					}
				}
				nodes = content.children;
				nodes.forEach((el,index)=>{
					if(index>=this.ZCArr.type.length){
						el.active=false;
					}else{
						el.active=true;
						el.getComponent(cc.Label).string=this.ZCArr.type[index];
					}
				})
			}else if(GameData.QHSet.JYS=='中金所'){
				if(nodes.length<this.XJArr.type.length){
					let tt=this.XJArr.type.length-nodes.length;
					for(let i=0;i<tt;i++){
						let node=cc.instantiate(this.preItem);
						content.addChild(node);
					}
				}
				nodes = content.children;
				nodes.forEach((el,index)=>{
					if(index>=this.XJArr.type.length){
						el.active=false;
					}else{
						el.active=true;
						el.getComponent(cc.Label).string=this.XJArr.type[index];
					}
				})
			}
		
		}
		else if(this._id == 2){
		   if(GameData.QHSet.JYS=='随机'){
			   nodes = content.children;
			   nodes.forEach((el, index) => {
			   	if (index == 0) {
					el.active=true;
			   		el.getComponent(cc.Label).string = '随机';
			   	} else {
			   		el.active = false;
			   	}
			   });
		   }
		   else if(GameData.QHSet.LXPZ!='随机'){
			   let arr=[];
			   if(this.DCArr.type.indexOf(GameData.QHSet.LXPZ)!=-1){
				   let index=this.DCArr.type.indexOf(GameData.QHSet.LXPZ);
				   arr.push(this.DCArr.main[index]);
				   arr.push(this.DCArr.index[index]);
			   }
			   else if(this.SCArr.type.indexOf(GameData.QHSet.LXPZ)!=-1){
				   let index=this.SCArr.type.indexOf(GameData.QHSet.LXPZ);
				   arr.push(this.SCArr.main[index]);
				   arr.push(this.SCArr.index[index]);
			   }
			   else if(this.XJArr.type.indexOf(GameData.QHSet.LXPZ)!=-1){
				   let index=this.XJArr.type.indexOf(GameData.QHSet.LXPZ);
				   arr.push(this.XJArr.main[index]);
				   arr.push(this.XJArr.index[index]);
			   }
				else if(this.ZCArr.type.indexOf(GameData.QHSet.LXPZ)!=-1){
					let index=this.ZCArr.type.indexOf(GameData.QHSet.LXPZ);
					this.ZCArr.main&&(arr.push(this.ZCArr.main[index]));
					this.ZCArr.index&&(arr.push(this.ZCArr.index[index]));
				}
				
				if(nodes.length<arr.length){
					let tt=arr.length-nodes.length
					for(let i=0;i<tt;i++){
						let node=cc.instantiate(this.preItem);
						content.addChild(node);
					}
				}
					nodes = content.children;
				nodes.forEach((el,index)=>{
					if(index>=arr.length){
						el.active=false;
					}else{
						el.active=true;
						el.getComponent(cc.Label).string=arr[index];
					}
				})
		   }
		
		}
	}

	onBtnClick(event, data) {
		let name = event.target.name;

		//设置
		if (name == 'setQHBtnDX') {
			
			GlobalEvent.emit('OPENSETLAYER','QH');

		}
		//记录
		else if (name == 'historyQHBtn') {
		}
		//
		else if (name == 'item') {
			let la = this.box[this._id].getChildByName('label').getComponent(cc.Label);

			let str = event.target.getComponent(cc.Label).string;
			la.string = str;
			if (this._id == 0) {
				GameData.QHSet.JYS = str;
				this.box[1].getChildByName('label').getComponent(cc.Label).string='随机';
				this.box[2].getChildByName('label').getComponent(cc.Label).string='随机';
			} else if (this._id == 1) {
				GameData.QHSet.LXPZ = str;
				this.box[2].getChildByName('label').getComponent(cc.Label).string='随机';
			} else if (this._id == 2) {
				GameData.QHSet.HY = str;
			} else if (this._id == 3) {
				GameData.QHSet.year = str;
			} else if (this._id == 4) {
				GameData.QHSet.month = str;
			} else if (this._id == 5) {
				GameData.QHSet.day = str;
			} else if (this._id == 6) {
				GameData.QHSet.KLine = parseInt(str);
			} else if (this._id == 7) {
				GameData.QHSet.ZLine = Str;
			}
			this.downBox[this._id].active=false;
		}
		//
		else if (name == 'DCnode') {
			this.downBox.forEach(el => {
				el.active = false;
			});
		}
		else if(name=='startQHBtn'){
			GlobalEvent.emit(EventCfg.LOADINGSHOW);
			GameCfg.GAMEFUPAN=false;
			GameCfg.GameSet=GameData.QHSet;
			GameCfg.GameType=pb.GameType.QiHuo;
			this.QHStartGameSet();
		}
		else if(name=='blackbtn'){
			this.node.active=false;
			GameCfg.GameType=null;	
		}
	}
	
	QHStartGameSet(){
		
		
		
	}

	//http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js?TYPE=m30k&rtntype=5&authorityType=fa&id=3008032

	// //获取周K

	// getWkData() {
	//     let url = 'http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js';

	//     let code = GameCfg.data[0].code[0] == '6' ? GameCfg.data[0].code + '1' : GameCfg.data[0].code + '2';

	//     let TYPE;
	//     if (GameData.DXSet.ZLine == '周线') {
	//         TYPE = 'wk'
	//     } else if (GameData.DXSet.ZLine == '30分钟K') {
	//         TYPE = 'm30k';
	//     } else if (GameData.DXSet.ZLine == '60分钟K') {
	//         TYPE = 'm60k';
	//     }

	// }
}
