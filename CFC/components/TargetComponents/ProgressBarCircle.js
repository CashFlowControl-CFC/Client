import React from "react";
import { Text, View} from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import { useSelector } from "react-redux";

function ProgressBarCircle(props){
    const currentSymb = useSelector(state => state.currency.currentSymb);
    return (
        <ProgressCircle
        percent={props.target.percent}
        radius={100}
        borderWidth={17}
        color={`${props.target.color}`}
        shadowColor={`#4f4e4e`}
        bgColor="#2F2F2F"
    >
        <Text style={{ fontSize: 30, color: '#FFFFFF', fontWeight: 700 }}>{props.target.percent}%</Text>
        <View style={{position: 'absolute', bottom: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, color: '#D8D8D8'}}>{props.target.cash}{currentSymb}/</Text>
            <Text style={{ fontSize: 17, color: '#D8D8D8' }}>{props.target.total_cash}{currentSymb}</Text>
        </View>
    </ProgressCircle>     
    );
}

export default ProgressBarCircle;