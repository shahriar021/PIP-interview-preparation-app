import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect, useState } from 'react'
import { Alert, View, Text, TouchableOpacity, useWindowDimensions, TextInput, ActivityIndicator } from 'react-native'
import Button from 'src/components/shared/Button';
import { useResetPassMutation } from 'src/redux/features/auth/authApi';

const ResetPassword = () => {
    const { width, height } = useWindowDimensions();

    const navigation = useNavigation()
    const [resetPass] = useResetPassMutation()
    const route = useRoute()
      const {verifyEmail}=route.params
    
    // ── State ────────────────────────────────────────────────
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading,setLoading]=useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Reset Password",
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
                    <View className='w-[35px] h-[35px] bg-[#1D35571A] items-center justify-center rounded-full'>
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

    // ── Submit ───────────────────────────────────────────────
    const handleVerify = async () => {
        setLoading(true)
    if (!newPassword || !confirmPassword) {
        Alert.alert('Validation', 'Please fill in both fields.')
        return
    }
    if (newPassword !== confirmPassword) {
        Alert.alert('Validation', 'Passwords do not match.')
        return
    }
    if (newPassword.length < 6) {
        Alert.alert('Validation', 'Password must be at least 6 characters.')
        return
    }

    try {
        const formData = new FormData()
       formData.append('email', verifyEmail)
        formData.append('confirm_password', confirmPassword)

        const result = await resetPass(formData).unwrap()
        console.log(result,"reset pass")

        if (result?.success) {
            navigation.navigate("Login" as never)
        }

    } catch (error: any) {
        console.log(error?.data, "error")
        const message =
            error?.data?.message ||
            error?.data?.detail ||
            'Something went wrong. Please try again.'
        Alert.alert('Failed', message)
    }finally{
        setLoading(false)
    }
}

    return (
        <View className='flex-1 items-center bg-white p-3'>
            <Text className='text-center mt-2 text-xl text-[#4D4D55] font-robotoBold mb-3'>Set Your New Password</Text>
            <Text className='text-center text-gray-700'>
                Create a new password to secure your account.</Text>

            <View className=' mb-3' >
                <Text className='mb-2 mt-3 text-gray-700'>Enter new password</Text>
                <View className=' w-full flex-row border border-gray-500 rounded-xl items-center p-2'>
                    <TextInput
                        className='flex-1'
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={!showNew}
                    />
                    <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                        <Feather name={showNew ? "eye" : "eye-off"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                <Text className='mb-2 mt-3 text-gray-700'>Confirm password</Text>
                <View className=' w-full flex-row border border-gray-500 rounded-xl items-center p-2'>
                    <TextInput
                        className='flex-1'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirm}
                    />
                    <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                        <Feather name={showConfirm ? "eye" : "eye-off"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>

            <Button
                title={loading?<ActivityIndicator/>:"Update Password"}
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