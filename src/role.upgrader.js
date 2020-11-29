module.exports = {
  config(energySourceId){
      return function(creep) {
          if(!creep.memory.harvest && creep.store[RESOURCE_ENERGY] == 0) {
              creep.memory.harvest = true;
              creep.say('🔄 Harvest');
          }
          if(creep.memory.harvest && creep.store.getFreeCapacity() == 0) {
              creep.memory.harvest = false;
              creep.say('🔧 Upgrade');
          }
          if (creep.memory.harvest){
              const src = Game.getObjectById(energySourceId)
              if (src.store[RESOURCE_ENERGY] == 0){
                  //Don't block an emoty energy source
                  const flag = Game.flags.Idle;
                  creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
              } else {
                  const res = creep.withdraw(src, RESOURCE_ENERGY)
                  if(res == ERR_NOT_IN_RANGE) {
                      creep.moveTo(src, {visualizePathStyle: {stroke: '#00ff00'}});
                      creep.say("Upgrader")
                  }
              }
          } else {
              const controller = creep.room.controller
              if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE){
                  creep.moveTo(src, {visualizePathStyle: {stroke: '#00ff00'}});
              }
          }
      }
  }
};
