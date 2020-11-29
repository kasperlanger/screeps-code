module.exports = {
  run(creep){
      if(!creep.memory.harvest && creep.store[RESOURCE_ENERGY] == 0) {
          creep.memory.harvest = true;
          creep.say('🔄 Harvest');
      }
      if(creep.memory.harvest && creep.store.getFreeCapacity() == 0) {
          creep.memory.harvest = false;
          creep.say('🔧 Repair');
      }
      if (creep.memory.harvest){
          const src = Game.getObjectById('5fba56e84dcc90532fcd56d9')
          const res = creep.withdraw(src, RESOURCE_ENERGY)
          if(res == ERR_NOT_IN_RANGE) {
              creep.moveTo(src, {visualizePathStyle: {stroke: '#00ff00'}});
          } else {
              console.log("Repairer withdraw: " + res)
          }
      } else {
          const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: s => s.structureType != STRUCTURE_WALL && s.hits < s.hitsMax * 0.9
          });

          if(target) {
              creep.say("🔧")
              if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}});
              }
          } else {
              creep.say("No repairs")
              creep.moveTo(Game.flags.Idle)
          }
      }
  }
};
