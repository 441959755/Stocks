import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import LoadUtils from './LoadUtils';

export default class ComUtils {
	private static loading = null;
	
	private static tipsText=null;

	public static onEvent() {
		//显示加载
		GlobalEvent.on(
			EventCfg.LOADINGSHOW,
			() => {
				this.loading && (this.loading.active = true);
			},
			this
		);

		//关闭加载
		GlobalEvent.on(
			EventCfg.LOADINGHIDE,
			() => {
				this.loading && (this.loading.active = false);
			},
			this
		);
		
		  //提示
		  GlobalEvent.on(EventCfg.TIPSTEXTSHOW,(content)=>{
			  if(this.tipsText){
				  this.tipsText.active=true;
				  this.tipsText.getComponent('TipsTextHandle').textData=content;
				  this.tipsText.getComponent('TipsTextHandle').onShow();
				  
			  }else{
				  console.log('ComUtils 中节点加载错误！');
			  }
		  },this);
		  
		  //提示关闭
		  GlobalEvent.on(EventCfg.TIPSTEXTHIDE,()=>{
			  this.tipsText&&(this.tipsText.active=false);
		  },this);
	}

	public static onLoadNode() {
		if (!this.loading) {
			LoadUtils.loadRes('Prefabs/loading', pre => {
				this.loading = cc.instantiate(pre);
				cc.find('Canvas').addChild(this.loading, 99,'loading');
				this.loading.active=false;
			});
		}
		
		if(!this.tipsText){
			LoadUtils.loadRes('Prefabs/tipsText',pre=>{
				this.tipsText=cc.instantiate(pre);
				cc.find('Canvas').addChild(this.tipsText,98,'tipsText');
				this.tipsText.active=false;
			})
		}
		
		
	}

	public static onDestory() {
		GlobalEvent.off(EventCfg.LOADINGHIDE);
		GlobalEvent.off(EventCfg.LOADINGSHOW);
		LoadUtils.releaseRes('Prefabs/loading');
		this.loading=null;
		 GlobalEvent.off(EventCfg.TIPSTEXTSHOW);
		LoadUtils.releaseRes('Prefabs/tipsText');
		this.tipsText=null;
		
		 GlobalEvent.off(EventCfg.TIPSTEXTHIDE);
	}

	public static BitmapToByte(img) {
		// let buf = null;
		// let ms = new MemoryStream();
		// img.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
		// buf = ms.GetBuffer();
		// return buf;
		//var base64str = new Buffer(img).toString('base64');
	}
}
