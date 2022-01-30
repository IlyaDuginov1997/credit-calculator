import React, {useContext} from 'react';
import s from './DifferencialResultBlock.module.css';
import {Context} from '../../Context';
import {DetailsBlock} from '../../DetailsBlock/DetailsBlock';
import {TableRowType} from '../../../App';
import {
    calendarFunc,
    loanBalanceFunc,
    numberOfPaymentsFunc,
    roundingHelper
} from '../../../Utils/Common/HelperFunctions';
import {
    intermediatePrincipalDebtFunc,
    mounthlyPrincipalRepaymentFunc
} from '../../../Utils/DifferencialLoanHelpers/DifferencialCalculationHelper';

type ResultBlockPropsType = {
    changeDetailsTableStatus: (status: boolean) => void
}

const roundingAccuracy = 2;
const daysInYear = 365;

export const DifferencialResultBlock: React.FC<ResultBlockPropsType> = ({changeDetailsTableStatus, ...prestProps}) => {

        const state = useContext(Context);
        const {loanRate, creditTerm, amountOfCredit, detailsTableStatus, currentDate} = state;

        const numberOfPayments = numberOfPaymentsFunc(creditTerm);
        const principalPayment = mounthlyPrincipalRepaymentFunc(amountOfCredit, numberOfPayments);

        const calendarDetailsForCredit = calendarFunc(currentDate, numberOfPayments);

        const interestPaymentFunc = (intermediatePrincipalDebt: number, daysInYear: number, daysInMounth: number) => {
            return intermediatePrincipalDebt / daysInYear * daysInMounth;
        };

        const mounthlyPaymentFunc = (principalPayment: number, interestPayment: number) => {
            return principalPayment + interestPayment;
        };

        let detailTableForAnnuity: TableRowType[] = [];

        for (let i = 1; i <= numberOfPayments; i++) {
            const intermediatePrincipalDebt = intermediatePrincipalDebtFunc(i < 3
                ? amountOfCredit
                : detailTableForAnnuity[i - 3].loanBalance,
                i === 1
                    ? 0
                    : principalPayment,
                loanRate);

            const interestPayment = interestPaymentFunc(
                intermediatePrincipalDebt,
                daysInYear,
                calendarDetailsForCredit[i - 1].daysPeriodBetweenMont
            );
            const mounthlyPayment = mounthlyPaymentFunc(principalPayment, interestPayment);
            let loanBalance = loanBalanceFunc(i === 1
                ? amountOfCredit
                : detailTableForAnnuity[i - 2].loanBalance,
                principalPayment);

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

        const minMounthlyPayment = detailTableForAnnuity[detailTableForAnnuity.length - 1].mounthlyPayment;
        const maxMounthlyPayment = detailTableForAnnuity[0].mounthlyPayment;

        const totalPayout = detailTableForAnnuity.reduce((acc: number, el) => {
            return acc + el.mounthlyPayment;
        }, 0);

        const totalOverpayments = detailTableForAnnuity.reduce((acc: number, el) => {
            return acc + el.interestPayment;
        }, 0);

        return (
            <div>
                <div className={s.inputBlockContainer}>
                    <div>Сумма кредита - {roundingHelper(amountOfCredit, roundingAccuracy)}</div>
                    <div>Максимальный ежемесячный платеж - {roundingHelper(maxMounthlyPayment, roundingAccuracy)}</div>
                    <div>Минимальный ежемесячный платеж - {roundingHelper(minMounthlyPayment, roundingAccuracy)}</div>
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

