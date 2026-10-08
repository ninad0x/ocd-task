const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

export const getConfig = async () => {
  const res = await fetch(`${API_URL}/api/config`)
  if (!res.ok) throw new Error("Could not load the form")
  return res.json()
}