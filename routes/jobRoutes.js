const {
  addJob,
  updateJob,
  getJob,
  getJobs,
  deleteJob,
} = require('../controllers/jobsController');

const express = require('express');
const router = express.Router();

router.route('/').post(addJob).get(getJobs);
router.route('/:id').get(getJob).put(updateJob).delete(deleteJob);

module.exports = router;
