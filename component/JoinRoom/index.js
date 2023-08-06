import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import styles from "./style";
import CLOSE from "../../assets/icon/close.png";
import { AppContext } from "../../Context/AppUser";
import useFirestore from "../../hooks/useFirestore";
import firestore from "@react-native-firebase/firestore";
const JoinRoom = ({ isVisible, handleCloseJoinRoom }) => {
  const {
    user: { uid },
  } = useContext(AppContext);
  const [roomCode, setRoomCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const conditionGetRoom = useMemo(() => {
    return {
      fieldName: "roomCode",
      operator: "==",
      value: roomCode.toUpperCase(),
    };
  }, [roomCode]);
  const getRoom = useFirestore("rooms", conditionGetRoom, true, false);
  const handleJoinRoom = async () => {
    if (roomCode.length < 6 || roomCode.length > 6) {
      return;
    }
    setIsLoading(true);
    const ref = firestore().collection("rooms").doc(getRoom[0].id);
    try {
      await ref.update({
        members: firestore.FieldValue.arrayUnion(uid),
      });
      setIsLoading(false);
      setRoomCode("");
      Alert.alert("Thông báo", "Đã vào phòng", [
        { text: "OK", onPress: handleCloseJoinRoom },
      ]);
    } catch (error) {
      setIsLoading(false);
      setRoomCode("");
      console.log("Join room error:", error);
      Alert.alert("Thông báo", "Vui lòng kiểm tra lại mã mời");
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleCloseJoinRoom()}
    >
      <View style={styles.container}>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => {
              setRoomCode("");
              handleCloseJoinRoom();
            }}
          >
            <Image source={CLOSE} resizeMode="contain" style={styles.close} />
          </TouchableOpacity>
          <Text style={styles.title}>Nhập mã nhóm</Text>
          <TextInput
            style={styles.inputCode}
            placeholder="VD:HGTEAO"
            value={roomCode}
            onChangeText={(text) => setRoomCode(text)}
            maxLength={6}
          />
          {isLoading ? (
            <ActivityIndicator color="gray" />
          ) : (
            <TouchableOpacity
              style={styles.btnJoinRoom}
              onPress={handleJoinRoom}
            >
              <Text style={styles.textBtn}>Vào nhóm</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default JoinRoom;
