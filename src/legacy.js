const builder = require('role.builder');
const troop = require('role.troop');
const group = require('group')
const staticharvester = require('role.staticharvester')
const upgrader = require('role.upgrader')
const repairer = require('role.repairer')
const collector = require('role.collector')
const utils = require('utils')

module.exports.loop = function () {
    utils.gc();
    const harvester = group.withName("harvester")
        .ensureCreeps(1, [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE])
        .executeAll(staticharvester.config(13,12))

    const harvester2 = group.withName("harvester2")
        .ensureCreeps(1, [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE])
        .executeAll(staticharvester.config(46,44))

    const link2storage = group.withName("link2storage")
        .ensureCreeps(1, [CARRY, MOVE])
        .executeAll(require('role.link2storage').run)

    const container2link = group.withName("container2link")
        .ensureCreeps(1, [CARRY, MOVE])
        .executeAll(require('role.container2link').run)

    const controllerEnergyDepot = '5fba8c5c5d44ba5e4e155750'
    const upgraders = group.withName("upgraders")
        .ensureCreeps(3, [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE])
        .executeAll(upgrader.config(controllerEnergyDepot))

    const defenders =
        group.withName('defenders')
             .ensureCreeps(1, [ATTACK,ATTACK,MOVE,MOVE])
             .executeAll(troop.run);

    const collectors = group.withName("collectors")
        .ensureCreeps(2, [MOVE,MOVE,CARRY,CARRY])
        .executeAll(collector.run)

    const room2 = Game.rooms.E22N27;
    const room1 = Game.rooms.E22N26;
    const builders = group.withName('builders')
        .ensureCreeps(3, [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE])
        .executeAll(builder.run)

    const globalBuilders = group.withName('globalbuilders')
        .ensureCreeps(5, [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE])
        .executeAll(builder.config(room2))

    const invader = group.withName("invader")
        .ensureCreeps(0, [CLAIM, MOVE])
        .executeAll(require('role.invader').run);

    const repairers = group.withName("repairers")
//        .ensureCreeps(1, [WORK, CARRY, MOVE, MOVE])
        .executeAll(repairer.run)

    Game.rooms.E22N26.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_TOWER}).forEach(tower => {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax * 0.9
                            && (s.structureType != STRUCTURE_RAMPART || s.hits < 5000) //Limit rampart repairs
                            && (s.structureType != STRUCTURE_WALL || s.hits < 5000) //Limit wall repairs
        });

        if(closestHostile) {
            tower.attack(closestHostile);
        } else if(closestDamagedStructure) {
            if (tower.store.getFreeCapacity(RESOURCE_ENERGY) < 300){
                tower.repair(closestDamagedStructure);
            }
        }
    });
}
