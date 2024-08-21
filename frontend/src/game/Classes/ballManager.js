/* eslint-disable no-unused-vars */
import {createObstacles,createSinks } from "../objects";
import { HEIGHT,WIDTH,ballRadius,sinkWidth } from "../constant";
import { unpad } from "../padding";
import { obstaclesRadius } from "../constant";
import { balls } from "./ball";


export class BallManager {
    constructor(canvasRef,onFinish) {
        this.canvasRef = canvasRef;
        this.ctx = this.canvasRef.getContext("2d");
        this.obstacles = createObstacles();
        this.update();
        this.sinks=createSinks()
        this.ballsArray=[]
        this.onFinish=onFinish
        
    }

    drawObstacles() {
        this.ctx.fillStyle = 'white';
        this.obstacles.forEach((obstacle) => {
            this.ctx.beginPath();
            this.ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        });
    }
    addBall(startX){
        console.log('In add ball')
        const ball=new balls(startX,50,ballRadius,'red',this.ctx,this.obstacles,(index)=>{
            console.log("index is:",index)
            this.ballsArray=this.ballsArray.filter(currBall=>currBall!=ball)
            this.onFinish(index,startX)
        },this.sinks)
    
        this.ballsArray.push(ball)
    }
    getColor(index) {
        if (index <3 || index > this.sinks.length - 3) {
            return {background: '#ff003f', color: 'white'};
        }
        if (index < 6 || index > this.sinks.length - 6) {
            return {background: '#ff7f00', color: 'white'};
        }
        if (index < 9 || index > this.sinks.length - 9) {
            return {background: '#ffbf00', color: 'black'};
        }
        if (index < 12 || index > this.sinks.length - 12) {
            return {background: '#ffff00', color: 'black'};
        }
        if (index < 15 || index > this.sinks.length - 15) {
            return {background: '#bfff00', color: 'black'};
        }
        return {background: '#7fff00', color: 'black'};
    }
    drawSinks() {
        this.ctx.fillStyle = 'green';
        const SPACING = obstaclesRadius * 2;
        for (let i = 0; i<this.sinks?.length; i++)  {
            this.ctx.fillStyle = this.getColor(i).background;
            const sink = this.sinks[i];
            this.ctx.font='normal 13px Arial';
            this.ctx.fillRect(sink.x, sink.y - sink.height / 2, sink.width - SPACING, sink.height);
            this.ctx.fillStyle = this.getColor(i).color;
            this.ctx.fillText((sink?.multiplier)?.toString() + "x", sink.x - 15 + sinkWidth / 2, sink.y);
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        this.drawObstacles();
        this.drawSinks()
        
        if(this.ballsArray){
            this.ballsArray.forEach (ball => {
                ball.draw ();
                ball.update()
            });
        }
    }
    
    update() {
        this.draw();
        this.requestId = requestAnimationFrame(this.update.bind(this));
    }
    stop() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
        }
    }
}