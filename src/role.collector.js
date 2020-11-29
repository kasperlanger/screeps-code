const utils = require('utils')
module.exports = {
    run(creep){
        if (utils.renew(creep)){ return }
        if(!creep.memory.harvest && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvest = true;
            creep.say('🔄 Harvest');
        }
        if(creep.memory.harvest && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvest = false;
            creep.say('Done harvesting');
        }
        if (creep.memory.harvest){
            const src = Game.getObjectById('5fbe2b149ffa5d60c554eee0')
            if (src.store[RESOURCE_ENERGY] == 0){
                //Don't block an emoty energy source
                const flag = Game.flags.Idle;
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                const res = creep.withdraw(src, RESOURCE_ENERGY)
                if(res == ERR_NOT_IN_RANGE) {
                    creep.say("Collect")
                    creep.moveTo(src, {visualizePathStyle: {stroke: '#00ff00'}});
                } else {
                    console.log("Collector withdraw: " + res)
                }
            }
        } else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (target){
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}});
                    creep.say("Energy -> " + target)
                }
            } else {
                const flag = Game.flags.Idle;
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};
