

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

    @property(cc.Button)
    btnGet: cc.Button = null;


    onShow(data, task) {
        // 0: {title: "PK大战", memo: "多人竞技大厅中，参与PK大战5次", progress: 5, gold: 500}

        let progress = task.progress || 0;

        this.stars.children.forEach((el, index) => {
            if ((index) < progress) {
                el.active = true;
            }
        });

        //     int32 award = 3;	// 已发放奖励
        // int32 got = 4;		// 已领取奖励
        let isAward = task.award;

        let isgot = task.got;

        this.taskTypeLabel.string = data.title;
        this.stateLabel.string = data.memo;
        this.rewardLabel.string = data.gold + '金币';

        if (isAward && !isgot) {
            this.btnGet.interactable = true;
            this.btnGet.enableAutoGrayEffect = false;
        }

        else if (!isAward && !isgot) {
            this.btnGet.interactable = false;
            this.btnGet.enableAutoGrayEffect = true;
        }
        else {
            this.btnGet.interactable = false;
            this.btnGet.enableAutoGrayEffect = true;
        }
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        //点击领取
        if (name == 'phb_bt_lq') {

        }
    }
}
