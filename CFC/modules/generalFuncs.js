export const changeCurrencyFromUAH = (number, array, current) => {
    if(number && array && current){
        const currencyIndex = array?.findIndex(item => item.ccy == current);
        if(currencyIndex != -1){
            return Number((number / array[currencyIndex].sale).toFixed(2));
        }
    }
    return Number(number);
}
export const changeCurrencyToUAH = (number, array, current) => {
    if(number && array && current){
        const currencyIndex = array?.findIndex(item => item.ccy == current);
        if(currencyIndex != -1){
            return Number((number * array[currencyIndex].sale).toFixed(2));
        }
    }
    return Number(number);
}