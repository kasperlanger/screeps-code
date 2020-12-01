import * as _ from "lodash";
import { createNoSubstitutionTemplateLiteral } from "typescript";

export class CreepOrder {
  constructor(
    public name: string,
    public body: BodyPartConstant[],
    public room: Room
  ) {}
}

export const newFactory = ({room} : {room: Room}) => ({
  creep(opts: {name: String, body: BodyPartConstant[]}): Creep | CreepOrder {
    const globalName = `${room.name}:${opts.name}`
    return Game.creeps[globalName] || new CreepOrder(globalName, opts.body, room);
  }
});

export function fullfillOrder(orders: CreepOrder[]){
  const order = orders[0]; //TODO sort
  if (!order){ return }
  const spawn = order.room.find(FIND_MY_SPAWNS)[0] || Game.spawns['Spawn1'];
  if (spawn.spawning){
    console.log(`${spawn.name}: Spawning ${spawn.spawning.remainingTime}s ${spawn.spawning.name}`);
  } else {
    const res = spawn.spawnCreep(order.body, order.name, {memory: {room: order.room.name}});
    console.log(`${spawn.name}: Spawning ${order.name} res: ${res}`);
  }
}
