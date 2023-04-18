import { StyleSheet, Dimensions  } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
        width: 80,
        height: 80,
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
    }
});

export default styles;