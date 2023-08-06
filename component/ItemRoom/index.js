import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useMemo } from "react";
import useFirestore from "../../hooks/useFirestore";
import { formatDate } from "../../hooks/formatDate";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
export const ItemRoom = ({ roomName, photoURL, roomCode }) => {
  const navigation = useNavigation();
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
      sort: "desc",
    };
  }, []);
  const lastMessage = useFirestore(
    "messages",
    conditionMessage,
    sortOderMessage,
    true
  );
  return (
    <TouchableOpacity
      style={styles.itemRoom}
      onPress={() =>
        navigation.navigate("Chat", {
          roomCode: roomCode,
          photoURL: photoURL,
          roomName: roomName,
        })
      }
    >
      <Image
        source={{ uri: `${photoURL}` }}
        resizeMode="cover"
        style={styles.imgRoom}
      />
      <View style={styles.titleRoom} numberOfLines={1}>
        <Text numberOfLines={1} style={styles.nameRoom}>
          {roomName}
        </Text>
        {!lastMessage ? (
          <></>
        ) : lastMessage.length === 0 ? (
          <></>
        ) : (
          <View style={styles.message}>
            <Text numberOfLines={1} style={styles.currentMessage}>
              {lastMessage[0]?.displayName}:
              <Text style={styles.textMessage} numberOfLines={1}>
                {lastMessage[0]?.text}
              </Text>
            </Text>
            <Text style={styles.timeSend}>
              {formatDate(lastMessage[0]?.createdAt?.seconds)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
