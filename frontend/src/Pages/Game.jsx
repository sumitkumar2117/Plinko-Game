/* eslint-disable no-unused-vars */
import {useEffect, useRef, useState} from 'react';
import {BallManager} from '../game/Classes/ballManager';
import axios from "axios";
import { MULTIPLIERS } from '../game/objects';

// import { Button } from "../components/ui";
// import { baseURL } from "../utils";

export function Game () {
  const [ballManager, setBallManager] = useState ();
  const [points,setPoints]=useState(100)
  // const [multiplier,setMultiplier]=useState(1)
  const [betPoints,setBetPoints]=useState(0)
  const [mArray,setmArray]=useState([])
  const canvasRef = useRef ();

  const betPointsRef = useRef(betPoints);
  const pointsRef = useRef(points);

  // Update refs whenever the state changes
  useEffect(() => {
    betPointsRef.current = betPoints;
  }, [betPoints]);
  const onChange=(e)=>{
    setBetPoints(e.target.value)
  }
  
  useEffect(
    () => {
      if (canvasRef.current) {
        const ballManager = new BallManager(canvasRef.current,(index,startX)=>{
          console.log('In on finish')
          const multiValue=MULTIPLIERS[index+1]
          const changedPoints=betPointsRef.current*multiValue
          
          setPoints((points)=>{
            const x=points-betPointsRef.current+changedPoints
            return x
          })
          
          setTimeout(()=>{
            setmArray((mArray)=>{
            const newMArray = [...mArray];
            if (newMArray.length === 4) {
              newMArray.shift();
             
            }
            console.log('Color is :', ballManager.getColor(index));
            newMArray.push({ i: index, color: ballManager.getColor(index).background });
            return newMArray;
            })
            // setAnimationClass ('');

          },500)
          

        });
        setBallManager(ballManager);
      }
      return ()=>{

      }
    },
    [canvasRef]
  );
  // mArray.pop()

  return (
    <div className='flex flex-col min-h-screen bg-danger justify-center items-center'>
    <div className='flex p-2'>
      <div className='bg-primary py-2 px-6 text-white border-danger rounded-l-md '>{points}</div>
      <div className='text-white text-center bg-btnBlue p-2 border-danger rounded-r-md'>Points</div>
    </div>
    <div className="flex flex-row items-center justify-center h-full bg-danger">
      <div className='w-[25%] h-[650px] bg-secondary p-2'>
        <div className='text-white'>Bet Points</div>
        <input value={betPoints} onChange={onChange} className='w-full bg-primary p-2 mt-1 mb-4 border-danger rounded-md text-white'></input>
        <button className='w-full p-2 border-danger rounded-md bg-btnGreen text-black font-medium'
          onClick={async() => {
            if (ballManager) {
              if(betPoints>points){
                alert('No enough points to play Refresh the page')
              }else{
                const startX=await axios.get('/game')
                
                ballManager.addBall(startX.data.point);
              }
              
            }
          }}
        >
          Add ball
        </button>
      </div>
      <canvas ref={canvasRef} width="800" height="650" className="bg-primary"/>
      <div className='flex flex-col-reverse h-[650px] bg-primary justify-center items-center p-4'>
        {
          mArray.map ((item, index) => (
            <div key={index} className={`text-black font-medium text-lg w-16 h-16 content-center text-center ${index==0?'rounded-b-xl':''} ${(index==3) ?'rounded-t-xl':''} `} style={{ backgroundColor:item.color }}>
              {MULTIPLIERS[item.i+1]}x
            </div>
          ))
        }

      </div>
      

      
      
    </div>
    </div>
    
  );
}
