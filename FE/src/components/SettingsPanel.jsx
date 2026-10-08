import { Field } from "./Field.jsx"

export const SettingsPanel = ({ schema, values, onChange, errors = {} }) => {

  const fields = Object.entries(schema)
    .map(([key, definition]) => ({ key, ...definition }))
    .sort((a, b) => a.order - b.order)

  console.log("fields", fields);
  
  const groupNames = [...new Set(fields.map((field) => field.group))]
  console.log("groupNames", groupNames);

  return (
    <div className="space-y-6">
      {groupNames.map((name) => (
        <section key={name} className="rounded border border-gray-300 p-4 dark:border-gray-700">
          <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">{name}</h3>
          {fields
            .filter((field) => field.group === name)
            .map((field) => (
              <Field
                key={field.key}
                field={field}
                value={values[field.key]}
                error={errors[field.key]}
                onChange={(value) => onChange(field.key, value)}
              />
            ))}
        </section>
      ))}
    </div>
  )
}