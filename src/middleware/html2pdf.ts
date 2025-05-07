import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import db from '@models/index';
const { Html } = db;
export const htmlt2pdf = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.body.name;
    const data = await Html.findOne({ where: { name } });
    if (!data) {
      res.status(404).json({ message: 'HTML content not found' });
      return;
    }
    const htmlContent = data?.dataValues.content;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="output.pdf"',
    });
    res.end(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('PDF generation failed');
  }
};
