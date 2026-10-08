export const ToggleInput = ({ value, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={value}
    onClick={() => onChange(!value)}
    className={`h-6 w-11 rounded-full p-0.5 transition ${value ? "bg-blue-600" : "bg-gray-400"}`}
  >
    <span className={`block h-5 w-5 rounded-full bg-white transition ${value ? "translate-x-5" : ""}`} />
  </button>
)