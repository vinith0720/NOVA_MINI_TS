import db from '../models';
import { employeecsv, employeeupdate } from '@dto/employee';
const { Employee } = db;

// Standalone update function with error handling
export const updateEmployeenameandEmail = async (id: number, employee: employeeupdate) => {
  try {
    return await Employee.update(
      { name: employee.name, email: employee.email },
      { where: { id: employee.id, companyId: id } }
    );
  } catch (error) {
    console.error('Error in updateEmployeenameandEmail:', error);
    throw error;
  }
};

export class EmployeeService {
  static getEmployee = async () => {
    try {
      return await Employee.findAll();
    } catch (error) {
      console.error('Error in getEmployee:', error);
      throw error;
    }
  };

  static getEmployeeByID = async (id: number) => {
    try {
      return await Employee.findByPk(id);
    } catch (error) {
      console.error('Error in getEmployeeByID:', error);
      throw error;
    }
  };

  static updateEmployee = async (
    id: number,
    name: string,
    email: string,
    companyId: number
  ): Promise<[affectedCount: number]> => {
    try {
      return await Employee.update({ name, email, companyId }, { where: { id } });
    } catch (error) {
      console.error('Error in updateEmployee:', error);
      throw error;
    }
  };

  static createEmployee = async (name: string, email: string, companyId: number) => {
    try {
      return await Employee.create({ name, email, companyId });
    } catch (error) {
      console.error('Error in createEmployee:', error);
      throw error;
    }
  };

  static deleteEmployee = async (id: number) => {
    try {
      return await Employee.destroy({ where: { id } });
    } catch (error) {
      console.error('Error in deleteEmployee:', error);
      throw error;
    }
  };

  static updateEmployeeProfile = async (id: number, profileurl: string) => {
    try {
      return await Employee.update({ profileurl }, { where: { id } });
    } catch (error) {
      console.error('Error in updateEmployeeProfile:', error);
      throw error;
    }
  };

  static bulkinsertEmployee = async (employees: employeecsv[]) => {
    try {
      return await Employee.bulkCreate(employees, {
        validate: true,
        ignoreDuplicates: true,
      });
    } catch (error) {
      console.error('Error in bulkinsertEmployee:', error);
      throw error;
    }
  };
}
