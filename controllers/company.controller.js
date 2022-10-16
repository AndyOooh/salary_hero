import { Company } from '../models/company.model.js';

export const getAllcompanies = async (req, res, next) => {
  const { query } = req.body; // example: { name: 'John' } or { name: 'John', age: 30 }
  try {
    const companies = await Company.findAll({ ...query });
    res.status(200).json({ message: 'All companies retrieved.', data: companies });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occured. Companies not retrieved', data: error });
  }
};

export const createCompany = async (req, res, next) => {
  const { name, registration_number, size } = req.body;
  console.log('🚀 ~ file: company.controller.js ~ line 21 ~ name', name);

  try {
    const company = await Company.create({
      name,
      registration_number,
      size,
    });
    res
      .status(200)
      .json({ message: `Company ${company.name} created with id: ${company.id}`, data: company });
  } catch (error) {
    res.status(400).json({ message: 'An error occured. Company not created', data: error });
  }
};

export const getCompany = async (req, res, next) => {
  const { id: companyId } = req.params;
  const company = await Company.findByPk(companyId);
  if (!company) {
    return res.status(404).json({ message: 'Company not found.' });
  }
  res.status(200).json({
    message: `Company ${company.name} with id: ${company.id} retrieved.`,
    data: { ...company.toJSON() },
  });
};

export const updateCompany = async (req, res, next) => {
  const { id: companyId } = req.params;
  const { name, registration_number, size } = req.body;

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }
    company.name = name || company.name;
    company.registration_number = registration_number || company.registration_number;
    company.size = size || company.size;
    await company.save();

    res.status(200).json({ message: 'Company updated.', data: company });
  } catch (error) {
    return res(400).json({ message: 'An error occured. Company not updated', data: error });
  }
};

export const deleteCompany = async (req, res, next) => {
  const { id: companyId } = req.params;
  const company = await Company.findByPk(companyId);
  if (!company) {
    return res.status(404).json({ message: 'Company not found.' });
  }
  await company.destroy();
  res.status(200).json({ message: `Company with id: ${companyId} deleted.` });
};
