import { View, Text, Modal, TouchableOpacity, TextInput, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'
import { takePhotoAsync } from 'src/utils/takePhotoAsync'
import { LinearGradient } from 'expo-linear-gradient'

const ReportModal = ({ visible, onClose, data }: any) => {
    const { height, width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const [photo, setPhoto] = useState(null);
    const handleTakePhoto = async () => {
        const image = await takePhotoAsync();
        if (image) {
            setPhoto(image);
        }
    };

    const handleVerify = () => {
        onClose()
    }

    return (
        <Modal visible={visible} onRequestClose={onClose} animationType="slide">
            <SafeAreaView className="flex-1 bg-white p-2 pt-0" edges={['top', 'left', 'right']}>

                {/* Header */}
                <View className="flex-row items-center justify-between px-3 py-2">
                    {/* Back button */}
                    <TouchableOpacity onPress={onClose} className="p-1">
                        <View className="w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full">
                            <Entypo name="chevron-small-left" size={24} color="red" />
                        </View>
                    </TouchableOpacity>

                    {/* Title */}
                    <Text className="flex-1 text-center text-lg font-semibold text-black">
                        Reports
                    </Text>

                    {/* Spacer */}
                    <View className="w-[35px]" />
                </View>


                {/* Body */}
                <View className='px-3 py-2'>
                    {data.includes("Report Dish") && (<>
                        <Text className='text-[#626262] font-robotoBold'>Restaurant name</Text>
                    <TextInput className='border mt-2 border-[#CACACA] py-2 rounded-lg' />
                    </>
                    )}
                    {data.includes("Report Delivery Person") && (<>
                        <Text className='text-[#626262] font-robotoBold'>Rider ID</Text>
                    <TextInput className='border mt-2 border-[#CACACA] py-2 rounded-lg' />
                    </>
                    )}
                    <Text className='text-[#626262] font-robotoBold mt-2'>Issue Title</Text>
                    <TextInput className='border mt-2 border-[#CACACA] py-2 rounded-lg' />
                    <Text className="text-[#626262] font-robotoBold mt-2">Description</Text>

                    <TextInput
                        className="border border-[#CACACA] rounded-lg px-3 py-2 mt-2 h-32"
                        multiline={true}
                        textAlignVertical="top"   // important: text starts from top
                        placeholder="Enter description..."
                        placeholderTextColor="#9E9E9E"
                    />


                    <Text className="mt-1 mb-1 text-[#343434]">Upload Picture </Text>
                    <TouchableOpacity onPress={handleTakePhoto} className='border border-[#C3C3C3] border-dashed mt-3 items-center p-3 rounded-md'>
                        {photo ? (
                            <Image source={{ uri: photo.uri }} style={{ width: "100%", height: 200 }} className='rounded-xl' />
                        ) : (
                            <Image source={require("../../../../assets/restroIcon/Download_light.png")} style={{ width: 62, height: 62 }} />
                        )}
                    </TouchableOpacity>

                    <View className="items-center">
                        <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} onPress={handleVerify}>
                            <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                                <Text className="text-white p-3 ">Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>

            </SafeAreaView>
        </Modal>
    )
}

export default ReportModal