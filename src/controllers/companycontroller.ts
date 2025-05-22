import { Request, Response } from 'express';
import db from '../models';
const { Company, Employee } = db;

// GET all companies with employees
export const getCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await Company.findAll({
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'email', 'profileurl'],
          as: 'employees',
        },
      ],
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET company by ID
export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const company = await Company.findByPk(id, {
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'email', 'profileurl'],
          as: 'employees',
        },
      ],
    });
    // console.log('company id:', company?.get('employees'));

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
export const postCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, location } = req.body;
    const company = await Company.create({ name, location });
    res.status(201).json({ company });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// PUT update company by ID
export const putCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { name, location, employees } = req.body;

    const company = await Company.findByPk(id, {
      include: [{ model: Employee, as: 'employees' }],
    });

    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }

    const updatedName = name ?? company.name;
    const updatedLocation = location ?? company.location;

    await Company.update({ name: updatedName, location: updatedLocation }, { where: { id } });

    if (Array.isArray(employees) && employees.length > 0) {
      for (const employee of employees) {
        await Employee.update(
          { name: employee.name, email: employee.email },
          { where: { id: employee.id, companyId: id } }
        );
      }
    }

    const updatedCompany = await Company.findByPk(id, {
      include: [{ model: Employee, as: 'employees' }],
    });

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE company by ID
export const deleteCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const company = await Company.findByPk(id);

    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }

    await Company.destroy({ where: { id } });
    res.json({ message: 'Company and associated employees deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
