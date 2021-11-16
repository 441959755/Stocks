
import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import ComUtils from "../../sctiprs/Utils/ComUtils";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    dzYaoqing: cc.Node = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    GameTypeLabel: cc.Label = null;

    @property(cc.Label)
    roomIdLabel: cc.Label = null;

    curData = null;

    dataArr = [];

    flag = false;

    cb = null;

    onShow(data?) {

        data && (this.dataArr.push(data))

        if (!this.flag) {
            this.flag = true;
            this.init();
        }
    }

    init() {
        let data = this.dataArr[0];
        let arr = data.text.split(',');
        this.nameLabel.string = arr[0];
        this.GameTypeLabel.string = arr[1];
        this.roomIdLabel.string = arr[2];
        GameData.JJCapital = arr[3];
        this.curData = data;
        this.cb = setTimeout(() => {
            this.node.active = false;
        }, 5000);
    }

    onBtnClick(event, curData) {
        let name = event.target.name;
        if (name == 'main_gg_join') {
            let arr = ComUtils.getJJXunXian();
            let data = {
                id: this.curData.receiver,
                uid: GameData.userID,
                junXian: arr,
            }
            socket.send(pb.MessageId.Req_Room_Enter, PB.onReqRoomEnterBuff(data), (res) => {
                console.log('加入房间：' + JSON.stringify(res));
                if (res.err) {
                    GameData.RoomType = 0;
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err.err);
                } else {
                    GameData.roomId = res.id;
                }
            })
            this.node.active = false;
            GameData.RoomType = 2;
        }

        else if (name == 'main_gg_refuse') {
            this.node.active = false;
        }
    }

    onDisable() {
        this.dataArr.splice(0);
        this.cb && (clearTimeout(this.cb))
        this.cb = null;
        if (this.dataArr.length >= 1) {
            this.onShow();
            this.node.active = true;
        }
    }

}
