
export default class AndroidSDK {

    public static _instance = null;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new AndroidSDK();
        }
        return this._instance;
    }

    wxLogin() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "weixin_login", "(Ljava/lang/String;)V", "weixin_login");
    }

    wxLoginResult(errCode) {
        console.log('wxLoginResult:' + JSON.stringify(errCode));
    }
}
