

const getData = async (url) =>{
    console.log('getData')
    try{
        const result = await fetch(url, {
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
    console.log('addData')
    try{
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
    console.log('removeData')
    try{
        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
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
    console.log('updateData')
    try{
        const result = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
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
    try{
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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