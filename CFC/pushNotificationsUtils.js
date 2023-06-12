import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Calling getExpoPushTokenAsync without specifying a projectId is deprecated and will no longer be supported in SDK 49+', 
'[Unhandled promise rejection: Error: Failed to schedule notification. time interval must be greater than 0]']);

  export async function schedulePushNotification(reminderDate, sameDayDate) {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      if(moment(reminderDate).format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')){
        await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Скоро будет снят платеж!',
              body: 'Скоро будет снят платеж!',
            },
            trigger: {
              date: new Date(reminderDate.year(), reminderDate.month(), reminderDate.date(), 9, 0) 
            }
          });
      }
      if(moment(sameDayDate).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD')){
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Сегодня будет снят платеж!',
            body: 'Сегодня будет снят платеж!',
          },
          trigger: {
            date: new Date(sameDayDate.year(), sameDayDate.month(), sameDayDate.date(), 9, 0)
          },
        });
      }
  };

  export async function registerForPushNotificationsAsync() {
    let token;
    try{
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } 
    
      return token;
    }catch(error){
      console.log(error);
    }
  }