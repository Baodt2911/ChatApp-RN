import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import CLOSE from "../../assets/icon/close.png";
import * as Clipboard from "expo-clipboard";
const Invite = ({ roomCode, handleCloseInvite, isVisible }) => {
  const [textBtn, setTextBtn] = useState("Sao chép");
  const handleCopy = async () => {
    setTextBtn("Đã sao chép");
    await Clipboard.setStringAsync(
      `${roomCode}:Nhập mã mời để vào nhóm của mình nhé`
    );
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleCloseInvite()}
    >
      <View style={styles.container}>
        <View style={styles.main}>
          <Text>Mã mời:</Text>
          <Text style={styles.code}>{roomCode}</Text>
          <TouchableOpacity style={styles.btnCopy} onPress={handleCopy}>
            <Text style={styles.textBtn}>{textBtn}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseInvite}>
            <Image source={CLOSE} resizeMode="contain" style={styles.close} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5cc",
  },
  main: {
    width: "75%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  close: {
    position: "absolute",
    left: 0,
    bottom: 5,
    width: 20,
    height: 20,
  },
  code: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  btnCopy: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  textBtn: {
    fontSize: 12,
  },
});
export default Invite;
