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

export function formatDateTime(date) {
  return new Date(date)
    .toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
}

export function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
