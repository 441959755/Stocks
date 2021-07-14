import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    playeInfo = null;

    HisData = [];

    @property(cc.Node)
    tipsNode: cc.Node = null;

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    HisCount = 0;

    // LIFE-CYCLE CALLBACKS:
    @property(cc.ScrollView)
    scrollview: cc.ScrollView = null;

    @property(cc.Label)
    playerName: cc.Label = null;

    onLoad() {
        this.scrollview.node.on('scroll-to-bottom', () => {
            console.log('scroll-to-bottom');
            //已经取完
            if (this.HisData.length < this.HisCount) {
                console.log('已经取完')
            }

            else {
                let ts;
                if (this.HisData.length > 0) {
                    ts = this.HisData[this.HisData.length - 1].ts;
                }
                let data = {
                    uid: this.playeInfo.uid,
                    to: ts,
                    pageSize: 20,
                    gType: GameCfg.GameType,
                }
                this.onQueryGameResult(data);
            }

        }, this);
    }

    onToggleClick(event) {

        this.content.children.forEach(el => {
            let handle = el.getComponent('OtherPlayerItem');
            handle.onHisItemRate(event.isChecked);
        })
    }


    onShow() {

        if (this.playeInfo.nickname) {
            this.playerName.string = this.playeInfo.nickname + '  历史战绩';
        }
        else {
            this.playerName.string = this.playeInfo.uid + '  历史战绩';
        }
        this.tipsNode.active = false;

        if (this.HisData.length <= 0) {
            let ts = new Date().getTime() / 1000;

            let data = {
                uid: this.playeInfo.uid,
                to: ts,
                pageSize: 30,
                gType: GameCfg.GameType,
            }
            this.onQueryGameResult(data);
        }
    }

    onQueryGameResult(data) {
        GlobalEvent.emit(EventCfg.LOADINGSHOW);

        let CmdQueryGameResult = pb.CmdQueryGameResult;
        let message = CmdQueryGameResult.create(data)
        let buff = CmdQueryGameResult.encode(message).finish();

        socket.send(pb.MessageId.Req_Game_QueryGameResult, buff, info => {

            GlobalEvent.emit(EventCfg.LOADINGHIDE);

            if (info.results.length == 0) {
                this.tipsNode.active = true;
            }
            else {
                info.results.forEach((el, index) => {
                    this.HisData.push(el);

                    let node = cc.instantiate(this.item);
                    this.content.addChild(node);

                    let nodehandle = node.getComponent('OtherPlayerItem');
                    nodehandle.itemData = el;
                    nodehandle.itemIndex = this.HisData.length;
                    nodehandle.onShow();
                });

            }

            this.HisCount += data.pageSize;
        });


    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }
    }
}
