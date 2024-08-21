/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express=require('express')
const app=express()
const cors=require('cors')
const {outputs,MULTIPLIERS}=require('./output')

app.use (
  cors ({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: 'Authorization, token, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  })
);

app.use(express.json())

app.get('/',(req,res)=>{
    res.json(
        outputs
    )
    
})
app.get('/game',(req,res)=>{ 
    let outcome = 0;
    const pattern = []
    for (let i = 0; i < 16; i++) {
        if (Math.random() > 0.5) {
            pattern.push("R")
            outcome++;
        } else {
            pattern.push("L")
        }
    }
    const multiplier = MULTIPLIERS[outcome];
    const possiblieOutcomes = outputs[outcome];

    res.send({
        point: possiblieOutcomes[Math.floor(Math.random() * possiblieOutcomes.length || 0)],
        multiplier,
        pattern,
        outcome
    });
})
app.listen(3000,()=>{
    console.log('Running at port 3000')
})
