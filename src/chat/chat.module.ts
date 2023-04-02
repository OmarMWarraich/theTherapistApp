import { Module } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

const getOpenAiKeyOrThrow = () => {
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    throw new Error('OpenAI API key not specified');
  }
  return openAiKey;
};

const buildOpenAiClient = () => {
  const openAiKey = getOpenAiKeyOrThrow();
  const configuration = new Configuration({
    apiKey: openAiKey,
  });
  const openAiClient = new OpenAIApi(configuration);
  return openAiClient;
};

@Module({
  controllers: [ChatController],
  providers: [
    {
      provide: ChatService,
      useFactory: () => {
        const openAiClient = buildOpenAiClient();
        return new ChatService(openAiClient);
      },
    },
  ],
})
export class ChatModule {}