const { CreepOrder } = require("utils/creepfactory");

module.exports = {
  gc(){
      for(var i in Memory.creeps) {
          if(!Game.creeps[i]) {
              delete Memory.creeps[i];
          }
      }
  },
  goto(creep, x,y){
      if (creep.pos.x !== x || creep.pos.y !== y){
          creep.moveTo(x,y);
          return true
      }
      return false
  },
  renew(creep){
      if (creep.ticksToLive < 100){
          creep.memory.renew = true
      }
      if (creep.memory.renew) {
          creep.say("Renew " + creep.ticksToLive)
          const spawn = creep.room.find(FIND_MY_SPAWNS)[0] || Game.spawns.Spawn1;
          if (creep.pos.inRangeTo(spawn, 1)){ //check range so creep moves even if spawn is busy
              const res = spawn.renewCreep(creep);
              if (res == -8){
                  creep.say("TTL Full!")
                  delete creep.memory.renew;
              } else if (res){
                  console.log("Renew res " + res)
              }
          } else {
              creep.moveTo(spawn);
          }
          return true
      }

      return false
  }
};
