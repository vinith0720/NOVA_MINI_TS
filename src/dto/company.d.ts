import { Company } from '@models/company';
import { Employee } from '@models/employee';
import { employeeupdate } from '@dto/employee';
export interface CompanyAttributes {
  id: number;
  name: string;
  location: string;
}

export type CompanyCreationAttributes = Partial<CompanyAttributes>;

export type companyEmployee = Company & {
  employees?: Partial<Pick<Employee, 'companyId' | 'email' | 'id' | 'name'>>;
};

interface Employeeupdateportion extends CompanyAttributes {
  employees: {
    id?: Employee;
    name?: Employee;
    email?: Employee;
  } | null;
}

export type updateCompanyinterface = Omit<Employeeupdateportion, 'id'>;
