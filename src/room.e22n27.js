const builder = require('role.builder');
const group = require('group')
const staticharvester = require('role.staticharvester')
const collector = require('role.collector')
const utils = require('utils')

module.exports = {
    run(){
        const  room = Game.rooms.E22N27;

        group.withNameAndRoom('harvester1', room)
            //.ensureCreep(1, [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE])
        // const harvester = group.withName(room.name + ":harvester")
        //     .ensureCreeps(1, [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE])
        //     .executeAll(staticharvester.config(13,12))

        // const harvester2 = group.withName(room.name + ":harvester2")
        //     .ensureCreeps(1, [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE])
        //     .executeAll(staticharvester.config(46,44))

    }
};
