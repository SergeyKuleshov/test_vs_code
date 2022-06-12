const foodJournal = [
  {
    foods: ['Бутер', 'Кофе', 'Пирожок', 'Шоколадка', 'Суп', 'Второе', 'Кефир'],
    hadStomachache: true,
  },
  {
    foods: ['Овсянка', 'Кофе', 'Шоколадка', 'Суп', 'Второе', 'Ряженка'],
    hadStomachache: false,
  },
  {
    foods: ['Яичница', 'Кофе', 'Шава', 'Суп', 'Второе', 'Пиво'],
    hadStomachache: true,
  }
];

function addFoodJournal(foods, hadStomachache) {
  foodJournal.push({
    foods,
    hadStomachache
  });
}

addFoodJournal(['Бутер', 'Кофе', 'Салат', 'Суп', 'Второе', 'Кефир'], false);
addFoodJournal(['Шаверма', 'Кофе', 'Салат', 'Второе', 'Ряженка'], true);
addFoodJournal(['Яичница', 'Кофе', 'Пирожок', 'Второе', 'Пиво'], true);
addFoodJournal(['Бутер', 'Кофе', 'Суп', 'Второе', 'Ряженка'], false);
addFoodJournal(['Бутер', 'Кофе', 'Шава', 'Второе', 'Кефир'], true);

console.log(foodJournal);




function makingCorrelationTable(item, coll) {

  const resultArray = [];

  // первая часть bool, вторая часть - есть ли элемент в массиве 
  let ff = 0;
  let ft = 0;
  let tf = 0;
  let tt = 0;

  for (const day of coll) {
    if (day.hadStomachache === false && !day.foods.includes(item)) {
      ff += 1;
    } else if (day.hadStomachache === false && day.foods.includes(item)) {
      ft += 1;
    } else if (day.hadStomachache === true && !day.foods.includes(item)) {
      tf += 1;
    } else {
      tt += 1;
    }
  }
  resultArray.push(ff, ft, tf, tt);
  return resultArray;
}

const correlationTableFoodJournal = makingCorrelationTable('Бутер', foodJournal);

console.log(correlationTableFoodJournal);



function phiCoefficient(correlationTable) {
  const ff = correlationTable[0];
  const ft = correlationTable[1];
  const tf = correlationTable[2];
  const tt = correlationTable[3];

  const result = (tt * ff - tf * ft) / (Math.sqrt((tf + tt) * (ft + ff) * (ft + tt) * (tf + ff)));
  if (isNaN(result)) {
    return 0;
  }
  return Math.ceil((result) * 1000) / 1000;
}

const phiCoefficientSandwich = phiCoefficient(correlationTableFoodJournal);
console.log(phiCoefficientSandwich);



function mergeFood(coll) {
  const resultArray = [];
  for (const day of coll) {
    resultArray.push(...day.foods);
  }
  return resultArray;
}


function minCorrelation(coll) {
  let result = [coll[0]];
  for (let i = 1; i < coll.length; i += 1) {
    if (coll[i][1] < result[0][1]) {
      result.length = 0;
      result.push(coll[i]);
    } else if (coll[i] === result[0][1]) {
      result.push(coll[i]);
    }
  }
  return result;
}


function maxCorrelation(coll) {
  let result = [coll[0]];
  for (let i = 1; i < coll.length; i += 1) {
    if (coll[i][1] > result[0][1]) {
      result.length = 0;
      result.push(coll[i]);
    } else if (coll[i][1] === result[0][1]) {
      result.push(coll[i]);
    }
  }
  return result;
}



const whatCausesStomachPain = (foodJournal) => {
  const allFoods = mergeFood(foodJournal);
  const uniqFood = _.uniq(allFoods);

  const compareTable = [];
  for (const food of uniqFood) {
    const correlationTableFoodJournal = makingCorrelationTable(food, foodJournal);
    const phiCoefficientFood = phiCoefficient(correlationTableFoodJournal);
    compareTable.push([food, phiCoefficientFood]);

  }

  const minCorrelationArray = minCorrelation(compareTable);
  const maxCorrelationArray = maxCorrelation(compareTable);

  let resultStr = 'Продукт(ы) максимально коррелирующие с болью в животе:\n';
  for (const item of maxCorrelationArray) {
    resultStr += `  - ${item[0]} (${item[1]})\n`;
  }

  resultStr += 'Продукты(ы) отрицательно коррелирующий с неприятными ощущениями:\n';
  for (const item of minCorrelationArray) {
    resultStr += `  - ${item[0]} (${item[1]})\n`;
  }




  function comparisonTable(coll, nameTable) {
    let resultStr = `<table border="1"><caption>${nameTable}</caption><tr><th>Продукты</th><th>Коэффициент</th>`;
    for (const item of coll) {
      resultStr += `</tr><tr><td>${item[0]}</td><td>${item[1]}</td>`;
    }
    return resultStr += `</tr></table>`;
  }

  document.write(comparisonTable(compareTable, 'Общая таблица'));
  document.write(comparisonTable(minCorrelationArray, 'Полезные'));
  document.write(comparisonTable(maxCorrelationArray, 'Негативный эффект'));



  return resultStr;
};

