class AudioManager {
  context: AudioContext;
  buffers: Record<string, AudioBuffer>;

  constructor(sounds: { audioSrc: string }[]) {
    this.context = new AudioContext();
    this.buffers = {};
    this.loadSounds(sounds);
  }

  async loadSounds(sounds: { audioSrc: string }[]) {
    try {
      for (const sound of sounds) {
        const response = await fetch(sound.audioSrc);
        const data = await response.arrayBuffer();
        const buffer = await this.context.decodeAudioData(data);
        this.buffers[sound.audioSrc] = buffer;
      }
    } catch (error) {
      console.error(`Error loading sounds:`, error);
    }
  }

  playSound(audioSrc: string) {
    const buffer = this.buffers[audioSrc];
    if (buffer) {
      const source = this.context.createBufferSource();
      source.buffer = buffer;
      source.connect(this.context.destination);
      source.start(0);
    } else {
      console.error(`Buffer not found for audio source: ${audioSrc}`);
    }
  }
}

export default AudioManager;
