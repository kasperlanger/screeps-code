const utils = require('utils')
var roleBuilder = {
    config(buildRoom){ //build in a new room
        return (creep) => {
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
            } else if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
            }

            if (utils.renew(creep)){ return }

            if(creep.memory.building) {
                const targets = buildRoom.find(FIND_CONSTRUCTION_SITES);
                const controller = creep.room.controller
                if (controller.ticksToDowngrade < 2000 || targets.length === 0){ //make sure we don't loose the controller
                    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE){
                        creep.moveTo(controller, {visualizePathStyle: {stroke: '#00ff00'}});
                    }
                    creep.say("Ctrl upgr" +  controller.ticksToDowngrade);
                    return;
                }

                creep.say("build:" + buildRoom.name)
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    console.log("Nothing to build in " + buildRoom)
                    creep.moveTo(Game.flags.Idle)
                }
            } else {
                var sources = buildRoom.find(FIND_SOURCES, {filter: s => s.energy > 0});
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#00f'}});
                }
            }
        };
    },

    /** @param {Creep} creep **/
    run(creep) {
        if (utils.renew(creep)){ return }
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.say("Builder")
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.moveTo(Game.flags.Idle)
            }
        } else {
            const src = Game.getObjectById("5fbe2b149ffa5d60c554eee0")
            if (src.store[RESOURCE_ENERGY] == 0){
                //Don't block an empty energy source - the harvester can't get there and there's a deadlock
                const flag = Game.flags.Idle;
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                if(creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(src, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleBuilder;
