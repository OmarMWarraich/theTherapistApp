
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chat, MessageType, User } from "@flyerhq/react-native-chat-ui";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ChatClient } from "../model/chat.client";
import { ChatDto, ChatMessageDto } from "../model/chat.dto";

const uuidv4 = () => {
 return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
  const r = Math.floor(Math.random() * 16);
  const v = c === "x" ? r : (r % 4) + 8;
  return v.toString(16);
 });
};

const me: User = { firstName: "me", id: uuidv4() };
const therapist: User = { firstName: "therapist", id: uuidv4() };

const getAuthorByName = (name: string): User => {
 if (name.toLowerCase() === therapist.firstName) return therapist;
 return me;
};

const mapChatToUiChatMessages = (chatDto: ChatDto): MessageType.Any[] => {
 const chatMessages = [...chatDto.messages];
 return chatMessages.reverse().map((chatMessage) => {
  const uiMessage: MessageType.Text = {
   author: getAuthorByName(chatMessage.authorName),
   createdAt: chatMessage.createdAt,
   id: chatMessage.id,
   text: chatMessage.content,
   type: "text",
  };
  return uiMessage;
 });
};

const chatOnInitialize: ChatDto = {
 messages: [
  {
   authorName: "therapist",
   id: uuidv4(),
   content: "Hello! How are you?",
   createdAt: Date.now(),
  },
 ],
};

export const ChatView = () => {
 const [chat, setChat] = useState<ChatDto>(chatOnInitialize);

 const updateChatWithApiReply = async (localChat: ChatDto) => {
  const chatApiBaseUrl =
   "<Your Ngrok Url>";
  const chatClient = new ChatClient(chatApiBaseUrl);
  const newChat = await chatClient.respondTo(localChat);
  setChat(newChat);
 };

 const chatAfterPressSend = (message: ChatMessageDto): ChatDto => {
  const newChat = { messages: [...chat.messages, message] };
  setChat(newChat);
  return newChat;
 };

 const handleSendPress = async (message: MessageType.PartialText) => {
  const newMessage: ChatMessageDto = {
   authorName: "me",
   createdAt: Date.now(),
   id: uuidv4(),
   content: message.text,
  };
  const newChat = chatAfterPressSend(newMessage);
  await updateChatWithApiReply(newChat);
 };

 return (
  <SafeAreaProvider>
   <View style={styles.chatHeader}>
    <Text style={styles.chatHeaderText}>🥸 Ova the Therapist</Text>
   </View>
   <Chat
    messages={mapChatToUiChatMessages(chat)}
    onSendPress={handleSendPress}
    user={me}
   />
  </SafeAreaProvider>
 );
};

const styles = StyleSheet.create({
 chatHeader: {
  backgroundColor: "#FAFAFA",
 },
 chatHeaderText: {
  paddingTop: 50,
  paddingLeft: 20,
  paddingBottom: 10,
  fontSize: 27,
  fontWeight: "bold",
 },
});
