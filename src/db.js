import { readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const USERS_PATH = join(__dirname, 'data.json')
const PRODUCTS_PATH = join(__dirname, 'products.json')

async function readJson(path) {
    try {
        const raw = await readFile(path, "utf-8")
        return JSON.parse(raw)
    } catch (err) {
        if (err.code === "ENOENT") return []
        throw err
    }
}

async function writeJson(path, data) {
    await writeFile(path, JSON.stringify(data, null, 2), 'utf8')
}

export const readUsers = () => readJson(USERS_PATH)
export const writeUsers = (users) => writeJson(USERS_PATH, users)

export const readProducts = () => readJson(PRODUCTS_PATH)
export const writeProducts = (products) => writeJson(PRODUCTS_PATH, products)