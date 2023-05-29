import React from "react";
import { Text} from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import { useRoute } from "@react-navigation/native";

function ProgressBarCircle(props){
    const route = useRoute();
    return (
        <ProgressCircle
        percent={props.target.percent}
        radius={100}
        borderWidth={17}
        color={`${props.target.color}`}
        shadowColor={`#4f4e4e`}
        bgColor="#2F2F2F"
    >
        <Text style={{ fontSize: 30, color: '#FFFFFF' }}>{props.target.percent}%</Text>
    </ProgressCircle>     
    );
}

export default ProgressBarCircle;