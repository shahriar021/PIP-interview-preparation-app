import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import Button from 'src/components/shared/Button'
import { useChangePassMutation } from 'src/redux/features/profile/profileApi'

const ChangePassword = () => {
    const navigation = useNavigation()
    const { t } = useTranslation()

    // ── API ───────────────────────────────────────────────────────────────────
    const [changePass, { isLoading }] = useChangePassMutation()

    // ── Form state ────────────────────────────────────────────────────────────
    const [oldPassword,     setOldPassword]     = useState('')
    const [newPassword,     setNewPassword]     = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // ── Show/hide toggles ─────────────────────────────────────────────────────
    const [showOld,     setShowOld]     = useState(false)
    const [showNew,     setShowNew]     = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    // ── Header ────────────────────────────────────────────────────────────────
    useLayoutEffect(() => {
        navigation.setOptions({
            title: t("changePassword"),
            headerTitleStyle: { fontFamily: 'open-sans' },
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTintColor: "#305FA1",
            headerTitleAlign: "left",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.navigate("BottomScreen", { screen: "Profile" })}>
                    <View className='w-[35px] h-[35px] bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            ),
        })
    }, [navigation])

    // ── Submit ────────────────────────────────────────────────────────────────
    const handleCreate = async () => {

        // Basic validation before hitting API
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert("Error", "All fields are required.")
            return
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New password and confirm password do not match.")
            return
        }
        if (newPassword.length < 1) {
            Alert.alert("Error", "Password is too short.")
            return
        }

        try {
            await changePass({
                old_password:     oldPassword,
                new_password:     newPassword,
                confirm_password: confirmPassword,
            }).unwrap()

            Alert.alert("Success", "Password changed successfully.")
            navigation.goBack()

        } catch (err: any) {
            Alert.alert(
                "Error",
                err?.data?.message ?? err?.data?.old_password?.[0] ?? "Failed to change password."
            )
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <View className='p-4'>

            {/* Current password */}
            <Text className='font-robotoBold text-xl text-[#33363F]'>{t('currentPassword')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-4 p-1'>
                <TextInput
                    className='flex-1 p-2'
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    secureTextEntry={!showOld}
                    placeholder={t('currentPassword')}
                    autoCapitalize='none'
                />
                <TouchableOpacity onPress={() => setShowOld(!showOld)} className='p-2'>
                    <Feather name={showOld ? "eye" : "eye-off"} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {/* New password */}
            <Text className='font-robotoBold text-xl text-[#33363F]'>{t('newPassword')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-4 p-1'>
                <TextInput
                    className='flex-1 p-2'
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNew}
                    placeholder={t('newPassword')}
                    autoCapitalize='none'
                />
                <TouchableOpacity onPress={() => setShowNew(!showNew)} className='p-2'>
                    <Feather name={showNew ? "eye" : "eye-off"} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Confirm new password */}
            <Text className='font-robotoBold text-xl text-[#33363F]'>{t('confirmNewPassword')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-6 p-1'>
                <TextInput
                    className='flex-1 p-2'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirm}
                    placeholder={t('confirmNewPassword')}
                    autoCapitalize='none'
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} className='p-2'>
                    <Feather name={showConfirm ? "eye" : "eye-off"} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#1C75AD" />
            ) : (
                <Button
                    title={t('changePassword')}
                    colors={["#1C75AD", "#083D70"]}
                    labelSize={14}
                    labelFont={'roboto-Bold'}
                    labelColor={'white'}
                    onPress={handleCreate}
                />
            )}

        </View>
    )
}

export default ChangePassword