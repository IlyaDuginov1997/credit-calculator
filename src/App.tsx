import React, {useEffect, useReducer} from 'react';
import './App.css';
import {Context} from './Components/Context';
import {ArrayType, InputBlock} from './Components/InputBlock/InputBlock';
import {ResultBlock} from './Components/ResultBlock/ResultBlock';
import {
    changeAmountOfCreditAC,
    changeCreditTermAC,
    changeLoanRateAC, changePaymentTypeAC, changeStatusAC,
    initialState,
    stateReducer
} from './Components/State/state';
import {calculatorAPI} from './API/calculatorAPI';


function App() {

    let [state, dispatch] = useReducer(stateReducer, initialState);


    const changeSum = (sum: number) => {
        dispatch(changeAmountOfCreditAC(sum));
    };

    const changeCreditTerm = (payload: ArrayType) => {
        dispatch(changeCreditTermAC(payload));
    };

    const changePaymentType = (isAnnuityPayment: boolean) => {
        dispatch(changePaymentTypeAC(isAnnuityPayment));
    };

    useEffect(() => {
        calculatorAPI.getRefinancingRate()
            .then(res => {
                dispatch(changeLoanRateAC(res[res.length - 1].Value))
                dispatch(changeStatusAC(true))
            })
    },[])

    if (!state.isLoaded) {
        return <div>Hello</div>
    }

    console.log('APP component');

    return (
        <div>
            <Context.Provider value={state}>

                <div className='appContainer'>
                    <InputBlock
                        changeSum={changeSum}
                        changeCreditTerm={changeCreditTerm}
                        changePaymentType={changePaymentType}
                    />
                    <ResultBlock/>
                </div>
            </Context.Provider>

        </div>
    );
}

export default App;
