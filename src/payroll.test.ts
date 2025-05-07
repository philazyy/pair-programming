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

    test("18-Jähriger Lernender mit 1200.-", () => {
        const salary: Salary = {
            born: createDate("2007-04-18"),
            payday: createDate("2025-05-07"),
            gross: 1200,
        };
        const payslip = calculatePayslip(salary);
        expect(payslip.totalDeductions).toBeCloseTo(1200 * (8.7 + 1.4 + 0.5) / 100, 2);
        expect(payslip.net).toBeCloseTo(1200 - payslip.totalDeductions, 2);
});

    test("21-Jähriger Lernender mit 5900.-", () => {
        const salary: Salary = {
            born: createDate("2003-04-18"),
            payday: createDate("2025-05-07"),
            gross: 5900,
        };
        const payslip = calculatePayslip(salary);
        const expectedRate = 8.7 + 1.4 + 0.5 + 1.1 + 0.73 + 8.9;
        expect(payslip.totalDeductions).toBeCloseTo(5900 * expectedRate / 100, 2);
        expect(payslip.net).toBeCloseTo(5900 - payslip.totalDeductions, 2);
});

}
)