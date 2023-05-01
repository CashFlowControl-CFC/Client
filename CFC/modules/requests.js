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

const addData = async (url, object) =>{
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

export {
    getData,
    addData
}