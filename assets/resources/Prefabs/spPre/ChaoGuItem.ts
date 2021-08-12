import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Label)
    bsTime: cc.Label = null;

    @property(cc.Label)
    bmTime: cc.Label = null;

    @property([cc.Node])
    ksjs: cc.Node[] = [];

    @property([cc.Node])
    phs: cc.Node[] = [];

    @property([cc.Node])
    bms: cc.Node[] = [];

    @property([cc.Node])
    cjs: cc.Node[] = [];

    _curData = null;
    _conf = null;

    onShow(data?) {
        if (!data) {
            data = this._curData;
        }
        this._curData = data;
        this._conf = JSON.parse(data.conf);

        this.title.string = data.title;
        this.bsTime.string = '比赛时段：' + ComUtils.formatTime(data.from) + '--' + ComUtils.formatTime(data.to);

        this.bmTime.string = '报名截止：' + ComUtils.formatTime(data.regTo);

        let flagbm = true;

        if (GameData.cgdsStateList.length > 0) {
            GameData.cgdsStateList.forEach(el => {
                if (el.id == data.id) {
                    flagbm = false;
                }
            });
        }
        this.bms[0].active = false;
        this.bms[1].active = true;

        if (data.status == 2) {
            this.cjs[1].active = false;
            this.cjs[0].active = true;
            this.ksjs[1].active = true;
            this.ksjs[0].active = false;
            this.phs[0].active = true;
            this.phs[1].active = false;
            this.bms[1].active = true;
            this.bms[0].active = false;
        }
        else {
            this.cjs[0].active = true;
            this.cjs[1].active = false;
            //已报名
            if (data.status == 1 && !flagbm) {
                this.cjs[0].active = false;
                this.cjs[1].active = true;

            }
            //有比赛 未报名
            else if (data.status == 1 && flagbm) {
                this.bms[0].active = true;
                this.bms[1].active = false;
            }
            this.ksjs[0].active = true;
            this.ksjs[1].active = false;
            this.phs[1].active = true;
            this.phs[0].active = false;
        }
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'sp_cgds_ljbm2') {
            if (GameData.properties[this._conf.cost.i] < Math.abs(this._conf.cost.v)) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '您的报名费不足');
                return;
            }

            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            let info = {
                id: this._curData.id,
            }

            let CmdCgdsReg = pb.CmdCgdsReg;
            let message = CmdCgdsReg.create(info);
            let buff = CmdCgdsReg.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_CgdsReg, buff, (res) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                console.log('报名结果' + JSON.stringify(res));

                if (res.cgdsStateItem) {
                    GameData.cgdsStateList.push(res.cgdsStateItem);
                    this.onShow();
                }
                else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.result.err);
                }
            })
        }

        else if (name == 'sp_cgds_sjph2') {
            GlobalEvent.emit(EventCfg.OPENCGDSPH, this._curData);
        }

        else if (name == 'sp_cgds_ljcj2') {
            GlobalEvent.emit(EventCfg.OPENMNXG, this._curData);
        }
    }

}

