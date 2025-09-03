import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { setToken, setUser, setUserType } from "src/redux/features/auth/authSlice";
import { useLoginMutation } from "src/redux/features/auth/authApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import SignUpRider from "./SignUpRider";
import SignUpUser from "./SignUpUser";

const LoginScreen = () => {
  const { height, width } = useWindowDimensions();
  const [isSignIn, setIsSignIn] = useState(true)
  const [isUser, setIsUser] = useState("user")
  const [roleOff, setRoleOff] = useState(true)
  const [postLogin] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [isRemember, setIsRemeber] = useState(false)

  const navigation = useNavigation()

  const dispatch = useDispatch();

  const handleLogin = async () => {
     if (email == "" && password == "") {
      Alert.alert("Please fill up the fields!!")
      return ;
     }

    const normalizedEmail = email.trim().toLowerCase();
    const type = normalizedEmail === "user@gmail.com" ? "user" : "rider";
    dispatch(setToken(true))
    dispatch(setUserType(type))
  };
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  const handleVerify = () => {
    navigation.navigate("VerifyEmail" as never)
  }


  return (
    <SafeAreaView className="flex-1 bg-[#B42315] items-center">

      {/* Your whole view content here */}
      <View style={{ width: width * 0.5, height: height * 0.3 }} className="items-center">
        <Image source={require("../../../assets/tika.png")} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
      </View>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
        borderRadius: 50
      }}>
        <View className="relative flex-1 w-full  rounded-tr-2xl rounded-tl-2xl bg-white items-center p-4">
          <View className=" mt-5 flex-row border border-gray-200 rounded-full overflow-hidden w-full p-1">
            <TouchableOpacity className={`flex-1 rounded-full items-center p-3 ${isSignIn ? "bg-[#C21A1E]" : " bg-white"}`} onPress={() => setIsSignIn(true)}>
              <Text className={`${isSignIn ? "text-white" : "text-red-500"}`}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`flex-1 rounded-full items-center p-3  ${isSignIn ? "bg-white" : " bg-[#C21A1E]"}`} onPress={() => {
              setRoleOff(true)
              setIsSignIn(false)
            }}>
              <Text className={`${isSignIn ? "text-red-500" : "text-white"}`}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {/* sign in */}
          {isSignIn ?
            <View className="mt-4 flex-1 w-full ">
              <Text className="font-robotoBold text-2xl text-left mb-2">Hi, Welcome back!</Text>
              <Text className="mb-2">Sigin in to continue exploring the best deals</Text>

              <Text className="mt-1 mb-1">Email</Text>
              <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" onChangeText={setEmail} />

              <Text className="mt-1 mb-1">Password</Text>
              {/* <View className="flex-row border border-gray-300 rounded-xl items-center px-3">
              <TextInput className="flex-1 py-3" secureTextEntry/>
              <Text><Feather name="eye-off" size={24} color="gray" /></Text>
            </View> */}
              <View className="flex-row border border-gray-300 rounded-xl items-center px-3">
                <TextInput
                  className="flex-1 py-3"
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}

                // add your other props like value, onChangeText here
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <View className="mt-3 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <TouchableOpacity onPress={() => setIsRemeber(!isRemember)}>
                    {!isRemember ? <Entypo name="circle" size={24} color="gray" />
                      : <FontAwesome name="circle" size={24} color="black" />}
                  </TouchableOpacity>
                  <Text>Remember Me</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Forget Password")}>
                  <Text className="text-red-700">Forget Password?</Text>
                </TouchableOpacity>
              </View>

              <View className="items-center">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} onPress={handleLogin}>
                  <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                    <Text className="text-white p-3 ">Sign In</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View className="flex-row mt-3 justify-center gap-3 items-center">
                <View className="h-[1px] flex-1 bg-gray-400" />
                <Text>or</Text>
                <View className="h-[1px] flex-1 bg-gray-400" />
              </View>

              <View className="flex-row items-center justify-center gap-2 mt-3">
                <Image source={require("../../../assets/restroIcon/google.png")} className="w-10 h-10" />
                <Image source={require("../../../assets/restroIcon/apple.png")} className="w-10 h-10" />
              </View>
            </View>
            :
            isUser == "user" ?
              <SignUpUser isUser={isUser} setIsUser={setIsUser} roleOff={roleOff} isSignIn={isSignIn} setIsSignIn={setIsSignIn} handleVerify={handleVerify} setRoleOff={setRoleOff} />
              :
              <SignUpRider isUser={isUser} setIsUser={setIsUser} roleOff={roleOff} isSignIn={isSignIn} setIsSignIn={setIsSignIn} handleVerify={handleVerify} setRoleOff={setRoleOff} />
          }
          {/* role */}
         
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default LoginScreen;







