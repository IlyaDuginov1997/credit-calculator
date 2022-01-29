import {
    changeAmountOfCreditAC,
    changeCreditTermAC,
    changeLoanRateAC,
    changePaymentTypeAC,
    changeAppStatusAC,
    stateReducer, changeDetailesTableStatusAC, CurrentDateType
} from './state';

type InitialStateType = {
    amountOfCredit: number
    creditTerm: {
        id: number
        count: number
        isYear: boolean
    }
    loanRate: number
    isAnnuityPayment: boolean
    appStatus: boolean
    detailsTableStatus: boolean
    currentDate: CurrentDateType
};

let startState = {} as InitialStateType;
beforeEach(() => {
        startState = {
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
    }
);

test('amount of credit will be changed', () => {
    const endState = stateReducer(startState, changeAmountOfCreditAC(200));
    expect(startState.amountOfCredit).toBe(10000);
    expect(endState.amountOfCredit).toBe(200);
});

test('credit term will be changed', () => {
    const payload = {
        id: 2,
        count: 5,
        isYear: false
    }
    const endState = stateReducer(startState, changeCreditTermAC(payload));
    expect(startState.creditTerm.id).toBe(4);
    expect(endState.creditTerm.id).toBe(2);
    expect(startState.creditTerm.count).toBe(1);
    expect(endState.creditTerm.count).toBe(5);
    expect(startState.creditTerm.isYear).toBeTruthy();
    expect(endState.creditTerm.isYear).toBeFalsy()
});

test('loan rate will be changed', () => {
    const endState = stateReducer(startState, changeLoanRateAC(15));
    expect(startState.loanRate).toBe(9.25);
    expect(endState.loanRate).toBe(20);
});

test('calculator-mode will be change not a annuity payment', () => {
    const endState = stateReducer(startState, changePaymentTypeAC(false));
    expect(startState.isAnnuityPayment).toBeTruthy()
    expect(endState.isAnnuityPayment).toBeFalsy()
});

test('app status will be changed', () => {
    const endState = stateReducer(startState, changeAppStatusAC(true));
    expect(startState.appStatus).toBeFalsy()
    expect(endState.appStatus).toBeTruthy()
});

test('status of details table will be changed', () => {
    const endState = stateReducer(startState, changeDetailesTableStatusAC(true));
    expect(startState.detailsTableStatus).toBeFalsy()
    expect(endState.detailsTableStatus).toBeTruthy()
});
