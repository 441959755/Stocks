import { pb } from "../../protos/proto";

import GameData from "../../sctiprs/GameData";
import GameCfgText from "../../sctiprs/GameText";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ScrollView)
    scoll: cc.ScrollView = null;

    @property(cc.Node)
    item: cc.Node = null;

    taskConf = null;

    taskDaily = null;

    onLoad() {
        GlobalEvent.on('UPDATETASKDATA', this.onShow.bind(this), this);
    }

    onDestroy() {
        GlobalEvent.off('UPDATETASKDATA');
    }

    onShow() {
        this.scoll.content.removeAllChildren();
        this.taskConf = GameCfgText.gameConf.task;
        console.log('任务配置：' + JSON.stringify(this.taskConf));

        this.taskDaily = GameData.gameData.tasks.daily;
        console.log('任务进度：' + JSON.stringify(this.taskDaily));

        for (var el in this.taskConf) {

            if (el != 'study') {
                let taskId = 0;
                if (el == 'pk') {
                    taskId = pb.TaskId.Pk;
                }
                else if (el == 'dk') {
                    taskId = pb.TaskId.Dk;
                }
                else if (el == 'zsjc') {
                    taskId = pb.TaskId.Zsjc;
                }
                else if (el == 'ggjc') {
                    taskId = pb.TaskId.Ggjc;
                }
                else if (el == 'cg') {
                    taskId = 4;
                }

                //todo
                if (el != 'ggjc') {
                    let e = this.taskConf[el];

                    let node = cc.instantiate(this.item);

                    this.scoll.content.addChild(node);

                    node.getComponent('TaskItem').onShow(e, this.taskDaily[taskId], taskId);
                }
            }
        }

    }

    onEnable() {
        this.onShow();
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'leftBtn') {
            this.node.active = false;
        }
    }
}
