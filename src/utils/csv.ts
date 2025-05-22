import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { employeecsv } from '@models/employee';
export const parseCsvBuffer = async (buffer: Buffer): Promise<employeecsv[]> => {
  return new Promise((resolve, reject) => {
    const results: employeecsv[] = [];
    Readable.from(buffer)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};
