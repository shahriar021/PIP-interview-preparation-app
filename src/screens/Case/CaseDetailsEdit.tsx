import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Entypo, EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Button from 'src/components/shared/Button';

const CaseDetailsEdit = () => {
     const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Case Details",
            headerTitleStyle: {
                fontFamily: 'open-sans',
            },
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
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity className='p-3' onPress={()=>Alert.alert("Deleted Successfully!")}>
                    <View className='w-[35px] h-[35px]  bg-[#FF00001A] items-center justify-center rounded-full'>
                       <MaterialIcons name="delete" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            )

        });
    }, [navigation]);

    const handleEdit = ()=>{
        navigation.navigate("BottomScreen",{screen:"Home"})
    }

  return (
    <View className='flex-1 bg-white p-3'>
            <Text className='text-[#33363F] font-robotoBold text-2xl'>Provide key information about your case to generate an accurate timeline</Text>

            <ScrollView contentContainerStyle={{ paddingBottom: 150, alignContent: "center" }} showsVerticalScrollIndicator={false}>
                <View className='mt-4'>
                    <Text className='text-[#2F2F36] font-robotoBold text-md mt-2'>Case Title</Text>
                    <TextInput className='flex-1 border border-[#CACACA] p-3 rounded-xl mt-2' placeholder='Name' placeholderTextColor={"#4D4D55"} />
                </View>
                <View className='mt-4 '>
                    <Text className='text-[#4D4D55] font-robotoBold text-md mt-2'>Date of Last Update</Text>
                    <View className='flex-row items-center gap-1 border border-[#CACACA] p-3 rounded-xl mt-2'><Text className='flex-1'>mm/dd/yy</Text><Ionicons name="calendar" size={24} color="#CACACA" /></View>
                </View>
                <View>
                    <Text className='text-[#2F2F36] font-robotoBold text-md mt-4'>Status</Text>
                    <TextInput className='flex-1 border border-[#CACACA] p-3 rounded-xl mt-2' placeholder='Forms Mailed' placeholderTextColor={"#4D4D55"} />
                </View>
                <View className='mt-4 '>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-[#4D4D55] font-robotoBold text-md'>Reminder (Optional)</Text>
                        <EvilIcons name="plus" size={24} color="#222222" />
                    </View>
                    <View className='flex-row items-center gap-1 border border-[#CACACA] p-3 rounded-xl mt-2'><Text className='flex-1'>mm/dd/yy</Text><Ionicons name="calendar" size={24} color="#CACACA" /></View>
                </View>
                <View className="flex-1 justify-center items-center  mt-4 h-[100px]">
                    <TextInput
                        className=" px-4 border border-gray-300 rounded-lg mb-4 bg-white"
                        placeholder="Need to send documents next week"
                        
                        style={{ width: "100%", height: "100%" }}
                        multiline
                    />

                </View>
                <View>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-[#4D4D55] font-robotoBold text-md'>Notes (Optional)</Text>
                        <EvilIcons name="plus" size={24} color="#222222" />
                    </View>
                    <View className="flex-1 justify-center items-center  mt-4 h-[100px]">
                        <TextInput
                            className=" px-4 border border-gray-300 rounded-lg mb-4 bg-white"
                            placeholder="Submit form before deadline"
                            
                            style={{ width: "100%", height: "100%" }}
                            multiline
                        />

                    </View>
                </View>
                <View className='mb-2'>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-[#4D4D55] font-robotoBold text-md'>Documents (Optional)</Text>
                        <EvilIcons name="plus" size={24} color="#222222" />
                    </View>
                    <View className="flex-1 justify-center items-center  mt-4 h-[100px] border border-dashed rounded-xl border-gray-300">


                    </View>
                </View>

                <View className='items-center'>
                    <Button
                        title={"Create"}
                        colors={["#1C75AD", "#083D70"]}
                        labelSize={14}
                        labelFont={'roboto-Bold'}
                        labelColor={'white'}
                        onPress={handleEdit}
                    />
                </View>

            </ScrollView>
        </View>
  )
}

export default CaseDetailsEdit