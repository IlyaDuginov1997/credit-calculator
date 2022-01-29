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

const optionArray: OptionsArrayType = [
    {value: '1 месяц', id: 1, count: 1, isYear: false},
    {value: '3 месяца', id: 2, count: 3, isYear: false},
    {value: '6 месяцев', id: 3, count: 6, isYear: false},
    {value: '1 год', id: 4, count: 1, isYear: true},
    {value: '2 года', id: 5, count: 2, isYear: true},
    {value: '5 лет', id: 6, count: 5, isYear: true},
];

export const InputBlock: React.FC<InputBlockPropsType> = ({
                                                              changeSum,
                                                              changeCreditTerm,
                                                              changePaymentType,
                                                              ...restProps
                                                          }) => {
    const state = useContext(Context);
    const {creditTerm, amountOfCredit, loanRate} = state;
    const changeAmountOf = (e: ChangeEvent<HTMLInputElement>) => {
        changeSum(+e.currentTarget.value);
    };

    const optionArrayForJSX = optionArray.map(({value, id, count, isYear}) => {
        return (
            <option value={value} key={id} selected={id === creditTerm.id}>{value}</option>
        );
    });

    const changeCreditTermInfo = (e: ChangeEvent<HTMLSelectElement>) => {
        const creditTermEl = optionArray.find(el => el.value === e.currentTarget.value);
        if (creditTermEl) {
            let {id, count, isYear} = creditTermEl;
            changeCreditTerm({id, count, isYear});
        }
    };

    const changeAnnuityPayment = () => {
        changePaymentType(true);
    };

    const changeDifferentialPayment = () => {
        changePaymentType(false);
    };

    return (
        <div className={s.inputBlockContainer}>
            <input type='number' value={amountOfCredit}
                   onChange={changeAmountOf}/>
            <select onChange={(changeCreditTermInfo)}>
                {optionArrayForJSX}
            </select>
            <input
                type='number'
                value={loanRate}
                onChange={() => console.log(loanRate)}
            />
            <button onClick={changeAnnuityPayment}>Annuity payment</button>
            <button onClick={changeDifferentialPayment}>Differential payment</button>
        </div>
    );
};
