import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "src/routes/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "src/routes/AuthStack";
import { useFonts } from "expo-font";
import { useAppSelector } from "src/redux/hooks";

const MainLayout = () => {
  // const token = useAppSelector((state) => state.auth.user?.access_token);
  const token = useAppSelector((state)=>state.auth.token);
  // const token = 0;

  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
    'DMSans-Bold':require('../../../assets/fonts/DMSans-Bold.ttf'),
    'interBold':require('../../../assets/fonts/Inter_18pt-Bold.ttf'),
    'urbanist-Bold':require('../../../assets/fonts/Urbanist-Bold.ttf'),
    'urbanist-Regular':require('../../../assets/fonts/Urbanist-Regular.ttf')
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        {token ? (
          <StackNavigation  />
        ) : (
          <AuthStack />
        )}
      </View>
    </NavigationContainer>
  );
};

export default MainLayout;
