import { pb } from "../../../protos/proto";
import HttpUtils from "../../../sctiprs/common/net/HttpUtils";
//import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    code = null;

    gpDataMin = null;  //分时数据

    gpDataDay = null  //日k数据

    gpDataDay7 = null  //周k数据

    gpDataMonth = null //月k数据

    ktype = null;

    onLoad() {
        this.ktype = pb.KType.Min;
    }

    onShow(code) {
        this.code = code;
        this.getGPDataMin();

        //  this.getHttpGPData('mk');
    }


    getGPDataMin() {
        let curDate = new Date();
        let hour = curDate.getHours();
        let minute = curDate.getMinutes();

        let from, to;
        //获取上一天的数据
        if (hour < 9 || (hour == 9 && minute < 30)) {
            let time = curDate.getTime() - (24 + hour) * 60 * 60 * 1000;
            from = parseInt(new Date(time).getTime() / 1000 + '');
            to = parseInt(new Date(time + 23 * 60 * 60 * 1000).getTime() / 1000 + '');
        }
        else {
            let time = curDate.getTime() - (hour) * 60 * 60 * 1000;
            from = parseInt(new Date(time).getTime() / 1000 + '');
            to = parseInt(curDate.getTime() / 1000 + '');
        }

        let info = {
            kType: this.ktype,
            code: this.code,
            to: to,
            form: from,
            total: 0,
        }
        this.getGPData(info);
        this.CmdQuoteSubscribe();
    }

    getHttpGPData(type) {
        let url = 'http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js';//?TYPE=mk&rtntype=5&authorityType=fa&id=6000111
        let code;
        code = this.code;
        if ((code + '').length >= 7) {
            code = (code + '').slice(1);
        }
        if (code[0] == 6) {
            code += '1';
        }
        else if (code[0] == 3) {
            code += '2';
        }
        let data = {
            TYPE: type,
            rtntype: 5,
            authorityType: false,
            id: code
        }

        HttpUtils.sendRequest(url, data, (res) => {
            res = res.replace('(', '');
            res = res.replace(')', '');
            //  console.log('日k：' + res);
            res = JSON.parse(res);
            if (type == 'mk') {
                this.gpDataMonth = res;
            }
            else if (type == 'wk') {
                this.gpDataDay7 = res;
            }
            else if (type == 'k') {
                this.gpDataDay = res;
            }
        })
    }

    CmdQuoteSubscribe() {
        let info = {
            items: [{ code: this.code, flag: true }]
        }
        let CmdQuoteSubscribe = pb.CmdQuoteSubscribe;
        let message = CmdQuoteSubscribe.create(info);
        let buff = CmdQuoteSubscribe.encode(message).finish();

        socket.send(pb.MessageId.Req_QuoteSubscribe, buff, info => {
            console.log('订阅：' + JSON.stringify(info));

        })
    }

    getGPData(info) {
        console.log('获取数据参数：' + JSON.stringify(info));

        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info), info => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            if (!info.items || info.items.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空');
                return;
            }

            if (info.kType == pb.KType.Min) {
                this.gpDataMin = info.items;
            }
        });
    }

    onToggleClick(event, data) {
        let name = event.node.name;
        if (name == 'toggle1') {
            if (!this.gpDataMin) {
                this.getGPDataMin();
            }
        }

        else if (name == 'toggle2') {
            if (!this.gpDataDay) {
                this.getHttpGPData('k');
            }
        }

        else if (name == 'toggle3') {
            if (!this.gpDataDay) {
                this.getHttpGPData('k');
            }
        }

        else if (name == 'toggle4') {
            if (!this.gpDataDay7) {
                this.getHttpGPData('wk');
            }
        }

        else if (name == 'toggle5') {
            if (!this.gpDataMonth) {
                this.getHttpGPData('mk');
            }
        }
    }


    onDisable() {

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }
        else if (name == '') {

        }

    }
}
