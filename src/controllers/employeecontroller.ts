import { Request, Response, NextFunction } from 'express';
import db from '@models/index';
import { Employee as employee } from '@models/employee';
import { employeecsv } from '@dto/employee';
import { EmployeeService } from '@services/employeeServices';

const { Employee } = db;

// GET: All employees
export const getEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const Employees: employee[] | null = await EmployeeService.getEmployee();
    if (!Employees || Employees.length === 0) {
      res.status(200).json({ msg: 'No Employees found', Employees: [] });
      return;
    }
    res.status(200).json(Employees);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// POST: Create new employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeData: employeecsv = req.body;
    const { name, email, companyId } = employeeData;
    const newEmployee: employee | null = await EmployeeService.createEmployee(
      name,
      email,
      companyId
    );
    res.status(201).json({
      msg: 'Employee created successfully',
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// PUT: Update employee by ID
export const updateEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    // const { name, email, companyId } = req.body;
    const body: Partial<employeecsv> = req.body;
    const id: number = parseInt(req.params.id);
    const employee: employee | null = await EmployeeService.getEmployeeByID(id);

    if (!employee) {
      res.status(404).json({ msg: 'Employee not found' });
      return;
    }

    const updatedname: string = body.name ?? employee.name;
    const updatedemail: string = body.email ?? employee.email;
    const updatedcompanyId: number = body.companyId ?? employee.companyId;

    const [updatedRows] = await EmployeeService.updateEmployee(
      id,
      updatedname,
      updatedemail,
      updatedcompanyId
    );

    if (updatedRows === 1) {
      res.status(200).json({ msg: `Employee with ID ${id} updated successfully!` });
      return;
    } else {
      res.status(400).json({ msg: 'No changes made to the Employee!' });
      return;
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE: Remove employee by ID
export const deleteEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const employee: employee | null = await EmployeeService.getEmployeeByID(id);
    if (!employee) {
      res.status(404).json({ msg: 'Employee not found' });
      return;
    }

    await EmployeeService.deleteEmployee(id);
    res.status(200).json({ msg: `Employee with ID ${id} deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET: One employee by ID
export const getEmployeeById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const employee: employee | null = await EmployeeService.getEmployeeByID(id);
    if (!employee) {
      res.status(404).json({ msg: 'Employee not found' });
      return;
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Middleware: check if employee exists before continuing
export const employeeFoundOrNot = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const employee: employee | null = await EmployeeService.getEmployeeByID(id);
    if (!employee) {
      res.status(404).json({ msg: 'Employee not found' });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

// POST: Upload employee profile picture
export const createEmployeeProfileById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    if (!req.file || !('location' in req.file)) {
      res.status(400).json({ message: 'Profile image is required' });
      return;
    }

    const profileurl = (req.file as any).location;

    const [updatedCount] = await EmployeeService.updateEmployeeProfile(id, profileurl);

    if (updatedCount === 1) {
      res.status(200).json({
        message: 'File uploaded successfully',
        profileurl,
      });
      return;
    } else {
      res.status(400).json({ message: 'No changes made to the Employee!' });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
};

// POST : BulkInsertEmpoyee

export const bulkInsertEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees: employeecsv[] = req.body.data;
    console.log(employees);
    const insertedEmployees = await EmployeeService.bulkinsertEmployee(employees);
    res.status(201).json({
      message: 'Employees inserted successfully',
      totalInserted: insertedEmployees.length,
      data: insertedEmployees,
    });
  } catch (error) {
    next(error);
  }
};

// for (let i = 0; i < employees.length; i++) {
//   try {
//     await Employee.create(employees[i]);
//     console.log(`Employee ${employees[i].name} added.`);
//   } catch (error) {
//     console.error('Error inserting employee:', error);
//   }
// }
// res.status(201).json({msg:"insert successfully",employees})
