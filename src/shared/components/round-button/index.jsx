import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const RoundButton = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
      activeOpacity={0.9}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
    fontFamily: "Gilroy-Regular",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});

export default RoundButton;
