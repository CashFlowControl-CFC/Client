import React, { useEffect, useState } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./pages/Main";
import Transaction from "./pages/Transaction";
import Categories from "./pages/Categories";
import TransactionInfo from "./pages/TransactionInfo";
import CategoryForm from "./pages/CategoryForm";
import Icons from "./pages/Icons";
import AuthPage from "./pages/AuthPage";
import LogIn from "./pages/LogIn";
import Target from "./pages/Target"
import Registration from "./pages/Registration";
import TargetForm from "./TargetComponents/TargetForm";
import TargetInfo from "./pages/TargetInfo";
import { getAccessToken } from "../modules/storage";
import { ActivityIndicator } from "react-native";
import general from "../styles/general";
import ScheduledPayments from "./pages/SheduledPayments";
import { addData } from "../modules/requests";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Profile from "./pages/Profile";
const InsideStack = createStackNavigator();
const RegisterStack = createStackNavigator();

const InsideLayout = () => {

  return (
    <InsideStack.Navigator screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name="Main" component={Main} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Transaction' component={Transaction} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Categories' component={Categories} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='TransactionInfo' component={TransactionInfo} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='CategoryForm' component={CategoryForm} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Icons' component={Icons} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Target' component={Target} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='TargetForm' component={TargetForm} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='TargetInfo' component={TargetInfo} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='ScheduledPayments' component={ScheduledPayments} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Profile' component={Profile} />
    </InsideStack.Navigator>
  )

}
const RegisterLayout = () => {
  return (
    <RegisterStack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <RegisterStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Auth' component={AuthPage} />
      <RegisterStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='LogIn' component={LogIn} />
      <RegisterStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Registration' component={Registration} />
    </RegisterStack.Navigator>
  )
}

const auth = async (dispatch) => {
  const token = await getAccessToken()
  console.log("token in enter:", token)
  if (token != null) {
    const result = await addData(`${process.env.API_URL}/auth/token`, token)
    console.log("result in enter", result)
    dispatch({ type: "SET_USER", payload: result })
  }
  else {
    dispatch({ type: "SET_USER", payload: null })
  }
}
export default function Navigation() {
  const user = useSelector(state => state.user.user)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {

    console.log("server:", process.env.API_URL)
    console.log("user in start", user)
    if (user == null) {
        auth(dispatch);
    }
  }, [user]);

  return (
    <NavigationContainer>
      {loading ? <ActivityIndicator style={general.addAuthBtn} size="large" color="#fcbe53" />
        : user ? <InsideLayout /> : <RegisterLayout />}
    </NavigationContainer>
  );
}