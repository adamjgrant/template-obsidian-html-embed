const generalDailyMortalityRate = 0.00017; // Generalized daily mortality rate

const organData = {
  kidney: {
    medianWaitTime: 5 * 12, // in months
    survivalRate1Year: 95,
    survivalRate5Year: 95,
    dailyMortalityRate: generalDailyMortalityRate, // Placeholder until specific data found
  },
  liver: {
    medianWaitTime: 11, // in months
    survivalRate1Year: 75,
    survivalRate5Year: 75,
    dailyMortalityRate: 0.0336, // Specific mortality rate per 100 waiting list-years
  },
  heart: {
    medianWaitTime: 4, // in months
    survivalRate1Year: 90,
    survivalRate5Year: 80,
    dailyMortalityRate: 0.0235, // Specific mortality rate per 100 waiting list-years
  },
  lung: {
    medianWaitTime: 4, // in months
    survivalRate1Year: 88,
    survivalRate5Year: 60,
    dailyMortalityRate: 0.0441, // Updated with specific mortality rate per 100 waiting list-years
  },
  // Other organs' data remains unchanged for now
};