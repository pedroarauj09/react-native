import express from 'express'
import { PrismaClient } from '@prisma/client' 
import { convertHmin } from './utils/hourToMin'
import { convertMinToString } from './utils/toString'
import cors from 'cors' // permitir que os frontend acessem


const app = express()
app.use(express.json()) // fazer com que o servidor entenda o json
app.use(cors())
const prisma = new PrismaClient({
    log: ['query']
})


// localhost:3333/


// async await (pode demorar para a intrução ser executada por é necessário utilizar este comando para aguardar)
app.get('/games', async(request,response)=>{
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select: {
                    ads: true,
                }
            }
        }
    }) // get all games
    return response.json(games)
})

// param tipo Body
app.post('/games/:id/ads',async(request,response)=>{
    const gameId = request.params.id;
    const body: any = request.body;
    
    
    const ad = await prisma.ad.create({
        data:{                 
            gameId,          
            name: body.name,            
            yearsPlayed: body.yearsPlayed,
            discord: body.discord,
            weekDays: body.weekDays.join(','),        
            hoursStart      :convertHmin(body.hoursStart),
            hourEnd         :convertHmin(body.hourEnd),
            useVoiceChannel :body.useVoiceChannel,
            createdAt       :body.createdAt,                 

        }
    })
    return response.status(201).json(ad);
});

// Utilizando parâmetro tipo Route
app.get('/games/:id/ads',async(request,response)=>{
    const gameId = request.params.id
    const ads = await prisma.ad.findMany({
        select:{
            id:true,
            name:true,
            weekDays:true,
            useVoiceChannel:true,
            yearsPlayed:true,
            hourEnd:true,
            hoursStart:true,
        },
        where:{
            gameId,
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad=>{
        return{
            ...ad, //retorna todos os dados do ad
            weekDays: ad.weekDays.split(','), // no week days é criado um array com os elementos separados por ,
            hoursStart: convertMinToString(ad.hoursStart),
            hourEnd: convertMinToString(ad.hourEnd),

        }
    }))
})

app.get('/ads/:id/discord',async(request,response)=>{
    const adId = request.params.id
    const discord = await prisma.ad.findUniqueOrThrow({
        select:{
            discord:true,
        },
        where:{
            id:adId,
        }
    })
    
    return response.json({
        discord: discord.discord
    })
})

// ouvir a porta 3333
app.listen(3333)