module.exports = {
  run(creep){
      const flag = Game.flags.Invader;
      creep.say("Invader")
      const controller = Game.getObjectById("5bbcae319099fc012e6388cb")
      if(creep.room.controller == controller) {
          if(creep.claimController(controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(controller);
          }
      }
  }
};
