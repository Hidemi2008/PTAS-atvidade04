import express from 'express'
import cors from 'cors'
import { conectar } from './data/db.js'
import usersRouter from './routes/users.routes.js'
import productsRouter from './routes/products.routes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/users', usersRouter)
app.use('/products', productsRouter)

app.use((err, req, res, next) => {
    const status = err.status ?? 500
    res.status(status).json({ erro: err.message })
})

async function main() {
    try {
        await conectar()
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Conectado ao Atlas. API em http://localhost:${port}`)
        })
    } catch (err) {
        console.error(`Falha ao conectar no MongoDB Atlas: ${err.message}`)
        process.exit(1)
    }
}

main()