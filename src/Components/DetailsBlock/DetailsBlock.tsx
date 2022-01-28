import React from 'react';
import s from './DetailsBlock.module.css';
import {TableRowType} from '../ResultBlock/ResultBlock';
import {roundingHelper} from '../../Utils/Annuity loan helpers/RoundingHelpFunction';

type DetailsBlockPropsType = {
    detailTableForAnnuity: TableRowType[]
}

export const DetailsBlock = (props: DetailsBlockPropsType) => {

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
                        {props.detailTableForAnnuity.map(el => {
                            return (
                                <tr>
                                    <td>{el.number}</td>
                                    <td>{roundingHelper(el.loanBalance, 2)}</td>
                                    <td>{roundingHelper(el.interestPayment, 2)}</td>
                                    <td>{roundingHelper(el.principalPayment, 2)}</td>
                                    <td>{roundingHelper(el.mounthlyPayment, 2)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};
