import { pb } from "../../../protos/proto";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onBtnClick(event, data) {

        let name = event.target.name;

        //注销
        if (name == 'grzx_zxzh') {
            socket.send(pb.MessageId.Req_Hall_Logout, null, (info) => {
            })

            socket.ws.close();
            cc.director.loadScene('Login');

            // socket.send(pb.MessageId.Req_Hall_Unregistry, null, (info) => {
            //     console.log('注销:' + JSON.stringify(info));
            //     if (!info.code) {

            //     } else {
            //         console.log('注销有误!:' + info.code + info.err);
            //     }
            // })
        }

        //协议
        else if (name == 'grzx_yhxy') {
            GlobalEvent.emit('openProtocol', '用户协议', 'http://www.cgdr168.com/user/decription1000.html');
        }

        else if (name == 'grzx_ysxy') {
            GlobalEvent.emit('openProtocol', '隐私协议', 'http://www.cgdr168.com/user/private1000.html');
        }

    }
}
