import { randomUUID } from "node:crypto"
import express from "express"
import cors from "cors"
import schema from "./config.js"

const PORT = process.env.PORT || 3000

const router = express.Router()
const app = express()
app.use(cors())
app.use(express.json())

const batches = new Map()

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const createRowTiming = () => ({
    startedAt: Date.now(),
    queueDelay: randomBetween(1000, 6000),
    duration: randomBetween(15000, 29000),
    willFail: Math.random() < 0.2
})

const computeRow = (row, now) => {
    const { startedAt, queueDelay, duration, willFail, ...visible } = row
    const elapsed = now - startedAt

    if (elapsed < queueDelay) {
        return { ...visible, status: "queued", progress: 0 }
    }
    if (elapsed < queueDelay + duration) {
        const progress = Math.round(((elapsed - queueDelay) / duration) * 100)
        return { ...visible, status: "processing", progress }
    }
    if (willFail) {
        return { ...visible, status: "failed", progress: 100, error: "Export failed. Please retry." }
    }
    return {
        ...visible,
        status: "done",
        progress: 100,
        outputUrl: `https://picsum.photos/seed/${row.rowId}/400/400`
    }
}

router.get("/config", (req, res) => {
    res.json(schema)
})

router.post("/batches", (req, res) => {
    try {
        const { settings, rows } = req.body
        const { min, max } = schema.rows

        if (!Array.isArray(rows) || rows.length < min || rows.length > max) {
            return res.status(400).json({ error: `rows must be an array of ${min}-${max} items` })
        }

        const batchId = randomUUID()
        const batchRows = rows.map(({ name, size }) => ({
            rowId: randomUUID(),
            name,
            size,
            ...createRowTiming()
        }))

        batches.set(batchId, { settings, rows: batchRows })
        res.status(201).json({ batchId })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/batches/:batchId", (req, res) => {
    try {
        const { batchId } = req.params
        const batch = batches.get(batchId)

        if (!batch) {
            return res.status(404).json({ error: "batch not found" })
        }

        const now = Date.now()
        const rows = batch.rows.map((row) => computeRow(row, now))

        res.json({ batchId, settings: batch.settings, rows })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/batches/:batchId/rows/:rowId/retry", (req, res) => {
    try {
        const { batchId, rowId } = req.params

        const batch = batches.get(batchId)
        if (!batch) {
            return res.status(404).json({ error: "batch not found" })
        }

        const row = batch.rows.find((r) => r.rowId === rowId)
        if (!row) {
            return res.status(404).json({ error: "row not found" })
        }

        if (computeRow(row, Date.now()).status !== "failed") {
            return res.status(409).json({ error: "only failed rows can be retried" })
        }

        Object.assign(row, createRowTiming())
        res.json(computeRow(row, Date.now()))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.use("/api", router)

app.listen(PORT, () => console.log(`backend running on http://localhost:${PORT}`))