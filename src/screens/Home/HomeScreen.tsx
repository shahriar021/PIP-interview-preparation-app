import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useGetAllCaseQuery } from "src/redux/features/case/caseApi";
import { Case } from "src/types/case";
import { useTranslation } from "react-i18next";


const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const { t,i18n } = useTranslation();
  const empty = 0
  const {data:getCase}=useGetAllCaseQuery(undefined)
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
          <Image source={require("../../../assets/pipyrit/shahriar.jpeg")} style={{ width: "100%", height: "100%" }} />
        </View>
        <TouchableOpacity
        onPress={() => navigation.navigate("Language")}
        className="flex-row items-center gap-1 border rounded-md p-3 border-[#0000001A]"
      >
        <Image source={require("../../../assets/pipyrit/globe.png")} style={{ width: 24, height: 24 }} />
        <Text>{currentLabel}</Text> 
      </TouchableOpacity>
      </View>


      {/* {empty ?
        <View className="flex-row justify-between items-center">
          <Text className="mt-4 font-robotoBold text-2xl text-[#305FA1] p-3">{t('myCases')}</Text>
          <TouchableOpacity className="flex-row items-center  gap-2  p-4 rounded-full" onPress={() => navigation.navigate("New Case")}>
            <Entypo name="squared-plus" size={24} color="#7E869E40" />
            <Text className="font-robotoBold text-lg text-[#083D70]">{t('addNewCase')}</Text>
          </TouchableOpacity>
        </View>
        :
        <View>
          <View style={{ height: verticalScale(286) }}>
            <Image source={require("../../../assets/pipyrit/homeimage.png")} style={{ width: "100%", height: "100%" }} />
          </View>
          <View className="items-center">
            <TouchableOpacity className="flex-row items-center  gap-2 border border-[#083D70] p-4 rounded-full" onPress={() => navigation.navigate("New Case")}>
              <Entypo name="squared-plus" size={24} color="#7E869E40" />
              <Text className="font-robotoBold text-lg text-[#083D70]">Add new case</Text>
            </TouchableOpacity>
          </View>
        </View>
      } */}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        <View className="flex-col gap-2 p-3">
          {! getCase?.data?<View>
          <View style={{ height: verticalScale(286) }}>
            <Image source={require("../../../assets/pipyrit/homeimage.png")} style={{ width: "100%", height: "100%" }} />
          </View>
          <View className="items-center">
            <TouchableOpacity className="flex-row items-center  gap-2 border border-[#083D70] p-4 rounded-full" onPress={() => navigation.navigate("New Case")}>
              <Entypo name="squared-plus" size={24} color="#7E869E40" />
              <Text className="font-robotoBold text-lg text-[#083D70]">{t('addNewCase')}</Text>
            </TouchableOpacity>
          </View>
        </View>:
            getCase?.data?.map((item: Case, index: number) => <TouchableOpacity key={index} className="border-r border-r-[#0000002E] border-b border-b-[#0000002E] border-t border-t-[#0000002E] p-4 rounded-xl" onPress={()=>navigation.navigate("Case Details",{id:item.id})} style={{borderLeftColor:"#305FA1",borderLeftWidth:4}}>
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
