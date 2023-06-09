import React, { useContext, useEffect } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import {styles, stylesLight} from "../../styles/MainPage";
import { MainContext } from "../../modules/context";
import getImage from "../../resources/imageComponent";
import { useSelector } from "react-redux";
import TransactionType from "../General/TransactionType";

function TotalMoney(){
    const {setModalVisible, setModalMenuVisible} = useContext(MainContext);
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const currentSymb = useSelector(state => state.currency.currentSymb);
    const currencyMoney = useSelector(state => state.currency.currencyMoney);
    useEffect(()=>{
    }, [currencyMoney, totalMoney])
    return(
        <View style={general.header}>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: '90%'}}>
                        <TouchableWithoutFeedback onPressIn={() => setModalMenuVisible(true)}>
                            <View style={{position: 'absolute', zIndex: 1,width: '20%'}}>
                                {getImage(process.env.API_MENU_URL, 30, 30, '#FFFFFF')}
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPressIn={() => setModalVisible(true)}>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", width: '100%', zIndex: 0}}>
                            {getImage(process.env.API_BAG_URL, 20, 20, '#FFFFFF')}
                            <Text style={[general.generalText, {fontSize: 20}]}>Total:</Text>
                            <Text style={styles.totalMoney}>{currentSymb}{currencyMoney?currencyMoney.toFixed(2):0}</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    </View>

                <TransactionType/>
            </View>
    );
}

export default TotalMoney;