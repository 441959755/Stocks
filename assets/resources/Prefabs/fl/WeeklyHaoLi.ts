import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import {pb} from "../../../protos/proto";
// import * as moment from 'moment';

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    haoli: cc.Node = null;

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    @property(cc.Node)
    item:cc.Node=null;

    @property(cc.Node)
    content:cc.Node=null;

    start() {
        this.haoli.active = true;
    }

    onEnable() {

        this.content.removeAllChildren();

        let curTime=new Date().getTime()/1000;
        let data = {
            eventId: pb.EventId.EventId_WeeklyAward,
           from: curTime-7*24*60*60,
            to:curTime,
            total: 100,
        }

        let CmdQueryEventLog = pb.CmdQueryEventLog;
        let message = CmdQueryEventLog.create(data);
        let buff = CmdQueryEventLog.encode(message).finish();

        socket.send(pb.MessageId.Req_Hall_QueryEventLog, buff, (info) => {
            console.log('每周豪礼：' + JSON.stringify(info));

            if(!info.items||info.items.length<=0){
                return;
            }
            this.creatorItem(info.items);
        })
    }

    creatorItem(arr){
        arr.forEach(el=>{
            let node=cc.instantiate(this.item);
            this.content.addChild(node);
            node.getComponent(cc.Label).string=el.log;
        })
    }

    onBtnClick(event, curdata) {

        let name = event.target.name;

        switch (name) {
            case 'sys_close':
                this.node.active = false;
                break;

            case  'duihuan':
                if (this.editBox.string.length <= 0) {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '兑换码不能为空');
                    return;
                }

                let data = {
                    code: this.editBox.string,
                }
                let CmdGetWeeklyAward = pb.CmdGetWeeklyAward;
                let message = CmdGetWeeklyAward.create(data);
                let buff = CmdGetWeeklyAward.encode(message).finish();

                socket.send(pb.MessageId.Req_Hall_GetWeeklyAward, buff, (info) => {

                    console.log('领取每周豪礼' + JSON.stringify(info));

                    if (info.result.err) {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, info.result.err);
                    } else {
                        let award = info.result.award;
                        let gold = 0, diamond = 0,coupon=0;

                        award.items.forEach(el => {
                            if (el.id == pb.GamePropertyId.Gold) {
                                gold += el.newValue;
                            } else if (el.id == pb.GamePropertyId.Diamond) {
                                diamond += el.newValue;
                            }
                            else if(el.id==pb.GamePropertyId.Coupon){
                                coupon+= el.newValue;
                            }
                        })

                        let str = '兑换成功,获得';

                        if (gold) {
                            str += ('' + gold + '金币');
                        }
                        if (diamond) {
                            str += ('' + diamond + '钻石');
                        }
                        if(coupon){
                            str += ('' + coupon + '奖券');
                        }
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, str);
                    }
                });
                break;
        }
    }
}
