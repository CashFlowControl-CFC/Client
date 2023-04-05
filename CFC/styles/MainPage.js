import { StyleSheet, Dimensions  } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
       app:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#1E1E1E',
       },
       content:{
        backgroundColor: '#2F2F2F',
        width: 0.9 * width,
        height: 0.8 * height,
        borderTopStartRadius: "40%",
        borderTopEndRadius: "40%",
        alignItems: "center"
       },
       periodText:{
        color: '#D8D8D8',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
       },
       periodBtns:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "10%",
       },
       pieChart:{
        height: height * 0.25,
       }
    }
)

export default styles;