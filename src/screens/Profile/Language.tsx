import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'src/i18n';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'ht', label: 'Haitian Creole', native: 'Kreyòl Ayisyen' },
];

const Language = () => {
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('screens.language'),
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
        <TouchableOpacity className='p-1' onPress={() => navigation.navigate("Setting")}>
          <View className='w-[35px] h-[35px] bg-[#1D35571A] items-center justify-center rounded-full'>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation,t,currentLang]);

  const handleSelect = async (code: string) => {
    await changeLanguage(code as 'en' | 'es' | 'ht');
  };

  return (
    <View className='flex-1 bg-white p-3'>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {LANGUAGES.map(lang => {
          const isSelected = currentLang === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleSelect(lang.code)}
              className={`flex-row items-center gap-4 border p-3 rounded-xl mt-2 mb-2 ${isSelected ? 'border-[#94AF29] bg-[#94AF2910]' : 'border-gray-300'}`}
            >
              <FontAwesome
                name={isSelected ? 'dot-circle-o' : 'circle-o'}
                size={24}
                color={isSelected ? '#94AF29' : 'black'}
              />
              <View>
                <Text className='font-robotoBold text-lg'>{lang.native}</Text>
                <Text className='font-robotoRegular text-sm text-gray-400'>{lang.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Language;