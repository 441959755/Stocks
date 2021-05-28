import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";


export default class GlobalHandle {

    //游戏开始发送游戏类型
    public static onCmdGameStartReq(cb) {
        let info = {
            game: GameCfg.GameType,
        }
        socket.send(pb.MessageId.Req_Game_Start, PB.onCmdGameStartConvertToBuff(info), res => {
            cb && (cb());
        })

    }

    //游戏结束
    public static onCmdGameOverReq(datas) {
        socket.send(pb.MessageId.Req_Game_Over, PB.onCmdGameOverConvertToBuff(datas), (info) => {
            console.log('GameOverInfo' + JSON.stringify(info));
        })
    }
}
