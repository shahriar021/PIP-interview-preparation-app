import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Platform, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import Button from 'src/components/shared/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { usePostAllCaseMutation } from 'src/redux/features/case/caseApi';
import { useCameraPermission } from 'react-native-vision-camera';

const CaseDetailsCreate = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { id } = route.params as { id: number }

    const [postAllCase, { isLoading }] = usePostAllCaseMutation()

    // Form state
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('')
    const [lastUpdate, setLastUpdate] = useState(new Date())
    const [reminderDate, setReminderDate] = useState(new Date())
    const [reminderNote, setReminderNote] = useState('')
    const [notes, setNotes] = useState('')
    const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null)
     const { hasPermission, requestPermission } = useCameraPermission()

    // Date picker visibility
    const [showLastUpdatePicker, setShowLastUpdatePicker] = useState(false)
    const [showReminderPicker, setShowReminderPicker] = useState(false)

    const formatDate = (date: Date) => date.toISOString().split('T')[0]
    const formatDisplay = (date: Date) =>
        date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })

    // const pickImage = async () => {
    //     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    //     if (!permission.granted) {
    //         Alert.alert("Permission required", "Please allow access to your gallery.")
    //         return
    //     }
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         quality: 1,
    //     })
    //     if (!result.canceled) setPhoto(result.assets[0])
    // }
   const handleDocumentPress = () => {
    Alert.alert("Add Document", "", [
        { text: "Open Camera", onPress: handleCamera },
        { text: "Cancel", style: "cancel" },
    ])
}

    const handleCamera = async () => {
    if (hasPermission !== true) {
        const granted = await requestPermission()

        if (!granted) {
            Alert.alert("Permission Denied", "Camera access is required.")
            return
        }
    }

    navigation.navigate("CameraScreenPro" as never, {
        onCapture: (uri: string) => {
            setPhoto({
                uri,
                fileName: `doc_${Date.now()}.jpg`,
                mimeType: 'image/jpeg',
            })
        }
    } as never)
}

    const handleCreate = async () => {
        if (!title) return Alert.alert("Error", "Case title is required.")
        if (!status) return Alert.alert("Error", "Status is required.")

        try {
            const formData = new FormData()

            formData.append('case_type', String(id))
            formData.append('case_type_details', JSON.stringify({ name: '' }))
            formData.append('case_number', '')
            formData.append('title', title)
            formData.append('status', status)
            formData.append('last_update', formatDate(lastUpdate))
            formData.append('reminder_date', formatDate(reminderDate))
            formData.append('reminder_note', reminderNote)
            formData.append('notes', notes)

            if (photo) {
                formData.append('documents', {
                    uri: photo.uri,
                    name: photo.fileName ?? `document_${Date.now()}.jpg`,
                    type: photo.mimeType ?? 'image/jpeg',
                } as any)
            }

            await postAllCase(formData).unwrap()
            Alert.alert("Success", "Case created successfully!")
            navigation.navigate("BottomScreen", { screen: "Home" })
        } catch (error) {
            Alert.alert("Error", "Failed to create case. Please try again.")
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Case Type",
            headerTitleStyle: { fontFamily: 'open-sans' },
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
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View className='flex-1 bg-white p-3'>
            <Text className='text-[#33363F] font-robotoBold text-2xl'>
                Provide key information about your case to generate an accurate timeline
            </Text>

            <ScrollView contentContainerStyle={{ paddingBottom: 150 }} showsVerticalScrollIndicator={false}>

                {/* Title */}
                <View className='mt-4'>
                    <Text className='text-[#2F2F36] font-robotoBold text-md mt-2'>Case Title</Text>
                    <TextInput
                        className='flex-1 border border-[#CACACA] p-3 rounded-xl mt-2'
                        placeholder='Name'
                        placeholderTextColor={"#4D4D55"}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                {/* Last Update Date */}
                <View className='mt-4'>
                    <Text className='text-[#4D4D55] font-robotoBold text-md mt-2'>Date of Last Update</Text>
                    <TouchableOpacity onPress={() => setShowLastUpdatePicker(true)}>
                        <View className='flex-row items-center gap-1 border border-[#CACACA] p-3 rounded-xl mt-2'>
                            <Text className='flex-1'>{formatDisplay(lastUpdate)}</Text>
                            <Ionicons name="calendar" size={24} color="#CACACA" />
                        </View>
                    </TouchableOpacity>
                    {showLastUpdatePicker && (
                        <DateTimePicker
                            value={lastUpdate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, date) => {
                                setShowLastUpdatePicker(false)
                                if (date) setLastUpdate(date)
                            }}
                        />
                    )}
                </View>

                {/* Status */}
                <View>
                    <Text className='text-[#2F2F36] font-robotoBold text-md mt-4'>Status</Text>
                    <TextInput
                        className='flex-1 border border-[#CACACA] p-3 rounded-xl mt-2'
                        placeholder='Forms Mailed'
                        placeholderTextColor={"#4D4D55"}
                        value={status}
                        onChangeText={setStatus}
                    />
                </View>

                {/* Reminder Date */}
                <View className='mt-4'>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-[#4D4D55] font-robotoBold text-md'>Reminder (Optional)</Text>
                        <EvilIcons name="plus" size={24} color="#222222" />
                    </View>
                    <TouchableOpacity onPress={() => setShowReminderPicker(true)}>
                        <View className='flex-row items-center gap-1 border border-[#CACACA] p-3 rounded-xl mt-2'>
                            <Text className='flex-1'>{formatDisplay(reminderDate)}</Text>
                            <Ionicons name="calendar" size={24} color="#CACACA" />
                        </View>
                    </TouchableOpacity>
                    {showReminderPicker && (
                        <DateTimePicker
                            value={reminderDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, date) => {
                                setShowReminderPicker(false)
                                if (date) setReminderDate(date)
                            }}
                        />
                    )}
                </View>

                {/* Reminder Note */}
                <View className="flex-1 justify-center items-center mt-4 h-[100px]">
                    <TextInput
                        className="px-4 border border-gray-300 rounded-lg mb-4 bg-white"
                        placeholder="Need to send documents next week"
                        value={reminderNote}
                        onChangeText={setReminderNote}
                        style={{ width: "100%", height: "100%" }}
                        multiline
                    />
                </View>

                {/* Notes */}
                <View>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-[#4D4D55] font-robotoBold text-md'>Notes (Optional)</Text>
                        <EvilIcons name="plus" size={24} color="#222222" />
                    </View>
                    <View className="flex-1 justify-center items-center mt-4 h-[100px]">
                        <TextInput
                            className="px-4 border border-gray-300 rounded-lg mb-4 bg-white"
                            placeholder="Submit form before deadline"
                            value={notes}
                            onChangeText={setNotes}
                            style={{ width: "100%", height: "100%" }}
                            multiline
                        />
                    </View>
                </View>

                {/* Documents */}
                <View className='mb-2'>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-[#4D4D55] font-robotoBold text-md'>Documents (Optional)</Text>
                        <TouchableOpacity onPress={handleDocumentPress}>
                            <EvilIcons name="plus" size={24} color="#222222" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleDocumentPress}>
                        <View className="flex-1 justify-center items-center mt-4 h-[100px] border border-dashed rounded-xl border-gray-300">
                            {photo ? (
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{ width: '100%', height: '100%', borderRadius: 12 }}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Text className='text-[#CACACA]'>Tap to upload document</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>

                <View className='items-center'>
                    <Button
                        title={isLoading ? "Creating..." : "Create"}
                        colors={["#1C75AD", "#083D70"]}
                        labelSize={14}
                        labelFont={'roboto-Bold'}
                        labelColor={'white'}
                        onPress={handleCreate}
                        disabled={isLoading}
                    />
                </View>

            </ScrollView>
        </View>
    )
}

export default CaseDetailsCreate