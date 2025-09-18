import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect } from 'react'
import { Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Button from 'src/components/shared/Button';

const ForgetPassword = () => {

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Forgot Password",
      headerTitleStyle:{
        fontFamily:'open-sans',
      },
      headerStyle: {
        backgroundColor: "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: "#305FA1",
      headerTitleAlign: "center",


      headerLeft: () => (
        <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
          <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </View>
        </TouchableOpacity>
      )

    });
  }, [navigation]);

  const handleForget = () => {
    navigation.navigate("Login OTP" as never)
  }

  return (
    <View className='flex-1 p-3 bg-white'>
      <Text className='mb-4  mt-2 text-center text-black font-bold text-xl'>No worries!</Text>
      <Text className='text-center text-[#4D4D55] font-robotoBold'>
        {"Enter your registered email address or mobile number and we’ll \n send you instructions to reset your password. Let’s get you back \n on track quickly and securely!"}</Text>

      <View className='mt-3'>
        <Text className='text-[#2F2F36] font-robotoBold'>Email Address</Text>

        <View className='flex-row justify-between items-center border border-[#DCDCDC] rounded-[100] p-3 mt-2'>
          <View className='flex-row items-center gap-2  flex-1'>
            <View style={{ width: 42, height: 42, borderRadius: 100, overflow: 'hidden', alignItems: "center", justifyContent: "center",backgroundColor:"#1D35571A" }}>
                <Ionicons name="mail-outline" size={24} color="#1D3557" />
            </View>
            <TextInput placeholder='Enter Your E-Mail' style={{flex:1}}/>
          </View>
          <TouchableOpacity style={{ width: 42, height: 42, borderRadius: 100, overflow: 'hidden', alignItems: "center", justifyContent: "center" }} onPress={()=>navigation.navigate("VerifyEmail")}>
            <LinearGradient colors={["#1C75AD", "#083D70"]} style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default ForgetPassword