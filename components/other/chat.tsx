import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Animated, FlatList, BackHandler, Button } from 'react-native';
import { GiftedChat, IMessage, Bubble, InputToolbar, MessageText } from 'react-native-gifted-chat';
import {GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useFocusEffect } from 'expo-router';
import { getCloseChat } from '@/app/(tabs)/data';

export interface CustomMessage extends IMessage {
  replyTo?: {
    _id: any,
    text: string;
    user: {
      _id: string;
      name: string;
    };
  } | null;
}

const SOCKET_URL = 'http://192.168.1.156:8080/chat';
const USER_ID = 'e692cd89-e09e-4651-afb8-8956d349ff6c'; // uid
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiJlNjkyY2Q4OS1lMDllLTQ2NTEtYWZiOC04OTU2ZDM0OWZmNmMiLCJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsIm5vX3Bhc3N3b3JkIjpmYWxzZSwic2NvcGUiOiJST0xFX1VTRVIiLCJpc3MiOiJ0dWFuYW5obmUuY29tIiwibmFtZSI6IlVTRVIiLCJleHAiOjE3MzI0NjE0ODUsImlhdCI6MTczMjM3NTA4NSwianRpIjoiOGVhMGNmYTUtNTRhMi00MDlkLTlkMzQtNzNiMjc4MjQyMGU1In0.xbgijdh0XxroVpgUq7WqndU-U2EnRkhiKsZ6W-ADUqfs0P_QYzUz3z_zylo4MekFFClyh06eBnyllpnAS1cgQQ'
const MESSAGE_API = 'http://192.168.1.156:8080/words/test'


