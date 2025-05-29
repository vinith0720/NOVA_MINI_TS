export interface EmployeeAttributes {
  id: number;
  name: string;
  email: string;
  profileurl?: string;
  companyId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type employeecsv = Pick<EmployeeAttributes, 'name' | 'email' | 'companyId'>;

export type employeeupdate = Pick<Employee, 'name' | 'email' | 'id'>;

export type EmployeeCreationAttributes = Optional<
  EmployeeAttributes,
  'id' | 'profileurl' | 'createdAt' | 'updatedAt'
>;
