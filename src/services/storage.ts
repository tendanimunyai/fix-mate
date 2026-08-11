import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthSession,Complaint,Message,Request,Review,UserProfile,ProviderAccountStatus,ProviderAvailability} from '../types';
const keys={requests:'fixmate.requests',favourites:'fixmate.favourites',messages:'fixmate.messages',reviews:'fixmate.reviews',profile:'fixmate.profile',providerStatuses:'fixmate.providerStatuses',availability:'fixmate.availability',session:'fixmate.session',complaints:'fixmate.complaints'};
async function read<T>(key:string,fallback:T):Promise<T>{try{const raw=await AsyncStorage.getItem(key);return raw?JSON.parse(raw) as T:fallback;}catch{return fallback;}}
async function write<T>(key:string,value:T){try{await AsyncStorage.setItem(key,JSON.stringify(value));}catch{}}
export const loadRequests=()=>read<Request[]>(keys.requests,[]); export const saveRequests=(v:Request[])=>write(keys.requests,v);
export const loadFavourites=()=>read<string[]>(keys.favourites,[]); export const saveFavourites=(v:string[])=>write(keys.favourites,v);
export const loadMessages=()=>read<Message[]>(keys.messages,[]); export const saveMessages=(v:Message[])=>write(keys.messages,v);
export const loadReviews=()=>read<Review[]>(keys.reviews,[]); export const saveReviews=(v:Review[])=>write(keys.reviews,v);
export const loadProfile=()=>read<UserProfile>(keys.profile,{name:'Alex Morgan',email:'alex@example.com',phone:'',address:'12 Long Street, Cape Town',notifications:true,role:'customer'}); export const saveProfile=(v:UserProfile)=>write(keys.profile,v);
export const loadProviderStatuses=()=>read<Record<string,ProviderAccountStatus>>(keys.providerStatuses,{p1:'approved',p2:'approved',p3:'approved',p4:'pending'}); export const saveProviderStatuses=(v:Record<string,ProviderAccountStatus>)=>write(keys.providerStatuses,v);
export const loadAvailability=()=>read<ProviderAvailability>(keys.availability,{p1:true,p2:true,p3:true,p4:false}); export const saveAvailability=(v:ProviderAvailability)=>write(keys.availability,v);
export const loadSession=()=>read<AuthSession|null>(keys.session,null); export const saveSession=(v:AuthSession|null)=>v?write(keys.session,v):AsyncStorage.removeItem(keys.session);
export const loadComplaints=()=>read<Complaint[]>(keys.complaints,[]); export const saveComplaints=(v:Complaint[])=>write(keys.complaints,v);
