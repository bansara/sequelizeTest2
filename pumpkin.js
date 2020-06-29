const db = require('./dbConfig');
const Sequelize = require('sequelize');

//YOUR CODE GOES HERE
const { STRING, BOOLEAN, ENUM } = Sequelize;
const Pumpkin = db.define('pumpkin', {
    name: {
        type: STRING,
    },
    size: {
        type: ENUM,
        values: ['small', 'medium', 'large']
    },
    evil: {
        type: BOOLEAN,
        defaultValue: false
    },
    carved: {
        type: BOOLEAN,
        defaultValue: false

    },
    candle: {
        type: BOOLEAN,
        defaultValue: false
    }
})

Pumpkin.addHook('beforeCreate', (pumpkin) => {
    const coinFlip = Math.random();
    coinFlip > 0.5 ?
        pumpkin.name = 'EVIL' + pumpkin.name :
        pumpkin.name = 'GOOD' + pumpkin.name
})

Pumpkin.prototype.lightcandle = async function () {
    await this.update({
        candle: true
    });
}
//--------------------
module.exports = Pumpkin;
