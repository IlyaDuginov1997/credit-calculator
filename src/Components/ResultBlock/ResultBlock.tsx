import React, {useContext} from 'react';
import s from './ResultBlock.module.css';
import {Context} from '../Context';
import {
    annuityCoefficientFunc,
    monthlyInterestRateFunc,
    numberOfPaymentsFunc
} from '../../Utils/Annuity loan helpers/HelperFunctions';

export const ResultBlock = () => {

    const state = useContext(Context);
    const monthlyInterestRate = monthlyInterestRateFunc(state.loanRate);
    const numberOfPayments = numberOfPaymentsFunc(state.creditTerm);
    const mounthlyPayment = annuityCoefficientFunc(monthlyInterestRate, numberOfPayments) * state.amountOfCredit;

    return (
        <div className={s.inputBlockContainer}>
            <div>Сумма кредита - {state.amountOfCredit}</div>
            {state.isAnnuityPayment
                ? <div>Ежемесячный платеж - {mounthlyPayment}</div>
                : <div>
                    <div>Максимальный платеж - </div>
                    <div>Минимальный платеж - </div>
                </div>
            }

            <div>Общая сумма выплаты по кредиту - {}</div>
            <div>Сумма кредита - {}</div>
        </div>
    );
};
