type ActionTypes = ReturnType<typeof changeAmountOfCreditAC>
    | ReturnType<typeof changeCreditTermAC>
    | ReturnType<typeof changeLoanRateAC>
    | ReturnType<typeof changePaymentTypeAC>
    | ReturnType<typeof changeAppStatusAC>
    | ReturnType<typeof changeDetailesTableStatusAC>
    | ReturnType<typeof initializeCurrentDateAC>

export type CurrentDateType = {
    day: number
    month: number
    year: number
}

export const initialState = {
    amountOfCredit: 10000,
    creditTerm: {
        id: 4,
        count: 1,
        isYear: true
    },
    loanRate: 9.25,
    isAnnuityPayment: true,
    appStatus: false,
    detailsTableStatus: false,
    currentDate: {
        day: 1,
        month: 1,
        year: 2020,
    }
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
            return {...state, appStatus: action.appStatus};
        case 'CHANGE-DETAIL-TABLE-STATUS':
            return {...state, detailsTableStatus: action.status};
        case 'INITIALIZE-CURRENT-DATE':
            return {...state, currentDate: {...action.currentDate}};
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

export function changeAppStatusAC(appStatus: boolean) {
    return {type: 'CHANGE-STATUS', appStatus,} as const;
}

export function changeDetailesTableStatusAC(status: boolean) {
    return {type: 'CHANGE-DETAIL-TABLE-STATUS', status,} as const;
}

export function initializeCurrentDateAC(currentDate: CurrentDateType) {
    return {type: 'INITIALIZE-CURRENT-DATE', currentDate,} as const;
}

export type StateType = typeof initialState

