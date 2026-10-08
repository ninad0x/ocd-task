import { useEffect, useState } from "react"
import { BatchForm } from "./components/BatchForm.jsx"
import { getConfig } from "./api.js"


function App() {
  const [config, setConfig] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    getConfig().then(setConfig).catch((err) => setError(err.message))
  }, [])

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl p-4 sm:p-10">
      {error && <p className="text-danger">{error}</p>}
      {!config && !error && <p className="text-muted">Loading...</p>}
      {config && <BatchForm config={config} />}
    </div>
  )
}

export default App