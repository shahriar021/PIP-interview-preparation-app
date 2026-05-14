import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Platform, useWindowDimensions, Image } from "react-native";
import { HomeScreen, Profile } from "src/screens";
import CartPage from "src/screens/Cart/CartPage";
import MyOrders from "src/screens/Orders/MyOrders";
import { scale, verticalScale } from "react-native-size-matters";
import Frames from "src/screens/Frames/Frames";
import Preparation from "src/screens/Preparation/Preparation";
import { useTranslation } from "react-i18next";

const BottomTabs = createBottomTabNavigator();

// const ACTIVE_BG_COLOR = "#c21a1e";
const ACTIVE_BG_COLOR = "#305FA1";
const ACTIVE_ICON_COLOR = "#fff";

// preload icons outside the component so they load once
const icons = {
  homeActive: require("../../assets/restroIcon/home-active.png"),
  homeInactive: require("../../assets/pipyrit/homeInactive.png"),
  prepActive: require("../../assets/pipyrit/prep-active.png"),
  prepInactive: require("../../assets/pipyrit/prep-inactive.png"),
  pActive: require("../../assets/pipyrit/p-active.png"),
  playInactive: require("../../assets/pipyrit/play-inactive.png"),
  profileActive: require("../../assets/restroIcon/profile-active.png"),
  profileInactive: require("../../assets/pipyrit/profile-inactive.png"),
};

export const BottomNavigation = () => {
  const { width } = useWindowDimensions();
   const { t, i18n } = useTranslation();
  const currentLang = i18n.language; 
  const TAB_LABELS: Record<string, string> = {
    'Home':     t('tabs.home'),
    'Prep Hub': t('tabs.prepHub'),
    'Frames':   t('tabs.frames'),
    'Profile':  t('tabs.profile'),
  };

  const TAB_NAMES = ["Home", "Prep Hub", "Frames", "Profile"];

  // optional: prefetch icons into memory so no delay
  useEffect(() => {
    Object.values(icons).forEach(img => Image.prefetch(Image.resolveAssetSource(img).uri));
  }, []);
  
  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        const routeIndex = TAB_NAMES.indexOf(route.name);
        const isFirst = routeIndex === 0;
        const isLast = routeIndex === TAB_NAMES.length - 1;

        return {
          lazy: true, // mount only when focused
          tabBarStyle: {
            height: 68,
            paddingBottom: 7,
            paddingTop: 17,
            backgroundColor: "#F7F7F7",
            borderTopWidth: 0,
            elevation: 0,
            marginHorizontal: 17,
            borderRadius: 60,
            marginBottom: Platform.OS === "android" ? 10 : 16,
            paddingHorizontal: 5,
            overflow: "visible",
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let iconSource;
            if (route.name === "Home") {
              iconSource = focused ? icons.homeActive : icons.homeInactive;
            } else if (route.name === "Prep Hub") {
              iconSource = focused ? icons.prepActive : icons.prepInactive;
            } else if (route.name === "Frames") {
              iconSource = focused ? icons.pActive : icons.playInactive;
            } else if (route.name === "Profile") {
              iconSource = focused ? icons.profileActive : icons.profileInactive;
            }

            if (focused) {
              const translateX = isFirst ? scale(15) : isLast ? -scale(15) : 0;
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: ACTIVE_BG_COLOR,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 30,
                    minWidth: scale(100),
                    maxWidth: scale(100),
                    zIndex: 10,
                    transform: [{ translateX }],
                  }}
                >
                  <Image source={iconSource} style={{ width: 24, height: 24 }} resizeMode="contain" />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: ACTIVE_ICON_COLOR,
                      marginLeft: 8,
                      fontWeight: "600",
                      fontSize: width > 450 ? 14 : 12,
                      flexShrink: 1,
                    }}
                  >
                     {TAB_LABELS[route.name]}
                  </Text>
                </View>
              );
            }

            return <Image source={iconSource} style={{ width: scale(24), height: verticalScale(24) }} resizeMode="contain" />;
          },
        };
      }}
    >
      <BottomTabs.Screen name="Home" options={{ headerShown: false, tabBarLabel: t('tabs.home') }} component={HomeScreen} />
      <BottomTabs.Screen name="Prep Hub" options={{ headerShown: true, tabBarLabel: t('tabs.prepHub') }} component={Preparation} />
      <BottomTabs.Screen name="Frames" options={{ headerShown: true, tabBarLabel: t('tabs.frames') }} component={Frames} />
      <BottomTabs.Screen name="Profile" options={{ headerShown: false, tabBarLabel: t('tabs.profile') }} component={Profile} />
    </BottomTabs.Navigator>
  );
};
