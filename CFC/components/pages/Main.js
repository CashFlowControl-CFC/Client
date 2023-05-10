import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import moment from "moment";
import general from "../../styles/general";
import { getData } from "../../modules/requests";
import { MainContext } from "../../modules/context";
import Period from "../MainPageComponents/Period";
import PieChart from "../MainPageComponents/PieChart";
import ModalCash from "../MainPageComponents/ModalCash";
import TotalMoney from "../MainPageComponents/TotalMoney";
import PeriodButtons from "../MainPageComponents/PeriodButtons";
import TransactionList from "../MainPageComponents/TransactionList";
import {API_URL} from '@env'

export default function Main({navigation}){
    const dispatch = useDispatch();

    const [filterDate, setFilterDate] = useState(moment(new Date()).format("YYYY-MM-D"));
    const [selectedPeriod, setSelectedPeriod] = useState('Day');
    const [step, setStep] = useState(0);

    const [filteredData, setFilteredData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const contextValue = {
        modalVisible, 
        step, 
        selectedPeriod, 
        filteredData,
        navigation,
        combinedData,
        filterDate,
        setModalVisible, 
        setStep, 
        setSelectedPeriod,
        setFilteredData,
        setFilterDate
    };

    useEffect(() => {
        loadData();
      }, []);

      useEffect(() =>{
          combine();
      }, [filteredData]);

    const loadData = async () =>{
        await dispatch({type: 'SET_DATA', payload: await getData(`${API_URL}/load/1`)});
        await dispatch({type: 'SET_CATEGORIES', payload: await getData(`${API_URL}/category`)});
    }

    const combine = () =>{
        const newData = filteredData?.reduce((acc, cur) => {
            const index = acc.findIndex(item => item.x === cur.x);
            if (index === -1) {
              acc.push({ x: cur.x, y: Number(cur.y), fill: cur.fill, id: cur.id, image_link: cur.image_link, image_color: cur.image_color, isIncome: cur.isIncome });
            } else {
              acc[index].y = Number(acc[index].y) + Number(cur.y);
            }
            return acc;
          }, []);
          setCombinedData(newData);
    }
    
    return(
    <MainContext.Provider value={contextValue}>
        <View style={general.app}>
            <ModalCash/>
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