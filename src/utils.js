export function parseValidationErrors(status, json) {
  if (status === 400 && json.error.errors) {
    const newErrors = {};
    json.error.errors.forEach((err) => {
      newErrors[err.path] = err.msg;
    });
    return newErrors;
  }
  return { unexpected: "An unexpected error occured." };
}
