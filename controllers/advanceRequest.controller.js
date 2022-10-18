import { Employee } from '../models/employee.model.js';

export const createAdvanceRequest = async (req, res, next) => {
  const { employeeId, month, year, amount, requestdate, reason } = req.body;

  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const pendingRequest = await employee.getAdvance_requests({
      where: {
        status: 'pending',
      },
    });
    if (!pendingRequest) {
      return res.status(400).json({ message: 'This employee already has a pending request' });
    }
    const advanceRequest = await employee.createAdvance_request({
      month,
      year,
      requestdate,
      amount,
      reason,
    });
    res
      .status(201)
      .json({ message: 'Advance request created', data: { ...advanceRequest.toJSON() } });
  } catch (error) {
    res.status(400).json({ message: 'An error occured. Advance request not created', data: error });
  }
};
