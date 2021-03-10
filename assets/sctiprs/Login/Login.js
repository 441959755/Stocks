import GameData from "../GameData";
import LLWSDK from "../common/sdk/LLWSDK";

import NetWorkMgr from "../common/net/NetWorkMgr";

cc.ext={};
cc.ext.gameData=new GameData();

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){
       let self=this;


        // NetWorkMgr.getInstance().getGuPiaoData((data)=>{
        //     console.log(data);
        // })


        cc.ext.llSDK=LLWSDK.getSDK();
        cc.ext.llSDK.init();
        cc.ext.llSDK.login((data)=>{
            console.log(data);
            //PkLeftTimes: "5"
            // PkLose: "0"
            // PkWin: "0"
            // TocalLose: "0"
            // TocalWin: "0"
            // UID: "625405"
            // mGold: "0"
            // mRelive: "0"
            // mRiches: "0"
            cc.ext.gameData.PkLeftTimes=data.PkLeftTimes;
            cc.ext.gameData.PkLose=data.PkLose;
            cc.ext.gameData.PkWin=data.PkWin;
            cc.ext.gameData.TocalLose=data.TocalLose;
            cc.ext.gameData.TocalWin=data.TocalWin;
            cc.ext.gameData.UID=data.UID;
            cc.ext.gameData.gold=data.mGold;

            cc.ext.gameData.mRelive=data.mRelive;
            cc.ext.gameData.mRiches=data.mRiches;

            self.enterHall();
        })

    },


    //进入大厅
    enterHall(){
        cc.director.loadScene('hall');
    }



    // start () {
    //
    // },

    // update (dt) {},
});
