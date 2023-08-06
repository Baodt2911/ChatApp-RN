import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../component/Welcome";
import Login from "../component/Login";
import Home from "../component/Home";
import ShowMember from "../component/ShowMember";
import CreateRoom from "../component/CreateRoom";
import Chat from "../component/Chat";
import { useFonts } from "expo-font";
import Register from "../component/Register";
import { AppUser } from "../Context/AppUser";
import ChooseAvatar from "../component/Choose_Avatar";

const Stack = createNativeStackNavigator();
const App = () => {
  const [loaded] = useFonts({
    "SairaCondensed-Medium": require("../assets/fonts/SairaCondensed-Medium.ttf"),
    "SairaCondensed-Light": require("../assets/fonts/SairaCondensed-Light.ttf"),
    "SairaCondensed-SemiBold": require("../assets/fonts/SairaCondensed-SemiBold.ttf"),
    "SairaCondensed-Regular": require("../assets/fonts/SairaCondensed-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <AppUser>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ChooseAvatar" component={ChooseAvatar} />
          <Stack.Screen
            name="CreateRoom"
            component={CreateRoom}
            options={{
              headerShown: true,
              headerTitle: "",
              headerStyle: { backgroundColor: "#f5f5f5" },
            }}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen
            name="ShowMember"
            component={ShowMember}
            options={{
              headerShown: true,
              headerTitle: "",
              headerStyle: { backgroundColor: "#f5f5f5" },
            }}
          />
        </Stack.Navigator>
      </AppUser>
    </NavigationContainer>
  );
};
export default App;
