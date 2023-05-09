export const checkErrorWithField = (field, errors) => {
  if (errors.length) {
    const error = errors.find((err) => err.field === field);
    return error?.message;
  } else {
    return null;
  }
};
