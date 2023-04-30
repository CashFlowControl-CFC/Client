import {API_URL} from '@env'

const getData = async (url) =>{
    try{
        const result = await fetch(url, {
            method: 'GET'
        })
        const data = await result.json();
        return data;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

export {
    getData
}