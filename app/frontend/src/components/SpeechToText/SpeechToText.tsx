import {
    SpeechConfig,
    AudioConfig,
    SpeechRecognizer,
    AutoDetectSourceLanguageConfig,
  } from "microsoft-cognitiveservices-speech-sdk";
import { fetchSpeechConfig } from "../../api";


export const multiLingualSpeechRecognizer = async () => {
    const { token, region, languages } = await fetchSpeechConfig();

    const speechConfig = SpeechConfig.fromAuthorizationToken(
      token,
      region
    );

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

    try {
      const autoDetectSourceLanguageConfig = AutoDetectSourceLanguageConfig.fromLanguages(languages);
      return SpeechRecognizer.FromConfig(speechConfig, autoDetectSourceLanguageConfig, audioConfig);
    } catch (error) {
      console.error("Using default language settings as error detected while reading language config:", error);
      return new SpeechRecognizer(speechConfig, audioConfig);
    }
};