import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import styles from "./style";
import auth from "@react-native-firebase/auth";
import { AppContext } from "../../Context/AppUser";
const Profile = () => {
  const {
    user: { displayName, photoURL, email },
  } = useContext(AppContext);
  const alertLogout = () => {
    Alert.alert("Thông Báo", "Bạn có muốn đăng xuất không", [
      {
        text: "Không",
        onPress: () => {},
      },
      {
        text: "Đồng ý",
        onPress: () => {
          auth().signOut();
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.imageUser}>
          {photoURL?.length === 1 ? (
            <Text style={styles.imageText}>{photoURL}</Text>
          ) : (
            <Image
              source={{ uri: photoURL }}
              style={styles.imageUser}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.nameUser}>{displayName}</Text>
          <Text style={styles.textEmail}>Email: {email}</Text>
        </View>
        <TouchableOpacity style={styles.btnLogout}>
          <Button title="Đăng xuất" onPress={alertLogout} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
