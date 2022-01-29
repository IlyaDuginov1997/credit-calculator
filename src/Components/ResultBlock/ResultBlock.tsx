import React, {useContext, useState} from 'react';
import s from './ResultBlock.module.css';
import {Context} from '../Context';
import {
    annuityCoefficientFunc,
    monthlyInterestRateFunc,
    numberOfPaymentsFunc
} from '../../Utils/Annuity loan helpers/HelperFunctions';
import {DetailsBlock} from '../DetailsBlock/DetailsBlock';
import {roundingHelper} from '../../Utils/Annuity loan helpers/RoundingHelpFunction';

export type TableRowType = {
    number: number
    interestPayment: number
    principalPayment: number
    mounthlyPayment: number
    loanBalance: number
}

export const ResultBlock = () => {

        let [isOpenDetailsTable, setOpenDetailsTable] = useState(false);

        const state = useContext(Context);
        const monthlyInterestRate = monthlyInterestRateFunc(state.loanRate);
        const numberOfPayments = numberOfPaymentsFunc(state.creditTerm);
        const mounthlyPayment = annuityCoefficientFunc(monthlyInterestRate, numberOfPayments) * state.amountOfCredit;

        const totalPayout = mounthlyPayment * numberOfPayments;
        const totalOverpayments = totalPayout - state.amountOfCredit;

        console.log('ResultBlockComponent');

        const interestPaymentFunc = (loanBalance: number) => {
            return loanBalance * monthlyInterestRate;
        };

        const principalPaymentFunc = (interestPayment: number) => {
            return mounthlyPayment - interestPayment;
        };

        const loanBalanceFunc = (loanBalance: number, principalPayment: number) => {
            return loanBalance - principalPayment;
        };

        let detailTableForAnnuity: TableRowType[] = [];

        for (let i = 1; i <= numberOfPayments; i++) {
            const interestPayment = interestPaymentFunc(i === 1 ? state.amountOfCredit : detailTableForAnnuity[i - 2].loanBalance);
            const principalPayment = principalPaymentFunc(interestPayment);
            let loanBalance = loanBalanceFunc(i === 1 ? state.amountOfCredit : detailTableForAnnuity[i - 2].loanBalance, principalPayment);

            if (i === numberOfPayments) {
                loanBalance = 0;
            }

            const objInCycle = {
                number: i,
                interestPayment: interestPayment,
                principalPayment: principalPayment,
                mounthlyPayment: mounthlyPayment,
                loanBalance: loanBalance,
            };

            detailTableForAnnuity.push(objInCycle);
        }

        // // to check that everything is correct
        // // checkingValueTotalOverpayments === totalOverpayments
        // const checkingValueTotalOverpayments = detailTableForAnnuity.reduce( (acc: number, el: TableRowType) => {
        //     return el.interestPayment + acc
        // }, 0 );
        // console.log(checkingValueTotalOverpayments);

        return (
            <div>
                <div className={s.inputBlockContainer}>
                    <div>Сумма кредита - {roundingHelper(state.amountOfCredit, 2)}</div>
                    <div>Ежемесячный платеж - {roundingHelper(mounthlyPayment, 2)}</div>
                    <div>Общая сумма выплаты по кредиту - {roundingHelper(totalPayout, 2)}</div>
                    <div>Общая сумма переплат по кредиту - {roundingHelper(totalOverpayments, 2)}</div>
                    <button onClick={() => setOpenDetailsTable(!isOpenDetailsTable)}>Детали расчета</button>
                </div>
                {isOpenDetailsTable && <DetailsBlock
                    detailTableForAnnuity={detailTableForAnnuity}
                    totalPayout={totalPayout}
                    totalInterestPayment={totalOverpayments}
                    totalPrincipalPayment={state.amountOfCredit}

                />}

            </div>

        );
    }
;

