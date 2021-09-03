
import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";
import ComUtils from "../../sctiprs/Utils/ComUtils";

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

    @property(cc.Node)
    xhNode: cc.Node = null;

    otherInfo = null;

    onShow(otherInfo) {
        if (!otherInfo) { return }
        this.otherInfo = otherInfo;

        if (otherInfo.icon) {
            this.headImg.spriteFrame = otherInfo.icon;
        }
        this.userID.string = 'I    D：' + otherInfo.uid;

        this.userName.string = '昵称：' + (otherInfo.nickname || otherInfo.nick);

        if (otherInfo.gender == 1) {
            this.gender[1].active = true;
            this.gender[0].active = false;
        }
        else {
            this.gender[1].active = false;
            this.gender[0].active = true;
        }

        this.diqu.string = '地区：' + otherInfo.location || '中国';

        //  if (otherInfo.properties) {
        let ch = otherInfo.properties[pb.GamePropertyId.Fame];

        this.chenghao.string = ComUtils.getChenghaoByFame(ch);

        let vip = otherInfo.properties[pb.GamePropertyId.Vip];

        this.lock.active = !vip;

        this.lv.string = 'L   V：' + otherInfo.properties[pb.GamePropertyId.Level];
        // }



        if (vip) {
            this.pkDZ.string = 'p k 大战：' + otherInfo.counters[pb.GameType.JJ_PK].win + '胜' + '         ' + otherInfo.counters[pb.GameType.JJ_PK].lose;

            this.dkDZ.string = '多空大战：' + otherInfo.counters[pb.GameType.JJ_DuoKong].win + '胜' + '         ' + otherInfo.counters[pb.GameType.JJ_DuoKong].lose;

            this.cgDZ.string = '  闯关赛：' + otherInfo.counters[pb.GameType.JJ_ChuangGuan].win + '胜' + '         ' + otherInfo.counters[pb.GameType.JJ_ChuangGuan].lose;
        }

        this.ygzNode.active = false;
        this.wgzNode.active = true;
        this.xhNode.active = false;

        let flag = true;
        let favorList = GameData.gameData.favorList;
        if (favorList) {

            favorList.forEach(el => {
                if (el == otherInfo.uid) {
                    this.ygzNode.active = true;
                    flag = true;
                }
                else {
                    this.wgzNode.active = true;
                }
            });
        } else {
            this.wgzNode.active = true;;
        }

        if (otherInfo.favorList && favorList) {
            let arr = otherInfo.favorList;
            arr.forEach(el => {
                if (el == GameData.gameData.uid && flag) {
                    this.xhNode.active = true;
                    this.ygzNode.active = false;
                    this.wgzNode.active = false;
                }
            });

        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'mask') {
            this.node.active = false;
        }
        else if (name == 'phb_grxx_jhy') {

            if (this.otherInfo.properties[pb.GamePropertyId.Level] < 10) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '对方等级不满10级，不能添加到关注列表');
                return;
            }

            let data = {
                removed: false,
                uid: this.otherInfo.uid,
            }

            let CmdEditFavorList = pb.CmdEditFavorList;
            let message = CmdEditFavorList.create(data);
            let buff = CmdEditFavorList.encode(message).finish();

            socket.send(pb.MessageId.Req_Hall_EditFavorList, buff, (res) => {
                console.log(JSON.stringify(res));
            })

            GameData.gameData.favorList.push(this.otherInfo.uid);

            this.ygzNode.active = true;
            this.wgzNode.active = false;
            GlobalEvent.emit('UPDATEFRIENDLIST');
        }

        else if (name == 'phb_grxx_ygz' || name == 'phb_grxx_hxgz') {
            let data = {
                removed: true,
                uid: this.otherInfo.uid,
            }

            let CmdEditFavorList = pb.CmdEditFavorList;
            let message = CmdEditFavorList.create(data);
            let buff = CmdEditFavorList.encode(message).finish();

            socket.send(pb.MessageId.Req_Hall_EditFavorList, buff, (res) => {
                console.log(JSON.stringify(res));
            })

            let index = GameData.gameData.favorList.indexOf(this.otherInfo.uid);
            GameData.gameData.favorList.splice(index, 1);
            this.ygzNode.active = false;
            this.wgzNode.active = true;
            this.xhNode.active = false;
            GlobalEvent.emit('UPDATEFRIENDLIST');
        }

    }
}
