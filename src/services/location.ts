import {Platform} from 'react-native';
import * as ExpoLocation from 'expo-location';
import {Coordinates} from '../types';

export async function getCurrentLocation():Promise<Coordinates|null>{
  try{
    if(Platform.OS==='web'){
      if(!navigator.geolocation)return null;
      return await new Promise<Coordinates|null>(resolve=>navigator.geolocation.getCurrentPosition(position=>resolve({latitude:position.coords.latitude,longitude:position.coords.longitude}),()=>resolve(null),{enableHighAccuracy:true,timeout:10000,maximumAge:60000}));
    }
    const permission=await ExpoLocation.requestForegroundPermissionsAsync();
    if(permission.status!=='granted')return null;
    const position=await ExpoLocation.getCurrentPositionAsync({accuracy:ExpoLocation.Accuracy.Balanced});
    return {latitude:position.coords.latitude,longitude:position.coords.longitude};
  }catch{return null;}
}

export function distanceInKm(from:Coordinates,to?:Coordinates){
  if(!to)return null;
  const earthRadius=6371;
  const latDelta=(to.latitude-from.latitude)*Math.PI/180;
  const lonDelta=(to.longitude-from.longitude)*Math.PI/180;
  const a=Math.sin(latDelta/2)**2+Math.cos(from.latitude*Math.PI/180)*Math.cos(to.latitude*Math.PI/180)*Math.sin(lonDelta/2)**2;
  return earthRadius*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

export function formatDistance(distance:number|null){
  if(distance===null)return 'Distance unavailable';
  return distance<1?`${Math.round(distance*1000)} m away`:`${distance.toFixed(1)} km away`;
}
