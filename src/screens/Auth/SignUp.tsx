import { View, Text, useWindowDimensions, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from 'src/components/shared/Button';
import { useNavigation } from '@react-navigation/native';

const SignUp = ({ isSignIn, setIsSignIn }: any) => {
  const { height, width } = useWindowDimensions();
   const [isChecked, setIsChecked] = useState(false)
  const navigation = useNavigation()
   useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Account",
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
      headerLeft: null
    })
  }, [navigation])

  const handleVerify=()=>{
    navigation.navigate("Verification Page")
  }
  return (
    <ScrollView className="flex-1 w-full p-3 bg-white">
      <Text className="font-robotoBold text-2xl text-center mb-2 ">Create New Account</Text>
      <Text className="mb-2 text-center">Please fill your detail information</Text>
      {/*  */}


      {/*  */}

      <Text className="mt-1 mb-1">Name</Text>
      <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />
      <Text className="mt-1 mb-1">Email</Text>
      <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />
      <Text className="mt-1 mb-1">Password</Text>
      <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />

      <Text className="mt-1 mb-1">Confirmed Password</Text>
      <View className="flex-row border border-gray-300 rounded-xl items-center px-3 mb-5">
        <TextInput className="flex-1 py-3" /><Feather name="eye-off" size={24} color="gray" />
      </View>

      <View className='mt-1 mb-1 flex-row items-center gap-2'>
                <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                  {isChecked ? (
                    <Image
                      source={require("../../../assets/pipyrit/checkbox.png")}
                      style={{ width: 36, height: 36, resizeMode: 'contain' }}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/restroIcon/checkbox-image-icon-10.jpg")}
                      style={{ width: 36, height: 36, resizeMode: 'contain' }}
                    />
                  )}
                </TouchableOpacity>
      
                <Text className='text-[#5C5C5C]'>
                  I agree to the <Text className='underline'>Terms & Conditions</Text> and{" "}
                  <Text className='underline'>Privacy Policy</Text>
                </Text>
              </View>


      <Button
        title={"Verify Email!"}
        colors={["#1C75AD", "#083D70"]}
        labelSize={14}
        labelFont={'roboto-Bold'}
        labelColor={'white'}
        onPress={handleVerify}
      />
      <View className="flex-row items-center mt-4 gap-2 justify-center"><Text className="text-center ">Already have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text className="text-[#083D70] font-robotoBold">Log In</Text>

        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUp