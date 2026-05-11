import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import Button from 'src/components/shared/Button';

const VerificationPage = () => {
  const { width } = useWindowDimensions()
  const navigation = useNavigation();
  const route = useRoute()
  const {email}=route?.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Account",
      headerTintColor: "#305FA1",
      headerTitleStyle: {
        fontFamily: 'opens-sans',
        fontWeight: 'bold'
      },
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        shadowOpacity: 0,
        backgroundColor: 'white'
      },
      headerLeft: () => (
        <TouchableOpacity className="bg-[#1D35571A] p-1 m-1 rounded-full justify-center items-center">
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const handleVerify=()=>{
    navigation.navigate("Sign OTP",{verifyEmail:email})
  }

  return (
    <View className='flex-1 bg-white p-3'>

      <View className='border border-[#CACACA] rounded-lg p-5 flex-row items-center gap-5 mb-5'>
        <View style={{ width: 80, height: 80, borderRadius: 100, overflow: 'hidden', alignItems: "center", justifyContent: "center", backgroundColor: "#1D35571A" }}>
          <Ionicons name="mail" size={24} color="#1A85EA" />
        </View>

        <View>
          <Text className='text-[#4D4D55] text-sm'>via Email:</Text>
          <Text className='text-[#2F2F36] text-xl mt-2 mb-2'>{email}</Text>
        </View>
      </View>

       <Button
        title={"Continue"}
        colors={["#1C75AD", "#083D70"]}
        labelSize={14}
        labelFont={'roboto-Bold'}
        labelColor={'white'}
        onPress={handleVerify}
      />
    </View>
  )
}

export default VerificationPage