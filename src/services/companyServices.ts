import db from '../models';
import { companyEmployee, CompanyAttributes } from '@dto/company';
const { Company, Employee } = db;

export const findAllCompany = async (): Promise<companyEmployee[]> => {
  try {
    return await Company.findAll({
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'email', 'profileurl'],
          as: 'employees',
        },
      ],
    });
  } catch (error) {
    console.error('Error in findAllCompany:', error);
    throw error;
  }
};

export const findCompanyById = async (id: number) => {
  try {
    return await Company.findByPk(id, {
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'email', 'profileurl'],
          as: 'employees',
        },
      ],
    });
  } catch (error) {
    console.error('Error in findCompanyById:', error);
    throw error;
  }
};

export const createCompanyservice = async (data: Omit<CompanyAttributes, 'id'>) => {
  try {
    return await Company.create({
      name: data.name,
      location: data.location,
    });
  } catch (error) {
    console.error('Error in createCompanyservice:', error);
    throw error;
  }
};

export const companyUpdateNameandLocation = async (id: number, name: string, location: string) => {
  try {
    return await Company.update({ name, location }, { where: { id } });
  } catch (error) {
    console.error('Error in companyUpdateNameandLocation:', error);
    throw error;
  }
};

export const companyfindByPK = async (id: number) => {
  try {
    return await Company.findByPk(id);
  } catch (error) {
    console.error('Error in companyfindByPK:', error);
    throw error;
  }
};

export const deleteCompany = async (id: number) => {
  try {
    return await Company.destroy({ where: { id } });
  } catch (error) {
    console.error('Error in deleteCompany:', error);
    throw error;
  }
};
