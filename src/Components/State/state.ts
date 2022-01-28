type ActionTypes = ReturnType<typeof changeAmountOfCreditAC>
    | ReturnType<typeof changeCreditTermAC>
    | ReturnType<typeof changeLoanRateAC>
    | ReturnType<typeof changePaymentTypeAC>


export const initialState = {
    amountOfCredit: 10000,
    creditTerm: {
        id: 4,
        count: 1,
        isYear: true
    },
    loanRate: 9.25,
    isAnnuityPayment: true

};

export const stateReducer = (state: StateType, action: ActionTypes): StateType => {
    switch (action.type) {
        case 'CHANGE-AMOUNT-CREDIT':
            return {
                ...state,
                amountOfCredit: action.sum
            };
        case 'CHANGE-CREDIT-TERM':
            return {
                ...state,
                creditTerm: {
                    ...state.creditTerm,
                    id: action.payload.id,
                    count: action.payload.count,
                    isYear: action.payload.isYear
                }
            };
        case 'CHANGE-LOAN-RATE':
            return {
                ...state,
                loanRate: action.rate
            };
        case 'CHANGE-ANNUITY-PAYMENT':
            return {
                ...state,
                isAnnuityPayment: action.isAnnuityPayment
            };
        default:
            return state;
    }
};

export function changeAmountOfCreditAC(sum: number) {
    return {
        type: 'CHANGE-AMOUNT-CREDIT',
        sum,
    } as const;
}

export function changeCreditTermAC(payload: { id: number, count: number, isYear: boolean }) {
    return {
        type: 'CHANGE-CREDIT-TERM',
        payload,
    } as const;
}

export function changeLoanRateAC(rate: number) {
    return {
        type: 'CHANGE-LOAN-RATE',
        rate,
    } as const;
}

export function changePaymentTypeAC(isAnnuityPayment: boolean) {
    return {
        type: 'CHANGE-ANNUITY-PAYMENT',
        isAnnuityPayment,
    } as const;
}


export type StateType = typeof initialState
