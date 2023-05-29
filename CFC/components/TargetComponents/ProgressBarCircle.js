import React from "react";
import { Text} from "react-native";
import ProgressCircle from 'react-native-progress-circle'

function ProgressBarCircle(props){
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
        <Text style={{ fontSize: 21, color: '#D8D8D8', position: 'absolute', bottom: 25 }}>{props.target.cash}$/{props.target.total_cash}$</Text>
    </ProgressCircle>     
    );
}

export default ProgressBarCircle;