export class RiskManager {
  constructor() {
    this.maxRiskPerTrade = 0.01; // 1%
  }

  canExecute(account, signal) {
    const maxLoss = account.balance * this.maxRiskPerTrade;

    if (maxLoss < 10) return false;

    return true;
  }
}
