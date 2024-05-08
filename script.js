'use strict'



let percent = 400; /* стоимость одного процента прибавки к окладу (1% KPI) */
let yuanExcRate = 13.16; /* курс одного Юаня к Рублю */
let plan = 3800000;

const anna = {
    salary: 25000,
    transaction: [683740, 208088, 104942, 76507, 120979, 9902, 58951, 4779, 116570, 87064, 110482, 39741, 63500, 100310, 141522, 92655, 141106, 36028],
    bargain: [350, 670, 266, 300, 163, 576, 220, 305, 195, 338, 405, 321],
    includePlan: [],
    totalPlanAmount: [],
    bargainResult: [],
    planResult: [],
    amountToBePaid: []
};

/* Рассчет общей суммы всех значений в массиве */
function calcSumValue (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }return sum;
};


/* приводим к единому формату отображения сумм учитываемых в план (учитывать суммы только до 200.000) */
for (let i = 0; i < anna.transaction.length; i++) {
    let a = anna.transaction[i] * 1;
    if(a >= 200000) {
        anna.includePlan.push(anna.transaction[i] = 200000);
    } else {
        anna.includePlan.push(anna.transaction[i] * 1);
    };
};

/* выявляем общую сумму все сделок в рамках плана */
anna.totalPlanAmount.push(calcSumValue(anna.includePlan));
/* вычисляем 40% от суммы торга*/
anna.bargainResult.push((calcSumValue(anna.bargain) * 13.16) * 0.4);


function calcPlanResult (percentPlan, percentPlanAmount) {
    /* процент выполнения плана */
    percentPlan = Math.floor(Math.round((percentPlanAmount * 100) / plan));
    /* узнаем 50% плана */
    percentPlanAmount = plan * 0.5;
    
    let x = (percentPlanAmount * 100) / plan;
    let z;
   
    if(percentPlan > x) {
        z = Math.floor(Math.round((percentPlan - x) * 400) + 30000);
    } else if (percentPlan < x) {
        z = 30000;
    } else {
        z = 30000;
    } return z;

};
/* Рассчитываем сумму для выплаты премии */
const premia = kash => kash >= 50000 ? kash = 50000 : kash;
/* Пушим конечное значение рассчета премии */
anna.planResult.push(premia(calcPlanResult(plan, anna.totalPlanAmount)));
/*  Деструктурируем массивы для получения их значений */
const [amountPaid1, amountPaid2] = [...anna.bargainResult, ...anna.planResult];
/* Рассчитываем общую сумму выплаты сотруднику */
function calcAmountPaid () {
    let a = amountPaid1;
    let b = amountPaid2;
    let c = anna.salary;

    let d = a + b + c;
    return d
};

anna.amountToBePaid.push(Math.round(calcAmountPaid()));

console.log(`Ставка сотрудника: ${anna.salary}
            Сумма учитываемая в план: ${anna.totalPlanAmount}
            Сумма торга: ${anna.bargainResult}
            Премия за % выполнения плана: ${anna.planResult}

    Общая сумма к выплате : ${anna.amountToBePaid}`)



/////// TEST VALUE //////

// Ставка сотрудника: 25000
// Сумма учитываемая в план: 1705038
// Сумма торга: 21629.776
// Премия за % выполнения плана: 30000
// Общая сумма к выплате : 76630