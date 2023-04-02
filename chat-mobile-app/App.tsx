
import React from "react";
import { StyleSheet } from "react-native";
import { ChatView } from "./src/view/chat.view";

export default function App() {
 return <ChatView />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
