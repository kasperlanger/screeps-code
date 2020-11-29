const utils = require('utils')
module.exports = {
    run(creep){
        const link = Game.getObjectById("5fbed5c0ac001780bce63eed");
        if (utils.renew(creep) || utils.goto(creep, 28,26)){
            return
        } else if (creep.store[RESOURCE_ENERGY] == 0){
            creep.withdraw(link, RESOURCE_ENERGY)
        } else {
            const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE)
            });

            if (target){
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
        }

    }

};
