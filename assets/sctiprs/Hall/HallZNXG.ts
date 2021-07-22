import { pb } from "../../protos/proto";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    AIStockList = null;

    onLoad() { }

    start() {
        this.getAIStockList();
    }

    onEnable() {

    }

    onBtnToggle(event, data) {
        console.log(event);

    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }

    //AI买入信号
    getAIStockList() {
        let data = {
            rankFrom: 1,
            tsUpdateFrom: parseInt(new Date().getTime() / 1000 + ''),
            total: 20,
        }
        let CmdQueryAiStockList = pb.CmdQueryAiStockList;
        let message = CmdQueryAiStockList.create(data);
        let buff = CmdQueryAiStockList.encode(message).finish();

        socket.send(pb.MessageId.Req_QueryAiStockList, buff, (res) => {

            this.AIStockList = [];
            console.log('查询AI选股的股票列表' + JSON.stringify(res));
            res.items.forEach(el => {
                if (el.todaySignal < 0) {
                    this.AIStockList.push(el);
                }
            });

            this.onShowAIStockLayer();
        })
    }

    //显示AI买入页面
    onShowAIStockLayer() {


    }
}
