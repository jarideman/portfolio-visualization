# Setup

### 1. Setup backend API
Please set up [Data Engine](https://github.com/jarideman/data-engine) as a fully functional backend API.

Start the Data Engine so the api can handle the requests

### 2. Configure environment variables
**Windows:**
```bash
copy .env.example .env
```

**Linux / macOS:**
```bash
cp .env.example .env
```

Fill in the required variables in `.env`.

### 3. Install dependencies
```bash
npm install
```

### 4. Run the application
```bash
npm run dev
```


# Dashboard
  ## Performance Chart
  - [x] Portfolio value over time
  - [x] P&L over time
  - [x] Time filters:
    - [x] 1D
    - [x] 1W
    - [x] 1M
    - [x] 3M
    - [x] 6M
    - [x] YTD
    - [x] 1Y
    - [x] ALL

  ## Portfolio Summary
  - [x] Total Portfolio Value
  - [x] Total P&L
  - [x] Total Return (%)
  - [x] Today's P&L
  - [x] Cash Balance

  ## Risk Overview
  - [x] Maximum Drawdown
  - [x] Win Rate
  - [x] Profit Factor
  - [x] Average Win
  - [x] Average Loss

  ## Portfolio Allocation
  - [x] Allocation by asset
  - [x] Allocation by percentage
  - [x] Allocation chart

# Trades
  ## Open trades
  - [x] Symbol
  - [x] Buy / Sell
  - [x] Quantity
  - [x] Entry price
  - [x] Current price
  - [x] Profit
  - [x] Date

  ## Closed trades
  - [x] Symbol
  - [x] Buy / Sell
  - [x] Quantity
  - [x] Entry price
  - [x] Exit price
  - [x] Profit
  - [x] Date

  ## Filtering
  - [x] Symbol
  - [x] Buy / Sell
  - [x] Profit / Loss
  - [x] Date

  ## Sorting
  - [x] Volume
  - [x] Profit / Loss
  - [x] Date

  ## Visual
  - [ ] Show historic trade in chart
  - [ ] Show open trade in chart with tp & sl lines


# Account info
- [x] Account number
- [x] Name
- [x] Leverage
- [x] Balance
- [x] Equity
- [x] Server
- [x] Trade allowed
- [x] Trade expert enabled
