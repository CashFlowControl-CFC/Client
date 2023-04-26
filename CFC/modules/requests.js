import {API_URL} from '@env'

const getTransactions = async (url) =>{
    try{
        const result = await fetch(url, {
            method: 'GET'
        })
        const data = await result.json();
        console.log(data)
        return data;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

export {
    getTransactions
}