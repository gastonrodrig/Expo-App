import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "../../screens/home/product-list/index";
import ProductFormScreen from "../../screens/home/product-form/index";

const Stack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProductList" 
        component={ProductListScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ProductForm" 
        component={ProductFormScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};
