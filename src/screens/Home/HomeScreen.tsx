import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import { scale, verticalScale } from "react-native-size-matters";
import { verify } from "jsonwebtoken";

const { width, height } = Dimensions.get("screen");

const DashboardScreen = ({ navigation }: { navigation: any }) => {

  const [numbers] = useState(Array.from({ length: 30 }, (_, i) => i + 1))



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white",padding:10 }}>
      <View className="flex-row justify-between">
        <View style={{ width: scale(42), height: verticalScale(42) }} className="rounded-xl overflow-hidden">
          <Image source={require("../../../assets/pipyrit/shahriar.jpeg")} style={{ width: "100%", height: "100%" }} />
        </View>
        <View className="flex-row items-center gap-1 border rounded-md p-2 border-[#0000001A]">
          <Image source={require("../../../assets/pipyrit/globe.png")} style={{ width: 24, height: 24 }} />
          <Text>English</Text>
        </View>
      </View>

      <Text className="mt-4 font-robotoBold text-2xl text-[#305FA1]">My Cases</Text>
      <View style={{width:scale(400),height:verticalScale(286)}}>
        <Image source={require("../../../assets/pipyrit/homeimage.png")} style={{width:"100%",height:"100%"}}/>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
