import React, { useContext, useEffect, useState } from "react";
import { View,  Text} from "react-native";
import { VictoryPie } from "victory-native";
import { MainContext } from "../../modules/context";
import { useDispatch } from "react-redux";
import CreateBtn from "../General/CreateBtn";
import general from "../../styles/general";

function PieChart(){
    const {combinedData, filteredData, navigation} = useContext(MainContext);
    const [transactionMoney, setTransactionMoney] = useState(0);
    const dispatch = useDispatch();
    useEffect(() =>{
        sum();
    }, [filteredData]);
    const sum = () =>{
         const total = filteredData?.reduce((acc, cur) => Number(acc) + Number(cur.y), 0);
         setTransactionMoney(total);
    }
    return (
            <View style={{alignItems: "center", justifyContent: 'center'}}>
            <VictoryPie
                data={combinedData?.length > 0 ? combinedData : [{ y: 1, fill: "#1E1E1E70"}]}
                width={250}
                height={250}
                innerRadius={70}
                radius={100}
                padding={{ top: 0, bottom: 0 }}
                style={{
                labels: {
                fill: 'transparent',
                }, 
                data:{
                    fill: ({ datum }) => datum.fill,
                }
            }}
            padAngle={3}
                /> 
                <View style={[general.pieAddBtn, general.addBtn]}>
                    <CreateBtn navigation={navigation} selected_category={null}/>
                </View>
        <Text style={{
            position: 'absolute',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 25,
            }}> ${transactionMoney?transactionMoney:0} </Text>
        </View>     
    );
}

export default PieChart;