const utils = require('utils')
module.exports = {
    run(creep){
        if (utils.renew(creep)){ return }
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            const flag = Game.flags.Troops;
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};
