import { Company } from '@models/company';
import { Employee } from '@models/employee';
import { employeeupdate, EmployeeAttributes } from '@dto/employee';
export interface CompanyAttributes {
  id: number;
  name: string;
  location: string;
}

export type CompanyCreationAttributes = Partial<CompanyAttributes>;

export type companyEmployee =
  | (CompanyAttributes & {
      employees?: Partial<Pick<EmployeeAttributes, 'companyId' | 'email' | 'id' | 'name'>>;
    })
  | null;

interface Employeeupdateportion extends CompanyAttributes {
  employees: {
    id?: Employee;
    name?: Employee;
    email?: Employee;
  } | null;
}

export type updateCompanyinterface = Omit<Employeeupdateportion, 'id'>;
