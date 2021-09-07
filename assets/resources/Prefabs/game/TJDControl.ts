import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    curPricelabels: cc.Label[] = [];

    @property([cc.Label])
    curHoldLabels: cc.Label[] = [];

    @property(cc.Label)
    huiheshu: cc.Label = null;

    @property(cc.Button)
    mairuBtn: cc.Button = null;

    @property(cc.Button)
    maichuBtn: cc.Button = null;

    @property(cc.Button)
    zhisunBtn: cc.Button = null;

    @property(cc.Button)
    zhixingBtn: cc.Button = null;

    _cb = null;

    _interval = null;

    mrclInfo = null;

    mcclInfo = null;

    zsclInfo = null;

    status = 0;

    gpData = null;
    roundNumber = 0;
    onLoad() {
        this._interval = GameData.TJDSet.KSpeed;
        this.gpData = GameCfg.data[0].data;
    }

    start() {
        this.roundNumber = this.gpData.length - GameCfg.huizhidatas;
        this.huiheshu.string = this.roundNumber + '';

        this.mairuBtn.node.children[0].active = false;
        this.maichuBtn.node.children[0].active = true;
        this.zhisunBtn.node.children[0].active = true;
        this.zhixingBtn.node.children[0].active = false;
    }

    updateLabels() {
        this.roundNumber = this.gpData.length - GameCfg.huizhidatas;
        this.huiheshu.string = this.roundNumber + '';

        this.curPricelabels[0].string = this.gpData[GameCfg.huizhidatas - 1].open;
        this.curPricelabels[1].string = this.gpData[GameCfg.huizhidatas - 1].close;
        this.curPricelabels[2].string = this.gpData[GameCfg.huizhidatas - 1].high;
        this.curPricelabels[3].string = this.gpData[GameCfg.huizhidatas - 1].low;

    }


    onBtnClick(event, data) {

        let name = event.target.name;

        //点击返回
        if (name == 'sys_back') {
            PopupManager.LoadTipsBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {
                GlobalEvent.emit('OPENFINALLAYER');
            })
        }

        //点击执行
        else if (name == 'xl_btn_zhixing') {

            event.target.children[0].active = true;

            this._cb = setInterval(() => {

                GlobalEvent.emit('roundNUmber');
                this.onPolicyOperator();
                this.updateLabels();

            }, this._interval * 1000);
        }

        //点击买入
        else if (name == 'xl_btn_mairu') {
            GlobalEvent.emit('OPENTAITICBOX', 1, (info) => {
                this.mrclInfo = info;
            }, this.mrclInfo);
        }

        //点击卖出
        else if (name == 'xl_btn_maichu') {
            GlobalEvent.emit('OPENTAITICBOX', 2, (info) => {
                this.mcclInfo = info;
            }, this.mcclInfo);
        }

        //止损
        else if (name == 'xl_btn_zhisun') {
            GlobalEvent.emit('OPENTAITICBOX', 3, (info) => {
                this.zsclInfo = info;
            }, this.zsclInfo);
        }

        //点击暂停
        else if (name == 'xl_btn_zanting') {

            event.target.active = false;

            if (this._cb) {
                clearInterval(this._cb);
                this._cb = null;
            }
        }
    }

    //根据策略操作
    onPolicyOperator() {

        //判断卖出策略
        if (this.status == 0 && this.mrclInfo) {

        }

        else if (this.status == 1 && this.mcclInfo) {

        }

        else if (this.status == 1 && this.zsclInfo) {

        }

    }
}
