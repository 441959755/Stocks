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

    _cb = null;

    _interval = null;

    onLoad() {
        this._interval = GameData.TJDSet.KSpeed;
    }

    updateLabels() {

    }


    onBtnClick(event, data) {
        let name = event.target.name;

        //点击返回
        if (name == 'sys_back') {

            PopupManager.LoadTipsBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {
                GlobalEvent.emit(EventCfg.GAMEOVEER);
            })
        }

        //点击执行
        else if (name == 'xl_btn_zhixing') {

            this._cb = setInterval(() => {


                GlobalEvent.emit('roundNUmber');
            }, this._interval * 1000);

        }

        //点击买入
        else if (name == 'xl_btn_mairu') {
            GlobalEvent.emit('OPENTAITICBOX', 1);
        }

        //点击卖出
        else if (name == 'xl_btn_maichu') {
            GlobalEvent.emit('OPENTAITICBOX', 2);
        }

        else if (name == 'xl_btn_zhisun') {
            GlobalEvent.emit('OPENTAITICBOX', 3);
        }

        else if (name == '') {

        }

    }
}
