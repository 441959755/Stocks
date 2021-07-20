
import { pb } from "../../protos/proto";
import GameData from "../GameData";
import ComUtils from "../Utils/ComUtils";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    roomidLabel: cc.Label = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
        //点击加入对战
        else if (name == 'jj_jrdz') {
            let str = this.roomidLabel.string;
            if (str.length < 3 || str.length > 3) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '房间ID有误！请重新输入');
            }
            else {

            }

        }

        else if (name == 'node') {
            this.tipsLabel.node.active = false;
            let id = parseInt(data);
            let str = this.roomidLabel.string;

            str += id + '';
            this.roomidLabel.string = str;

            if (str.length == 3) {
                //TODO进入房间

                let arr = ComUtils.getJJXunXian();
                let data = {
                    id: parseInt(str),
                    uid: GameData.userID,
                    junXian: arr,
                }

                socket.send(pb.MessageId.Req_Room_Enter, PB.onReqRoomEnterBuff(data), (res) => {
                    console.log(JSON.stringify(res));
                    str = '';
                    this.roomidLabel.string = str;
                    if (res.err) {


                    } else {
                        GameData.roomId = res.id;

                    }
                })

            }
        }

        //清除
        else if (name == 'btnQC') {
            this.roomidLabel.string = '';
        }
        //删除
        else if (name == 'btnSC') {
            let str = this.roomidLabel.string;
            if (str.length >= 1) {
                str = str.slice(0, -1);
            }
            this.roomidLabel.string = str;
        }
    }

    // update (dt) {}
}