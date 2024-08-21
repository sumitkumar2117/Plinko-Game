/* eslint-disable no-unused-vars */
import { ballRadius, obstaclesRadius,horizontalFriction,verticalFriction, gravity, HEIGHT, sinkWidth} from "../constant"

/* eslint-disable no-unused-vars */
export class balls{
    constructor(x,y,radius,color,ctx,obstacles,onFinish,sinks){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.ctx=ctx
        this.vx=0
        this.vy=0
        this.obstacles=obstacles
        this.onFinish=onFinish
        this.sinks=sinks
        
    }
    draw(){
        console.log('In draw ball')
        this.ctx.beginPath()
        this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
        this.ctx.fillStyle=this.color
        this.ctx.fill()
        this.ctx.closePath()
    }
    update(){
        this.vy += gravity;
        this.y += this.vy;
        this.x += this.vx;
        if (this.obstacles) {
            this.obstacles.forEach (obstacle => {
                const dist = Math.hypot (this.x - obstacle.x, this.y - obstacle.y);
                if (dist < obstaclesRadius + ballRadius) {
                    const angle = Math.atan2 (this.y - obstacle.y, this.x - obstacle.x);
                    // Reflect velocity
                    const speed = Math.sqrt (this.vx * this.vx + this.vy * this.vy);
                    this.vx = Math.cos (angle) * speed * horizontalFriction;
                    this.vy = Math.sin (angle) * speed * verticalFriction;
                    const overlap = this.radius + obstacle.radius - dist;
                    this.x += Math.cos (angle) * overlap;
                    this.y += Math.sin (angle) * overlap;
                }
            });
        }
        if(this.sinks){
            for(let i=0;i<this.sinks.length;i++){
                const sink=this.sinks[i]
                if(this.x>=(sink.x-sinkWidth/2) && this.x<(sink.x+sinkWidth/2) && ((this.y) + (this.radius)) > (sink.y - sink.height / 2)){
                    console.log("x:",this.x)
                    console.log('sinks is:',i)
                    console.log('sinkWidth:',sinkWidth)
                    console.log('sinkx:',sink.x)
                    this.onFinish(i)
                }
            }
        }


    }
    
}