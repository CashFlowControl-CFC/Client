import * as SecureStore from 'expo-secure-store';

// Збереження accesstoken
const saveAccessToken = async (accessToken) => {
  try {
    await SecureStore.setItemAsync('accessToken', accessToken);
    console.log('Accesstoken збережено.');
  } catch (error) {
    console.log('Помилка при збереженні accesstoken:', error);
  }
};

// Отримання accesstoken
const getAccessToken = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    return {accessToken:accessToken};
  } catch (error) {
    console.log('Помилка при отриманні accesstoken:', error);
    return null;
  }
};

// Видалення accesstoken
const removeAccessToken = async () => {
  try {
    await SecureStore.deleteItemAsync('accessToken');
    console.log('Accesstoken видалено.');
  } catch (error) {
    console.log('Помилка при видаленні accesstoken:', error);
  }
};

const saveCurrency = async (currency) => {
  try {
    await SecureStore.setItemAsync('currency', currency);
    console.log('Currency збережено.');
  } catch (error) {
    console.log('Помилка при збереженні Currency:', error);
  }
};

const getCurrency = async () => {
  try {
    const currency = await SecureStore.getItemAsync('currency');
    return {currency:currency};
  } catch (error) {
    console.log('Помилка при отриманні Currency:', error);
    return null;
  }
};

export{
    saveAccessToken,
    getAccessToken,
    removeAccessToken,
    saveCurrency,
    getCurrency
}