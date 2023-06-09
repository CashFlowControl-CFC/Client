import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
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
import { getCurrency } from "../../modules/storage";

export default function Main({navigation}){
    const dispatch = useDispatch();

    const [filterDate, setFilterDate] = useState(moment(new Date()).format("YYYY-MM-D"));
    const [selectedPeriod, setSelectedPeriod] = useState('Day');
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [transactionMoney, setTransactionMoney] = useState(0);

    const [filteredData, setFilteredData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMenuVisible, setModalMenuVisible] = useState(false);
    const user = useSelector(state => state.user.user);
    const theme = useSelector(state => state.user.theme);

    const current = useSelector(state => state.currency.current);
    const currency = useSelector(state => state.currency.currency);
    const symbols = useSelector(state => state.currency.symbols);
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
        transactionMoney,
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

      useEffect(() => {
        changeCurrency();
     }, [currency]);

    const loadData = async () =>{
        await dispatch({type: 'SET_TOTALMONEY', payload: Number(user.total_cash)});
        const result = await getData(`${process.env.API_URL}/load/${user.uid}`);
        await dispatch({type: 'SET_DATA', payload: result.transaction ? result.transaction : []});
        await dispatch({type: 'SET_CATEGORIES', payload: result.category? result.category : []});
        await dispatch({type: 'SET_ICONS', payload: result. icons? result.icons : []});
        await dispatch({type: 'SET_DEFAULT_CATEGORIES', payload: result.default_categories? result.default_categories : []});
        await dispatch({type: 'SET_TARGETS', payload: result.goal? result.goal : []});
        await dispatch({type: 'SET_PAYMENTS', payload: result.remainder? result.remainder : []});
        await dispatch({type: 'SET_CURRENCY', payload: await getData(process.env.API_PRIVAT_URL)});
        setLoading(false);
    }
    const changeCurrency = async () => {
        const currencyRes = await getCurrency();
        if(currencyRes.currency){
            const index = symbols?.findIndex(item => item.name == currencyRes.currency);
            const currencyIndex = currency.findIndex(item => item.ccy == symbols[index].name);
            dispatch({type: 'SET_CURRENT', payload: symbols[index]?.name});
            dispatch({type: 'SET_CURRENT_SYMB', payload: symbols[index]?.symb});
            if(currencyIndex != -1){
                await dispatch({type: 'SET_CURRENCY_MONEY', payload: Number(totalMoney) / Number(currency[currencyIndex].sale)})
            }
            else{
                await dispatch({type: 'SET_CURRENCY_MONEY', payload: Number(totalMoney)})
            }
        }
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
        }
        let result = await addData(`${process.env.API_URL}/transaction`, {
            category_id: item.category_id, 
            uid: user.uid, 
            date: `${moment(item.dateRemainde).format('YYYY-MM-DD')}`,
            cash: valueCurrency, 
            isIncome: false,
            comment: item.name
        })
        if(result){
            dispatch({type: 'ADD_EXPENSES', payload: parseFloat(valueCurrency)});
            await dispatch({type: 'ADD_TRANSACTION', payload: result}); 
        }else{
            alert('Sorry, unable to add transaction!\nWe are already working on it :)');
        }
    }
    const removePayment = async (id) =>{
        let result = await removeData(`${process.env.API_URL}/remainder/${id}`);
        if(result.status == 200){
           let newData = payments.filter(item => item.id != id);
           dispatch({type: 'SET_PAYMENTS', payload: newData});
        }
   }
    const setCurrency = async () => {
        console.log('totalMoney', totalMoney)
        if(!loading){
            await updateData(`${process.env.API_URL}/user/${user.uid}`, {total_cash: parseFloat(totalMoney)});
        }
        const currencyIndex = currency.findIndex(item => item.ccy == current);
        if(currencyIndex != -1){
            await dispatch({type: 'SET_CURRENCY_MONEY', payload: Math.round(Number(totalMoney) / Number(currency[currencyIndex].sale))});
        }
        else{
            await dispatch({type: 'SET_CURRENCY_MONEY', payload: Number(totalMoney)});
        }
    }
    const combine = async () =>{
        const newData = await filteredData?.reduce((acc, cur) => {
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
          countPercent(newData);
    }
    const countPercent = async (data) => {
        const total = filteredData?.reduce((acc, cur) => Number(acc) + Number(cur.y), 0);
          setTransactionMoney(changeCurrencyFromUAH((Number(total)), currency, current).toFixed(2));
          let newData = await data?.reduce((acc, cur) => {
            acc.push({...cur, 
            percent: Math.round((cur.y * 100) / total)
            });
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
        else{
            alert('Sorry, unable to change!\nWe are already working on it :)');
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
        <View style={theme == 'dark' ? general.app : generalLight.app}>
        {loading ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
            <ActivityIndicator size='large' color="#fcbe53"/>
        </View>  :
        <>
            <ModalCash object={object}/>
            <ModalMenu/>
            <TotalMoney/>

            <View style={theme == 'dark' ? general.content : generalLight.content} >
                <PeriodButtons/>
                <Period/>
                <PieChart/>
                <TransactionList/>
            </View>
        </>}
        </View>
    </MainContext.Provider>
    );
}