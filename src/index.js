import { useContext } from "react";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./core/context/auth-context";
import { ProductProvider } from "./core/context/product-context";
import { LoginScreen } from "./screens/login/login-screen";
import { SignInScreen } from "./screens/login/sign-in-screen";
import { SignUpScreen } from "./screens/login/sign-up-screen";
import { BottomTabs } from "./routes/tabs/index";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isUserLogin } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isUserLogin ? (
          <Stack.Screen name="HomeTabs" component={BottomTabs} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  useFonts({
    "Gilroy-Regular": require("./assets/font/Gilroy-Regular.ttf"),
    "Gilroy-Medium": require("./assets/font/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("./assets/font/Gilroy-Bold.ttf"),
    "Gilroy-SemiBold": require("./assets/font/Gilroy-SemiBold.ttf"),
  });

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "Gilroy-Regular" };

  return (
    <AuthProvider>
      <ProductProvider>
        <AppNavigator />
      </ProductProvider>
    </AuthProvider>
  );
}
