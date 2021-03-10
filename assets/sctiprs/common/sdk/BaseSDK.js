export default class BaseSDK {
    static getInstance() {
        if (!this._instance) {
            this._instance = new BaseSDK();
        }
        return this._instance;
    }
    /**
     * SDK初始化
     */
    init() { }
    /**
     * 设置加载进度(oppo使用)
     * @param {*} progress 
     */
    setLoadingProgress(progress) { }
    /**
     * 加载完成上报(oppo使用)
     */
    loadingComplete() { }
    /**
     * 游戏启动成功
     */
    gameReady() { }
    /**
     * 登录web服务器
     * @param {*} callback 
     */
    login(callback) { }
    /**
     * 获取用户信息
     * @param {*} callback 
     */
    getUserInfo(callback) { }
    /**
     * 预加载banner广告
     */
    loadBanner(id) { }
    /**
     * 预加载插屏广告
     */
    loadInter(id) { }
    /**
     * 预加载激励视频广告
     */
    loadVideo(id) { }
    /**
     * 预加载原生广告
     */
    loadNative() { }
    /**
     * 预加载全屏广告
     */
    loadFullScreen() { }
    /**
     * 展示banner广告
     */
    showBanner(id) { }
    /**
     * 隐藏banner广告
     */
    hideBanner() { }
    /**
     * 展示插屏广告
     */
    showInter(id) { }
    /**
     * 展示激励视频
     * @param {*} id 
     * @param {*} callback 回调参数0:无可播放广告 1:播放成功发放奖励 -1: 播放中途退出
     * @param {*} pos 
     */
    showVideo(id, callback, pos) { }
    /**
     * 展示原生广告
     */
    showNative() { }
    /**
     * 展示全屏广告
     */
    showFullScreen() { }
    /**
     * 分享
     * @param {*} title 
     * @param {*} callback 
     * @param {*} query 
     */
    shareToFriend(title, callback, query = null) { }
    /**
     * 录屏初始化(头条使用)
     */
    onGameRecorderManagerInit() { }
    /**
     * 录屏开始(头条使用)
     */
    onGameRecorderStart() { }
    /**
     * 录屏结束(头条使用)
     */
    onGameRecorderStop() { }
    /**
     * 分享录屏(头条使用)
     */
    shareVideoToFriend() { }
    /**
     * 展示游戏圈
     */
    showGameClub() { }
    /**
     * 隐藏游戏圈
     */
    hideGameClub() { }
    /**
     * 跳转至其他小游戏
     * @param {*} pos 
     * @param {*} appId 
     * @param {*} callback 
     */
    naviToGame(appId, pos, callback = null) { }
    /**
     * 是否可显示跳转至小游戏图标
     */
    showNaviToGame() { return true; }
    /**
     * 监听网络变化
     */
    onNetStateChange() { }
    /**
     * 监听游戏切换至前台
     */
    onShow() { }
    /**
     * 监听游戏切换至后台
     */
    onHide() { }
    /**
     * 支付
     */
    doPay() { }
    /**
     * 判断是否已生成桌面图标
     */
    hasShortcutInstalled() { }
    /**
     * 生成桌面图标
     * @param {*} callback 
     */
    installShortcut(callback) { }

    /**
     * 是否可播放广告，返回true: 可播放，false:不可播放
     */
    canPlayAd() { return true; }

    /**
     * 获取iOS IDFA信息
     */
    getIDFA() { return null; }
}