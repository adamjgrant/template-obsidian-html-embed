export class Patient {
  constructor(organ) {
    this.organ = organ;
    this.healthStatus = 100;
    this.currentDate = new Date();
    this.waitingTime = 0;
    this.hasTransplant = false;
    this.waitingForTransplant = false;
    this.chanceOfTransplant = this.calculateChanceOfTransplant();
    this.chanceOfSurvivalWithTransplant = this.calculateChanceOfSurvival(true);
    this.chanceOfSurvivalWithoutTransplant = this.calculateChanceOfSurvival(false);
  }

  calculateChanceOfTransplant() {
    // Simplified calculation
    const baseChance = 10; // Base chance of transplant for simplicity
    return Math.min(100, baseChance + (this.waitingTime * 2)); // Increase chance by 2% every month
  }

  calculateChanceOfSurvival(withTransplant) {
    if (withTransplant) {
      // Assume survival rate improves immediately after transplant
      return this.organ.survivalRate1Year;
    } else {
      // Decrease survival chance as health declines
      return Math.max(0, this.organ.survivalRate1Year - (100 - this.healthStatus));
    }
  }

  updateMonthly() {
    this.waitingTime += 1;
    this.decreaseHealth();
    this.chanceOfTransplant = this.calculateChanceOfTransplant();
    this.chanceOfSurvivalWithTransplant = this.calculateChanceOfSurvival(true);
    this.chanceOfSurvivalWithoutTransplant = this.calculateChanceOfSurvival(false);
  }

  decreaseHealth() {
    // Health decreases based on organ's daily mortality rate over a month
    const monthlyDecline = 30 * this.organ.dailyMortalityRate * 100; // Simplified monthly health decline
    this.healthStatus = Math.max(0, this.healthStatus - monthlyDecline);
  }

  updateDaily() {
    // For daily updates, adjust this method to decrease health daily and check for transplant matches
    this.decreaseHealthDaily();
    // Other daily updates can go here
  }

  decreaseHealthDaily() {
    // Health decreases based on organ's daily mortality rate
    const dailyDecline = this.organ.dailyMortalityRate * 100; // Daily health decline
    this.healthStatus = Math.max(0, this.healthStatus - dailyDecline);
  }
}