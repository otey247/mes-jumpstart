import { SpeechSynthesizer, SpeechSynthesisOutputFormat, SpeechConfig } from "microsoft-cognitiveservices-speech-sdk";
import { fetchSpeechConfig } from "../../api";


export const speakAnswer = async (answer: string) => {
    const { token, region, languages } = await fetchSpeechConfig();

    const speechConfig = SpeechConfig.fromAuthorizationToken(
      token,
      region
    );
    speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;
    const synthesizer = new SpeechSynthesizer(speechConfig, undefined);

    synthesizer.speakTextAsync(
        answer,
        result => {
            if (result) {
                console.log(`Speech synthesis result: ${result}`);
            }
            synthesizer.close();
        },
        error => {
            console.log(`Error: ${error}`);
            synthesizer.close();
        }
    );
};

