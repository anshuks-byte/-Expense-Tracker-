/**
 * WEALTH MANAGER - CORE APPLICATION ENGINE
 * Functional Scope: Vertical Stack Control, Initial Parser, Array Computations
 */

// --- 1. DUMMY DATA MATRIX INJECTION ---
let transactions = [
    { id: 1, description: 'Whole Foods Market', amount: 142.50, type: 'expense', category: 'Groceries', date: '2026-06-14' },
    { id: 2, description: 'City Power & Light', amount: 85.20, type: 'expense', category: 'Utilities', date: '2026-06-13' },
    { id: 3, description: 'Tech Corp Inc.', amount: 3250.00, type: 'income', category: 'Salary', date: '2026-06-12' },
    { id: 4, description: 'Housing Society EMI', amount: 1200.00, type: 'expense', category: 'EMI', date: '2026-06-10' },
    { id: 5, description: 'Netflix Premium Subscription', amount: 14.99, type: 'expense', category: 'Entertainment', date: '2026-06-08' }
];

let currentFilter = 'all';
let currentSort = 'newest';
let userAuthenticated = false;

// --- 2. DOM INTERFACE HOOKS ---
const totalBalanceEl = document.getElementById('total-balance');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const txForm = document.getElementById('transaction-form');
const txListContainer = document.getElementById('transaction-list');
const themeToggleBtn = document.getElementById('theme-toggle');
const authNavBtn = document.getElementById('auth-nav-btn');
const userProfileEl = document.getElementById('user-profile');
const avatarLettersEl = document.getElementById('avatar-letters');
const authPageOverlay = document.getElementById('auth-page');
const loginForm = document.getElementById('login-form');
const closeAuthBtn = document.getElementById('close-auth');
const sortSelect = document.getElementById('sort-order');
const tabButtons = document.querySelectorAll('.tab-btn');

// --- 3. LIFECYCLE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Synchronize user calendar module targeting current runtime stamp
    document.getElementById('tx-date').value = new Date().toISOString().split('T')[0];
    calculateFinancials();
});

// --- 4. DATA COMPILATION LOGIC ---
function calculateFinancials() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const netBalance = totalIncome - totalExpense;

    // Render elements with appropriate currency indicators
    totalBalanceEl.textContent = `₹${netBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    totalIncomeEl.textContent = `₹${totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    totalExpensesEl.textContent = `₹${totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    renderHistoryLedger();
}

// --- 5. INITIAL GENERATOR ROUTINE ---
function generateUserInitials(fullName) {
    if (!fullName) return 'U';
    const namesArray = fullName.trim().split(/\s+/);
    
    // Process first and subsequent split characters safely
    if (namesArray.length >= 2) {
        return (namesArray[0][0] + namesArray[namesArray.length - 1][0]).toUpperCase();
    }
    return namesArray[0][0].toUpperCase();
}

// --- 6. DOM COMPONENT MATRIX RENDERER ---
function renderHistoryLedger() {
    txListContainer.innerHTML = '';

    // Step A: Parse active layout tabs filter condition
    let filtered = transactions.filter(t => {
        if (currentFilter === 'income') return t.type === 'income';
        if (currentFilter === 'expense') return t.type === 'expense';
        return true;
    });

    // Step B: Sort list based on chosen logic
    filtered.sort((a, b) => {
        if (currentSort === 'newest') return new Date(b.date) - new Date(a.date);
        if (currentSort === 'oldest') return new Date(a.date) - new Date(b.date);
        if (currentSort === 'highest') return b.amount - a.amount;
        return 0;
    });

    if (filtered.length === 0) {
        txListContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:0.85rem; padding:2rem;">No transaction parameters meet selected filters.</p>`;
        return;
    }

    // Step C: Construct item grid blocks
    filtered.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'transaction-item';

        const displayDate = new Date(item.date).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });

        const valuePrefix = item.type === 'income' ? '+' : '-';
        const colorClass = item.type === 'income' ? 'val-income' : 'val-expense';
        
        // Define clean visual icon assignment based on category choice
        let iconMarkup = '<i class="fa-solid fa-receipt"></i>';
        if (item.category === 'Groceries') iconMarkup = '<i class="fa-solid fa-cart-shopping"></i>';
        if (item.category === 'Utilities') iconMarkup = '<i class="fa-solid fa-bolt"></i>';
        if (item.category === 'Salary') iconMarkup = '<i class="fa-solid fa-briefcase"></i>';
        if (item.category === 'EMI') iconMarkup = '<i class="fa-solid fa-house-laptop"></i>';
        if (item.category === 'Entertainment') iconMarkup = '<i class="fa-solid fa-clapperboard"></i>';

        itemRow.innerHTML = `
            <div class="tx-main-info">
                <div class="tx-icon-pouch">${iconMarkup}</div>
                <div>
                    <div class="tx-desc">${item.description}</div>
                    <div class="tx-date-stamp">${displayDate}</div>
                </div>
            </div>
            <div class="tx-badge-pill">${item.category}</div>
            <div class="tx-val ${colorClass}">${valuePrefix}₹${item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <button class="btn-trash-action" onclick="removeTransaction(${item.id})" aria-label="Delete line item">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;
        txListContainer.appendChild(itemRow);
    });
}

// --- 7. EVENT SUBSCRIPTION CONTROL LOOPS ---
txForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newRecord = {
        id: Date.now(),
        description: document.getElementById('tx-description').value.trim(),
        amount: parseFloat(document.getElementById('tx-amount').value),
        type: document.getElementById('tx-type').value,
        category: document.getElementById('tx-category').value,
        date: document.getElementById('tx-date').value
    };

    transactions.unshift(newRecord); // Place newer additions instantly at head indexes
    calculateFinancials();

    // Clear structural input variables
    document.getElementById('tx-description').value = '';
    document.getElementById('tx-amount').value = '';
});

window.removeTransaction = function(targetId) {
    transactions = transactions.filter(t => t.id !== targetId);
    calculateFinancials();
};

// Tabs Event Subscriptions
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.getAttribute('data-filter');
        renderHistoryLedger();
    });
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderHistoryLedger();
});

// Light/Dark Theme Action Loop
themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    themeToggleBtn.querySelector('i').className = targetTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

// Authentication Controller Hooks
authNavBtn.addEventListener('click', () => {
    if (userAuthenticated) {
        userAuthenticated = false;
        authNavBtn.textContent = 'Sign In';
        userProfileEl.classList.add('hidden');
    } else {
        authPageOverlay.classList.remove('hidden');
    }
});

closeAuthBtn.addEventListener('click', () => {
    authPageOverlay.classList.add('hidden');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const typedName = document.getElementById('login-name').value;
    
    // Parse dynamic letter icons
    avatarLettersEl.textContent = generateUserInitials(typedName);
    
    userAuthenticated = true;
    authPageOverlay.classList.add('hidden');
    authNavBtn.textContent = 'Sign Out';
    userProfileEl.classList.remove('hidden');

    // Wipe session memory structures safely
    document.getElementById('login-name').value = '';
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
});