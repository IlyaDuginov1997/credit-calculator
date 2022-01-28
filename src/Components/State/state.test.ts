import {
    changeAmountOfCreditAC,
    changeCreditTermAC,
    changeLoanRateAC,
    changePaymentTypeAC,
    changeStatusAC,
    stateReducer
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
    isLoaded: boolean
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
            isLoaded: false
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

test('app ctatus will be changed', () => {
    const endState = stateReducer(startState, changeStatusAC(true));
    expect(startState.isLoaded).toBeFalsy()
    expect(endState.isLoaded).toBeTruthy()
});
