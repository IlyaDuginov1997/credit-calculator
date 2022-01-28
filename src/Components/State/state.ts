type ActionTypes = ReturnType<typeof changeAmountOfCreditAC>
    | ReturnType<typeof changeCreditTermAC>
    | ReturnType<typeof changeLoanRateAC>
    | ReturnType<typeof changePaymentTypeAC>
    | ReturnType<typeof changeStatusAC>


export const initialState = {
    amountOfCredit: 10000,
    creditTerm: {
        id: 4,
        count: 1,
        isYear: true
    },
    loanRate: 9.25,
    isAnnuityPayment: true,
    isLoaded: false
};

export const stateReducer = (state: StateType, action: ActionTypes): StateType => {
    switch (action.type) {
        case 'CHANGE-AMOUNT-CREDIT':
            return {...state, amountOfCredit: action.sum};
        case 'CHANGE-CREDIT-TERM':
            return {
                ...state,
                creditTerm: {
                    ...state.creditTerm,
                    ...action.payload,
                }
            };
        case 'CHANGE-LOAN-RATE':
            return {...state, loanRate: action.rate + 5};
        case 'CHANGE-ANNUITY-PAYMENT':
            return {...state, isAnnuityPayment: action.isAnnuityPayment};
        case 'CHANGE-STATUS':
            return {...state, isLoaded: action.status};
        default:
            return state;
    }
};

export function changeAmountOfCreditAC(sum: number) {
    return {type: 'CHANGE-AMOUNT-CREDIT', sum,} as const;
}

export function changeCreditTermAC(payload: { id: number, count: number, isYear: boolean }) {
    return {type: 'CHANGE-CREDIT-TERM', payload,} as const;
}

export function changeLoanRateAC(rate: number) {
    return {type: 'CHANGE-LOAN-RATE', rate,} as const;
}

export function changePaymentTypeAC(isAnnuityPayment: boolean) {
    return {type: 'CHANGE-ANNUITY-PAYMENT', isAnnuityPayment,} as const;
}

export function changeStatusAC(status: boolean) {
    return {type: 'CHANGE-STATUS', status,} as const;
}


export type StateType = typeof initialState

