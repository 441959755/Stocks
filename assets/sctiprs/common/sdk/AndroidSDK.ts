
export default class AndroidSDK {

    public static _instance = null;

    public static WeChatModule = null;

    public static getInstance() {

        if (!this._instance) {
            this._instance = new AndroidSDK();
        }
        return this._instance;
    }



}
