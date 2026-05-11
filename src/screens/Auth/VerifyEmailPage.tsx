import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect } from 'react'
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from 'src/components/shared/Button';

const VerifyEmailPage = () => {
  const navigation = useNavigation();
  const route  = useRoute()
  const {verifyEmail}=route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Verify your email",
      headerStyle: {
        backgroundColor: "white",
        elevation: 0, // for Android
        shadowOpacity: 0, // for iOS
        borderBottomWidth: 0, // for iOS
      },
      headerTintColor: "#305FA1",
      headerTitleAlign: "center",


      headerLeft: () => (
        <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
          <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
            <Ionicons name="arrow-back-sharp" size={24} color="#2F2F36" />
          </View>
        </TouchableOpacity>
      )

    });
  }, [navigation]);
  const { width, height } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  const handleVerify = () => {
    navigation.navigate("OTP Screen" as never,{verifyEmail})
  }

  return (
    <View className='flex-1 bg-white'>
      <View className='flex-1 items-center justify-start mt-5 p-3'>
        <View className='items-center gap-2 mb-10'>
          <View style={{ width: width * 0.2, height: height * 0.1 }} className=' rounded-full'>
            <Image source={require("../../../assets/pipyrit/Message_open_duotone.png")} style={{ width: "100%", height: "100%" }} resizeMode='contain' />
          </View>
          <Text className='font-robotoBold text-xl'>Check Email</Text>
          <Text className='text-center text-gray-500'>{"Please check your email to verify your account."}</Text>
        </View>

        <Button
          title={"Confirm Now"}
          colors={["#1C75AD", "#083D70"]}
          labelSize={14}
          labelFont={'roboto-Bold'}
          labelColor={'white'}
          onPress={handleVerify}
        />
      </View>
    </View>
  )
}

export default VerifyEmailPage