export interface CompanyAttributes {
  id: number;
  name: string;
  location: string;
}

export type CompanyCreationAttributes = Partial<CompanyAttributes>;

export type companyEmployee = Company & {
  employees?: Partial<Pick<Employee, 'companyId' | 'email' | 'id' | 'name'>>;
};
