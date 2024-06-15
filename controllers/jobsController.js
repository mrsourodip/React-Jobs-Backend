const ReactJobs = require('../models/Job');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const addJob = async (req, res) => {
  const { title, type, description, location, salary, company } = req.body;
  if (!title || !type || !description || !location || !salary || !company)
    throw new CustomError.BadRequestError('Please provide all the values!');
  const job = await ReactJobs.create(req.body);
  res.status(StatusCodes.CREATED).send(job);
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { title, type, description, location, salary, company } = req.body;
  if (!title || !type || !description || !location || !salary || !company)
    throw new CustomError.BadRequestError('Please provide all the values!');
  const job = await ReactJobs.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job)
    throw new CustomError.NotFoundError(`No product founds with id: ${jobId}`);
  job.id = job._id;
  delete job._id;
  res.status(StatusCodes.OK).send(job);
};

const getJob = async (req, res) => {
  const { id: jobId } = req.params;
  // const product = await Product.findOne({_id: productId}).populate('reviews')
  const job = await ReactJobs.findOne({ _id: jobId });
  if (!job)
    throw new CustomError.NotFoundError(`No product found with id: ${jobId}`);
  job.id = job._id;
  delete job._id;
  res.status(StatusCodes.OK).send(job);
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await ReactJobs.findOneAndDelete({ _id: jobId });
  if (!job)
    throw new CustomError.NotFoundError(`No product founds with id: ${jobId}`);
  res.status(StatusCodes.OK).json({ msg: 'Job is successfully removed' });
};

const getJobs = async (req, res) => {
  const jobs = await ReactJobs.find({});
  jobs.map((job) => {
    job.id = job._id;
    delete job._id;
  });
  res.status(StatusCodes.OK).send(jobs);
};

module.exports = {
  addJob,
  updateJob,
  getJob,
  getJobs,
  deleteJob,
};
