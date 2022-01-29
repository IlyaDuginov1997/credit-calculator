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

const roundingAccuracy = 2;

export const ResultBlock = () => {
        let [isOpenDetailsTable, setOpenDetailsTable] = useState(false);

        const state = useContext(Context);
        const {loanRate, creditTerm, amountOfCredit} = state
        const monthlyInterestRate = monthlyInterestRateFunc(loanRate);
        const numberOfPayments = numberOfPaymentsFunc(creditTerm);
        const mounthlyPayment = annuityCoefficientFunc(monthlyInterestRate, numberOfPayments) * amountOfCredit;

        const totalPayout = mounthlyPayment * numberOfPayments;
        const totalOverpayments = totalPayout - amountOfCredit;

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
            const interestPayment = interestPaymentFunc(i === 1 ? amountOfCredit : detailTableForAnnuity[i - 2].loanBalance);
            const principalPayment = principalPaymentFunc(interestPayment);
            let loanBalance = loanBalanceFunc(i === 1 ? amountOfCredit : detailTableForAnnuity[i - 2].loanBalance, principalPayment);

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
                    <div>Сумма кредита - {roundingHelper(amountOfCredit, roundingAccuracy)}</div>
                    <div>Ежемесячный платеж - {roundingHelper(mounthlyPayment, roundingAccuracy)}</div>
                    <div>Общая сумма выплаты по кредиту - {roundingHelper(totalPayout, roundingAccuracy)}</div>
                    <div>Общая сумма переплат по кредиту - {roundingHelper(totalOverpayments, roundingAccuracy)}</div>
                    <button onClick={() => setOpenDetailsTable(!isOpenDetailsTable)}>Детали расчета</button>
                </div>
                {isOpenDetailsTable && (
                    <DetailsBlock
                        detailTableForAnnuity={detailTableForAnnuity}
                        totalPayout={totalPayout}
                        totalInterestPayment={totalOverpayments}
                        totalPrincipalPayment={amountOfCredit}

                    />
                )}
            </div>
        );
    }
;

