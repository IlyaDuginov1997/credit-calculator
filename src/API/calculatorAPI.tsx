// import React from 'react';
// import axios from 'axios';
// import {changeLoanRateAC} from '../Components/State/state';
//
//
// const instance = axios.create({
//     baseURL: 'https://www.nbrb.by/api/',
//     // withCredentials: true,
// });
//
// export type RefinancingRateType = {
//     Date: string
//     Value: number
// }
//
// export const calculatorAPI = {
//     getRefinancingRate() {
//         return instance.get<RefinancingRateType[]>('refinancingrate/')
//             .then(res => {
//                 return res.data;
//             })
//             .catch(err => console.log(err))
//     },
// };


// if we can use the axios-library then see option above
export const calculatorAPI = {
    getRefinancingRate() {
        return fetch('https://www.nbrb.by/api/refinancingrate/')
            .then(response => response.json())
            .catch(err => console.log(err));
    },
};
