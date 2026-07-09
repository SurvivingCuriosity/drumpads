class AudioManager {
  context: AudioContext;
  buffers: Record<string, AudioBuffer>;
  sources: Record<string, AudioBufferSourceNode | null>;

  constructor() {
    // 'interactive' pide al navegador el buffer de salida más pequeño posible
    this.context = new AudioContext({ latencyHint: 'interactive' });
    this.buffers = {};
    this.sources = {};
  }

  async loadSounds(sounds: { audioSrc: string }[]) {
    await Promise.all(
      sounds.map(async (sound) => {
        try {
          const response = await fetch(sound.audioSrc);
          const data = await response.arrayBuffer();
          const buffer = await this.context.decodeAudioData(data);
          this.buffers[sound.audioSrc] = buffer;
          this.sources[sound.audioSrc] = null;
        } catch (error) {
          console.error(`Error loading sound ${sound.audioSrc}:`, error);
        }
      })
    );
  }

  // Los navegadores suspenden el AudioContext hasta un gesto del usuario
  resume() {
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  playSound(audioSrc: string, volume: number = 1) {
    const buffer = this.buffers[audioSrc];
    if (buffer) {
      if (this.sources[audioSrc]) {
        this.sources[audioSrc]?.stop();
        this.sources[audioSrc] = null;
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
