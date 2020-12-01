export function run(room: Room, repairLimit: number){
  room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_TOWER}).forEach(structure => {
    const tower = structure as StructureTower
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax * 0.9
                            && (s.structureType != STRUCTURE_RAMPART || s.hits < repairLimit) //Limit rampart repairs
                            && (s.structureType != STRUCTURE_WALL || s.hits < repairLimit) //Limit wall repairs
    });

    if(closestHostile) {
        tower.attack(closestHostile);
    } else if(closestDamagedStructure) {
        if (tower.store.getFreeCapacity(RESOURCE_ENERGY) < 300){
            tower.repair(closestDamagedStructure);
        }
    }
  })
}
