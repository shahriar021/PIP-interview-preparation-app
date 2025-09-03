import { View, Text, useWindowDimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SignUpUser = ({ isSignIn, setIsSignIn, handleVerify, setRoleOff, roleOff, setIsUser,isUser }: any) => {
  const { height, width } = useWindowDimensions();
  return (
    <ScrollView className="mt-4 flex-1 w-full ">
      <Text className="font-robotoBold text-2xl text-left mb-2">Create New Account</Text>
      <Text className="mb-2">Please fill your detail information</Text>
      {/*  */}

      <View className="flex-row gap-2 relative items-center  bg-white p-5 border rounded-3xl border-gray-200 mt-3">
        <View className='absolute -top-2 left-1/2 -translate-x-1/2 '>
          <Text className='text-black  text-center  bg-white px-3'>Sign Up as</Text>
        </View>
        <TouchableOpacity className={`flex-1 ${isUser=="user"?"bg-[#B42315]":"bg-white"}  items-center p-3 border-red-500 rounded-lg`} onPress={() => {
          setIsUser("user")
          setRoleOff(false)
        }}>
          <Text className={`font-robotoRegular text-xl ${isUser=='user'?"text-white":"text-red-500"}`}>User</Text>
        </TouchableOpacity >
        <TouchableOpacity className={`flex-1 ${isUser=="rider"?"bg-[#B42315]":"bg-white"} items-center p-3 border border-red-500 rounded-lg`} onPress={() => {
          setIsUser("rider")
          setRoleOff(false)
        }}>
          <Text className={`font-robotoRegular text-xl  ${isUser=='rider'?"text-white":"text-red-500"}`}>Rider</Text>
        </TouchableOpacity>
      </View>
      {/*  */}

      <Text className="mt-1 mb-1">Name</Text>
      <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />
      <Text className="mt-1 mb-1">Email</Text>
      <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />
      <Text className="mt-1 mb-1">Mobile Number</Text>
      <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />

      <Text className="mt-1 mb-1">Password</Text>
      <View className="flex-row border border-gray-300 rounded-xl items-center px-3">
        <TextInput className="flex-1 py-3" /><Feather name="eye-off" size={24} color="gray" />
      </View>


      <View className="items-center">
        <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} onPress={handleVerify}>
          <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
            <Text className="text-white p-3 ">Verify Email</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center mt-4 gap-2 justify-center"><Text className="text-center ">Already have an account?</Text>

        <TouchableOpacity onPress={() => setIsSignIn(true)}><Text className="text-[#B42315]">Log In</Text>

        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUpUser