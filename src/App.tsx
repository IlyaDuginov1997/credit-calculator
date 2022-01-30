import React, {useEffect, useReducer} from 'react';
import './App.css';
import {Context} from './Components/Context';
import {ArrayType, InputBlock} from './Components/InputBlock/InputBlock';
import {AnnuityResultBlock} from './Components/ResultBlock/AnnuityResultBlock/AnnuityResultBlock';
import {
    changeAmountOfCreditAC,
    changeCreditTermAC,
    changeLoanRateAC, changePaymentTypeAC, changeAppStatusAC,
    initialState,
    stateReducer, changeDetailesTableStatusAC, initializeCurrentDateAC, CurrentDateType
} from './Components/State/state';
import {calculatorAPI} from './API/calculatorAPI';
import {DifferencialResultBlock} from './Components/ResultBlock/DifferencialResultBlock/DifferencialResultBlock';
import {dateInitialization} from './Utils/Common/HelperFunctions';

export type TableRowType = {
    number: number
    interestPayment: number
    principalPayment: number
    mounthlyPayment: number
    loanBalance: number
    paymentDate: string
}

function App() {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    const changeSum = (sum: number) => {
        dispatch(changeAmountOfCreditAC(sum));
    };

    const changeCreditTerm = (payload: ArrayType) => {
        dispatch(changeCreditTermAC(payload));
    };

    const changePaymentType = (isAnnuityPayment: boolean) => {
        dispatch(changePaymentTypeAC(isAnnuityPayment));
    };

    const changeDetailsTableStatus = (status: boolean) => {
        dispatch(changeDetailesTableStatusAC(status))
    }

    useEffect(() => {
        calculatorAPI.getRefinancingRate()
            .then(res => {
                dispatch(changeLoanRateAC(res[res.length - 1].Value));
                if (res) {
                    dispatch(changeAppStatusAC(true));
                }
            });
            dispatch(initializeCurrentDateAC(dateInitialization()))
    }, []);

    if (!state.appStatus) {
        // plug
        return <div>Preloader</div>;
    }

    console.log(state.currentDate);
    return (
        <div>
            <Context.Provider value={state}>
                <div className='appContainer'>
                    <InputBlock
                        changeSum={changeSum}
                        changeCreditTerm={changeCreditTerm}
                        changePaymentType={changePaymentType}
                    />
                    {state.isAnnuityPayment
                        ? <AnnuityResultBlock changeDetailsTableStatus={changeDetailsTableStatus}/>
                        : <DifferencialResultBlock changeDetailsTableStatus={changeDetailsTableStatus}/>
                    }

                </div>
            </Context.Provider>
        </div>
    );
}

export default App;
