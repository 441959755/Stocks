import LLWSDK from "../../../sctiprs/common/sdk/LLWSDK";
import GameData from "../../../sctiprs/GameData";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import {pb} from "../../../protos/proto";

const {ccclass, property} = cc._decorator;

@ccclass

export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.SpriteFrame)
    test:cc.SpriteFrame=null;

     onLoad() {
        GlobalEvent.on(EventCfg.HEADIMGCHANGE, () => {
            this.headImg.spriteFrame = GameData.headImg;
        }, this);
    }

    start() {
        this.headImg.spriteFrame = GameData.headImg;
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;

        if (name == 'closeBtn') {
            this.node.active = false;
        }

        else if (name == 'grzx_xc') {
            LLWSDK.getSDK().pickImage(1,this.photoHead.bind(this));
        }

        else if(name=='grzx_xj'){
            LLWSDK.getSDK().pickImage(2);
        }
    }

    photoHead(tex){

       tex=  this.test.getTexture();
         // if(!tex){
         //     tex=GameData.headImg;
         // }
        // console.log('选择相册回调'+tex);
        //  let sp = new cc.SpriteFrame(tex);

         if(tex.width<250){

         }
         else{
             tex.setRect(cc.rect(tex.width-250,tex.height-250,250,250));
         }


        let data = {
            uid: GameData.userID,
            icon:new Uint8Array(tex),
        }

        let CmdUploadIcon = pb.CmdUploadIcon;
        let message = CmdUploadIcon.create(data);
        let buff = CmdUploadIcon.encode(message).finish();

        socket.send(pb.MessageId.Req_Hall_UploadIcon, buff, (info) => {
            if(info.err){
                console.log('GameData.headImg:'+info.err);
            }
            else{
                console.log('GameData.headImg:' + JSON.stringify(info));

                console.log('选择相册回调'+JSON.stringify(tex));
            }
            this.headImg.spriteFrame =tex;
        })


    }

     onDestroy() {
        GlobalEvent.off(EventCfg.HEADIMGCHANGE);
    }

}
