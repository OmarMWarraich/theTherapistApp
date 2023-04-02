
import axios from "axios";
import { ChatDto } from "./chat.dto";

export class ChatClient {
 constructor(private readonly chatApiBaseUrl: string) {}

 public async respondTo(chatDto: ChatDto): Promise<ChatDto> {
  const getChatResponseUrl = `${this.chatApiBaseUrl}/chat/respond`;
  const axiosResponse = await axios.post(getChatResponseUrl, chatDto);
  const chatResponse: ChatDto = axiosResponse.data;
  return chatResponse;
 }
}