const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<CustomMessage[]>([]);
  const [replyMessage, setReplyMessage] = useState<CustomMessage | null>(null);
  const [stomp, setStomp] = useState<CompatClient | null>(null);
  const chatRef = useRef<FlatList<CustomMessage | undefined>>(null); 
  let stompClient: CompatClient | null = null;
  let socket: any = null;

  const mapChatResponseToMessage = (chatResponse: any): CustomMessage => {
    const isUserSender = chatResponse.sender_type === 'USER';
    return {
      _id: chatResponse.id,
      text: chatResponse.message,
      createdAt: new Date(chatResponse.timestamp),
      user: {
        _id: isUserSender ? chatResponse.user_id : chatResponse.admin_id,
        name: isUserSender ? 'You' : 'Admin',
      },
      replyTo: chatResponse.reply
        ? {
            _id: chatResponse.reply.id,
            text: chatResponse.reply.message,
            user: {
               _id: chatResponse.reply.sender_id,
               name: chatResponse.reply.sender_id === chatResponse.user_id ? 'You' : 'Admin' 
              },
          }
        : null,
      };
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${MESSAGE_API}`);
        if (response.ok) {
          const data : CustomMessage[] = await response.json();
          setMessages(data.reverse());
        } else {
          console.error('Error fetching messages:', response.status);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };


  useEffect(() => {
    fetchMessages();
    if(socket == null && stomp == null && stompClient == null){
      socket = new SockJS(SOCKET_URL);
      stompClient = Stomp.over(socket);
      if (!socket.OPEN) {
        stompClient.connect(
          { token: TOKEN },
          function (frame: any) {
            setTimeout(function () {
              setStomp(stompClient);
              stompClient!.subscribe(
                `/topic/user/${USER_ID}`,
                (messageOutput: any) => {
                  const message = JSON.parse(messageOutput.body);
                  const newMessage = mapChatResponseToMessage(message);
                  console.log({"message": message,"newMessage":newMessage})
                  setMessages((prevMessages) => [newMessage, ...prevMessages, ]);
                },
                { token: TOKEN }
              );
            }, 500);
          }
        );
      }
    }

  }, []);
  const onSend = (newMessages: CustomMessage[]) => {
    const messageToSend = newMessages[0];
    const messageRequest = {
      access_token: TOKEN, 
      message: messageToSend.text,
      id: replyMessage ? replyMessage._id : 0, 
      type: replyMessage ? 'REPLY' : 'SENT',
    };
    if (stomp && stomp.connected) {
      stomp.send(
        "/app/userToAdmin/" + USER_ID,
        { token: TOKEN },
        JSON.stringify(messageRequest)
      );
    }
    setReplyMessage(null);
  };
  const scrollToReply = (id: number) => {
    const item = messages.find((msg) => msg._id === id);
    console.log(item)
    if(chatRef && chatRef.current){
      chatRef.current.scrollToItem({animated: true, item: item, viewPosition: 0.2})
    }
  }
  const renderBubble = (props: any) => {
    const { currentMessage } = props;
    const translateX = new Animated.Value(0);
    const handleGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: translateX } }],
      { useNativeDriver: false }
    );



    const determineContainerStyle = () => {
      if (currentMessage.user._id === USER_ID) {
        return {
          backgroundColor: '#c7e0ff',
        };
      } else {
        return {
          backgroundColor: '#ffffff',
        };
      }
    };

    const handleStateChange = (event: any) => {
      if (event.nativeEvent.state === State.END) {
        if (event.nativeEvent.translationX > 50 || event.nativeEvent.translationX < -50) {
          setReplyMessage(currentMessage);
        }
        Animated.timing(translateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }
    };
    const close = () =>{
      // getCloseChat();
      // BackHandler.exitApp();
      console.log("da an thoat chat")
      return true;
    }
    useFocusEffect(
      React.useCallback(() => {
          // Thêm listener cho sự kiện nhấn nút quay lại
          BackHandler.addEventListener('hardwareBackPress', close );
          // Dọn dẹp listener khi component không còn được hiển thị
          return () => {
              BackHandler.removeEventListener('hardwareBackPress', close);
          };
      }, []) // Mảng phụ thuộc rỗng để chỉ chạy khi component được hiển thị
  );

    return (
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleStateChange}
      >
        <Animated.View style={[{ transform: [{ translateX }] }, determineContainerStyle(), styles.messengerItem]}>
          {currentMessage.replyTo && currentMessage.replyTo.text ? (
            <TouchableOpacity style={[styles.replyBubble]} onPress={() => scrollToReply(currentMessage.replyTo._id)}>
              <Text style={styles.replyUser}>{currentMessage.replyTo.user.name}:</Text>
              <Text style={styles.replyText}>{currentMessage.replyTo.text}</Text>
            </TouchableOpacity>
          ) : null}
          <View style={[styles.bubbleContainer]}>
          {/* , styles.bubbleRight */}
            <Text style={styles.label}>{currentMessage.text}</Text>
          </View>
          
        </Animated.View>
      </PanGestureHandler>
    );
  };

  const renderInputToolbar = (props: any) => (
    <View>
      {replyMessage && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyLabel}>Replying to {replyMessage.user.name}</Text>
          <Text style={styles.replyMessage}>{replyMessage.text}</Text>
          <TouchableOpacity onPress={() => setReplyMessage(null)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      <InputToolbar {...props} />
    </View>
  );

  const onLongPress = (context: any, message: IMessage) => {
    setReplyMessage(message);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: USER_ID,
        }}
        listViewProps={{
          ref: chatRef
        }}
        parsePatterns={(item: any) => [
          {
            type: "url",
            style: {
              textDecorationLine: "none",
              color: '#000000'
            },
            onPress: () => {}
          },
          {
            type: "phone",
            style: {
              color: '#000000'
            },
            onPress: () => {}
          },
          {
            type: "email",
            style: {
              color: '#000000'
            },
            onPress: () => {}
          }
        ]}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderAvatar={() => null}
        showAvatarForEveryMessage={true}
        onLongPress={onLongPress}
        renderTime={() => null}
      />
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({

  //cả cái tin nhắn
  messengerItem: {
    padding: 5,
    borderRadius: 10,
    margin: 2,
  },
  //màn hình
  container: {
    flex: 1,
    backgroundColor: '#eef0f1',
  },

  // reply
  replyContainer: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  replyLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  replyMessage: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cancelButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  cancelButtonText: {
    color: '#ff3b30',
    fontSize: 12,
  },

  //hiển thị ô reply
  replyBubble: {
    padding: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#0078fe',
    marginEnd: 1,
    marginStart: 2,
    marginTop: 2,
    marginBottom: 3,
  },
  replyUser: { // tên user reply
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
    fontSize: 12,
  },
  replyText: { // nội dung reply
    fontSize: 9,
    color: '#333',
  },

  //Tin nhắn
  bubbleContainer: {
    borderRadius: 10,
    paddingVertical: 2,
    paddingEnd: 5,
    position: 'relative',
    alignSelf: 'flex-start',
  },

  label: { //nội dung tin nhắn
    color: '#000',
    marginBottom: 2,
  },
});

export default ChatScreen;