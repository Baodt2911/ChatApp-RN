import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textTop}>CB | Chat</Text>
        <Text style={styles.textBottom}>
          Chào mừng bạn đến với ứng dụng trò chuyện của chúng tôi!
        </Text>
      </View>
      <Image
        source={require("../../assets/icon/welcome.png")}
        style={styles.imageWelcome}
      />
      <TouchableOpacity
        style={styles.btnStart}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.textStart}>Bắt đầu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;
