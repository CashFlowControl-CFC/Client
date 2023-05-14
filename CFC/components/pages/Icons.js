import React, { useEffect, useState } from "react";
import { View, Text} from "react-native";
import general from "../../styles/general";
import { useSelector } from "react-redux";
import IconsList from "../IconListComponents/IconsList";

function Icons({navigation}){
    const icons = useSelector(state => state.icon.icons);
    const iconType = useSelector(state => state.icon.iconType);
    const [data, setData] = useState([]);
    useEffect(()=>{
        filter();
    },[]);
    const filter = () =>{
        if(iconType){
           setData(icons.filter(item => item.category_id == iconType));
        }
        else{
           setData(icons);
        }
    }
    return (
            <View style={general.app}>
                <View style={general.header}>
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={[general.generalText, { fontSize: 20  }]}>Icons</Text>
                        </View>
                </View>     

                    <View style={general.content} >
                        <IconsList data={data} navigation={navigation}/>
                    </View>
            </View>
    );
}

export default Icons;