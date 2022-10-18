import { Company } from '../models/company.model.js';
import { User } from '../models/user.model.js';

// ---------------------------------------- getCompanies ----------------------------------------
// @desc get an array of companies matching a speficied query.
// @route GET /api/companies
export const getCompanies = async (req, res, next) => {
  const { query } = req.body; // example: { name: 'John' } or { name: 'John', age: 30 }
  try {
    const companies = await Company.findAll({ ...query });
    res.status(200).json({ message: 'Companies retrieved.', data: companies });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occured. Companies not retrieved', data: error });
  }
};

// ---------------------------------------- createCompany ----------------------------------------
// @desc create a company.
// @route POST /api/companies
export const createCompany = async (req, res, next) => {
  const { name, registration_number, size } = req.body;
  try {
    const company = await Company.create({
      name,
      registration_number,
      size,
    });
    res.status(201).json({
      message: `Company ${company.name} created with id: ${company.id}`,
      data: company.toJSON(),
    });
  } catch (error) {
    res.status(400).json({ message: 'An error occured. Company not created', data: error });
  }
};

// ---------------------------------------- getCompany ----------------------------------------
// @desc get a specific company matching a companyId.
// @route GET /api/companies/:id
export const getCompany = async (req, res, next) => {
  const { id: companyId } = req.params;
  // const company = await Company.findByPk(companyId); Not sure if we can filter with this
  const company = await Company.findOne({
    where: { id: companyId },
    // include: ['users'], // this works but can't filter.
    include: [{ model: User, attributes: { exclude: ['password', 'refresh_token'] } }],
  });
  if (!company) {
    return res.status(404).json({ message: 'Company not found' });
  }
  res.status(200).json({
    message: `Company ${company.name} with id: ${company.id} retrieved`,
    data: company.toJSON(),
  });
};

// ---------------------------------------- updateCompany ----------------------------------------
// @desc update a company matching a companyId.
// @route PUT /api/companies/:id
export const updateCompany = async (req, res) => {
  const { id: companyId } = req.params;
  const { name, registration_number, size } = req.body;
  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    company.name = name || company.name;
    company.registration_number = registration_number || company.registration_number;
    company.size = size || company.size;
    await company.save();
    res.status(200).json({
      message: `Company ${company.name} with id: ${company.id} updated`,
      data: { ...company.toJSON() },
    });
  } catch (error) {
    res.status(400).json({ message: 'An error occured. Company not updated', data: error });
  }
};

// ---------------------------------------- deleteCompany ----------------------------------------
// @desc delete a company matching a companyId.
// @route DELETE /api/companies/:id
export const deleteCompany = async (req, res) => {
  const { id: companyId } = req.params;
  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }
    await company.destroy();
    res.status(200).json({ message: `Company with id: ${companyId} deleted.` });
  } catch (error) {
    res.status(400).json({ message: 'An error occured. Company not deleted', data: error });
  }
};
