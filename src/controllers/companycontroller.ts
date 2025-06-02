import { Request, Response } from 'express';
import { Company as company } from '@models/company';
import { companyEmployee, CompanyAttributes, updateCompanyinterface } from '@dto/company';
import {
  createCompanyservice,
  findAllCompany,
  findCompanyById,
  companyUpdateNameandLocation,
  companyfindByPK,
  deleteCompany,
} from '@services/companyServices';
import { updateEmployeenameandEmail } from '@services/employeeServices';

// GET all companies with employees
export const getCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const results: companyEmployee[] | null = await findAllCompany();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET company by ID
export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const company: companyEmployee = await findCompanyById(id);

    if (!company) {
      res.status(404).json({ msg: 'Company not found' });
      return;
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// POST create new company
export const createCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const companyCreateParams: Omit<CompanyAttributes, 'id'> = req.body;
    const company: company = await createCompanyservice(companyCreateParams);
    res.status(201).json({ company });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// PUT update company by ID
export const updateCompanyById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const updateCompanydata: Partial<updateCompanyinterface> = req.body;
    const { name, location, employees } = updateCompanydata;
    const company: companyEmployee = await findCompanyById(id);

    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }

    const updatedName: string = name ?? company.name;
    const updatedLocation: string = location ?? company.location;
    await companyUpdateNameandLocation(id, updatedName, updatedLocation);

    if (Array.isArray(employees) && employees.length > 0) {
      for (const employee of employees) {
        await updateEmployeenameandEmail(id, employee);
      }
    }
    const updatedCompany: company | null = await findCompanyById(id);
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE company by ID
export const deleteCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    const company: company | null = await companyfindByPK(id);

    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }

    await deleteCompany(id);
    res.json({ message: 'Company and associated employees deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
