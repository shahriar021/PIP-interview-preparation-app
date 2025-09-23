import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setToken, setUser, setUserType } from "src/redux/features/auth/authSlice";
import { useLoginMutation } from "src/redux/features/auth/authApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import Button from "src/components/shared/Button";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Log In",
      headerTintColor: "#305FA1",
      headerTitleStyle:{
        fontFamily:'opens-sans',
        fontWeight:'bold'
      },
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        shadowOpacity: 0,
        backgroundColor: 'white'
      },
      headerLeft:null
    })
  }, [navigation])

  const dispatch = useDispatch();

  const handleLogin = async () => {
     if (email == "" && password == "") {
      Alert.alert("Please fill up the fields!!")
      return ;
     }

    dispatch(setToken(true))
  };
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  const handleVerify = () => {
    navigation.navigate("VerifyEmail" as never)
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{}}>
          <View>
            <Text style={{ color: "#33363F", fontSize: 24, fontWeight: "bold" }}>Hi, Welcome back!</Text>
            <Text style={{ color: "#626262", fontSize: 16 }}>Sign in to continue exploring the best deals</Text>
          </View>

          <View className="mt-10">
            <View className="mt-2 mb-2">
              <Text className="font-robotoBold text-[#626262] mb-2">Email</Text>
              <View className="w-full border border-[#CACACA] rounded-xl">
                <TextInput className="flex-1 p-3" placeholder="Your E-mail" onChangeText={setEmail}/>
              </View>
            </View>

            <View className="mt-2 mb-2">
              <Text className="font-robotoBold text-[#626262] mb-2">Password</Text>
              <View className="flex-row items-center px-2 w-full border border-[#CACACA] rounded-xl">
                <TextInput className="flex-1 p-3" placeholder="Your Password" onChangeText={setPassword}/>
                <Feather name="eye" size={24} color="#858585" />
              </View>
            </View>

            <View className="flex-row justify-between mt-2 mb-2">
             <TouchableOpacity className="flex-row items-center gap-2" onPress={()=>setIsRemeber(!isRemember)}>
              {isRemember?<FontAwesome name="circle" size={24} color="gray" />
               :<Entypo name="circle" size={24} color="black" />}
              <Text className="text-[#33363F]">Remember Me</Text>
             </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("Forget Password")}><Text className="text-[#FF503C]">Forget Password ?</Text></TouchableOpacity>
            </View>
            
          </View>
          <Button
            title={"Log In"}
            colors={["#1C75AD", "#083D70"]}
            labelSize={14}
            labelFont={'roboto-Bold'}
            labelColor={'white'}
            onPress={handleLogin}
          />
          <TouchableOpacity className="flex-row justify-center gat-2 mt-2 mb-2" onPress={()=>navigation.navigate("Sign Up")}>
              <Text className="text-[#33363F]">Don’t have an account?</Text>
              <Text className="text-[#1C75AD] font-robotoBold">Sign Up</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};



export default LoginScreen;







