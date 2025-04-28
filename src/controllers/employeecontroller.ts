import { Request, Response, NextFunction } from 'express';
import db from '@models/index';

const { Employee } = db;

// Type for employee creation/update

interface EmployeeBody {
  name?: string;
  email?: string;
  companyId?: number;
}

// GET: All employees
export const getEmployee = async (req: Request, res: Response):Promise<void> => {
  try {
    const Employees = await Employee.findAll();
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
export const postEmployee = async (req: Request, res: Response):Promise<void> => {
  try {
    const { name, email, companyId } = req.body;
    const newEmployee = await Employee.create({name , email, companyId});
    res.status(201).json({
      msg: 'Employee created successfully',
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// PUT: Update employee by ID
export const putEmployeeById = async (req: Request<{ id: string }, {}, EmployeeBody>, res: Response):Promise<void> => {
  try {
    const { name, email, companyId } = req.body;
    const id = parseInt(req.params.id);
    const employee = await Employee.findByPk(id);

    if (!employee) {
      res.status(404).json({ msg: 'Employee not found' });
      return ;
    }

    const updatedname = name ?? employee.name;
    const updatedemail = email ?? employee.email;
    const updatedcompanyId = companyId ?? employee.companyId;

    const [updatedRows] = await Employee.update(
      { name: updatedname, email: updatedemail, companyId: updatedcompanyId },
      { where: { id } }
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
export const deleteEmployeeById = async (req: Request<{ id: string }>, res: Response):Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const employee = await Employee.findByPk(id);
    if (!employee) {
      res.status(404).json({ msg: 'Employee not found' });
      return;
    }

    await Employee.destroy({ where: { id } });
    res.status(200).json({ msg: `Employee with ID ${id} deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET: One employee by ID
export const getEmployeeById = async (req: Request<{ id: string }>, res: Response):Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const employee = await Employee.findByPk(id);
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
export const employeefoundornot = async (req: Request<{ id: string }>, res: Response, next: NextFunction):Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const employee = await Employee.findByPk(id);
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
export const postEmployeeProfileById = async (req: Request<{ id: string }>, res: Response):Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (!req.file || !('location' in req.file)) {
      res.status(400).json({ message: 'Profile image is required' });
      return;
    }

    const profileurl = (req.file as any).location;

    const [updatedCount] = await Employee.update(
      { profileurl },
      { where: { id } }
    );

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

export const postBulkInsertEmployee = async (req:Request,res:Response,next:NextFunction) => { 
try {
      const data = req.body.data;

      const insertedEmployees = await Employee.bulkCreate(data, {
        validate: true, 
        ignoreDuplicates: true, 
      });
      
      res.status(201).json({
        message: 'Employees inserted successfully',
        totalInserted: insertedEmployees.length,
        data: insertedEmployees,
      });
  
} catch (error) {
  next(error);
}
};