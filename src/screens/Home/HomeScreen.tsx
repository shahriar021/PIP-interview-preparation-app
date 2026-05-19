import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useGetAllCaseQuery } from "src/redux/features/case/caseApi";
import { Case } from "src/types/case";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/redux/hooks";
import { useGetProfileQuery } from "src/redux/features/profile/profileApi";


const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const { t, i18n } = useTranslation();
  const empty = 0
  const { data: getCase } = useGetAllCaseQuery(undefined)
  const userId = useAppSelector((state) => state.auth.userID)

  const { data: getProfile, isLoading } = useGetProfileQuery(userId)
  const LANG_LABELS = {
    en: 'English',
    es: 'Español',
    ht: 'Kreyòl',
  };

  const currentLabel = LANG_LABELS[i18n.language] ?? 'English';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="flex-row justify-between p-3">
        <View style={{ width: scale(42), height: verticalScale(42) }} className="rounded-xl overflow-hidden">
          {isLoading ? (
            <Text style={{ fontSize: 12, color: "gray" }}>Loading...</Text>
          ) : (
            <Image
              source={{ uri: getProfile?.data?.profile_picture }}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Language")}
          className="flex-row items-center gap-1 border rounded-md p-3 border-[#0000001A]"
        >
          <Image source={require("../../../assets/pipyrit/globe.png")} style={{ width: 24, height: 24 }} />
          <Text>{currentLabel}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row w-full justify-between p-3 items-center">
        <Text className="font-robotoBold text-[24px] text-[#305FA1]">My Cases</Text>
        <TouchableOpacity className="flex-row items-center gap-2" onPress={() => navigation.navigate("New Case")}>
          <View className="bg-[#7E869E40] rounded-lg">
            <Ionicons name="add-outline" size={24} color={"#083D70"} />
          </View>
          <Text className="font-robotoBold text-[#083D70] text-[14px]">Add new case</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        <View className="flex-col gap-2 p-3">
          {!getCase?.data?.length ? <View>
            <View style={{ height: verticalScale(286) }}>
              <Image source={require("../../../assets/pipyrit/homeimage.png")} style={{ width: "100%", height: "100%" }} />
            </View>
            <View className="items-center">
              <TouchableOpacity className="flex-row items-center  gap-2 border border-[#083D70] p-4 rounded-full" onPress={() => navigation.navigate("New Case")}>
                <Entypo name="squared-plus" size={24} color="#7E869E40" />
                <Text className="font-robotoBold text-lg text-[#083D70]">{t('addNewCase')}</Text>
              </TouchableOpacity>
            </View>
          </View> :
            getCase?.data?.map((item: Case, index: number) => <TouchableOpacity key={index} className="border-r border-r-[#0000002E] border-b border-b-[#0000002E] border-t border-t-[#0000002E] p-4 rounded-xl" onPress={() => navigation.navigate("Case Details", { id: item.id })} style={{ borderLeftColor: "#305FA1", borderLeftWidth: 4 }}>
              <Text className="text-[#000000] font-robotoBold text-lg">{item.title}</Text>
              <Text style={{ color: 'rgba(0,0,0,0.6)' }} className="font-robotoBold mt-2">{t('status')} : <Text style={{ color: "#000000" }}>{item.status}</Text></Text>
              <Text style={{ color: 'rgba(0,0,0,0.6)' }} className="font-robotoBold mt-1">{t('lastUpdate')} : <Text style={{ color: "#000000" }}>{item.last_update}</Text></Text>
              <Text style={{ color: 'rgba(0,0,0,0.6)' }} className="font-robotoBold mt-1">
                {t('reminder')}   : <Text style={{ color: "#000000" }}>{item.reminder_date}{" "}{item.reminder_note}</Text></Text>
            </TouchableOpacity>)
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
;

export default DashboardScreen;
