import {Provider, Request, Service} from '../types';
export const services:Service[]=[
 {id:'plumbing',name:'Plumbing',icon:'🔧',color:'#DDF4EF',description:'Leaks, taps, geysers and pipes'},
 {id:'electrical',name:'Electrical',icon:'⚡',color:'#FFF0C7',description:'Safe electrical repairs'},
 {id:'cleaning',name:'Cleaning',icon:'✨',color:'#E5E9FF',description:'Home and deep cleaning'},
 {id:'painting',name:'Painting',icon:'🎨',color:'#FDE3EB',description:'Refresh your space'},
 {id:'gardening',name:'Gardening',icon:'🌿',color:'#E5F5D9',description:'Lawn and garden care'},
 {id:'handyman',name:'Handyman',icon:'🛠️',color:'#F1E5D7',description:'Small jobs, done right'}
];
export const providers:Provider[]=[
 {id:'p1',name:'Thabo Mokoena',trade:'Plumbing specialist',rating:4.9,reviews:128,distance:'1.2 km away',price:'From R350',avatar:'TM',verified:true,bio:'Reliable residential plumber with 8 years experience.',coordinates:{latitude:-33.9249,longitude:18.4241}},
 {id:'p2',name:'BrightSpark Electrical',trade:'Certified electrician',rating:4.8,reviews:96,distance:'2.8 km away',price:'From R450',avatar:'BE',verified:true,bio:'Qualified electricians for safe, fast home repairs.',coordinates:{latitude:-33.9167,longitude:18.4233}},
 {id:'p3',name:'Lerato Clean Co.',trade:'Home cleaning',rating:4.7,reviews:74,distance:'3.1 km away',price:'From R280',avatar:'LC',verified:true,bio:'Friendly, detail-focused cleaning for busy households.',coordinates:{latitude:-33.9258,longitude:18.4174}},
 {id:'p4',name:'Cape Garden Care',trade:'Garden maintenance',rating:4.9,reviews:52,distance:'4.6 km away',price:'From R300',avatar:'CG',verified:false,bio:'Keep your outdoor space beautiful all year round.',coordinates:{latitude:-33.9372,longitude:18.4768}}
];
export const initialRequests:Request[]=[{id:'r1',service:'Plumbing',provider:'Thabo Mokoena',providerId:'p1',customer:'Alex Morgan',customerId:'customer@fixmate.app',date:'Today',time:'14:00 - 15:00',address:'12 Long Street, Cape Town',status:'Accepted',price:'R450',createdAt:'2026-08-14T08:00:00.000Z',updatedAt:'2026-08-14T08:10:00.000Z',estimatedArrivalMinutes:18,paymentStatus:'authorised'}];
