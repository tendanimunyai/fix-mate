import {FirebaseApp,getApp,getApps,initializeApp} from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {Auth,GoogleAuthProvider,Persistence,User,onAuthStateChanged,UserCredential,getAuth,initializeAuth,sendPasswordResetEmail,signInWithCredential,signInWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth';
import {Firestore,collection,deleteDoc,doc,getDoc,getDocs,getFirestore,onSnapshot,query,serverTimestamp,setDoc,where} from 'firebase/firestore';
import {FirebaseStorage,getDownloadURL,getStorage,ref,uploadBytes} from 'firebase/storage';
import {AppAlert,Company,Complaint,Message,NotificationToken,Provider,ProviderAccountStatus,ProviderAvailability,ProviderServiceApplication,ProviderSlot,ProviderSlots,Request,Review,Role,Service,SystemSettings,UserProfile} from '../types';

type FirebaseConfig={
 apiKey:string;
 authDomain:string;
 projectId:string;
 storageBucket:string;
 messagingSenderId:string;
 appId:string;
 measurementId?:string;
};

declare const process:{env:Record<string,string|undefined>};

const firebaseConfig:FirebaseConfig={
 apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY||'',
 authDomain:process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN||'',
 projectId:process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID||'',
 storageBucket:process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET||'',
 messagingSenderId:process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID||'',
 appId:process.env.EXPO_PUBLIC_FIREBASE_APP_ID||'',
 measurementId:process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID||undefined
};

export const isFirebaseConfigured=Boolean(
 firebaseConfig.apiKey&&
 firebaseConfig.authDomain&&
 firebaseConfig.projectId&&
 firebaseConfig.storageBucket&&
 firebaseConfig.messagingSenderId&&
 firebaseConfig.appId
);

export const firebaseApp:FirebaseApp|null=isFirebaseConfigured
 ? getApps().length?getApp():initializeApp(firebaseConfig)
 : null;

const asyncStoragePersistence=class{
 static type='LOCAL';
 readonly type='LOCAL';
 async _isAvailable(){try{const key='firebase-auth-storage-test';await AsyncStorage.setItem(key,'1');await AsyncStorage.removeItem(key);return true;}catch{return false;}}
 async _set(key:string,value:unknown){await AsyncStorage.setItem(key,JSON.stringify(value));}
 async _get<T>(key:string):Promise<T|null>{const value=await AsyncStorage.getItem(key);return value?JSON.parse(value) as T:null;}
 async _remove(key:string){await AsyncStorage.removeItem(key);}
 _addListener(){}
 _removeListener(){}
} as unknown as Persistence;

function createFirebaseAuth(app:FirebaseApp):Auth{
 if(Platform.OS==='web')return getAuth(app);
 try{return initializeAuth(app,{persistence:asyncStoragePersistence});}
 catch{return getAuth(app);}
}

export const firebaseAuth:Auth|null=firebaseApp?createFirebaseAuth(firebaseApp):null;
export const firestore:Firestore|null=firebaseApp?getFirestore(firebaseApp):null;
export const firebaseStorage:FirebaseStorage|null=firebaseApp?getStorage(firebaseApp):null;

function requireFirestore(){if(!firestore)throw new Error('Firebase is not configured. Add EXPO_PUBLIC_FIREBASE_* values to .env.');return firestore;}
function requireStorage(){if(!firebaseStorage)throw new Error('Firebase Storage is not configured. Add EXPO_PUBLIC_FIREBASE_* values to .env.');return firebaseStorage;}
function requireAuth(){if(!firebaseAuth)throw new Error('Firebase Auth is not configured. Add EXPO_PUBLIC_FIREBASE_* values to .env.');return firebaseAuth;}

export const firebaseCollections={
 requests:'requests',
 messages:'messages',
 alerts:'alerts',
 complaints:'complaints',
 providers:'providers',
 services:'services',
 reviews:'reviews',
 profiles:'profiles',
 providerStatuses:'providerStatuses',
 availability:'availability',
 systemSettings:'systemSettings',
 notificationTokens:'notificationTokens',
 companies:'companies',
 providerApplications:'providerApplications'
 ,providerSlots:'providerSlots'
} as const;

export async function firebaseLogin(email:string,password:string):Promise<UserCredential>{
 return signInWithEmailAndPassword(requireAuth(),email,password);
}

export async function firebaseLoginWithGooglePopup():Promise<UserCredential>{
 const provider=new GoogleAuthProvider();
 provider.setCustomParameters({prompt:'select_account'});
 return signInWithPopup(requireAuth(),provider);
}

export async function firebaseLoginWithGoogleIdToken(idToken:string):Promise<UserCredential>{
 const credential=GoogleAuthProvider.credential(idToken);
 return signInWithCredential(requireAuth(),credential);
}

export async function firebaseLogout():Promise<void>{
 return signOut(requireAuth());
}

export async function firebaseSendPasswordReset(email:string):Promise<void>{
 return sendPasswordResetEmail(requireAuth(),email);
}

export function onFirebaseAuthChanged(callback:(user:User|null)=>void):()=>void{
 return onAuthStateChanged(requireAuth(),callback);
}

async function upsert<T extends {id:string}>(collectionName:string,item:T){
 const data=stripUndefined(item) as T;
 await setDoc(doc(requireFirestore(),collectionName,item.id),{...data,updatedAt:serverTimestamp()},{merge:true});
}

function stripUndefined(value:unknown):unknown{
 if(value===undefined)return undefined;
 if(Array.isArray(value))return value.map(stripUndefined).filter(item=>item!==undefined);
 if(value&&Object.prototype.toString.call(value)==='[object Object]')return Object.fromEntries(Object.entries(value as Record<string,unknown>).map(([key,item])=>[key,stripUndefined(item)]).filter(([,item])=>item!==undefined));
 return value;
}

async function list<T>(collectionName:string):Promise<T[]>{
 const snapshot=await getDocs(collection(requireFirestore(),collectionName));
 return snapshot.docs.map(item=>({id:item.id,...item.data()}) as T);
}

async function remove(collectionName:string,id:string){
 await deleteDoc(doc(requireFirestore(),collectionName,id));
}

async function getById<T>(collectionName:string,id:string):Promise<T|null>{
 const snapshot=await getDoc(doc(requireFirestore(),collectionName,id));
 return snapshot.exists()?({id:snapshot.id,...snapshot.data()} as T):null;
}

function subscribeAlertsForRole(role:Role,callback:(items:AppAlert[])=>void):()=>void{
 const alertQuery=query(collection(requireFirestore(),firebaseCollections.alerts),where('recipientRoles','array-contains',role));
 return onSnapshot(alertQuery,snapshot=>callback(snapshot.docs.map(item=>({id:item.id,...item.data()}) as AppAlert)),error=>console.warn('Firebase alert listener failed',error));
}

function subscribeCollection<T>(collectionName:string,callback:(items:T[])=>void):()=>void{
 return onSnapshot(collection(requireFirestore(),collectionName),snapshot=>callback(snapshot.docs.map(item=>({id:item.id,...item.data()}) as T)),error=>console.warn(`Firebase ${collectionName} listener failed`,error));
}

async function disableNotificationTokensForUser(userId:string){
 const tokenQuery=query(collection(requireFirestore(),firebaseCollections.notificationTokens),where('userId','==',userId));
 const snapshot=await getDocs(tokenQuery);
 await Promise.all(snapshot.docs.map(item=>setDoc(item.ref,{enabled:false,updatedAt:serverTimestamp()},{merge:true})));
}

export const firebaseRepository={
 requests:{list:()=>list<Request>(firebaseCollections.requests),subscribe:(callback:(items:Request[])=>void)=>subscribeCollection<Request>(firebaseCollections.requests,callback),upsert:(item:Request)=>upsert(firebaseCollections.requests,item),remove:(id:string)=>remove(firebaseCollections.requests,id)},
 messages:{list:()=>list<Message>(firebaseCollections.messages),upsert:(item:Message)=>upsert(firebaseCollections.messages,item),remove:(id:string)=>remove(firebaseCollections.messages,id)},
 alerts:{list:()=>list<AppAlert>(firebaseCollections.alerts),subscribeForRole:subscribeAlertsForRole,upsert:(item:AppAlert)=>upsert(firebaseCollections.alerts,item),remove:(id:string)=>remove(firebaseCollections.alerts,id)},
 complaints:{list:()=>list<Complaint>(firebaseCollections.complaints),upsert:(item:Complaint)=>upsert(firebaseCollections.complaints,item),remove:(id:string)=>remove(firebaseCollections.complaints,id)},
 providers:{list:()=>list<Provider>(firebaseCollections.providers),subscribe:(callback:(items:Provider[])=>void)=>subscribeCollection<Provider>(firebaseCollections.providers,callback),get:(id:string)=>getById<Provider>(firebaseCollections.providers,id),upsert:(item:Provider)=>upsert(firebaseCollections.providers,item),remove:(id:string)=>remove(firebaseCollections.providers,id)},
 companies:{list:()=>list<Company>(firebaseCollections.companies),upsert:(item:Company)=>upsert(firebaseCollections.companies,item),remove:(id:string)=>remove(firebaseCollections.companies,id)},
 providerApplications:{list:()=>list<ProviderServiceApplication>(firebaseCollections.providerApplications),upsert:(item:ProviderServiceApplication)=>upsert(firebaseCollections.providerApplications,item),remove:(id:string)=>remove(firebaseCollections.providerApplications,id)},
 services:{list:()=>list<Service>(firebaseCollections.services),upsert:(item:Service)=>upsert(firebaseCollections.services,item),remove:(id:string)=>remove(firebaseCollections.services,id)},
 reviews:{list:()=>list<Review>(firebaseCollections.reviews),upsert:(item:Review)=>upsert(firebaseCollections.reviews,item),remove:(id:string)=>remove(firebaseCollections.reviews,id)},
 profiles:{list:()=>list<UserProfile&{id:string}>(firebaseCollections.profiles),get:(id:string)=>getById<UserProfile&{id:string}>(firebaseCollections.profiles,id),upsert:(item:UserProfile&{id:string})=>upsert(firebaseCollections.profiles,item),remove:(id:string)=>remove(firebaseCollections.profiles,id)},
 providerStatuses:{list:()=>list<{id:string;status:ProviderAccountStatus}>(firebaseCollections.providerStatuses),subscribe:(callback:(items:{id:string;status:ProviderAccountStatus}[])=>void)=>subscribeCollection<{id:string;status:ProviderAccountStatus}>(firebaseCollections.providerStatuses,callback),get:(id:string)=>getById<{id:string;status:ProviderAccountStatus}>(firebaseCollections.providerStatuses,id),upsert:(item:{id:string;status:ProviderAccountStatus})=>upsert(firebaseCollections.providerStatuses,item),remove:(id:string)=>remove(firebaseCollections.providerStatuses,id)},
 availability:{list:()=>list<{id:string;available:boolean}>(firebaseCollections.availability),subscribe:(callback:(items:{id:string;available:boolean}[])=>void)=>subscribeCollection<{id:string;available:boolean}>(firebaseCollections.availability,callback),upsert:(item:{id:string;available:boolean})=>upsert(firebaseCollections.availability,item),remove:(id:string)=>remove(firebaseCollections.availability,id)},
 providerSlots:{list:()=>list<ProviderSlot>(firebaseCollections.providerSlots),subscribe:(callback:(items:ProviderSlot[])=>void)=>subscribeCollection<ProviderSlot>(firebaseCollections.providerSlots,callback),upsert:(item:ProviderSlot)=>upsert(firebaseCollections.providerSlots,item),remove:(id:string)=>remove(firebaseCollections.providerSlots,id)},
 systemSettings:{get:(id:string)=>getById<SystemSettings>(firebaseCollections.systemSettings,id),upsert:(item:SystemSettings)=>upsert(firebaseCollections.systemSettings,item)},
 notificationTokens:{list:()=>list<NotificationToken>(firebaseCollections.notificationTokens),upsert:(item:NotificationToken)=>upsert(firebaseCollections.notificationTokens,item),disableForUser:disableNotificationTokensForUser}
};

export function statusRowsToRecord(rows:{id:string;status:ProviderAccountStatus}[]):Record<string,ProviderAccountStatus>{
 return rows.reduce<Record<string,ProviderAccountStatus>>((acc,row)=>({...acc,[row.id]:row.status}),{});
}

export function availabilityRowsToRecord(rows:{id:string;available:boolean}[]):ProviderAvailability{
 return rows.reduce<ProviderAvailability>((acc,row)=>({...acc,[row.id]:row.available}),{});
}

export function providerSlotRowsToRecord(rows:ProviderSlot[]):ProviderSlots{
 return rows.reduce<ProviderSlots>((acc,row)=>({...acc,[row.providerId]:[...(acc[row.providerId]||[]),row]}),{});
}

export async function uploadJobPhoto(path:string,blob:Blob):Promise<string>{
 const storageRef=ref(requireStorage(),path);
 await uploadBytes(storageRef,blob);
 return getDownloadURL(storageRef);
}
