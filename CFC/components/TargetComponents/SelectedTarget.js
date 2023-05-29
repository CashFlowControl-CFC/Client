import React from "react";
import { Text, View} from "react-native";
import general from "../../styles/general";
import moment from "moment";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";

function SelectedTarget(props){
    return (
        <View style={{width: "95%", marginTop: '10%', gap: 10}}>
                        <Text style={[general.deadlineText]}>Deadline: {moment(props.target.deadline).format('DD.MM.YYYY')}</Text>
                        <View style={[styles.category, {backgroundColor: props.target.color + "20"}]}>
                                    <View style={[styles.circle, {backgroundColor: props.target.color}]}>
                                        {getImage(props.target.image_link, 25, 25, props.target.image_color)}
                                    </View>
                                    <View style={{width:"70%", flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.categoryText}>{props.target.name}</Text>
                                            <Text style={[styles.categoryText, {color: '#D8D8D890'}]}>{props.target.percent}%({props.target.cash}$)</Text>
                                            <Text style={[styles.categoryText, {direction: 'ltr'}]}>{props.target.total_cash}$</Text>
                                    </View>
                                </View> 
                    </View>     
    );
}

export default SelectedTarget;