class AudioManager {
  context: AudioContext;
  buffers: Record<string, AudioBuffer>;
  sources: Record<string, AudioBufferSourceNode | null>;

  constructor(sounds: { audioSrc: string }[]) {
    this.context = new AudioContext();
    this.buffers = {};
    this.sources = {};
    this.loadSounds(sounds);
  }

  async loadSounds(sounds: { audioSrc: string }[]) {
    try {
      for (const sound of sounds) {
        const response = await fetch(sound.audioSrc);
        const data = await response.arrayBuffer();
        const buffer = await this.context.decodeAudioData(data);
        this.buffers[sound.audioSrc] = buffer;
        this.sources[sound.audioSrc] = null;
      }
    } catch (error) {
      console.error(`Error loading sounds:`, error);
    }
  }

  playSound(audioSrc: string, volume: number = 1) {
    const buffer = this.buffers[audioSrc];
    if (buffer) {
      if (this.sources[audioSrc]) {
        this.sources[audioSrc]?.stop();
      }

      const source = this.context.createBufferSource();
      const gainNode = this.context.createGain();

      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      gainNode.gain.setValueAtTime(volume, this.context.currentTime); // Set volume

      source.start(0);
      this.sources[audioSrc] = source;

      source.onended = () => {
        if (this.sources[audioSrc] === source) {
          this.sources[audioSrc] = null;
        }
      };
    } else {
      console.error(`Buffer not found for audio source: ${audioSrc}`);
    }
  }
}

export default AudioManager;
