import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Rooms from "../Rooms";
import Profile from "../Profile";
const Tab = createBottomTabNavigator();
const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Rooms"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          borderTopWidth: 0,
          shadowColor: "gray",
        },
      }}
    >
      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={{
          title: "",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icon/message.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icon/user.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
