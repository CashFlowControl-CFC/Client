import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import moment from 'moment';

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
    
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Сегодня будет снят платеж!',
          body: 'Сегодня будет снят платеж!',
        },
        trigger: {
          date: new Date(sameDayDate.year(), sameDayDate.month(), sameDayDate.date(), 9, 0)
        },
      });
  };

  export async function registerForPushNotificationsAsync() {
    let token;
  
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
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }