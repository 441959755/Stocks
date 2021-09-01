

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

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


    onShow(data) {
        // 0: {title: "PK大战", memo: "多人竞技大厅中，参与PK大战5次", progress: 5, gold: 500}

        this.taskTypeLabel.string = data.title;
        this.stateLabel.string = data.memo;
        this.rewardLabel.string = data.gold + '金币';

    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        //点击领取
        if (name == 'phb_bt_lq') {

        }
    }
}
