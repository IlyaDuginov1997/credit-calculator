import {ArrayType} from '../../Components/InputBlock/InputBlock';

export const numberOfPaymentsFunc = (creditTerm: ArrayType) => {
    if (creditTerm.isYear) {
        return creditTerm.count * 12;
    } else {
        return creditTerm.count;
    }
};

export const loanBalanceFunc = (loanBalance: number, principalPayment: number) => {
    return loanBalance - principalPayment;
};

export const roundingHelper = (num: number, accuracy: number) => {
    return num.toFixed(accuracy);
};

export const dateInitialization = () => {
    const currentDate = new Date().getTime();
    const currentDateFormated = new Date(currentDate).toLocaleString().split(/[,.]/);
    return {
        day: +currentDateFormated[0],
        month: +currentDateFormated[1],
        year: +currentDateFormated[2],
    };
};
