function group(groupName, creeps, room){
  function ensureCreeps(min, body){
      //console.log("Ensure creeps " + groupName + " " + creeps.length + " : " + min);
      if (creeps.length < min){
          const creepName = groupName + ':' + Game.time
          const spawn = Game.spawns["Spawn1"]
          if (spawn.spawnCreep(body, creepName, {memory: {group: groupName}}) == 0){
              console.log("Spawning creep " + creepName)
          } else {
              //console.log("Couldn't spawn " + groupName + " has " + creeps.length + " / " + min)
          }
      } else {
          //console.log(groupName + " has " + creeps.length + " creeps");
      }
      return this;
  }

  function executeAll(fn){
      _.each(creeps, fn);
      return this;
  }

  return {
      name: groupName,
      creeps: creeps,
      ensureCreeps: ensureCreeps,
      executeAll: executeAll,
  }
}

function creepsByGroup(group){
  return  _(Game.creeps).filter({memory: {group: group}}).value()
}

module.exports = {
  withName(name){
      return group(name, creepsByGroup(name), null)
  },
  withNameAndRoom(name, room){
      return group(name, creepsByGroup(name), room)
  }
};
