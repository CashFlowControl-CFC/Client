

const getData = async (url) =>{
    console.log('getData')
    try{
        const result = await fetch(url, {
            method: 'GET',
        })
        const data = await result.json();
        return data;
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
        const data = await result.json();
        return data;
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

export {
    getData,
    addData,
    removeData,
    updateData
}