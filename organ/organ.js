export class Organ {
  constructor(name, medianWaitTimeMonths, survivalRate1Year, survivalRate5Year, dailyMortalityRate) {
    this.name = name; // Name of the organ
    this.medianWaitTimeMonths = medianWaitTimeMonths; // Average waiting time for the organ in months
    this.survivalRate1Year = survivalRate1Year; // Survival rate 1 year post-transplant
    this.survivalRate5Year = survivalRate5Year; // Survival rate 5 years post-transplant
    this.dailyMortalityRate = dailyMortalityRate; // Daily mortality rate on the waiting list
  }
}

// Example usage:
const kidney = new Organ('Kidney', 60, 95, 91, 0.00017);