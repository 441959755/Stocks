import LoadUtils from './LoadUtils';
import LocalStorageUtils from './LocalStorageUtils';

export default class AudioUtils{
  private AudioMaps:Map<string,cc.AudioClip>=new Map();

  public musicVolume=0;

  public effectVolume=0;

  public LoadAudios(url){

    LoadUtils.loadResDir(url,(clips)=>{
        clips.forEach(element => {
            this.AudioMaps.set(element.name,element);
        });
    })


  }

  public playMusic(str,loop?){
      if(this.AudioMaps.has(str)){
          cc.audioEngine.playMusic(str,loop);
          return;
      }
      console.log('AudioUtils playMusic not '+str);
  }

  public pauseMusic(){
     cc.audioEngine.pauseMusic();
  }


  public resumeMusic(){
      cc.audioEngine.resumeMusic();
  }

  public getMusicVolume(){
      return cc.audioEngine.getMusicVolume();
  }

  public setMusicVolume(val){
      this.musicVolume=val;
      cc.audioEngine.setMusicVolume(val);
  }


  public playEffect(str,loop?){
      if(this.AudioMaps.has(str)){
          cc.audioEngine.playEffect(str,loop);
          return;
      }

      console.log('AudioUtils playEffect not '+str);

  }

  public pauseEffect(str){
        cc.audioEngine.pauseEffect(str);
  }

  public pauseAllEffects(){
      cc.audioEngine.pauseAllEffects();
  }

  public resumeEffect(str){
    cc.audioEngine.resumeEffect(str);
  }

  public resumeAllEffects(){
      cc.audioEngine.resumeAllEffects();
  }

  public setEffectsVolume(val){
      this.effectVolume=val;
      cc.audioEngine.setEffectsVolume(val);
  }

  public  getEffectsVolume(){
      return cc.audioEngine.getEffectsVolume();
  }

  
}