console.log(whatCausesStomachPain(foodJournal));






const list = {
  value: "zero",
  rest: {
    value: "one",
    rest: {
      value: "two",
      rest: null
    }
  }
};


console.log(list.value);
console.log(list.rest.value);
console.log(list.rest.rest.value);


let jsonList = JSON.stringify(list);
console.log(jsonList);



function listToArray(list) {
  let resultArray = [];
  for (let i = 1; i < jsonList.length; i += 1) {
    let current = "";
    if (jsonList[i] === '"' && jsonList[i - 1] === ":") {
      console.log(jsonList[i + 1]);
      for (let j = i + 1; ; j += 1) {

        if (jsonList[j] === '"') {
          break;
        }
        current += jsonList[j];
      }
      resultArray.push(current);
    }
  }
  return resultArray;
}

console.log(listToArray(list));

console.log(2 + 1);
console.log(JSON.stringify(list));

if (true) {
  console.log("ку-ку");
}
console.log("ue");



console.log(listToArray(list));
console.log(listToArray(listOfNumbers));
console.log(listToArray(listMix));


function listToArray(coll) {
  const resultArray = []
  for (let node = coll; node; node = node.rest) {
    resultArray.push(node.value);
  }
  return resultArray;
}





// доделать
let arr = [];

function rec(coll) {
  if (coll.value = null) {
    return 1;
  } else {
    arr.push(coll.value);
    return rec(coll.rest);
  }

}

console.log(rec(list));







function sumTo(number) {

  if (number == 1) {
    return 1;
  } else {
    return number + sumTo(number - 1);
  }
}

console.log(sumTo(3));


function factorial(number) {
  if (number == 1) {
    return 1;
  } else {
    return number * factorial(number - 1);
  }
}

console.log(factorial(5));





let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};


console.log(company.sales[0].name);




function showListsValue(coll) {
  let current = coll;
  // console.log(current.rest.rest.rest); //null

  while (current) {
    console.log(current.value);
    current = current.rest;
  }
}

showListsValue(list);


function showListsValue(coll) {
  let current = coll;

  if (!current) {
    return 1;
  } else {
    console.log(current.value);
    return showListsValue(coll.rest);

  }
}

showListsValue(list);



function listToArrayRecursia(coll, arr) {
  // let current = coll;

  if (!coll) {
    return arr;
  } else {
    arr.push(coll.value);
    return (listToArrayRecursia(coll.rest, arr));
  }
}

const arrForList = [];
const arrForListOfNumbers = [];
const arrForListMix = [];

console.log(listToArrayRecursia(list, arrForList));
console.log(listToArrayRecursia(listOfNumbers, arrForListOfNumbers));
console.log(listToArrayRecursia(listMix, arrForListMix));



function showListReverseLoop(coll) {
  let resultArray = [];
  let current = coll;

  while (current) {
    resultArray.push(current.value);
    current = current.rest;
  }
  for (let i = resultArray.length - 1; i >= 0; i -= 1) {
    console.log(resultArray[i]);
  }
}

showListReverseLoop(list);


const arrForReverseRecursia = [];
function showListReverseRecursia(coll, arr) {

  if (!coll) {
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      console.log(arr[i]);
    }
  } else {
    arr.push(coll.value);
    showListReverseRecursia(coll.rest, arr);
  }
}

showListReverseRecursia(listMix, arrForReverseRecursia);


function nth(coll, number) {
  const resultArray = [];
  let temporary = coll;

  while (temporary) {
    resultArray.push(temporary.value);
    temporary = temporary.rest;
  }
  return console.log(resultArray[number]);
}

console.log("------------------------------------------------");
nth(listMix, 4);



const newList = {
  value: "zero",
  rest: {
    value: "one",
    rest: {
      value: "two",
      rest: null
    }
  }
};

const x = {};
x.value = -1;

console.log(x);
console.log(x.value);

x.rest = newList;
console.log(x);

showListReverseLoop(x);


