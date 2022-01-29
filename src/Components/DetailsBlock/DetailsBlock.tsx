import React from 'react';
import s from './DetailsBlock.module.css';
import {TableRowType} from '../ResultBlock/ResultBlock';
import {roundingHelper} from '../../Utils/Annuity loan helpers/RoundingHelpFunction';

type DetailsBlockPropsType = {
    detailTableForAnnuity: TableRowType[]
    totalPayout: number
    totalInterestPayment: number
    totalPrincipalPayment: number
}

const roundingAccuracy = 2;

export const DetailsBlock: React.FC<DetailsBlockPropsType> = ({
                                                                  detailTableForAnnuity,
                                                                  totalPayout,
                                                                  totalInterestPayment,
                                                                  totalPrincipalPayment,
                                                                  ...restProps
                                                              }) => {
    return (
        <div className={s.detailsTableBlock}>
            <div className={s.scrollTable}>
                <table>
                    <thead>
                    <tr>
                        <th>Порядок номера платежа</th>
                        <th>Остаток кредита</th>
                        <th>Платеж по процентам %</th>
                        <th>Платеж по основному долгу</th>
                        <th>Сумма платежа</th>
                    </tr>
                    </thead>
                </table>
                <div className={s.scrollTableBody}>
                    <table>
                        <tbody>
                        {detailTableForAnnuity.map(
                            ({
                                 number,
                                 loanBalance,
                                 interestPayment,
                                 principalPayment,
                                 mounthlyPayment
                             }) => {

                                return (
                                    <tr>
                                        <td>{number}</td>
                                        <td>{roundingHelper(loanBalance, roundingAccuracy)}</td>
                                        <td>{roundingHelper(interestPayment, roundingAccuracy)}</td>
                                        <td>{roundingHelper(principalPayment, roundingAccuracy)}</td>
                                        <td>{roundingHelper(mounthlyPayment, roundingAccuracy)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th colSpan={2}>Итого</th>
                        <th>{roundingHelper(totalInterestPayment, 2)}</th>
                        <th>{roundingHelper(totalPrincipalPayment, 2)}</th>
                        <th>{roundingHelper(totalPayout, 2)}</th>
                    </tr>
                    </thead>
                </table>
            </div>

        </div>
    );
};
