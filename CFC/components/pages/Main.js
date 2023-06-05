import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import general from "../../styles/general";
import { getData, updateData, removeData, addData } from "../../modules/requests";
import { MainContext } from "../../modules/context";
import Period from "../MainPageComponents/Period";
import PieChart from "../MainPageComponents/PieChart";
import ModalCash from "../MainPageComponents/ModalCash";
import TotalMoney from "../MainPageComponents/TotalMoney";
import PeriodButtons from "../MainPageComponents/PeriodButtons";
import TransactionList from "../MainPageComponents/TransactionList";
import ModalMenu from "../MainPageComponents/ModalMenu";
import { changeCurrencyFromUAH, changeCurrencyToUAH } from "../../modules/generalFuncs";

export default function Main({navigation}){
    const dispatch = useDispatch();

    const [filterDate, setFilterDate] = useState(moment(new Date()).format("YYYY-MM-D"));
    const [selectedPeriod, setSelectedPeriod] = useState('Day');
    const [step, setStep] = useState(0);

    const [filteredData, setFilteredData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMenuVisible, setModalMenuVisible] = useState(false);
    const user = useSelector(state => state.user.user);

    const current = useSelector(state => state.currency.current);
    const currency = useSelector(state => state.currency.currency);
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const payments = useSelector(state => state.payment.payments);

    const contextValue = {
        modalVisible, 
        step, 
        selectedPeriod, 
        filteredData,
        navigation,
        combinedData,
        filterDate,
        modalMenuVisible,
        setModalVisible, 
        setStep, 
        setSelectedPeriod,
        setFilteredData,
        setFilterDate,
        setModalMenuVisible
    };
    useEffect(() => {
        loadData();
      }, []);

      useEffect(() =>{
          combine();
      }, [filteredData, current]);

      useEffect(() => {
        setCurrency();
      }, [totalMoney]);

      useEffect(() => {
         checkIsPaymentExpired();
      }, [payments]);

    const loadData = async () =>{
        await dispatch({type: 'SET_TOTALMONEY', payload: Number(user.total_cash)});
        const result = await getData(`${process.env.API_URL}/load/${user.uid}`);
        await dispatch({type: 'SET_DATA', payload: result.transaction});
        await dispatch({type: 'SET_CATEGORIES', payload: result.category});
        await dispatch({type: 'SET_ICONS', payload: result. icons});
        await dispatch({type: 'SET_DEFAULT_CATEGORIES', payload: result.default_categories});
        await dispatch({type: 'SET_TARGETS', payload: result.goal});
        await dispatch({type: 'SET_PAYMENTS', payload: result.remainder});
        await dispatch({type: 'SET_CURRENCY', payload: await getData(process.env.API_PRIVAT_URL)});
    }
    const checkIsPaymentExpired = async () => {
        payments.reduce((acc, cur) => {
            if(moment(cur.dateRemainde).format('YYYY-MM-DD') <= moment(new Date()).format('YYYY-MM-DD')){
                addTransaction(cur);
                removePayment(cur.id);
            }
        }, []);
    }
    const addTransaction = async (item) => {
        let valueCurrency = Number(item.cash);
        if(current != 'UAH'){
            valueCurrency = changeCurrencyToUAH(Number(item.cash), currency, current);
            console.log(valueCurrency);
        }
        dispatch({type: 'ADD_EXPENSES', payload: parseFloat(valueCurrency)});
        let result = await addData(`${process.env.API_URL}/transaction`, {
            category_id: item.category_id, 
            uid: user.uid, 
            date: `${moment(item.dateRemainde).format('YYYY-MM-DD')}`,
            cash: valueCurrency, 
            isIncome: false
        })
        await dispatch({type: 'ADD_TRANSACTION', payload: result}); 
    }
    const removePayment = async (id) =>{
        let result = await removeData(`${process.env.API_URL}/remainder/${id}`);
        if(result.status == 200){
           let newData = payments.filter(item => item.id != id);
           dispatch({type: 'SET_PAYMENTS', payload: newData});
        }
   }
    const setCurrency = async () => {
        const currencyIndex = currency.findIndex(item => item.ccy == current);
        if(currencyIndex != -1){
            await dispatch({type: 'SET_CURRENCY_MONEY', payload: Math.round(Number(totalMoney) / Number(currency[currencyIndex].sale))})
        }
        else{
            await dispatch({type: 'SET_CURRENCY_MONEY', payload: Number(totalMoney)})
        }
    }
    const combine = () =>{
        const newData = filteredData?.reduce((acc, cur) => {
            const index = acc.findIndex(item => item.x === cur.x);
            if (index === -1) {
              acc.push({ x: cur.x, 
                y: current == 'UAH' ? Number(cur.y).toFixed(2) : changeCurrencyFromUAH(Number(cur.y), currency, current).toFixed(2), 
                fill: cur.fill, 
                id: cur.id, 
                image_link: 
                cur.image_link, 
                image_color: 
                cur.image_color, 
                isIncome: cur.isIncome,
                category_id: cur.category_id });
            } else {
              acc[index].y = (Number(acc[index].y) + (current == 'UAH' ? (Number(cur.y))
              : changeCurrencyFromUAH((Number(cur.y)), currency, current))).toFixed(2);
            }
            return acc;
          }, []);
          setCombinedData(newData);
    }
    const handleSetMoney = async (value) =>{
        let valueCurrency = value;
        if(current != 'UAH'){
            valueCurrency = changeCurrencyToUAH(value, currency, current);
        }
        let res = await updateData(`${process.env.API_URL}/user/${user.uid}`, {total_cash: parseFloat(Number(valueCurrency))})
        if(res.status == 200){
            dispatch({type:'SET_TOTALMONEY', payload: valueCurrency ? Number(valueCurrency) : Number(totalMoney)});
            setModalVisible(false);
        }
    }
    const object = {
        modalVisible: modalVisible, 
        setModalVisible: setModalVisible, 
        action: handleSetMoney,
        isTotalCash: true
    }
    return(
    <MainContext.Provider value={contextValue}>
        <View style={general.app}>
            <ModalCash object={object}/>
            <ModalMenu/>
            <TotalMoney/>

            <View style={general.content} >
                <PeriodButtons/>
                <Period/>
                <PieChart/>
                <TransactionList/>
            </View>
        </View>
    </MainContext.Provider>
    );
}