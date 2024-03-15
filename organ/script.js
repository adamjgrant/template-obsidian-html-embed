import { Organ } from "organ.js";
import { Patient } from "patient.js";

const kidney = new Organ('Kidney', 60, 95, 95, 0.00017);
const liver = new Organ('Liver', 11, 75, 75, 0.0336);
const heart = new Organ('Heart', 4, 90, 80, 0.0235);
const lung = new Organ('Lung', 4, 88, 60, 0.0441);
const kidneyPancreas = new Organ('Kidney-Pancreas', 18, 96, 89.7, 0.00017);
const pancreas = new Organ('Pancreas', 24, 95, 88, 0.00017);

// After user selects an organ
const organ = kidney; // TODO
const patient = new Patient(organ);

const update_interface = () => {}

const advanceTime = () => {
  // Update patient state here
  patient.updateDaily();

  // Advance the current date by one day
  patient.currentDate.setDate(patient.currentDate.getDate() + 1);

  // Log current state for debugging (or update UI accordingly)
  console.log(`Current Date: ${patient.currentDate.toLocaleDateString()}`);
  console.log(`Health Status: ${patient.healthStatus}`);
  console.log(`Waiting Time: ${patient.waitingTime} months`);
  // Add more logs or UI updates for other patient properties as needed
  update_interface();
}

// Call advanceTime every two seconds
setInterval(advanceTime, 2000);