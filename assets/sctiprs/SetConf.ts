

class SetConf {
    line = 'k线';
    KLine = 150;
    ZLine = '日线';
    year = '随机';
    month = '随机';
    day = '随机';
    isShowVol = true;
    isBW = true;
    isMA1 = true;
    MA1Date = 5;
    isMA2 = true;
    MA2Date = 10;
    isMA3 = true;
    MA3Date = 20;
    isMA4 = true;
    MA4Date = 30;
    isMA5 = true;
    MA5Date = 60;
    isMA6 = true;
    MA6Date = 120;
    isFC = false;
    isSound = true;

    //dx
    k_notice = true;
    jx_notice = true;
    StopCheck_notice = true;
    market = '随机行情';
    search = '随机选股';

    //zb
    select = '均线';
    strategy = '股价穿越均线';
    showSign = true;
    MA = [20, 10, 30, -8];
    VOL = [5, 20];
    MACD = [12, 26, 9];
    BOLL = [20];
    KDJ = [9];
    RSI = [6, 12, 24];
    EXPMA = [12, 50];

    //qh
    JYS = '随机';
    LXPZ = '随机';
    HY = '随机';

    //tjd
    KSpeed = 0.2;

    //fs
    isAuto = false;


    constructor(str) {
        let set;
        set = cc.sys.localStorage.getItem(str);
        if (set) {
            return JSON.parse(set);
        }
    }

}


class HisCode {

    code = [];
    str = null;

    constructor(str) {
        this.str = str;
        let code = cc.sys.localStorage.getItem(str);

        if (code) {
            this.code = JSON.parse(code);
        }

        else {
            this.code = [];
        }

    }


    pushHisCode(code) {
        this.code.push(code);
        cc.sys.localStorage.setItem(this.str, JSON.stringify(this.code));
    }

}

class AdCount {
    count = 0;

    str = null;

    constructor(str) {
        this.str = str;
        let count = cc.sys.localStorage.getItem(str) || 0;

        if (count) {
            this.count = parseInt(count);
        }

        else {
            this.count = 0;
        }
    }

    addAdCount(str) {
        this.count++;
        cc.sys.localStorage.setItem(this.str, this.count);
    }
}


class SelectBk {

    arr = [1, 1, 1, 1, 1, 1];

    constructor() {
        let SelectBk = cc.sys.localStorage.getItem('SELECTBK');
        if (SelectBk) {
            this.arr = JSON.parse(SelectBk);
        }
    }

    setSelectBK(str) {
        this.arr = str;
        cc.sys.localStorage.setItem('SELECTBK', str);
    }

}

export { SetConf, HisCode, AdCount, SelectBk };