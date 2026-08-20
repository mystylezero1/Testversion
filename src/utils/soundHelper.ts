/**
 * Audio synthesis & Voice greeting helper for wedding seat finder.
 * Plays an elegant golden chime / bell tone and speaks a rotating, personalized
 * wedding welcome greeting across all modern browsers & operating systems
 * (iOS Safari, Android Chrome, macOS, Windows).
 */

const WELCOME_MESSAGES_TEMPLATES = [
  (name: string, table: string) =>
    `Herzlich willkommen, ${name}! Schön, dass du heute mit Anja und Dino feierst. Dein Platz ist an ${table}. Hab ein wundervolles Fest!`,
  
  (name: string, table: string) =>
    `Hallo ${name}! Anja und Dino heißen dich herzlich willkommen. Wir freuen uns riesig auf einen unvergesslichen Abend mit dir an ${table}!`,
  
  (name: string, table: string) =>
    `Liebe Grüße, ${name}! Schön, dass du da bist, um die Liebe von Anja und Dino zu feiern. Du findest deinen Platz an ${table}.`,
  
  (name: string, table: string) =>
    `Ein herzliches Willkommen an ${name}! Anja und Dino wünschen dir einen zauberhaften Tag voller Freude, Tanz und gutem Essen an ${table}.`,
  
  (name: string, table: string) =>
    `Willkommen zur Hochzeit von Anja und Dino, ${name}! Nimm gerne Platz an ${table} und stoß mit uns an!`,
];

class SoundEffects {
  private audioCtx: AudioContext | null = null;
  private isUnlocked = false;
  private messageIndex = 0;
  private speechVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    // Unlock AudioContext and SpeechSynthesis on first user interaction in browser
    if (typeof window !== 'undefined') {
      const unlockAudioAndSpeech = () => {
        this.getAudioContext();
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        if ('speechSynthesis' in window) {
          // Preload voices
          this.speechVoices = window.speechSynthesis.getVoices();
          if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => {
              this.speechVoices = window.speechSynthesis.getVoices();
            };
          }
        }
        this.isUnlocked = true;
        ['click', 'touchstart', 'keydown'].forEach((event) => {
          document.removeEventListener(event, unlockAudioAndSpeech);
        });
      };

      ['click', 'touchstart', 'keydown'].forEach((event) => {
        document.addEventListener(event, unlockAudioAndSpeech, { passive: true });
      });
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    return this.audioCtx;
  }

  /**
   * Plays a pleasant, crystal-clear harmonic chime (C6 - E6 - G6 - C7)
   */
  public playSuccessChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Harmonic chord: C6 (1046.5Hz), E6 (1318.5Hz), G6 (1567.98Hz), C7 (2093Hz)
      const notes = [
        { freq: 1046.5, delay: 0.0, duration: 0.8, gain: 0.15 },
        { freq: 1318.5, delay: 0.08, duration: 0.9, gain: 0.14 },
        { freq: 1567.98, delay: 0.16, duration: 1.0, gain: 0.16 },
        { freq: 2093.0, delay: 0.24, duration: 1.2, gain: 0.12 },
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.freq, now + n.delay);

        // Soft bell envelope with harmonic sparkle
        gainNode.gain.setValueAtTime(0.0001, now + n.delay);
        gainNode.gain.exponentialRampToValueAtTime(n.gain, now + n.delay + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + n.delay + n.duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now + n.delay);
        osc.stop(now + n.delay + n.duration);
      });
    } catch {
      // safe fallback
    }
  }

  /**
   * Generates next rotating welcome message text
   */
  public getNextWelcomeText(guestName: string, tableName: string): string {
    const generator = WELCOME_MESSAGES_TEMPLATES[this.messageIndex % WELCOME_MESSAGES_TEMPLATES.length];
    this.messageIndex++;
    return generator(guestName, tableName);
  }

  /**
   * Speaks the personalized welcome quote aloud using the device's native TTS
   * Optimized for iOS Safari, Android Chrome, Windows & Mac.
   */
  public speakWelcomeMessage(guestName: string, tableName: string): string {
    const messageText = this.getNextWelcomeText(guestName, tableName);

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return messageText;
    }

    try {
      // Clear any pending utterances on iOS/Chrome to prevent queue blocking
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(messageText);
      utterance.lang = 'de-DE';
      utterance.rate = 0.98; // slightly relaxed, warm wedding tone
      utterance.pitch = 1.05; // bright, friendly pitch
      utterance.volume = 1.0;

      // Select German voice if available
      const voices = this.speechVoices.length > 0 ? this.speechVoices : window.speechSynthesis.getVoices();
      const germanVoice = voices.find(
        (v) => (v.lang === 'de-DE' || v.lang.startsWith('de')) && !v.name.includes('Google')
      ) || voices.find((v) => v.lang === 'de-DE' || v.lang.startsWith('de'));

      if (germanVoice) {
        utterance.voice = germanVoice;
      }

      // Small timeout to allow chime to ring first
      setTimeout(() => {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.speak(utterance);
        } catch {
          // safe fallback
        }
      }, 350);
    } catch {
      // safe fallback
    }

    return messageText;
  }

  /**
   * Stops any currently playing speech utterance
   */
  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // safe fallback
      }
    }
  }
}

export const soundEffects = new SoundEffects();
