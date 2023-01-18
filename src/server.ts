import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get('/', async () => {

    const habits = await prisma.habit.findMany({
        where:{
            title:{
                startsWith:'E'
            }
        }
    })

    return habits
})

app.listen({
    port:3333,

}).then(()=>console.log('Server Running'))