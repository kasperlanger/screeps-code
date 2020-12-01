import * as Legacy from './legacy'
import {run} from './rooms'

export const loop = () => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  Legacy.loop();

  run({roomName: 'E22N27'});
};
