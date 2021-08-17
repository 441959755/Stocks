
import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Toggle])
    typeToggle: cc.Toggle[] = [];

    @property([cc.Toggle])
    setToggle: cc.Toggle[] = [];

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
        //点击创建对战
        else if (name == 'jj_cjdz') {
            let type, set;
            this.typeToggle.forEach((el, index) => {
                if (el.isChecked) {
                    type = index;
                }
            })

            this.setToggle.forEach((el, index) => {
                if (el.isChecked) {
                    set = index;
                }
            })

            if (type == 0) {
                GameCfg.GameType = pb.GameType.JJ_PK;
            } else if (type == 1) {
                GameCfg.GameType = pb.GameType.JJ_DuoKong;
            }

            if (set == 0) {
                GameData.JJCapital = 1500;
            }
            else if (set == 1) {
                GameData.JJCapital = 2500;
            }
            else if (set == 2) {
                GameData.JJCapital = 5000;
            }

            //请求创建房间
            this.reqRoomCreate();
        }
    }

    reqRoomCreate() {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let arr = ComUtils.getJJXunXian();
        let info = {
            game: GameCfg.GameType,
            uid: GameData.userID,
            capital: GameData.JJCapital,
            junXian: arr,
        }
        let CmdRoomCreate = pb.CmdRoomCreate;
        let message = CmdRoomCreate.create(info);
        let buff = CmdRoomCreate.encode(message).finish();
        socket.send(pb.MessageId.Req_Room_Create, buff, (res) => {
            console.log('创建房间应答' + JSON.stringify(res));
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            if (res && res.err) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err.err);
                return;
            }
            GameData.RoomType = 1;
            GameData.roomId = res.id;
            //    GameData.roomHostID = GameData.userID;
            this.node.active = false;
            GlobalEvent.emit(EventCfg.OPENROOM);

        })
    }
}
