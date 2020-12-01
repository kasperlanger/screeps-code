import {newFactory, CreepOrder, fullfillOrder as fullfillOrders} from 'utils/creepfactory'
import * as Tower from 'role/tower'

type RoomName = "E22N27" | "E22N26"

type RoomOpts = {roomName: RoomName}

type StaticHarvestMission = {
  type: 'StaticHarvest',
  creep: Creep,
  source: Source,
}

type UpgradeControllerMission = {
  type: 'UpgradeController',
  controller: StructureController
}

type Mission = StaticHarvestMission;

type MoveToPlan = {
  plan: 'MoveTo',
  creep: Creep,
  target: {x: number, y: number}
}

type Plan = MoveToPlan;

export const run = (opts: RoomOpts) => {
  const room = Game.rooms[opts.roomName]
  const factory = newFactory({room})
  const sources = room.find(FIND_SOURCES)
  const orders: CreepOrder[] = []
  const missions: Mission[] = []

  Tower.run(room, 100)


  if (!room.controller){
    console.log("No controller in room " + room.name);
    return
  }

  if (room.controller.my){
    //missions.push({type: 'UpgradeController', controller: room.controller})
  } else {
    console.log("Claim controller not implemented");
    return
  }

  for (let i in sources) {
    let source = sources[i];
    let res = factory.creep({ name: `harvester:${i}`, body: ['work', 'work', 'work', 'work', 'move', 'move']});
    if (res instanceof CreepOrder){
      orders.push(res);
    } else {
      missions.push({type: 'StaticHarvest', creep: res, source: source})
    }
  }
  const plans: Plan[] = [];
  for (let mission of missions){
    const creep = mission.creep;
    const container = mission.source.pos.findInRange(FIND_STRUCTURES, 1, {filter: s => s.structureType === STRUCTURE_CONTAINER})[0] as StructureContainer
    if (container){
      if (creep.pos.isEqualTo(container)){
        if (container.store.getFreeCapacity('energy') > 0){
          creep.harvest(mission.source)
        }
      } else {
        creep.moveTo(container);
      }
    }
  }
  fullfillOrders(orders);
}
