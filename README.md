# E-commerce Playwright Tests

End-to-end tests for the (https://practicesoftwaretesting.com), written in TypeScript with Playwright.

## Features

- Page Object Model (pages/)
- Test data with Faker (data/factory.ts)
- Login reuse with storageState (tests/auth.setup.ts)
- Custom admin login fixture (fixtures/adminAuth.fixture.ts)
- Automatic test runs with GitHub Actions (.github/workflows/playwright.yml)

## Project structure


ecom-test-project/
├── .github/workflows/    # CI workflow (GitHub Actions)
├── data/                 # Test data factory (Faker)
├── fixtures/             # Custom fixtures
├── pages/                # Page objects (BasePage, LoginPage, ProductPage, RegistrationPage)
├── tests/                # Test specs and the login setup
├── .env.example          # Template for environment variables
└── playwright.config.ts  # Playwright configuration


## Setup

1. Install the project tools and the browsers:

   npm install
   npx playwright install


2. Copy .env.example to .env and fill in the login details:

   
   CUSTOMER_1_EMAIL=
   CUSTOMER_1_PASSWORD=
   ADMIN_EMAIL=
   ADMIN_PASSWORD=
   

## Run tests locally


npx playwright test
npx playwright show-report


Run one file, or watch the browser while tests run:


npx playwright test product.spec.ts
npx playwright test --headed


## Continuous integration (GitHub Actions)

Tests run automatically on every push and pull request to main or master.

- Uses the latest LTS version of Node.js on Ubuntu
- Installs dependencies with npm ci and the Playwright browsers
- Runs all tests (time limit: 60 minutes)
- Uploads the HTML report as an artifact named playwright-report, kept for 30 days

To view a report: open the **Actions** tab, choose a run, download playwright-report under **Artifacts**, then unzip it and open `ndex.html.

### Required secrets

Login details are not stored in the repository. Add them under **Settings → Secrets and variables → Actions → New repository secret**:

- CUSTOMER_1_EMAIL
- CUSTOMER_1_PASSWORD
- ADMIN_EMAIL
- ADMIN_PASSWORD