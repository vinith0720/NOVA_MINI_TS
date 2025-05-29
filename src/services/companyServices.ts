import db from '../models';
import { companyEmployee, CompanyAttributes } from '@dto/company';
const { Company, Employee } = db;

export const findAllCompany = async (): Promise<companyEmployee[]> => {
  return Company.findAll({
    include: [
      {
        model: Employee,
        attributes: ['id', 'name', 'email', 'profileurl'],
        as: 'employees',
      },
    ],
  });
};

export const findCompanyById = async (id: number) => {
  return Company.findByPk(id, {
    include: [
      {
        model: Employee,
        attributes: ['id', 'name', 'email', 'profileurl'],
        as: 'employees',
      },
    ],
  });
};

export const createCompanyservice = async (data: Omit<CompanyAttributes, 'id'>) => {
  return Company.create({ name: data.name, location: data.location });
};

export const companyUpdateNameandLocation = (id: number, name: string, location: string) => {
  return Company.update({ name: name, location: location }, { where: { id } });
};

export const companyfindByPK = async (id: number) => await Company.findByPk(id);

export const deleteCompany = async (id: number) => await Company.destroy({ where: { id } });
