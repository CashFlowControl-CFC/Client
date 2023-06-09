import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableWithoutFeedback, Text, FlatList, Keyboard, } from "react-native";
import general from "../../styles/general";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import moment from "moment";
import ModalRemove from "../General/ModalRemove";
import { removeData } from "../../modules/requests";
import { updateData } from "../../modules/requests";
import CreateBtn from "../General/CreateBtn";
import CommonHeader from "../General/CommonHeader";
import { changeCurrencyFromUAH, changeCurrencyToUAH } from "../../modules/generalFuncs";

export default function TransactionInfo({ navigation }) {
    const [isPressed, setPressed] = useState(undefined)
    const selectedTransaction = useSelector(state => state.transaction.selectedTransaction);
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const isIncome = useSelector(state => state.transaction.isIncome);
    const data = useSelector(state => state.transaction.data);
    const selected = useSelector(state => state.transData.selectedTransaction);
    const currentSymb = useSelector(state => state.currency.currentSymb);
    const current = useSelector(state => state.currency.current);
    const currency = useSelector(state => state.currency.currency);
    const user = useSelector(state => state.user.user);

    const [moneySum, setMoneySum] = useState(0);
    const [isNew, setIsNew] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        filter();
    }, [data, current]);

    useEffect(() => {
        
    }, [isNew])

    const filter = () => {
        const dataCurrency = data?.reduce((acc, cur) => {
            acc.push({ ...cur, y: current == 'UAH' ? Number(cur.y)?.toFixed(2) : changeCurrencyFromUAH(Number(cur.y), currency, current).toFixed(2) });
            return acc;
        }, []);
        let res = dataCurrency?.filter(item => item.x == selectedTransaction.x && item.isIncome == selectedTransaction.isIncome);
        setFilteredData(res?.sort((a, b) => (a.date != b.date) ? new Date(b.date).getTime() - new Date(a.date).getTime() : b.id - a.id));
        const sum = res?.reduce((acc, cur) => {
            acc.y = Number(acc.y) + Number(cur.y);
            return acc;
        }, { y: 0 });
        setMoneySum(sum.y.toFixed(2));
    }

    const handleRemove = async () => {
        let res = await removeData(`${process.env.API_URL}/transaction/${selected}`);
        console.log(res.status)
        if (res.status == 200) {
            let money = data.filter(item => item.id == selected)
            let newData = data.filter(item => item.id != selected);
            let filtered = filteredData.filter(item => item.id != selected);

            if (!isIncome) {
                dispatch({ type: 'ADD_INCOME', payload: money[0].y });
                dispatch({ type: 'SET_DATA', payload: newData });

                const sum = Number(totalMoney) + Number(money[0].y);
                await updateData(`${process.env.API_URL}/user/${user.uid}`, { total_cash: parseFloat(sum) });
                console.log(sum);
                dispatch({ type: 'SET_CURRENCY_MONEY', payload: await changeCurrencyFromUAH(sum, currency, current) });
            }
            else {
                dispatch({ type: 'ADD_EXPENSES', payload: money[0].y });
                dispatch({ type: 'SET_DATA', payload: newData });

                const sum = Number(totalMoney) - Number(money[0].y);
                await updateData(`${process.env.API_URL}/user/${user.uid}`, { total_cash: parseFloat(sum) });
                console.log(sum);
                dispatch({ type: 'SET_CURRENCY_MONEY', payload: await changeCurrencyFromUAH(sum, currency, current) });
            }

            if (filtered.length <= 0) {
                navigation.goBack();
            }
        } else{
            alert('Sorry, unable to remove!\nWe are already working on it :)');
        }
        setModalVisible(false);
    }
    const showModal = (id) => {
        setPressed(false)
        setModalVisible(true);
        dispatch({ type: 'SET_SELECTED_TRANS', payload: id });
    }
    const handleEdit = (id) => {
        try {
            let filtered = filteredData.filter(item => item.id == id);

            dispatch({ type: 'SET_SELECTED', payload: filtered[0].category_id });
            dispatch({ type: 'SET_TRANS_CASH', payload: filtered[0].y.toString() });
            dispatch({ type: 'SET_COMMENT', payload: filtered[0].comment ? filtered[0].comment.toString() : undefined });
            dispatch({ type: 'SET_DATE', payload: filtered[0].date ? filtered[0].date : undefined });
            dispatch({ type: 'SET_ISADD', payload: false });
            dispatch({ type: 'SET_SELECTED_TRANS', payload: Number(filtered[0].id) });

            navigation.navigate('Transaction');
        }
        catch (err) {
            console.log(err);
        }
    }
    const handlePressIn = (id) => {
        setPressed(id)

    };

    const handlePressOut = () => {
        setPressed(undefined)

    };
    const filterByDate = (isNew) => {
        setIsNew(isNew);
        if(isNew){
            setFilteredData(filteredData?.sort((a, b) => (a.date != b.date) ? new Date(b.date).getTime() - new Date(a.date).getTime() : b.id - a.id));
        }
        else{
            setFilteredData(filteredData?.sort((a, b) => (a.date != b.date) ? new Date(a.date).getTime() - new Date(b.date).getTime() : b.id - a.id));
        }
    }
    return (
        <View style={general.app}>
            <ModalRemove modalVisible={modalVisible} close={() => setModalVisible(false)} action={handleRemove} />

            <CommonHeader navigation={navigation} title={`${selectedTransaction.x} ${currentSymb}${moneySum}`} image_link={selectedTransaction.image_link} />
            <View style={general.content} >
                <View style={{flexDirection: 'row', marginTop: '5%', justifyContent: 'space-between', width: '85%'}}>
                    <View style={{flexDirection: 'row', gap: 5}}>
                        {getImage(process.env.API_BAG_URL, 20, 20, '#FFFFFF')}
                        <Text style={general.generalText}>Total</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => filterByDate(!isNew)}>
                        <View style={{flexDirection: 'row', gap: 5}}>
                            <Text style={general.generalText}>By date</Text>
                            {getImage(process.env.API_CALENDAR_URL, 20, 20, '#FFFFFF')}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <FlatList keyExtractor={item => item.id} style={{ marginTop: 25 }}
                    data={filteredData}
                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback activeOpacity={1} onPressIn={() => handlePressIn(item.id)} onPressOut={handlePressOut} onLongPress={() => showModal(item.id)} onPress={() => handleEdit(item.id)}>
                            <View>
                                <Text style={[general.generalText, { color: '#D8D8D8', marginBottom: 10, marginLeft: 15 }]}>{moment(item.date).format('MMM DD, YYYY')}</Text>
                                <View style={[styles.category, isPressed == item.id && styles.categoryPressed, { backgroundColor: item.fill + "20" }]}>
                                    <View style={[styles.circle, { backgroundColor: item.fill }]}>
                                        {getImage(item.image_link, 25, 25, item.image_color)}
                                    </View>
                                    <View style={{ width: "70%", flexDirection: "row", justifyContent: "space-between" }}>
                                        <View>
                                            <Text style={styles.categoryText}>{item.x}</Text>
                                            {item.comment ? <Text style={[general.generalText, { fontSize: 15, color: '#D8D8D8' }]}>
                                                {item.comment}
                                            </Text> : <></>}
                                        </View>
                                        <Text style={[styles.categoryText, { direction: 'ltr', alignSelf: 'center' }]}>{currentSymb}{item.y}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    } />
            </View>
            <View style={[general.transAddBtn, general.addBtn]}>
                <CreateBtn navigation={navigation} selected_category={selectedTransaction.category_id} />
            </View>
        </View>
    );
}