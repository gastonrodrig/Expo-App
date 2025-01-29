import { View, Text } from "react-native";
import RoundButton from "../../../shared/components/round-button";

export const SignInScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontFamily: "Gilroy-Bold", marginBottom: 20, width: "100%", textAlign: "center" }}>
        Login
      </Text>

      <RoundButton 
        title="Continue with Email Sign In"
        color="#5383EC"
        onPress={() => navigation.navigate("Login")}
      />

      <RoundButton 
        title="Continue with Email Sign Up"
        color="#53B175"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
};