import React, { useContext, useMemo, useState, useCallback } from "react";
import {
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScreenHeaderChatRight,
  ScreenHeaderChatLeft,
  MessageMember,
  MessageUser,
} from "../../assets/theme";
import styles from "./style";
import SEND from "../../assets/icon/send-message.png";
import firestore from "@react-native-firebase/firestore";
import useFirestore from "../../hooks/useFirestore";
import { AppContext } from "../../Context/AppUser";
import { addDocument } from "../../hooks/services";
import Invite from "../Invite";
const ChatTextInput = ({ roomCode, roomName, user }) => {
  const [textMessage, SetTextMessage] = useState("");
  const [textPlaceholder, setTextPlaceHolder] = useState("Aa");
  const [inputHeight, setInputHeight] = useState(40);
  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setInputHeight(height);
  };
  const customFocusPlaceholder = () => {
    setTextPlaceHolder("Nhập tin nhắn");
  };
  const customBlurPlaceholder = () => {
    setTextPlaceHolder("Aa");
  };
  const handleSendMessage = async () => {
    try {
      if (textMessage) {
        await addDocument("messages", {
          createdAt: firestore.FieldValue.serverTimestamp(),
          displayName: user.displayName,
          photoURL: user.photoURL,
          roomCode: roomCode,
          text: textMessage,
          uid: user.uid,
        });
        await fetch("http://localhost:3000/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomCode,
            notification: {
              title: roomName,
              body: textMessage,
            },
          }),
        });
        SetTextMessage("");
      }
    } catch (error) {
      console.log("Send message error:", error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        styles.messageInput,
        { alignItems: inputHeight > 60 ? "flex-end" : "center" },
      ]}
    >
      <View style={styles.textInputMessage} onLayout={handleLayout}>
        <TextInput
          placeholder={textPlaceholder}
          multiline
          onChangeText={(text) => SetTextMessage(text)}
          value={textMessage}
          onFocus={customFocusPlaceholder}
          onBlur={customBlurPlaceholder}
        />
      </View>
      <TouchableOpacity style={{ height: 40 }} onPress={handleSendMessage}>
        <Image source={SEND} style={styles.iconSend} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
const RenderMessage = ({ conditionMessage, sortOderMessage, user }) => {
  const dataMessage = useFirestore(
    "messages",
    conditionMessage,
    sortOderMessage,
    false
  );
  const renderItem = useCallback(
    ({ item }) => {
      if (item.uid == user.uid) {
        return (
          <MessageUser text={item.text} timeSend={item.createdAt?.seconds} />
        );
      }
      return (
        <MessageMember
          text={item.text}
          displayName={item.displayName}
          photoURL={item?.photoURL}
          timeSend={item.createdAt?.seconds}
        />
      );
    },
    [user.uid]
  );
  return (
    <View>
      {!dataMessage ? (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "SairaCondensed-SemiBold",
            opacity: 0.5,
            textAlign: "center",
          }}
        >
          Loading...
        </Text>
      ) : dataMessage.length === 0 ? (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "SairaCondensed-SemiBold",
              opacity: 0.5,
            }}
          >
            Chưa có tin nhắn nào
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.mainChat}
          inverted
          data={[...dataMessage].reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
const Chat = ({ route, navigation }) => {
  const { roomCode, photoURL, roomName } = route.params;
  const { user } = useContext(AppContext);
  const [showInvite, setShowInvite] = useState(false);
  const conditionMessage = useMemo(() => {
    return {
      fieldName: "roomCode",
      operator: "==",
      value: roomCode,
    };
  }, [roomCode]);
  const sortOderMessage = useMemo(() => {
    return {
      fieldValue: "createdAt",
      sort: "asc",
    };
  }, []);
  const members = useFirestore("rooms", conditionMessage, true, false);
  return (
    <SafeAreaView style={styles.container}>
      <Invite
        isVisible={showInvite}
        roomCode={roomCode}
        handleCloseInvite={() => setShowInvite(false)}
      />
      <View style={styles.header}>
        <ScreenHeaderChatLeft
          handleBack={() => navigation.goBack()}
          roomName={`${roomName}`}
          photoURL={{ uri: `${photoURL}` }}
        />
        <ScreenHeaderChatRight
          handleOpenInvite={() => setShowInvite(true)}
          handleShowMember={() =>
            navigation.navigate("ShowMember", { members: members[0].members })
          }
        />
      </View>
      <View style={styles.chat}>
        <RenderMessage
          conditionMessage={conditionMessage}
          sortOderMessage={sortOderMessage}
          user={user}
        />
      </View>
      <ChatTextInput roomCode={roomCode} user={user} roomName={roomName} />
    </SafeAreaView>
  );
};

export default Chat;
