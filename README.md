# saucedemo-playwright
E2E tests for the SauceDemo e-commerce application using **TypeScript + Playwright + Page Object Model**.

---

## Project structure

```
saucedemo-playwright/
├── pages/
│   ├── LoginPage.ts        # Login page actions and locators
│   ├── InventoryPage.ts    # Product listing page actions and locators
│   ├── CartPage.ts         # Cart page actions and locators
│   └── CheckoutPage.ts     # Checkout page actions and locators
├── tests/
│   ├── login.spec.ts       # Login tests
│   ├── inventory.spec.ts   # Product listing tests
│   ├── cart.spec.ts        # Cart tests
│   └── checkout.spec.ts    # Checkout tests
├── utils/
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## How to run the tests

### 1. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 2. Run all tests

```bash
npx playwright test
```

### 3. Run with visible browser

```bash
npx playwright test --workers=1
```

### 4. Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

### 5. Run in debug mode

```bash
npx playwright test --debug
```

---

## Test coverage

| Group | Cases |
|---|---|
| Login | Valid credentials, locked out user, invalid credentials |
| Inventory | Product count, add to cart, multiple items, sorting A-Z, Z-A, price low-high, high-low |
| Cart | Item in cart, item count, remove item, continue shopping, proceed to checkout |
| Checkout | Complete purchase, missing first name, missing last name, missing postal code, order summary |

---

## Bugs found during development

| # | Bug | Root cause | Status |
|---|---|---|---|
| #1 | Sort dropdown not found | Locator used underscore `product_sort_container` instead of hyphen `product-sort-container` | ✅ Fixed |
| #2 | CartPage not recognized | Filename casing mismatch on Windows (`cartPage.ts` vs `CartPage.ts`) | ✅ Fixed |

---

## Known limitations

- Tests run against the live SauceDemo website — test stability depends on site availability
- No CI/CD pipeline configured yet

---

## Stack

- TypeScript 5+
- Playwright
- Page Object Model pattern