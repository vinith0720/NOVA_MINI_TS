import db from '../models';
import { EmployeeAttributes, employeecsv, employeeupdate } from '@dto/employee';
const { Company, Employee } = db;

export const updateEmployeenameandEmail = async (id: number, employee: employeeupdate) => {
  return Employee.update(
    { name: employee.name, email: employee.email },
    { where: { id: employee.id, companyId: id } }
  );
};

export class EmployeeService {
  static getEmployee = async () => {
    return Employee.findAll();
  };
  static getEmployeeByID = async (id: number) => {
    return Employee.findByPk(id);
  };
  static updateEmployee = async (
    id: number,
    name: string,
    email: string,
    companyId: number
  ): Promise<[affectedCount: number]> => {
    return Employee.update(
      { name: name, email: email, companyId: companyId },
      { where: { id: id } }
    );
  };
  static createEmployee = async (name: string, email: string, companyId: number) => {
    return Employee.create({ name, email, companyId });
  };
  static deleteEmployee = async (id: number) => {
    return Employee.destroy({ where: { id } });
  };
  static updateEmployeeProfile = async (id: number, profileurl: string) => {
    return Employee.update({ profileurl }, { where: { id } });
  };
  static bulkinsertEmployee = async (employees: employeecsv[]) => {
    return Employee.bulkCreate(employees, { validate: true, ignoreDuplicates: true });
  };
}
