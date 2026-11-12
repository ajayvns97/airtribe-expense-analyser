const fs = require('fs');
const _ = require('lodash'); 

const parseExpenses = (text) => {
  return text.trim().split('\n').map((line) => {
    const parts = line.trim().split(',');
    return {
      category: parts[0],
      amount: Number(parts[1])
    };
  });
};

// Read the file synchronously.
console.time('sync read');
const text = fs.readFileSync('expenses.txt', 'utf8');
console.timeEnd('sync read');

const expenses = parseExpenses(text);
console.log('First expense:', expenses[0]);


// Calculate the total.
const totalSpent = expenses.reduce((total, e) => {
  return total + e.amount;
}, 0);

// Keep expenses strictly above Rs 500.
const bigExpenses = expenses.filter((e) => {
  return e.amount > 500;
});

// Create new objects without changing the original objects.
const withFee = expenses.map((e) => {
  return {
    ...e,
    amount: e.amount + 50
  };
});

// Calculate the total for each category.
const totalsByCategory = {};

for (const e of expenses) {
  if (totalsByCategory[e.category] === undefined) {
    totalsByCategory[e.category] = 0;
  }

  totalsByCategory[e.category] += e.amount;
}


console.log('Total spent:', totalSpent);
console.log('Expenses above Rs 500:', bigExpenses);
console.log('Big expenses count:', bigExpenses.length);
console.log('Expenses with delivery fee:', withFee);
console.log('First amount with fee:', withFee[0].amount);
console.log('Original first amount:', expenses[0].amount);
console.log('Category totals:', totalsByCategory);



function budgetNote(category) {
  let note;

  switch (category) {
    case 'food':
      note = 'Daily need';
      break;

    case 'travel':
      note = 'Commute';
      break;

    case 'books':
      note = 'Study';
      break;

    default:
      note = 'Other';
      break;
  }

  return note;
}

const categories = ['food', 'travel', 'books', 'entertainment'];

categories.forEach((category) => {
  const total = totalsByCategory[category];
  const status = total > 1500 ? 'OVER 1500' : 'OK';

  console.log(
    `${category} (${budgetNote(category)}): Rs ${total} - ${status}`
  );
});





function createBudgetTracker(limit) {
  let spent = 0;

  return function spend(amount) {
    spent += amount;

    if (spent > limit) {
      return `Over budget by ${spent - limit}`;
    }

    return `Remaining: ${limit - spent}`;
  };
}

const tracker = createBudgetTracker(1000);

console.log(tracker(300));
console.log(tracker(500));
console.log(tracker(400));



console.log('Async read started');

fs.readFile('expenses.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Async read failed:', err);
    return;
  }

  console.log('Async read finished');
});

for (let i = 0; i < 1000000; i++) {
  // Intentional loop to demonstrate execution order.
}

console.log('Loop finished');