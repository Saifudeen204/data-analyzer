let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveToStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction() {
  const desc = document.getElementById('desc').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  if (!desc || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid description and amount!');
    return;
  }

  const transaction = {
    id: Date.now(),
    desc,
    amount,
    type
  };

  transactions.push(transaction);
  saveToStorage();
  updateUI();

  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveToStorage();
  updateUI();
}

function updateUI() {
  const list = document.getElementById('transaction-list');
  list.innerHTML = '';

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else expense += t.amount;

    const li = document.createElement('li');
    li.className = t.type === 'income' ? 'income-item' : 'expense-item';
    li.innerHTML = `
      <span>${t.desc}</span>
      <span>${t.type === 'income' ? '+' : '-'}₦${t.amount.toLocaleString()}</span>
      <button class="delete-btn" onclick="deleteTransaction(${t.id})">🗑️</button>
    `;
    list.appendChild(li);
  });

  const balance = income - expense;
  document.getElementById('balance').textContent = '₦' + balance.toLocaleString();
  document.getElementById('total-income').textContent = '₦' + income.toLocaleString();
  document.getElementById('total-expense').textContent = '₦' + expense.toLocaleString();
}

updateUI();
