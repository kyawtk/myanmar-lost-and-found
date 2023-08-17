
// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
export const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length > 30) {
      errors.title = "Must be 15 characters or less";
    }
  
    if (!values.description) {
      errors.description = "Required";
    } else if (values.description.length < 30) {
      errors.description = "Must be 30 characters or more";
    }
    if (!values.region) {
      errors.region = "Required: Where did you lost your item?";
    }
    if (!values.category) {
      errors.category = "Required: What is your item?";
    }
    if (!values.date) {
      errors.date = "Required: When did you lost your item?";
    }
  
    if (!values.tel) {
      errors.tel = "Required";
    } else if (!/^(09|\+959)(\d{7}|\d{9})$/i.test(values.tel)) {
      errors.tel = "Invalid Telephone Number";
    }
  
    return errors;
  };