import {ArrayType} from '../../Components/InputBlock/InputBlock';
import {CurrentDateType} from '../../Components/State/state';

export type MonthArrayDetailsObjectType = {
    date: CurrentDateType
    daysPeriodBetweenMont: number
}

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


export const numberOfPaymentsFunc = (creditTerm: ArrayType) => {
    if (creditTerm.isYear) {
        return creditTerm.count * 12;
    } else {
        return creditTerm.count;
    }
};

const daysInMonthFunc = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
};

export const calendarFunc = (date: CurrentDateType, numberOfPayments: number) => {
    let {day, month, year} = date;
    let monthArrayDetails = [];
    for (let i = 0; i < numberOfPayments; i++) {
        // debugger
        month++;
        if (month > 12) {
            month = 1;
            year += 1;
        }
        let thisDay;
        if (day > 28) {
            const daysInMonth = daysInMonthFunc(month, year);
            thisDay = ((day - daysInMonth) > 0)
                ? daysInMonthFunc(month, year)
                : day;
        } else {
            thisDay = day;
        }

        let daysPeriodBetweenMont: number = (i === 0)
            ? thisDay + daysInMonthFunc(month - 1, year) - day
            : thisDay + daysInMonthFunc(month - 1, year) - monthArrayDetails[i-1].date.day
        ;
        const monthArrayDetailsObject: MonthArrayDetailsObjectType = {
            date: {
                day: thisDay,
                month,
                year,
            },
            daysPeriodBetweenMont
        };

        monthArrayDetails.push(monthArrayDetailsObject);
    }
    return monthArrayDetails;
};

