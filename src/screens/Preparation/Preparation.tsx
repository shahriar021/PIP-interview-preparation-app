import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';

const Preparation = () => {
     const navigation = useNavigation()
     const { t } = useTranslation();

        useLayoutEffect(() => {
            navigation.setOptions({
                title: t(`tabs.prepHub`),
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
                headerTitleAlign: "left",
                headerLeft: null
            });
        }, [navigation]);
  return (
    <View className='flex-1 bg-white p-3'>
      <Text className='font-robotoRegular text-black text-md'>{t('practiceDesc')}</Text>

      <View className='mt-5 flex-row gap-2 items-center'>
        <TouchableOpacity style={{width:"49%",height:verticalScale(150),borderRadius:8,overflow:"hidden"}} onPress={()=>navigation.navigate("Quick 1")}>
            <Image source={require("../../../assets/pipyrit/quick.png")} style={{width:"100%",height:"100%"}}/>
        </TouchableOpacity>

        <TouchableOpacity  style={{width:"49%",height:verticalScale(150),borderRadius:8,overflow:"hidden"}} onPress={()=>navigation.navigate("Interview Type")}>
            <Image source={require("../../../assets/pipyrit/mock.png")} style={{width:"100%",height:"100%"}}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Preparation