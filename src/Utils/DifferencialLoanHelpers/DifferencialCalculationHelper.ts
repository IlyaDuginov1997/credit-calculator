export const mounthlyPrincipalRepaymentFunc = (amountOfCredit: number, numberOfPayments: number) => {
    return amountOfCredit / numberOfPayments;
};

export const intermediatePrincipalDebtFunc = (currentPrincipalDebt: number, mounthlyPrincipalRepayment: number, loanRate: number) => {
    return (currentPrincipalDebt - mounthlyPrincipalRepayment) * loanRate / 100;
};


