import { View, Text, useWindowDimensions, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from 'src/components/shared/Button';
import { useNavigation } from '@react-navigation/native';
import { useSignUpMutation } from 'src/redux/features/auth/authApi';

const SignUp = ({ isSignIn, setIsSignIn }: any) => {
  const { height, width } = useWindowDimensions();
  const [isChecked, setIsChecked] = useState(false)
  const [userSignUp, { isLoading }] = useSignUpMutation()
  const navigation = useNavigation()

  // ── Form state ──────────────────────────────────────────────
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
      headerLeft: null
    })
  }, [navigation])

  // ── Validation ───────────────────────────────────────────────
  const validate = (): boolean => {
    if (!fullName.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.')
      return false
    }
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email.')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.')
      return false
    }
    if (!password) {
      Alert.alert('Validation Error', 'Please enter a password.')
      return false
    }
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.')
      return false
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.')
      return false
    }
    if (!isChecked) {
      Alert.alert('Validation Error', 'Please accept the Terms & Conditions and Privacy Policy.')
      return false
    }
    return true
  }

  // ── Submit ───────────────────────────────────────────────────
  const handleVerify = async () => {
    if (!validate()) return

    try {
      const payload = {
        email: email.trim(),
        full_name: fullName.trim(),
        password,
      }

      const result = await userSignUp(payload).unwrap()

      if (result?.success) {
      navigation.navigate("Verification Page", {
        email: result.data.email,
             
      })
    }

    } catch (error: any) {
      console.log(error,"error")
      const message =
        error?.data?.message ||
        error?.data?.detail ||
        'Something went wrong. Please try again.'
      Alert.alert('Sign Up Failed', message)
    }
  }

  return (
    <ScrollView className="flex-1 w-full p-3 bg-white">
      <Text className="font-robotoBold text-2xl text-center mb-2 ">Create New Account</Text>
      <Text className="mb-2 text-center">Please fill your detail information</Text>

      <Text className="mt-1 mb-1">Name</Text>
      <TextInput
        className="border rounded-xl mt-1 border-gray-300 mb-1 p-3"
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
      />

      <Text className="mt-1 mb-1">Email</Text>
      <TextInput
        className="border rounded-xl mt-1 border-gray-300 mb-1 p-3"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text className="mt-1 mb-1">Password</Text>
      <TextInput
        className="border rounded-xl mt-1 border-gray-300 mb-1 p-3"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Text className="mt-1 mb-1">Confirmed Password</Text>
      <View className="flex-row border border-gray-300 rounded-xl items-center px-3 mb-5">
        <TextInput
          className="flex-1 py-3"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter your password"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
        </TouchableOpacity>
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
        title={isLoading ? "Please wait..." : "Verify Email!"}
        colors={["#1C75AD", "#083D70"]}
        labelSize={14}
        labelFont={'roboto-Bold'}
        labelColor={'white'}
        onPress={handleVerify}
        disabled={isLoading}
      />

      <View className="flex-row items-center mt-4 gap-2 justify-center">
        <Text className="text-center ">Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-[#083D70] font-robotoBold">Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUp