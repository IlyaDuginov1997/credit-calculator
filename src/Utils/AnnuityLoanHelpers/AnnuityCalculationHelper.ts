import {ArrayType} from '../../Components/InputBlock/InputBlock';

export const monthlyInterestRateFunc = (loanRate: number) => {
    return loanRate / 12 / 100;
};

export const annuityCoefficientFunc = (monthlyInterestRate: number, numberOfPayments: number) => {
    const periodicValue = Math.pow((1 + monthlyInterestRate), numberOfPayments);
    return (periodicValue * monthlyInterestRate) / (periodicValue - 1);
};
