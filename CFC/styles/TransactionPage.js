import { StyleSheet, Dimensions  } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    categories:{
        width: "90%",
        marginTop: "10%",
    },
    catList:{
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
    },
    catCircle:{
        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    catItem:{
        width: 85,
        height: 85,
        marginVertical: 3,
        marginHorizontal: 10,
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 100
    },
    dateRow:{
        width: "100%",
        height: "10%",
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    dateBtn:{
        backgroundColor: "#252525",
        borderRadius: 25,
        width: "25%",
        height: "70%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendar:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarPos:{
        flex: 1, 
        position:'absolute', 
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    addBtn: {
        marginTop: '20%',
        width: '80%',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    addText:{
        color: '#000000',
        fontSize: 19
    }
});

export const stylesLight = StyleSheet.create({
    dateBtn:{
        backgroundColor: "#92C142",
        borderRadius: 25,
        width: "25%",
        height: "70%",
        alignItems: 'center',
        justifyContent: 'center',
    },
});