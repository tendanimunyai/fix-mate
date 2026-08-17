import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {Platform} from 'react-native';
import {AppAlert,NotificationToken,Role} from '../types';

const notificationChannelId='fixmate-alerts';

Notifications.setNotificationHandler({
 handleNotification:async()=>({
  shouldShowBanner:true,
  shouldShowList:true,
  shouldPlaySound:true,
  shouldSetBadge:false,
  priority:Notifications.AndroidNotificationPriority.HIGH
 })
});

const projectId=()=>Constants.easConfig?.projectId||Constants.expoConfig?.extra?.eas?.projectId;

export const notificationTokenId=(userId:string,token:string)=>`${userId}_${token.replace(/[^a-zA-Z0-9]/g,'_').slice(-80)}`;

export async function registerForPushNotifications(enabled:boolean):Promise<string|null>{
 if(Platform.OS==='web'||!enabled)return null;
 if(Platform.OS==='android'){
  await Notifications.setNotificationChannelAsync(notificationChannelId,{
   name:'FixMate alerts',
   importance:Notifications.AndroidImportance.HIGH,
   vibrationPattern:[0,250,250,250],
   lightColor:'#3157D5',
   lockscreenVisibility:Notifications.AndroidNotificationVisibility.PUBLIC
  });
 }
 const current=await Notifications.getPermissionsAsync();
 let status=current.status;
 if(status!=='granted')status=(await Notifications.requestPermissionsAsync()).status;
 if(status!=='granted')return null;
 const easProjectId=projectId();
 if(!easProjectId){
  console.warn('Expo push token unavailable: missing EAS project id.');
  return null;
 }
 const token=await Notifications.getExpoPushTokenAsync({projectId:easProjectId});
 return token.data;
}

export function buildNotificationToken(userId:string,role:Role,token:string,enabled:boolean):NotificationToken{
 return {id:notificationTokenId(userId,token),userId,role,token,enabled,platform:Platform.OS};
}

export async function presentLocalAlertNotification(alert:AppAlert):Promise<void>{
 if(Platform.OS==='web')return;
 await Notifications.scheduleNotificationAsync({
  content:{
   title:alert.title,
   body:alert.text,
   sound:'default',
   data:{alertId:alert.id,requestId:alert.requestId||'',type:alert.type||'system'}
  },
  trigger:null
 });
}

export async function sendExpoPushNotifications(tokens:string[],alert:AppAlert):Promise<void>{
 const uniqueTokens=[...new Set(tokens)].filter(Boolean);
 if(!uniqueTokens.length)return;
 const messages=uniqueTokens.map(token=>({
  to:token,
  sound:'default',
  title:alert.title,
  body:alert.text,
  data:{alertId:alert.id,requestId:alert.requestId||'',type:alert.type||'system'}
 }));
 for(let index=0;index<messages.length;index+=100){
  const chunk=messages.slice(index,index+100);
  const response=await fetch('https://exp.host/--/api/v2/push/send',{
   method:'POST',
   headers:{Accept:'application/json','Content-Type':'application/json'},
   body:JSON.stringify(chunk)
  });
  if(!response.ok)console.warn('Expo push send failed',response.status,await response.text());
 }
}
