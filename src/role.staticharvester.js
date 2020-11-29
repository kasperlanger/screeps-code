const utils = require('utils')
module.exports = {
    config(x, y){
        return (creep) => {
            if (utils.renew(creep) || utils.goto(creep, x, y)){
                return
            } else {
                const src = creep.pos.findClosestByRange(FIND_SOURCES);
                const res = creep.harvest(src)
                if (res != 0){
                    console.log("Static harvestor couldn't harvest " + src.id + " err " + res)
                }
            }
        }
    }
};
