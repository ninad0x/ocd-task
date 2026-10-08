
export const buildInitialValues = (fields) =>
  Object.fromEntries(
    Object.entries(fields).map(([key, field]) => {
      const fallback = field.type === "toggle" ? false : field.type === "file" ? null : ""
      return [key, field.default ?? fallback]
    })
)

export const makeRow = (fields) => ({ id: crypto.randomUUID(), ...buildInitialValues(fields) })