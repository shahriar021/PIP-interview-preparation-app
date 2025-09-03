import React, { useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Animated,
  View,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={[ "#133D24","#396E4E"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.inner}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Top Image */}
          {/* <Image
            source={require("../../../../assets/image1.png")}
            style={styles.topImage}
            resizeMode="contain"
          /> */}

          {/* Middle Image */}
          {/* <Image
            source={require("../../../../assets/image2.png")}
            style={styles.middleImage}
            resizeMode="contain"
          /> */}

          {/* Bottom Image */}
          {/* <Image
            source={require("../../../../assets/image3.png")}
            style={styles.bottomImage}
            resizeMode="contain"
          /> */}
        </Animated.View>

        
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: responsiveHeight(5),
  },
  topImage: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
  },
  middleImage: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
  },
  bottomImage: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
  },
  title: {
    position: "absolute",
    bottom: responsiveHeight(3),
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    color: "white",
  },
});
