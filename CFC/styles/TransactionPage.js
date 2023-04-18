import { StyleSheet, Dimensions  } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    categories:{
        width: "90%",
        marginTop: "10%",
        flex: 1
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
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 100
    }
});

export default styles;