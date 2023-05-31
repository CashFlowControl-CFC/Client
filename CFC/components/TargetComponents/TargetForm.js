import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableWithoutFeedback, Text, Keyboard, TextInput, Dimensions } from "react-native";
import moment from "moment";
import general from "../../styles/general";
import { addData } from "../../modules/requests";
import CategoryList from "../General/CategoryList"; 
import MoneyInput from "../TransactionPageComponents/MoneyInput";
import CommonHeader from '../General/CommonHeader';
import DateBtns from "./DateBtns";
import CustomCalendar from "./CustomCalendar";
import styles from "../../styles/TransactionPage";
import { useRoute } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, schedulePushNotification } from "../../pushNotificationsUtils";
const { width, height } = Dimensions.get('window');

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  
export default function TargetForm({navigation}){
    const route = useRoute();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const transComment = useSelector(state => state.transData.comment);
    const transCash = useSelector(state => state.transData.cash);
    const transDate = useSelector(state => state.transData.date);

    const [value, setValue] = useState(transCash ? transCash : '');
    const [name, setName] = useState('');
    const [comment, setComment] = useState(transComment ? transComment : '');
    const [selectedDate, setSelectedDate] = useState(moment(new Date()));
    const [disabled, setDisabled] = useState(true);

    const [data, setData] = useState([]);
    const [isMove, setIsMove] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(transDate ? 3 : null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const notificationListener = useRef();
    const responseListener = useRef();

    const object = {
        value,
        data,
        showDatePicker,
        selectedBtn, 
        comment, 
        selectedDate,
        setIsMove, 
        setComment,
        setSelectedBtn,
        setValue,
        setSelectedDate,
        setShowDatePicker,
    };
    useEffect(() => {
        filterCategories();
    }, [categories]);
    useEffect(()=>{
        if (value > 0 && selectedDate && selectedCategory && name) {
            setDisabled(false);
          } else {
            setDisabled(true);
          }
    }, [value, selectedDate, selectedCategory, name]);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    const filterCategories = () =>{
        setData([...categories?.sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
            .slice(0, 5), 
        { id: 'add', color: '#FECC7A', image_link: process.env.API_PLUS_URL}]);
    }
    
    const handleAddTarget = async () => {
        // let result = await addData(`${process.env.API_URL}/goal`, {
        //     user_id: 3,
            // category_id: selectedCategory, 
            // name: name,
            // deadline: `${selectedDate.format('YYYY-MM-DD')}`, 
            // total_cash: value,
            // cash: 0,
            // last_cash: 0
        // });
        let index = categories.findIndex(item => item.id == selectedCategory);
        dispatch({type: "ADD_TARGET", payload: {
            id: `${new Date()}`,
            user_id: 3,
            color: categories[index].color, 
            image_link: categories[index].image_link, 
            image_color: categories[index].image_color, 
            name: name,
            deadline: `${selectedDate.format('YYYY-MM-DD')}`, 
            total_cash: value,
            cash: 0,
            last_cash: 0,
            last_installment_date: null

        }})
        navigation.navigate('Target');    
    }
    const handleAddPayment = async () => {
        let index = categories.findIndex(item => item.id == selectedCategory);
        dispatch({type: "ADD_PAYMENT", payload: {
            id: `${new Date()}`,
            user_id: 3,
            color: categories[index].color, 
            image_link: categories[index].image_link, 
            image_color: categories[index].image_color, 
            name: name,
            deadline: `${selectedDate.format('YYYY-MM-DD')}`, 
            cash: value
        }});
        schedulePaymentNotification();
        navigation.navigate('ScheduledPayments');    
    };
    const schedulePaymentNotification = async () => {
        const reminderDate = moment(selectedDate).subtract(2, 'days'); // За пару дней до даты      
        const sameDayDate = moment(selectedDate); // В тот же день
        console.log(sameDayDate)
        schedulePushNotification(reminderDate, sameDayDate);
    };
    return(
            <TouchableWithoutFeedback 
            onPress={() => {
                Keyboard.dismiss();
                setShowDatePicker(false);
                setIsMove(false);
                }}>
            <View style={[general.app, isMove ? general.isMove : null]}>

                <CommonHeader title={route.params?.isTarget ? 'Add Target' : 'Add Scheduled payments'} navigation={navigation}/>

                <View style={general.content}>
                <View style={{width: "90%", marginTop: "7%"}}>
                        <Text style={[general.generalText, {direction: 'rtl'}]}>Name of purpose</Text>
                        <TextInput 
                                placeholder="Enter name"
                                placeholderTextColor={"#D8D8D880"}
                                style={[general.inputComment, {width: "100%"}]}
                                value={name} 
                                onChangeText={(name) => {
                                    if(name.length < 15){
                                        setName(name)
                                    }
                                }
                                }/> 
                    </View>

                    <View style={{width: "90%", marginTop: "7%"}}>
                        <Text style={[general.generalText, {direction: 'rtl'}]}>Final amount</Text>
                        <MoneyInput object={object}/>
                    </View>

                    <CategoryList data={data} navigation={navigation}/>
                    <DateBtns object={object}/>
                    <CustomCalendar object={object}/>
                </View>
                <View style={{position: 'absolute', bottom: 30}}>
                    <TouchableWithoutFeedback disabled={disabled} onPress={() => route.params?.isTarget ? handleAddTarget() : handleAddPayment()}>
                        <View style={[styles.addBtn, disabled ? {backgroundColor: '#FECC7A50'} : {backgroundColor: '#FECC7A'}, {width: width * 0.7, height: height * 0.05}]}>
                            <Text style={styles.addText}>Add</Text>
                        </View>
                    </TouchableWithoutFeedback> 
                </View>
            </View>
            </TouchableWithoutFeedback>
    );
}