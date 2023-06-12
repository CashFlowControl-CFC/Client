
import { getAccessToken,getRefreshToken } from "./storage";


const getData = async (url) =>{
    const accessToken = await getAccessToken();
    console.log('getData')
    try{
        const result = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'authorization':`Bearer ${accessToken?.accessToken}`
              },
            method: 'GET',
        })
        if(result.status == 200){
            const data = await result.json();
            return data;
        }
        return null;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

const addData = async (url, object) =>{
    const accessToken = await getAccessToken();
    console.log('addData')
    try{
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken?.accessToken
              },
            body: JSON.stringify(object),
        })
        if(result.status == 200){
            console.log("200")
            const data = await result.json();
            return data;
        }
        return null;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

const removeData = async (url) =>{
    const accessToken = await getAccessToken();
    console.log('removeData')
    try{
        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken.accessToken
              },
        })
        return result;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

const updateData = async (url, object) =>{
    const accessToken = await getAccessToken();

    console.log('updateData')
    try{
        const result = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken.accessToken
              },
            body: await JSON.stringify(object)
        })
        return result;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

const login = async (url, object) =>{
    const accessToken = await getAccessToken();
    try{
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken.accessToken
              },
            body: JSON.stringify(object),
        })
        return result;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export {
    getData,
    addData,
    removeData,
    updateData,
    login
}