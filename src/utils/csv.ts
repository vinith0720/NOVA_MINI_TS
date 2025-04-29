import csvParser from 'csv-parser';
import { Readable } from 'stream';

export const parseCsvBuffer = async (buffer: Buffer): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    Readable.from(buffer)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};
