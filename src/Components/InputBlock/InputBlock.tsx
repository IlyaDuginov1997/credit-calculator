import React, {ChangeEvent, useContext} from 'react';
import s from './InputBlock.module.css';
import {Context} from '../Context';

type InputBlockPropsType = {
    changeSum: (sum: number) => void
    changeCreditTerm: (payload: ArrayType) => void
    changePaymentType: (isAnnuityPayment: boolean) => void
}

type OptionsArrayType = Array<{
    value: string,
    id: number,
    count: number,
    isYear: boolean
}>

export type ArrayType = {
    id: number,
    count: number,
    isYear: boolean
}

export const InputBlock = (props: InputBlockPropsType) => {

    const state = useContext(Context);
    const changeAmountOf = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeSum(+e.currentTarget.value);
    };

    const optionArray: OptionsArrayType = [
        {value: '1 месяц', id: 1, count: 1, isYear: false},
        {value: '3 месяца', id: 2, count: 3, isYear: false},
        {value: '6 месяцев', id: 3, count: 6, isYear: false},
        {value: '1 год', id: 4, count: 1, isYear: true},
        {value: '2 года', id: 5, count: 2, isYear: true},
        {value: '5 лет', id: 6, count: 5, isYear: true},
    ];

    const optionArrayForJSX = optionArray.map(el => {
        return (
            <option value={el.value} key={el.id} selected={el.id === state.creditTerm.id}>{el.value}</option>
        );
    });

    const changeCreditTerm = (e: ChangeEvent<HTMLSelectElement>) => {
        const creditTermEl = optionArray.find(el => el.value === e.currentTarget.value);
        if (creditTermEl) {
            let {id, count, isYear} = creditTermEl;
            props.changeCreditTerm({id, count, isYear});
        }
    };

    return (
        <div className={s.inputBlockContainer}>
            <input type='number' value={state.amountOfCredit}
                   onChange={(e) => changeAmountOf(e)}/>
            <select onChange={(changeCreditTerm)}>
                {optionArrayForJSX}
            </select>
            <input
                type='number'
                value={state.loanRate}
                onChange={() => console.log(state.loanRate)}
            />
            <button onClick={() => props.changePaymentType(true)}>Annuity payment</button>
            <button onClick={() => props.changePaymentType(false)}>Differential payment</button>

        </div>
    );
};
