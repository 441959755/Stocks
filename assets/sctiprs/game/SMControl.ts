import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import PopupManager from "../Utils/PopupManager";
import GameCfg from "./GameCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    curRate: cc.Label = null;

    @property(cc.Label)
    allRate: cc.Label = null;

    @property(cc.Label)
    huiheshu: cc.Label = null;

    onLoad() {

    }


    start() {
        //分仓
        // if (GameCfg.GameSet.isFC) {
        //     this.mcBtn.node.x = -266;
        //     this.tipsmc.node.active = true;
        //     this.tipsmr.node.active = true;

        //     this.mrBtn.node.active = true;
        //     this.mcBtn.node.active = true;

        //     this.keMcCount = 0;
        //     this.mcBtn.interactable = false;
        //     this.mcBtn.enableAutoGrayEffect = true;
        // }
        // //不分仓
        // else {
        //     this.tipsmr.node.active = false;
        //     this.tipsmc.node.active = false;
        //     this.mrBtn.node.active = true;
        //     this.mcBtn.node.active = false;
        // }
    }

    onBtnClick(event, curData) {
        let name = event.target.name;
        //返回
        if (name == 'sys_back') {
            PopupManager.LoadTipsBox('tipsBox', '是否终止当前训练，查看训练结果？', () => {
                GlobalEvent.emit('OPENFINALLAYER');
            })
        }
        //观望、持有
        else if (name = 'gwBtn' || name == 'cyBtn') {

        }

        else if (name == '') {

        }
    }

}
