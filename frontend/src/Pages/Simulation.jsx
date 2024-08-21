/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React,{useEffect,useRef,useState} from 'react'
import { BallManager } from '../game/Classes/ballManager';
import { WIDTH } from '../game/constant';
import { createSinks } from '../game/objects';

export const Simulation = () => {
    // const [ballManager, setBallManager] = useState ();
    let [outputs, setOutputs] = useState({
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: [],
        13: [],
        14: [],
        15: [],
        16: [],
    });
    const canvasRef = useRef ();
    async function simulation(ballManager){
        let i=0;
        while(1){
            i++;
            ballManager.addBall(WIDTH/2+20*(Math.random()-0.5))
            await new Promise((resolve)=>{
                setTimeout(resolve,100)
            })
        }
    }
    useEffect (() => {
        console.log('In usee effect 1')
        if (canvasRef.current) {
            console.log('In use Effect2')
            const ballManager = new BallManager (canvasRef.current,(index,startX)=>{
                setOutputs((outputs) => {
                    return {
                        ...outputs,
                        [index]: [...(outputs[index]), startX],
                    };
                });
            });
            simulation (ballManager);
            return () => {
                console.log('In return stop')
                ballManager.stop();
            };
        }   
    },[canvasRef]);
    
  return (
    <div className="flex flex-col lg:flex-row  items-center justify-between h-screen">
        <canvas ref={canvasRef} width="800" height="800" className='bg-black'/>
        <div className="overflow-auto flex mx-16 flex-col justify-center pt-10">
            {JSON.stringify (outputs, null, 2)}
        </div>
    </div>
  )
}
