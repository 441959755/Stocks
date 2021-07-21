import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import ComUtils from "../../sctiprs/Utils/ComUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    messLabel: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    cb = null;

    itemData = null;

    onInit(data) {
        this.itemData = data;
        let times = 8;
        this.cb = setInterval(() => {
            if (times <= 0) {
                clearInterval(this.cb);
                this.cb = null;
                this.node.destroy();
                this.timeLabel.string = ''
            } else {
                times--;
                this.timeLabel.string = '(' + times + ')' + '';
            }

        }, 1000);

        this.messLabel.string = data.text;
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'qdBtn') {

            let arr = ComUtils.getJJXunXian();
            let data = {
                id: this.itemData.receiver,
                uid: GameData.userID,
                junXian: arr,
            }

            socket.send(pb.MessageId.Req_Room_Enter, PB.onReqRoomEnterBuff(data), (res) => {
                console.log(JSON.stringify(res));
                if (res.err) {
                    GameData.RoomType = 0;
                } else {
                    GameData.roomId = res.id;
                    this.node.destroy();
                }
            })

            GameData.RoomType = 2;

        }

        else if (name == 'qxBtn') {
            this.node.active = false;

        }

    }

    onDisable() {
        this.cb && (clearInterval(this.cb))
        this.cb = null;
        this.node.destroy();

    }


}
