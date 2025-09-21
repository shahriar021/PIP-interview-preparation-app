import React, { useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation } from "./BottomNavigation";
import { 
  LoginScreen,
  Profile,
  NearbyRestaurantList,
  AboutUs,
  Privacy,
  Terms,
  Address,
  Setting,
  ChangePassword,
  EditProfile,
  RestaurantProfile,
  PopularItems,
  PopularItemDetails,
  PaymentAnimation,
  PaymentInfo,
  TrackOrder,
  ViewDetails,
  PaymentOption,
  SpecialInstructions,
  DeliveryRequestView,
  MapScreen,
  Withdraw,
  WithdrawRequest,
  Bank,
  BankEdit,
  History
} from "src/screens";

import { ActivityIndicator } from "react-native";
import { useAppSelector } from "src/redux/hooks";
import AvailableRequest from "src/screens/Request/AvailableRequest";
import CouponCards from "src/screens/Profile/CouponCards";
import ViewMyComplain from "src/screens/Profile/ViewMyComplain/ViewMyComplain";
import Report from "src/screens/Profile/Report/Report";
import NewCase from "src/screens/Case/NewCase";
import CaseType from "src/screens/Case/CaseType";
import CaseDetails from "src/screens/Case/CaseDetails";
import CaseDetailsCreate from "src/screens/Case/CaseDetailsCreate";
import CaseDetailsEdit from "src/screens/Case/CaseDetailsEdit";
import FrameShorts from "src/screens/Frames/FrameShorts";
import QuickQuiz1 from "src/screens/Preparation/QuickQuiz1";
import QuickQuiz2 from "src/screens/Preparation/QuickQuiz2";
import QuickQuiz3 from "src/screens/Preparation/QuickQuiz3";
import QuickResult from "src/screens/Preparation/QuickResult";
import QuestionAndAnswer from "src/screens/Preparation/QuestionAndAnswer";
import InterviewType from "src/screens/Preparation/InterviewType";
import InterviewDifficulty from "src/screens/Preparation/InterviewDifficulty";


const Stack = createStackNavigator();

const StackNavigation = () => {
  const userType = useAppSelector((store)=>store.auth.userType)
  // const userType="user"


  if(!userType){
    <ActivityIndicator size="large"/>
  }

  return (
    
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "white",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: "#006400",
          // headerRight: () => <NavRight routeName={routeNameRef.current} />,
        }}
      >
        {<Stack.Screen
          name="BottomScreen"
          component={BottomNavigation}
          options={{
            headerShown: false,
          }}
        />}
        {/* <Stack.Screen name="Notification" component={} /> */}
        <Stack.Screen name="Profile" options={{headerShown:false}} component={Profile} />
        <Stack.Screen name="Log in" component={LoginScreen} />

        <Stack.Screen name="about" component={AboutUs}/>
        <Stack.Screen name="Privacy" component={Privacy}/>
        <Stack.Screen name="Terms" component={Terms}/>
        <Stack.Screen name="Address" component={Address}/>
        <Stack.Screen name="Setting" component={Setting}/>
        <Stack.Screen name="Edit Profile" component={EditProfile}/>
        <Stack.Screen name="Change Password" component={ChangePassword}/>

        <Stack.Screen name="Nearby Restaurants List" component={NearbyRestaurantList}/>
        <Stack.Screen name="Restaurant Profile" options={{headerShown:false}} component={RestaurantProfile}/>
        <Stack.Screen name="Popular Items"  component={PopularItems}/>
        <Stack.Screen name="Popular Items Details" options={{headerShown:false}} component={PopularItemDetails}/>
        <Stack.Screen name="Payment Animation" options={{headerShown:false}} component={PaymentAnimation}/>
        <Stack.Screen name="Payment Info" options={{headerShown:false}} component={PaymentInfo}/>
        <Stack.Screen name="Track Order" component={TrackOrder}/>
        <Stack.Screen name="View Details" component={ViewDetails}/>
        <Stack.Screen name="Payment Options" component={PaymentOption}/>
        <Stack.Screen name="Special Instructions" component={SpecialInstructions}/>

        <Stack.Screen name="Delivery Request" component={DeliveryRequestView}/>
        <Stack.Screen name="Map" options={{headerShown:false}} component={MapScreen}/>
        
        <Stack.Screen name="Withdraw" component={Withdraw}/>
        <Stack.Screen name="Withdraw Request" component={WithdrawRequest}/>
        <Stack.Screen name="Bank" component={Bank}/>
        <Stack.Screen name="Bank Edit" component={BankEdit}/>
        <Stack.Screen name="History" component={History}/>
        <Stack.Screen name="Available Request" component={AvailableRequest}/>
        <Stack.Screen name="Coupon Cards" component={CouponCards}/>
        <Stack.Screen name="View My Complains" component={ViewMyComplain}/>
        <Stack.Screen name="Report" component={Report}/>

        {/*  */}
        <Stack.Screen name="New Case" options={{headerShown:true}} component={NewCase}/>
        <Stack.Screen name="Case Type" options={{headerShown:true}} component={CaseType}/>
        <Stack.Screen name="Case Details create" options={{headerShown:true}} component={CaseDetailsCreate}/>
        <Stack.Screen name="Case Details edit" options={{headerShown:true}} component={CaseDetailsEdit}/>
        <Stack.Screen name="Case Details" options={{headerShown:true}} component={CaseDetails}/>
        <Stack.Screen name="Frame Shorts" options={{headerShown:false}} component={FrameShorts}/>
        <Stack.Screen name="Quick 1" options={{headerShown:false}} component={QuickQuiz1}/>
        <Stack.Screen name="Quick 2" options={{headerShown:false}} component={QuickQuiz2}/>
        <Stack.Screen name="Quick 3" options={{headerShown:false}} component={QuickQuiz3}/>
        <Stack.Screen name="Quick Result" options={{headerShown:true}} component={QuickResult}/>
        <Stack.Screen name="Quick Answer" options={{headerShown:true}} component={QuestionAndAnswer}/>
        <Stack.Screen name="Interview Type" options={{headerShown:true}} component={InterviewType}/>
        <Stack.Screen name="Interview Difficulty" options={{headerShown:true}} component={InterviewDifficulty}/>
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default StackNavigation;
