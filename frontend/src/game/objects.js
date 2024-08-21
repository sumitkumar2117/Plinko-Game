/* eslint-disable no-unused-vars */

import {HEIGHT, obstaclesRadius,sinkWidth,WIDTH,NUM_SINKS} from './constant';
import {pad} from './padding';
export const MULTIPLIERS= {
  1: 16,
  2: 9,
  3: 2,
  4: 1.4,
  5: 1.4,
  6: 1.2,
  7: 1.1,
  8: 1,
  9: 0.5,
  10: 1,
  11: 1.1,
  12: 1.2,
  13: 1.4,
  14: 1.4,
  15: 2,
  16: 9,
  17: 16,
};

export const createObstacles = () => {
  const obstacles = [];
  const row = 17;
  for (let i = 2; i <= row; i++) {
    const y = i * 35;
    for (let col = 0; col < i + 1; col++) {
      const x = 400 - (i / 2 - col) * 36;
      obstacles.push ({x: x, y: y, radius: obstaclesRadius});
    }
  }
  return obstacles;
};
// export const createSink=()=>{
//   const sinks=[]
//   const SPACING =obstaclesRadius*2
//   for(let i=0;i<17;i++){
//     const x =WIDTH / 2 + sinkWidth * (i - Math.floor (NUM_SINKS / 2)) - SPACING * 1.5;
//     const y=HEIGHT-170
//     const width = sinkWidth;
//     const height = width;
//     sinks.push({x:x,y:y,width,height})
//   }
//   return sinks
// }
export const createSinks = () => {
  const sinks = [];
  const SPACING = obstaclesRadius * 2;

  for (let i = 0; i < NUM_SINKS; i++) {
    const x =
      WIDTH / 2 + sinkWidth * (i - Math.floor (NUM_SINKS / 2)) - SPACING * 1.5;
    const y = HEIGHT - 170;
    const width = sinkWidth;
    const height = width;
    sinks.push ({x, y, width, height, multiplier: MULTIPLIERS[i + 1]});
  }

  return sinks;
};

