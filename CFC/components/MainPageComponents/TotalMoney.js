import React, { useContext } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import general from "../../styles/general";
import styles from "../../styles/MainPage";
import { MainContext } from "../../modules/context";
import getImage from "../../resources/imageComponent";
import { useSelector } from "react-redux";
import TransactionType from "../General/TransactionType";

function TotalMoney(){
    const {setModalVisible} = useContext(MainContext);
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    return(
        <View style={general.header}>
                <TouchableWithoutFeedback onPressIn={() => setModalVisible(true)}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {getImage(process.env.API_BAG_URL, 20, 20, '#FFFFFF')}
                        <Text style={[general.generalText, {fontSize: 20}]}>Total:</Text>
                        <Text style={styles.totalMoney}>${totalMoney}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TransactionType/>
            </View>
    );
}

export default TotalMoney;