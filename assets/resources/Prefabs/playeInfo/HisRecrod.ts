
import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import List from "../../../sctiprs/Utils/List";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    tipsNode: cc.Node = null;

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    scrollNode: cc.Node = null;

    @property(cc.Toggle)
    toggle: cc.Toggle = null;

    @property(List)
    listV: List = null;

    arr=null;

    onToggleClick(event) {
        this.content.children.forEach(el => {
            let handle = el.getComponent('HisItem');
            handle.onHisItemRate(event.isChecked);
        })
    }

    onEnable() {
        this.tipsNode.active = false;
        let ts = new Date().getTime() / 1000;
        let data = {
            uid: GameData.userID,
            to: ts,
            pageSize: 100,
        }
        this.onQueryGameResult(data);
    }

    onQueryGameResult(data) {

        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let CmdQueryGameResult = pb.CmdQueryGameResult;
        let message = CmdQueryGameResult.create(data)
        let buff = CmdQueryGameResult.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_QueryGameResult, buff, info => {
            console.log(JSON.stringify(info.results));
            if (info.results.length == 0) {
                this.tipsNode.active = true;
            }
            else {
                this.arr = this.onScelectData(info.results);

                if(this.arr.length<=0){
                    this.tipsNode.active=true;
                }
                else{
                    this.tipsNode.active=false;
                }

                this.listV.numItems = this.arr.length;
            }
            GlobalEvent.emit(EventCfg.LOADINGHIDE);

        });
    }

    onListRender(item: cc.Node, idx: number) {
        let nodeHandle = item.getComponent('HisItem');
        nodeHandle.itemData =this.arr[idx];
        nodeHandle.itemIndex = idx + 1;
        nodeHandle.onShow();
        nodeHandle.onHisItemRate(this.toggle.isChecked);
    }

    onScelectData(data) {
        let arr = [];
        data.forEach(el => {
            if (el.gType == pb.GameType.ShuangMang) {
                // this.modeLabel.string = '双盲训练';
                // this.gameSet1 = GameData.SMSet;
                // this.node.active = false;
            }
            else if (el.gType == pb.GameType.DingXiang) {
                // this.modeLabel.string = '定向训练';
                // this.gameSet1 = GameData.DXSet;
                // this.node.active = false;
            }
            else if (el.gType == pb.GameType.FenShi) {
                // this.modeLabel.string = '分时训练';
                // //  this.gameSet1 = GameData.SHSet;
                // this.node.active = false;
            }
            else if (el.gType == pb.GameType.ZhiBiao) {
                // this.modeLabel.string = '指标训练';
                // this.gameSet1 = GameData.ZBSet;
                // this.node.active = false;
            }
            else if (el.gType == pb.GameType.TiaoJianDan) {
                // this.modeLabel.string = '条件单训练';
                // this.node.active = false;
            }
            else if (el.gType == pb.GameType.QiHuo) {
                // this.modeLabel.string = '期货训练';
                // this.gameSet1 = GameData.QHSet;
                // this.node.active = false;
            }
            else if (el.gType == pb.GameType.TiaoZhan ||
                el.gType == pb.GameType.JJ_PK ||
                el.gType == pb.GameType.JJ_DuoKong ||
                el.gType == pb.GameType.JJ_ChuangGuan ||
                el.gType == pb.GameType.JJ_QiHuo) {
                //this.modeLabel.string = '挑    战';
                arr.push(el);
            }
            // else if () {
            //     arr.push(el);
            // }
            // else if () {
            //     arr.push(el);
            // }
            // else if () {
            //     this.modeLabel.string = '闯  关赛';
            //     this.gameSet1 = GameData.JJPKSet;
            // }
            // else if () {
            //     this.modeLabel.string = '期货大战';
            // }
            // else if (this.itemData.gType == pb.GameType.MoNiChaoGu) {
            //     this.modeLabel.string = '模拟炒股';
            // }
            // else if (this.itemData.gType == pb.GameType.ChaoGuDaSai) {
            //     this.modeLabel.string = '炒股大赛';
            // }
            // else if (this.itemData.gType == pb.GameType.GeGuJingChai) {
            //     this.modeLabel.string = '个股竞猜';
            // }
            // else if (this.itemData.gType == pb.GameType.DaPanJingChai) {
            //     this.modeLabel.string = '大盘竞猜';
            // }
        });
        return arr;
    }

}
