const isEmpty = (value) => {
  return value === undefined || value === null || (typeof value === "string" && value.trim() === "")
}

export const validateFields = (fields, values) => {
  const errors = {}

  Object.entries(fields).forEach(([key, field]) => {
    const value = values[key]

    if (field.required && isEmpty(value)) {
      errors[key] = "Required"
    } else if (field.maxLength && typeof value === "string" && value.length > field.maxLength) {
      errors[key] = `Max ${field.maxLength} characters`
    }
  })

  return errors
}