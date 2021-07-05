import { pb } from "../../protos/proto";
import GameData from "../GameData";
import GameCfg from "./GameCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.Label)
    userID: cc.Label = null;

    @property(cc.Label)
    userName: cc.Label = null;

    @property([cc.Node])
    gender: cc.Node[] = [];

    @property(cc.Label)
    diqu: cc.Label = null;

    @property(cc.Label)
    chenghao: cc.Label = null;

    @property(cc.Label)
    lv: cc.Label = null;

    @property(cc.Node)
    lock: cc.Node = null;

    @property(cc.Label)
    pkDZ: cc.Label = null;

    @property(cc.Label)
    dkDZ: cc.Label = null;

    @property(cc.Label)
    cgDZ: cc.Label = null;

    @property(cc.Node)
    ygzNode: cc.Node = null;

    @property(cc.Node)
    wgzNode: cc.Node = null;

    start() {

        this.headImg.spriteFrame = GameCfg.RoomGameData.players[1].gd.icon;

        this.userID.string = 'I    D：' + GameCfg.RoomGameData.players[1].gd.uid;

        this.userName.string = '昵称：' + GameCfg.RoomGameData.players[1].gd.nickname;

        if (GameCfg.RoomGameData.player[0].gd.gender == 1) {
            this.gender[1].active = true;
            this.gender[0].active = false;
        }
        else {
            this.gender[1].active = false;
            this.gender[0].active = true;
        }

        this.diqu.string = GameCfg.RoomGameData.players[1].gd.location || '中国';

        let ch = GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Fame];
        let str;
        if (ch <= 99) {
            str = '股市小白';
        }
        else if (ch <= 249) {
            str = '股市新手';
        }
        else if (ch <= 499) {
            str = '股市菜鸡';
        }
        else if (ch <= 999) {
            str = '初级股民';
        }
        else if (ch <= 1999) {
            str = '中级股民';
        }
        else if (ch <= 2999) {
            str = '高级股民';
        }
        else if (ch <= 3999) {
            str = '股市牛人';
        }
        else if (ch <= 4999) {
            str = '股市大神';
        }
        else if (ch >= 5000) {
            str = '股市至尊';
        }
        this.chenghao.string = str;

        let vip = GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Vip];

        this.lock.active = !vip;

        this.lv.string = 'L   V：' + GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level];

        if (vip) {
            this.pkDZ.string = 'p k 大战：' + GameCfg.RoomGameData.players[1].gd.counters[pb.GameType.JJ_PK].win + '胜' + '         ' + GameCfg.RoomGameData.players[1].gd.counters[pb.GameType.JJ_PK].lose;


            this.dkDZ.string = '多空大战：' + GameCfg.RoomGameData.players[1].gd.counters[pb.GameType.JJ_DuoKong].win + '胜' + '         ' + GameCfg.RoomGameData.players[1].gd.counters[pb.GameType.JJ_DuoKong].lose;



            this.cgDZ.string = '  闯关赛：' + GameCfg.RoomGameData.players[1].gd.counters[pb.GameType.JJ_ChuangGuan].win + '胜' + '         ' + GameCfg.RoomGameData.players[1].gd.counters[pb.GameType.JJ_ChuangGuan].lose;
        }

        this.ygzNode.active = false;
        this.wgzNode.active = false;

        if (GameCfg.RoomGameData.players[0].gd.favorList) {
            let arr = GameCfg.RoomGameData.players[0].gd.favorList;
            arr.forEach(el => {
                if (el == GameCfg.RoomGameData.players[1].gd.uid) {
                    this.ygzNode.active = true;
                }
                else {
                    this.wgzNode.active = true;
                }
            });
        } else {
            this.wgzNode.active = true;;
        }

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'mask') {
            this.node.active = false;
        }
        else if (name == 'phb_grxx_jhy') {
            if (GameCfg.RoomGameData.players[1].gd.properties[pb.GamePropertyId.Level] < 10) {

            }

            let data = {
                removed: false,
                uid: GameCfg.RoomGameData.players[1].gd.uid,
            }
            let CmdEditFavorList = pb.CmdEditFavorList;
            let message = CmdEditFavorList.create(data);
            let buff = CmdEditFavorList.encode(message).finish();

            socket.send(pb.MessageId.Req_Hall_EditFavorList, buff, (res) => {
                console.log(JSON.stringify(res));
            })

            this.ygzNode.active = true;
            this.wgzNode.active = false;;
        }


    }


}
