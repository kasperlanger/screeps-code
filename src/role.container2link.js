const utils = require('utils')

module.exports = {
    run(creep){
        const container = Game.getObjectById("5fba56e84dcc90532fcd56d9");
        if (utils.renew(creep)){
            return
        } else if (creep.store[RESOURCE_ENERGY] == 0){
            if (container.store[RESOURCE_ENERGY] == 0){
                //Don't block an emoty energy source
                const flag = Game.flags.Idle;
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                const res = creep.withdraw(container, RESOURCE_ENERGY)
                if(res == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
        } else {
            const target = Game.getObjectById("5fbf5ed9a367dc9c4b5c1653");

            if (target){
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}});
                }
                target.transferEnergy(Game.getObjectById("5fbed5c0ac001780bce63eed"));
            }
        }

    }
};
