import {  Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Button from 'src/components/shared/Button';

const OTPScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const [otpNumbers, setOtpNumbers] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: any, index: any) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otpNumbers];
      newOtp[index] = text;
      setOtpNumbers(newOtp);

      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: any) => {
    if (e.nativeEvent.key === 'Backspace' && otpNumbers[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otpNumbers.join('');
    navigation.navigate("Reset Password" as never);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "OTP Verification",
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

  return (
    <View className='flex-1 items-center justify-start  bg-white p-3'>
      <Text className='font-robotoBold text-xl mb-5 text-[#4D4D55]'>Verify Your Identity
      </Text>
      <Text className='text-center text-gray-500'>
        {` For your security, verify the code sent to your registered contact. Let’s confirm it’s you!`}
      </Text>

      <View className='flex-row gap-5 mt-3 mb-2'>
        {otpNumbers.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            maxLength={1}
            keyboardType='numeric'
            className='border p-1 rounded-lg border-[#CACACA] text-2xl text-red-600 text-center font-bold'
            style={{ width: width * 0.15, height: height * 0.06 }}
          />
        ))}
      </View>

      <Button
          title={"Confirm"}
          colors={["#1C75AD", "#083D70"]}
          labelSize={14}
          labelFont={'roboto-Bold'}
          labelColor={'white'}
          onPress={handleVerify}
        />

      <Text className='text-gray-500'>
        Resend Code <Text>{" "}53{" "}</Text>s
      </Text>
    </View>
  );
};

export default OTPScreen;
