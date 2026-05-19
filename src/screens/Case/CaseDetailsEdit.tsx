import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Platform, Image } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Entypo, EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from 'src/components/shared/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEditCaseBasedOnIdMutation, useGetCaseBasedOnIdQuery } from 'src/redux/features/case/caseApi';

const CaseDetailsEdit = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { id } = route.params as { id: number }

    const { data: getCaseDetails } = useGetCaseBasedOnIdQuery(id)
    const [editCase, { isLoading }] = useEditCaseBasedOnIdMutation(id)

    // Form state
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('')
    const [lastUpdate, setLastUpdate] = useState(new Date())
    const [reminderDate, setReminderDate] = useState(new Date())
    const [reminderNote, setReminderNote] = useState('')
    const [notes, setNotes] = useState('')
    const [photo, setPhoto] = useState<any>(null)

    // Date picker visibility
    const [showLastUpdatePicker, setShowLastUpdatePicker] = useState(false)
    const [showReminderPicker, setShowReminderPicker] = useState(false)

    // Pre-fill form with existing data
    useEffect(() => {
        if (getCaseDetails?.data) {
            const d = getCaseDetails.data
            setTitle(d.title ?? '')
            setStatus(d.status ?? '')
            setReminderNote(d.reminder_note ?? '')
            setNotes(d.notes ?? '')
            if (d.last_update) setLastUpdate(new Date(d.last_update))
            if (d.reminder_date) setReminderDate(new Date(d.reminder_date))
        }
    }, [getCaseDetails])

    const handleCamera = async () => {
        navigation.navigate("CameraScreenPro" as never, {
            onCapture: (uri: string) => {
                setPhoto({
                    uri,
                    name: `doc_${Date.now()}.jpg`,
                    type: 'image/jpeg',
                })
            }
        } as never)
    }

    const formatDate = (date: Date) => date.toISOString().split('T')[0] // "2026-05-10"

    const formatDisplay = (date: Date) =>
        date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })

    // const handleEdit = async () => {
    //     try {
    //         const body = {
    //             case_number: getCaseDetails?.data?.case_number ?? null,
    //             case_type: getCaseDetails?.data?.case_type ?? 0,
    //             case_type_details: {
    //                 name: getCaseDetails?.data?.case_type_details?.name ?? ''
    //             },
    //             title,
    //             last_update: formatDate(lastUpdate),
    //             status,
    //             reminder_date: formatDate(reminderDate),
    //             reminder_note: reminderNote,
    //             notes,
    //         }

    //         await editCase({ id, body }).unwrap()
    //         Alert.alert("Success", "Case updated successfully!")
    //         // navigation.navigate("BottomScreen", { screen: "Home" })
    //     } catch (error) {
    //         Alert.alert("Error", "Failed to update case. Please try again.")
    //     }
    // }

    const handleEdit = async () => {
        try {
            const formData = new FormData()

            formData.append(
                'case_number',
                String(getCaseDetails?.data?.case_number ?? '')
            )

            formData.append(
                'case_type',
                String(getCaseDetails?.data?.case_type ?? 0)
            )

            formData.append(
                'case_type_details',
                JSON.stringify({
                    name: getCaseDetails?.data?.case_type_details?.name ?? ''
                })
            )

            formData.append('title', title)

            formData.append(
                'last_update',
                formatDate(lastUpdate)
            )

            formData.append('status', status)

            formData.append(
                'reminder_date',
                formatDate(reminderDate)
            )

            formData.append(
                'reminder_note',
                reminderNote
            )

            formData.append('notes', notes)

            // upload new photo if selected
            if (photo?.uri) {
                formData.append('documents', {
                    uri: photo.uri,
                    name: photo.name,
                    type: photo.type,
                } as any)
            }

            await editCase({
                id,
                body: formData,
            }).unwrap()

            Alert.alert(
                "Success",
                "Case updated successfully!"
            )

        } catch (error) {
            console.log(error)

            Alert.alert(
                "Error",
                "Failed to update case. Please try again."
            )
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Case Details",
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
            ),
            headerRight: () => (
                <TouchableOpacity className='p-3' onPress={() => Alert.alert("Deleted Successfully!")}>
                    <View className='w-[35px] h-[35px] bg-[#FF00001A] items-center justify-center rounded-full'>
                        <MaterialIcons name="delete" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View className='flex-1 bg-white p-3'>
            <Text className='text-[#33363F] font-robotoBold text-2xl'>Provide key information about your case to generate an accurate timeline</Text>

            <ScrollView contentContainerStyle={{ paddingBottom: 150, alignContent: "center" }} showsVerticalScrollIndicator={false}>
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

                <View className='mb-2'>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-[#4D4D55] font-robotoBold text-md'>
                            Documents (Optional)
                        </Text>

                        <TouchableOpacity onPress={handleCamera}>
                            <EvilIcons name="plus" size={24} color="#222222" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleCamera}>
                        <View className="flex-1 justify-center items-center mt-4 h-[160px] border border-dashed rounded-xl border-gray-300 overflow-hidden">

                            {photo?.uri ? (
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    resizeMode="cover"
                                />
                            ) : typeof getCaseDetails?.data?.documents?.[0] === 'string' &&
                                getCaseDetails.data.documents[0].trim() !== '' ? (
                                <Image
                                    source={{
                                        uri: getCaseDetails.data.documents[0]
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View className='items-center'>
                                    <Entypo name="upload" size={28} color="#CACACA" />

                                    <Text className='text-[#CACACA] mt-2'>
                                        Tap to upload document
                                    </Text>
                                </View>
                            )}

                        </View>
                    </TouchableOpacity>
                </View>

                <View className='items-center'>
                    <Button
                        title={isLoading ? "Saving..." : "Save"}
                        colors={["#1C75AD", "#083D70"]}
                        labelSize={14}
                        labelFont={'roboto-Bold'}
                        labelColor={'white'}
                        onPress={handleEdit}
                        disabled={isLoading}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default CaseDetailsEdit