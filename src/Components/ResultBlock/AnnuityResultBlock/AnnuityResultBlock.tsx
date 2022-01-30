import React, {useContext, useState} from 'react';
import s from './AnnuityResultBlock.module.css';
import {Context} from '../../Context';
import {
    annuityCoefficientFunc,
    monthlyInterestRateFunc,
} from '../../../Utils/AnnuityLoanHelpers/AnnuityCalculationHelper';
import {DetailsBlock} from '../../DetailsBlock/DetailsBlock';
import {TableRowType} from '../../../App';
import {
    calendarFunc,
    loanBalanceFunc,
    numberOfPaymentsFunc,
    roundingHelper
} from '../../../Utils/Common/HelperFunctions';

type ResultBlockPropsType = {
    changeDetailsTableStatus: (status: boolean) => void
}

const roundingAccuracy = 2;

export const AnnuityResultBlock: React.FC<ResultBlockPropsType> = ({changeDetailsTableStatus, ...prestProps}) => {
        let [isOpenDetailsTable, setOpenDetailsTable] = useState(false);

        const state = useContext(Context);
        const {loanRate, creditTerm, amountOfCredit, detailsTableStatus, currentDate} = state;
        const monthlyInterestRate = monthlyInterestRateFunc(loanRate);
        const numberOfPayments = numberOfPaymentsFunc(creditTerm);
        const mounthlyPayment = annuityCoefficientFunc(monthlyInterestRate, numberOfPayments) * amountOfCredit;

        const calendarDetailsForCredit = calendarFunc(currentDate, numberOfPayments);

        const totalPayout = mounthlyPayment * numberOfPayments;
        const totalOverpayments = totalPayout - amountOfCredit;

        const interestPaymentFunc = (loanBalance: number) => {
            return loanBalance * monthlyInterestRate;
        };

        const principalPaymentFunc = (interestPayment: number) => {
            return mounthlyPayment - interestPayment;
        };

        let detailTableForAnnuity: TableRowType[] = [];

        for (let i = 1; i <= numberOfPayments; i++) {
            const interestPayment = interestPaymentFunc(i === 1 ? amountOfCredit : detailTableForAnnuity[i - 2].loanBalance);
            const principalPayment = principalPaymentFunc(interestPayment);
            let loanBalance = loanBalanceFunc(i === 1 ? amountOfCredit : detailTableForAnnuity[i - 2].loanBalance, principalPayment);

            if (i === numberOfPayments) {
                loanBalance = 0;
            }

            const {day, month, year} = calendarDetailsForCredit[i - 1].date;

            const paymentDay = day > 9 ? '' + day : '0' + day;
            const paymentDate = paymentDay + '.' + ((month > 9) ? month : '0' + month) + '.' + year;

            const objInCycle: TableRowType = {
                number: i,
                paymentDate,
                interestPayment,
                principalPayment,
                mounthlyPayment,
                loanBalance,
            };

            detailTableForAnnuity.push(objInCycle);
        }

        const showCloseDetailsTable = () => {
            changeDetailsTableStatus(!detailsTableStatus);
        };

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
                    <button onClick={showCloseDetailsTable}>Детали расчета</button>
                </div>
                {detailsTableStatus && (
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

