import React, { useContext, useState } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import styles from "./style";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { randomRoomCode } from "../../hooks/randomCode";
import { addDocument } from "../../hooks/services";
import { AppContext } from "../../Context/AppUser";
const CreateRoom = ({ navigation }) => {
  const {
    user: { uid },
  } = useContext(AppContext);
  const roomCode = randomRoomCode();
  const [imageUpload, setImageUpload] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result?.canceled) {
      setImageUpload(result.assets[0].uri);
    }
  };
  const handleCreateRoom = async () => {
    try {
      setIsLoading(true);
      const fileName = imageUpload.substring(imageUpload.lastIndexOf("/") + 1);
      const storageRef = storage().ref(fileName);
      await storageRef.putFile(imageUpload);
      const url = await storage().ref(fileName).getDownloadURL();
      await addDocument("rooms", {
        createdAt: firestore.FieldValue.serverTimestamp(),
        roomCode: roomCode,
        roomName: roomName,
        photoURL: url,
        members: [uid],
      });
      Alert.alert("Thông báo", "Đã tạo nhóm", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.log("Create rooms error", error);
      Alert.alert("Thông báo", "Tạo nhóm thất bại");
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ alignItems: "center" }}
      >
        <TouchableOpacity style={styles.showImage} onPress={pickImage}>
          {imageUpload && (
            <Image
              source={{ uri: imageUpload }}
              style={styles.ImageRoom}
              resizeMode="cover"
            />
          )}
          {imageUpload ? (
            <></>
          ) : (
            <Text style={styles.textShowImage}>Chọn ảnh nhóm của bạn</Text>
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Vui lòng nhập tên nhóm của bạn"
          style={styles.roomNameInput}
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
        />
        {isLoading ? (
          <ActivityIndicator color="gray" />
        ) : (
          <TouchableOpacity
            style={[
              styles.btnCreateRoom,
              ,
              {
                backgroundColor:
                  imageUpload && roomName ? "#0E8388" : "#CBE4DE",
              },
            ]}
            disabled={!(imageUpload && roomName)}
            onPress={handleCreateRoom}
          >
            <Text style={styles.textBtn}>Tạo nhóm</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateRoom;
