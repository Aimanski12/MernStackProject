
// this file is to validate the inputs from the 
// experience fields

// load validator module
const Validator = require('validator');

// load the isEmpty folder
const isEmpty = require('./is-empty');

// export the function
module.exports = function validateExperienceInput(data) {
  let errors = {};

  // check if there are any values in the input
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
