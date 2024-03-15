import { Organ } from "organ.js";
import { Patient } from "patient.js";

const kidney = new Organ('Kidney', 60, 95, 95, 0.00017);
const liver = new Organ('Liver', 11, 75, 75, 0.0336);
const heart = new Organ('Heart', 4, 90, 80, 0.0235);
const lung = new Organ('Lung', 4, 88, 60, 0.0441);
const kidneyPancreas = new Organ('Kidney-Pancreas', 18, 96, 89.7, 0.00017);
const pancreas = new Organ('Pancreas', 24, 95, 88, 0.00017);