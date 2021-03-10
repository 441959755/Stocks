var CONFIG = {};
var AUDIT = false;
var LIKESWITCH = false;
var DEFAULTSWITCH = false;
var MORESWITCH = false;
var AGAINSWITCH = false;
var REVIVESWITCH = false;
var INTERSWITCH = false;
var INTERCOUNT = 0;
var SHARETEMP = {};
var LIKE = {};
var DEFAULT = {};
var MORE = {};
var ADINDEX = 0;
export default class SwitchConfig{
    
    static set CONFIG(res){ CONFIG = res; }
    static get CONFIG(){return CONFIG;}

    static set AUDIT(res){ AUDIT = res; }
    static get AUDIT(){return AUDIT;}

    static set LIKESWITCH(res){LIKESWITCH = res;}
    static get LIKESWITCH(){return LIKESWITCH;}

    static set DEFAULTSWITCH(res){DEFAULTSWITCH = res;}
    static get DEFAULTSWITCH(){return DEFAULTSWITCH;}

    static set MORESWITCH(res){MORESWITCH = res;}
    static get MORESWITCH(){return MORESWITCH;}
    
    static set AGAINSWITCH(res){AGAINSWITCH = res;}
    static get AGAINSWITCH(){return AGAINSWITCH;}
    
    static set REVIVESWITCH(res){REVIVESWITCH = res;}
    static get REVIVESWITCH(){return REVIVESWITCH;}
    
    static set INTERSWITCH(res){INTERSWITCH = res;}
    static get INTERSWITCH(){return INTERSWITCH;}
    
    static set INTERCOUNT(res){INTERCOUNT = res;}
    static get INTERCOUNT(){return INTERCOUNT;}

    static set SHARETEMP(res){SHARETEMP = res;}
    static get SHARETEMP(){return SHARETEMP;}
    
    static set LIKE(res){LIKE = res;}
    static get LIKE(){return LIKE;}
    
    static set DEFAULT(res){DEFAULT = res;}
    static get DEFAULT(){return DEFAULT;}
    
    static set MORE(res){MORE = res;}
    static get MORE(){return MORE;}
    
    static set ADINDEX(res){ADINDEX = res;}
    static get ADINDEX(){return ADINDEX;}
}