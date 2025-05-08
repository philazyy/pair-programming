export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};
 
export type Deductions = Map<string, number>;
 
export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);
 
export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};
 
export function calculatePayslip(salary: Salary): Payslip {
  // TODO: implement
  const birthdate = new Date(salary.born);
  const payday = new Date(salary.payday);
  const age = payday.getFullYear() - birthdate.getFullYear();
  const turened17 = new Date(birthdate.getFullYear() + 17, 0, 1);
  const isOlderThan17 = payday >= turened17;
  const yearlyGross = salary.gross * 12;
  const deductions: Deductions = new Map();
 
  if (isOlderThan17)
  {
    for (const name of ["AHV", "IV", "EO"]) {
      const rate = DEDUCTION_RATES.get(name);
      deductions.set(name, +(salary.gross * (rate / 100)).toFixed(2));
    }
  }
 
  if (yearlyGross >= 2500)
  {
    for (const name of ["ALV", "NBU"]) {
      const rate = DEDUCTION_RATES.get(name);
      deductions.set(name, +(salary.gross * (rate / 100)).toFixed(2));
    }
  }
 
  if (yearlyGross >= 22680)
  {
    const rate = DEDUCTION_RATES.get("PK");
    deductions.set("PK", +(salary.gross * (rate / 100)).toFixed(2));
  }
 
  let totalDeductions = 0;
  for (const value of deductions.values()){
    totalDeductions += value;
  }
 
  const net = (salary.gross - totalDeductions).toFixed(2);
 
  const result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: salary.gross,
  };
  return result;
}
 