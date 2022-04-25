import LoadUtils from './LoadUtils';

export default class AudioUtils {

	private static AudioMaps: Map<string, cc.AudioClip> = new Map();

	public static musicVolume = 0;

	public static effectVolume = 0;

	public static getAudioVolume() {
		let musicVolume = cc.sys.localStorage.getItem('MUSICVOLUME');
		this.musicVolume = musicVolume ? parseFloat(musicVolume) : 1;

		let effectVolume = cc.sys.localStorage.getItem('EFFECTVOLUME');
		this.effectVolume = effectVolume ? parseFloat(effectVolume) : 1;
	}

	/**加载资源
	 *  url 地址
	 */
	public static loadAudios(url) {

		LoadUtils.loadResDir(url, clips => {
			clips.forEach(element => {
				this.AudioMaps.set(element.name, element);
			});
		}); 
	}

	/**
	 * str 资源名
	 * loop 是否循环
	 */
	public static playMusic(str, loop?) {
		if (this.AudioMaps.has(str)) {
			cc.audioEngine.playMusic(this.AudioMaps.get(str), loop);
			return;
		}
		console.log('AudioUtils playMusic not ' + str);
	}

	/**
	 * 暂停
	 */
	public static pauseMusic() {
		cc.audioEngine.pauseMusic();
	}

	/**
	 * 恢复播放
	 */
	public static resumeMusic() {
		cc.audioEngine.resumeMusic();
	}

	/**
	 * 获取音乐大小
	 */
	public static getMusicVolume() {
		return this.musicVolume;
	}

	/**
	 * @param {Object} val大小
	 */
	public static setMusicVolume(val) {
		this.musicVolume = val;
		cc.audioEngine.setMusicVolume(val);
		cc.sys.localStorage.setItem('MUSICVOLUME', val);
	}

	/**
	 * 播放音效
	 */
	public static playEffect(str, loop?) {
		if (this.AudioMaps.has(str)) {
			cc.audioEngine.playEffect(this.AudioMaps.get(str), loop);
			return;
		}

		console.log('AudioUtils playEffect not ' + str);
	}

	/**
	 * @param {Object} str暂停音效
	 */
	public static pauseEffect(str) {
		cc.audioEngine.pauseEffect(str);
	}

	/**
	 * 暂停所有播放音效
	 */
	public static pauseAllEffects() {
		cc.audioEngine.pauseAllEffects();
	}

	/**
	 * @param {Object} str恢复播放音效
	 */
	public static resumeEffect(str) {
		cc.audioEngine.resumeEffect(str);
	}

	/**
	 * 恢复所有音效
	 */
	public static resumeAllEffects() {
		cc.audioEngine.resumeAllEffects();
	}

	/**
	 * @param {Object} val设置音效大小
	 */
	public static setEffectsVolume(val) {
		if (!val) {
			val = 0;
		}
		else {
			val = 1;
		}
		this.effectVolume = val;
		cc.audioEngine.setEffectsVolume(val);
		cc.sys.localStorage.setItem('EFFECTVOLUME', val);
	}

	/**
	 * 获取音效大小
	 */
	public static getEffectsVolume() {
		return this.effectVolume;
	}

	public static releaseAudios(url) {

	}
}
