import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AVATAR_MAN from "../../assets/icon/man.png";
import AVATAR_WOMAN from "../../assets/icon/woman.png";
import UPLOAD_ICON from "../../assets/icon/upload_image.png";
import { AppContext } from "../../Context/AppUser";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { addDocument } from "../../hooks/services";
const ChooseAvatar = ({ navigation }) => {
  const {
    user: { displayName, email, uid },
    getTokenDevice,
    setUser,
  } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isAvatarDefault, setIsAvatarDefault] = useState("#fff");
  const [isAvatarMan, setIsAvatarMan] = useState("#fff");
  const [isAvatarWoman, setIsAvatarWoman] = useState("#fff");
  const [isLoading, setIsLoading] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAvatar(result.assets[0].uri);
      setIsAvatarDefault("#fff");
      setIsAvatarMan("#fff");
      setIsAvatarWoman("#fff");
      setIsContinue(true);
    }
  };
  const handleChooseAvatarDefault = () => {
    setAvatar(`${displayName?.charAt(0).toUpperCase()}`);
    setIsAvatarDefault("#0E8388cc");
    setIsAvatarMan("#fff");
    setIsAvatarWoman("#fff");
    setImage(null);
    setIsContinue(true);
  };
  const handleChooseAvatarMan = () => {
    setAvatar(
      `https://firebasestorage.googleapis.com/v0/b/chat-app-db76c.appspot.com/o/man.png?alt=media`
    );
    setIsAvatarMan("#0E8388cc");
    setIsAvatarWoman("#fff");
    setIsAvatarDefault("#fff");
    setImage(null);
    setIsContinue(true);
  };
  const handleChooseAvatarWoman = () => {
    setAvatar(
      `https://firebasestorage.googleapis.com/v0/b/chat-app-db76c.appspot.com/o/woman.png?alt=media`
    );
    setIsAvatarWoman("#0E8388cc");
    setIsAvatarMan("#fff");
    setIsAvatarDefault("#fff");
    setImage(null);
    setIsContinue(true);
  };
  const handleAddDocument = async () => {
    if (isContinue) {
      setIsLoading(true);
      if (avatar.substring(0, 4) === "file") {
        try {
          const fileName = avatar.substring(avatar.lastIndexOf("/") + 1);
          const storageRef = storage().ref(fileName);
          await storageRef.putFile(avatar);
          const url = await storage().ref(fileName).getDownloadURL();
          console.log({ displayName, email, photoURL: url, uid });
          await auth().currentUser.updateProfile({
            photoURL: url,
          });
          await addDocument(
            "users",
            {
              displayName,
              email,
              photoURL: url,
              uid,
            },
            uid
          );
          await getTokenDevice();
          setUser({
            displayName,
            email,
            photoURL: url,
            uid,
          });
          setIsLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } catch (error) {
          console.log("Upload photo error: ", error);
          Alert.alert("Thông báo", "Lỗi khi update ảnh", [
            { text: "OK", onPress: () => {} },
          ]);
          setIsLoading(false);
        }
      } else {
        try {
          await auth().currentUser.updateProfile({
            photoURL: avatar,
          });
          await addDocument(
            "users",
            {
              displayName,
              email,
              photoURL: avatar,
              uid,
            },
            uid
          );
          await getTokenDevice();
          setUser({
            displayName,
            email,
            photoURL: avatar,
            uid,
          });
          setIsLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } catch (error) {
          console.log("Upload photo error: ", error);
          Alert.alert("Thông báo", "Lỗi khi update ảnh", [
            { text: "OK", onPress: () => {} },
          ]);
          setIsLoading(false);
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Vui lòng chọn avatar của bạn</Text>
        <View style={styles.defaultAvatar}>
          <TouchableOpacity
            style={[styles.itemAvatar, { borderColor: isAvatarDefault }]}
            onPress={handleChooseAvatarDefault}
          >
            <Text style={styles.textImage}>
              {displayName?.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChooseAvatarMan}>
            <Image
              style={[styles.itemAvatar, { borderColor: isAvatarMan }]}
              source={AVATAR_MAN}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChooseAvatarWoman}>
            <Image
              style={[styles.itemAvatar, { borderColor: isAvatarWoman }]}
              source={AVATAR_WOMAN}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.textOr}>__OR__</Text>
        <Text style={styles.title_upload_avatar}>Chọn ảnh từ thiết bị</Text>
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={[
              styles.upload,
              { borderColor: image ? "#0E8388cc" : "transparent" },
            ]}
            source={image ? { uri: image } : UPLOAD_ICON}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator color="gray" />
        ) : (
          <TouchableOpacity
            style={[styles.btnContinue, { opacity: isContinue ? 1 : 0.5 }]}
            onPress={handleAddDocument}
            disable={!isContinue}
          >
            <Text style={styles.textbtn}>Tiếp tục</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5e6",
    zIndex: 2,
  },
  main: {
    alignItems: "center",
  },
  itemAvatar: {
    width: 50,
    height: 50,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: "#dadadacc",
    alignItems: "center",
    justifyContent: "center",
  },
  textImage: {
    fontSize: 24,
    fontFamily: "SairaCondensed-SemiBold",
  },
  upload: {
    width: 80,
    height: 80,
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 100,
  },
  defaultAvatar: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    paddingBottom: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "SairaCondensed-SemiBold",
  },
  title_upload_avatar: {
    fontSize: 20,
    fontFamily: "SairaCondensed-SemiBold",
    color: "#333",
    marginBottom: 10,
    marginTop: 15,
  },
  textOr: {
    fontFamily: "SairaCondensed-Regular",
    color: "gray",
  },
  btnContinue: {
    width: 150,
    height: 40,
    backgroundColor: "#0E8388cc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textbtn: {
    fontSize: 18,
    fontFamily: "SairaCondensed-Medium",
    color: "#fff",
  },
});
export default ChooseAvatar;
