import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskItem extends cc.Component {

    @property(cc.Node)
    stars: cc.Node = null;

    @property(cc.Label)
    rewardLabel: cc.Label = null;

    @property(cc.Label)
    taskTypeLabel: cc.Label = null;

    @property(cc.Label)
    stateLabel: cc.Label = null;

    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    @property(cc.Button)
    btnGet: cc.Button = null;

    @property(cc.Label)
    biliLabel: cc.Label = null;

    _index = null;

    onShow(data, task, id) {
        // 0: {title: "PK大战", memo: "多人竞技大厅中，参与PK大战5次", progress: 5, gold: 500}
        this._index = id;

        let e, i = 0;
        for (let t = 0; t < data.length; t++) {

            //未完成
            if (data[t].progress > (task.progress || 0)) {

                e = data[t];
                this.btnGet.interactable = false;
                this.btnGet.enableAutoGrayEffect = true;
                i = t;
                break;

            }
            else {
                //以完成  未领取
                if (task.got < task.award) {
                    e = data[t];
                    this.btnGet.interactable = true;
                    this.btnGet.enableAutoGrayEffect = false;
                    i = t;
                    break;
                }
            }

        }

        if (!e) {
            e = data[data.length - 1];
            this.btnGet.interactable = false;
            this.btnGet.enableAutoGrayEffect = true;
        }

        this.taskTypeLabel.string = e.title;
        this.stateLabel.string = e.memo;
        this.rewardLabel.string = e.gold + '金币';

        let progress = task.progress || 0;

        let jd = progress / e.progress;

        this.biliLabel.string = progress + '/' + e.progress;

        this.progress.progress = jd;

        this.stars.children.forEach((el, index) => {
            if ((index) < i) {
                el.active = true;
            }
        });
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        //点击领取
        if (name == 'phb_bt_lq') {

            let data = {
                index: this._index,
                adClicked: false,
            }

            let CmdGetDailyAward = pb.CmdGetDailyAward;
            let message = CmdGetDailyAward.create(data);
            let buff = CmdGetDailyAward.encode(message).finish();

            socket.send(pb.MessageId.Req_Hall_GetDailyTaskAward, buff, (info) => {
                console.log('任务进度' + JSON.stringify(info));
                if (info.err) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, info.err);
                    return;
                }
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '奖励领取成功');

                this.btnGet.interactable = false;
                this.btnGet.enableAutoGrayEffect = true;

                //  GameData.gameData.tasks.daily[this._index].award += parseInt(this.rewardLabel.string);
                GameData.gameData.tasks.daily[this._index].got += parseInt(this.rewardLabel.string);
                GlobalEvent.emit('UPDATETASKDATA');
            });

        }
    }
}
