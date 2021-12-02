import {pb} from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
// import * as moment from 'moment';
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import ComUtils from "../../../sctiprs/Utils/ComUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    items: cc.Node[] = [];

    award7 = [];

    getAward=false;

    @property(cc.Button)
    btnfl:cc.Button=null;

    start() {
        this.award7 = GameData.gameData.award7 || [];
        this.onShow();
    }

    onShow() {

        let ymd=ComUtils.fromatTime1(new Date().getTime()/1000);

        let flag=true;

        this.award7.forEach(el=>{
            if(el==ymd){
                flag=false;
            }
        })

        this.getAward=flag;

        this.btnfl.interactable=this.getAward;
        this.btnfl.enableAutoGrayEffect=!this.getAward;

        this.items.forEach((el, index) => {
             if(index<this.award7.length){
                 el.getChildByName('fl_ylq').active=true;
                 el.getChildByName('lock').active=false;
             }
             else{
                 el.getChildByName('fl_ylq').active=false;

                 el.getChildByName('lock').active=true;

                 if(this.getAward&&index==this.award7.length){
                     el.getChildByName('lock').active=false;
                 }
             }
        })
    }


    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'sys_close') {
            this.node.active = false;
        } else if (name == 'fl_7d_lqjl') {
            let data={
                index:parseInt(curdata),
                adClicked:false,
            }

            let CmdGetDailyAward = pb.CmdGetDailyAward;
            let message = CmdGetDailyAward.create(data);
            let buff = CmdGetDailyAward.encode(message).finish();

            console.log(JSON.stringify(data));

            socket.send(pb.MessageId.Req_Hall_Get7Award, buff, (info) => {
                console.log('领取7次奖励：' + JSON.stringify(info));
            })
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW,'成功领取！');
            this.award7.push(ComUtils.fromatTime1(new Date().getTime()/1000));
            this.onShow();
        }
    }
}
