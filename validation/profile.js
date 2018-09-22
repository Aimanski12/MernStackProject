
// this file is to check if the data entered in the 
// field are valid

// load the validator module
const Validator = require('validator');

// load the empty module
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  //send the data value to the validator isEmpty
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';


  // check for the length of the handle
  if (!Validator.isLength(data.handle, {min: 2, max: 40})) {
    errors.handle = 'Handle needs to between 2 and 4 characters';
  }

  // check if the handle is empty
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  // check if the status is empty
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  // check if the skills is empty
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  // check if the website is valid and the value is a url
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  // check if the value is valid and is a valid youtube url
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  // check if the value is valid and the value is a twitter url
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

    // check if the value is valid and the value is a facebook url
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

    // check if the value is valid and the value is a linkedin url
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  // check if the value is valid and the value is a instagram url
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
