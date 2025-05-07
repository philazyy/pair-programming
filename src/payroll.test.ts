import { calculatePayslip, Salary } from "./payroll";

describe("CalculatePayslip", () => {
    function createDate(dateString: string): Date {
        return new Date(dateString)
    }

    test("16-Jähriger Lernender mit 700.-", () => {
    const salary: Salary = {
        born: createDate("2008-08-08"),
        payday: createDate("2025-05-07"),
        gross: 700,
    };
    const payslip = calculatePayslip(salary);
    expect(payslip.totalDeductions).toBe(0);
    expect(payslip.net).toBe(700);
    });
}
)