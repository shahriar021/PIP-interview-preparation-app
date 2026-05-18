import { View, Text, TouchableOpacity, Image, Dimensions, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, Octicons } from '@expo/vector-icons'
import Button from 'src/components/shared/Button'
import { useTranslation } from 'react-i18next'
import { useEditProfileMutation, useGetProfileQuery } from 'src/redux/features/profile/profileApi'
import { useAppSelector } from 'src/redux/hooks'
import { useCameraPermission } from 'react-native-vision-camera'
import * as ImagePicker from 'expo-image-picker'

const EditProfile = () => {
    const { width, height } = Dimensions.get("window")
    const navigation = useNavigation()
    const { t } = useTranslation()
    const userId = useAppSelector((state) => state.auth.userID)

    const { data: getProfile }          = useGetProfileQuery(userId)
    const [editProfile, { isLoading }]  = useEditProfileMutation()
    console.log(getProfile,"getProfile")
    // ── Form state ────────────────────────────────────────────────────────────
    const [name, setName]   = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState<string | null>(null)

    // true  = image was picked locally (needs upload)
    // false = image is still the original URL from API (no change)
    const [imageChanged, setImageChanged] = useState(false)

    // ── Vision Camera permission ──────────────────────────────────────────────
    const { hasPermission, requestPermission } = useCameraPermission()

    // ── Populate inputs from API ──────────────────────────────────────────────
    useEffect(() => {
        if (getProfile?.data) {
            setName(getProfile.data.full_name   ?? '')
            setEmail(getProfile.data.email ?? '')
            if (getProfile.data.profile_picture) {
                setImage(getProfile.data.profile_picture)
            }
        }
    }, [getProfile])

    // ── Header ────────────────────────────────────────────────────────────────
    useLayoutEffect(() => {
        navigation.setOptions({
            title: t('editProfileDetails'),
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

    // ── Image picker ──────────────────────────────────────────────────────────
    const handleImagePress = () => {
        Alert.alert("Change Profile Photo", "", [
            { text: "Take Photo",             onPress: handleCamera  },
            { text: "Choose from Library",    onPress: handleGallery },
            { text: "Cancel", style: "cancel" },
        ])
    }

    const handleCamera = async () => {
        if (!hasPermission) {
            const granted = await requestPermission()
            if (!granted) {
                Alert.alert("Permission Denied", "Camera access is required.")
                return
            }
        }
        navigation.navigate("CameraScreenPro" as never, {
            onCapture: (uri: string) => {
                setImage(uri)
                setImageChanged(true)
            }
        } as never)
    }

    const handleGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "Gallery access is required.")
            return
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: true,
            aspect: [1, 1],
        })
        if (!result.canceled && result.assets[0]?.uri) {
            setImage(result.assets[0].uri)
            setImageChanged(true)
        }
    }

    // ── Save ──────────────────────────────────────────────────────────────────
    const handleSave = async () => {
        try {
            // Build FormData — required because we may upload an image file
            const formData = new FormData()

            formData.append('full_name', name)
           
            // Only attach image if user picked a new one
            if (imageChanged && image) {
                // Get filename + extension from URI
                const filename  = image.split('/').pop() ?? 'profile.jpg'
                const extension = filename.split('.').pop() ?? 'jpg'
                const mimeType  = `image/${extension === 'jpg' ? 'jpeg' : extension}`

                formData.append('profile_picture', {
                    uri:  image,
                    name: filename,
                    type: mimeType,
                } as any)
            }

            await editProfile({ id: userId, body: formData }).unwrap()

            Alert.alert("Success", "Profile updated successfully.")
            navigation.goBack()

        } catch (err: any) {
            console.error('Edit profile error:', err)
            Alert.alert(
                "Error",
                err?.data?.message ?? "Failed to update profile. Please try again."
            )
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <View className='flex-1 items-center p-3'>

            {/* Profile image */}
            <TouchableOpacity
                onPress={handleImagePress}
                style={{ width: width * 0.3, height: height * 0.15 }}
                className='rounded-full mt-4 relative bg-green-700'
                activeOpacity={0.8}
            >
                <Image
                    source={
                        image
                            ? { uri: image }
                            : require("../../../assets/restroIcon/tikaImg.jpg")
                    }
                    style={{ width: "100%", height: "100%" }}
                    resizeMode='cover'
                    className='rounded-full'
                />
                <View
                    style={{ bottom: 0, right: 3 }}
                    className='absolute z-10 bg-[#fff] p-2 rounded-full border items-center justify-center border-gray-300'
                >
                    <Octicons name="pencil" size={24} color="gray" />
                </View>
            </TouchableOpacity>

            {/* Name */}
            <Text className='font-robotoBold text-xl text-[#33363F] text-start w-full mt-4'>{t('name')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput
                    className='flex-1 p-2'
                    value={name}
                    onChangeText={setName}
                    placeholder={t('name')}
                />
            </View>

            {/* Email */}
            <Text className='font-robotoBold text-xl text-[#33363F] text-start w-full'>{t('email')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput
                    className='flex-1 p-2'
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t('email')}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
            </View>

            {/* Save button — shows spinner while loading */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#1C75AD" style={{ marginTop: 20 }} />
            ) : (
                <Button
                    title={t("saveChanges")}
                    colors={["#1C75AD", "#083D70"]}
                    labelSize={14}
                    labelFont={'roboto-Bold'}
                    labelColor={'white'}
                    onPress={handleSave}
                />
            )}

        </View>
    )
}

export default EditProfile