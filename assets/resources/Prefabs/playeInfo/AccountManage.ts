import { pb } from "../../../protos/proto";
import LLWConfig from "../../../sctiprs/common/config/LLWConfig";
import LLWSDK from "../../../sctiprs/common/sdk/LLWSDK";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../../sctiprs/Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onBtnClick(event, data) {

        let name = event.target.name;

        //注销
        if (name == 'grzx_zxzh') {
            socket.send(pb.MessageId.Req_Hall_Logout, null, (info) => {

            })

            socket.flag = true;

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
            console.log('用户协议');
            let url = LLWConfig.LoginURL + '/user/decription1000.html'
            LLWSDK.getSDK().onCopyText(url, (flag) => {
                if (flag) {
                    // GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '用户协议地址已经复制，请前往网页黏贴地址打开');
                    PopupManager.openNode(this.node, null, 'Prefabs/pop/tipsBox1', 10, (node) => {
                        let handle = node.getComponent('TipsBox1');
                        handle.onShow('用户协议地址已经复制，请前往网页黏贴地址打开');
                    })
                }
            })
            //  PopupManager.openProtocol('用户协议', LLWConfig.LoginURL + '/user/decription1000.html');
        }

        else if (name == 'grzx_ysxy') {
            console.log('隐私协议');
            let url = LLWConfig.LoginURL + '/user/private1000.html';
            LLWSDK.getSDK().onCopyText(url, (flag) => {
                if (flag) {
                    PopupManager.openNode(this.node, null, 'Prefabs/pop/tipsBox1', 10, (node) => {
                        let handle = node.getComponent('TipsBox1');
                        handle.onShow('隐私协议地址已经复制，请前往网页黏贴地址打开');
                    })
                }
            })
            // PopupManager.openProtocol('隐私协议', LLWConfig.LoginURL + '/user/private1000.html')
        }

    }
}
