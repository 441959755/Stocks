
import HttpUtils from "./HttpUtils";
import LLWSDK from "../sdk/LLWSDK";

export default class HttpMgr{

   static  _instance:HttpMgr=null;

    static getInstance(){
        if(!this._instance){
            this._instance=new HttpMgr();
        }
        return this._instance;
    }

    append(url,key,value){
        url=url+'&'+key+'='+value;
        return url;
    }


    loginWeb(openId,name='',avator='',call=null,err){
        let url='';
        let llwSDK=LLWSDK.getSDK();
        let data={};
        HttpUtils.sendRequest(url,data,call,err);
    }
}
