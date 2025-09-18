import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions, TextInput } from 'react-native'
import Button from 'src/components/shared/Button';

const ResetPassword = () => {
    const { width, height } = useWindowDimensions();

    const navigation = useNavigation()

    useLayoutEffect(() => {
    navigation.setOptions({
      title: "Reset Password",
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

    const [fontsLoaded] = useFonts({
        'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
    });

    if (!fontsLoaded) return null;

    const handleVerify = () => {
        navigation.navigate("Login")
    };

    return (
        <View className='flex-1 items-center bg-white p-3'>
            <Text className='text-center mt-2 text-xl text-[#4D4D55] font-robotoBold mb-3'>Set Your New Password</Text>
            <Text className='text-center text-gray-700'>
                Create a new password to secure your account.</Text>

            <View className=' mb-3' >
                <Text className='mb-2 mt-3 text-gray-700'>Enter new password</Text>
                <View className=' w-full flex-row border border-gray-500  rounded-xl items-center p-2'>
                    <TextInput className='flex-1 ' />
                    <Text><Feather name="eye-off" size={24} color="gray" /></Text>
                </View>
                <Text className='mb-2 mt-3 text-gray-700'>Confirm password</Text>
                <View className=' w-full flex-row border border-gray-500  rounded-xl items-center p-2'>
                    <TextInput className='flex-1 ' />
                    <Text><Feather name="eye-off" size={24} color="gray" /></Text>
                </View>
            </View>
            <Button
                title={"Update Password"}
                colors={["#1C75AD", "#083D70"]}
                labelSize={14}
                labelFont={'roboto-Bold'}
                labelColor={'white'}
                onPress={handleVerify}
            />
        </View>
    )
}

export default ResetPassword;