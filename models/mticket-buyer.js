/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//user class
class Mticket extends eng.Model {}

Mticket.init({
    tid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    tuid: {type: eng.DataTypes.INTEGER, allowNull: false},
    tserial: {type: eng.DataTypes.STRING, allowNull: false, unique: true},
    tpid: {type: eng.DataTypes.INTEGER, allowNull: false},
    ttype: {type: eng.DataTypes.INTEGER, defaultValue: 1},
    tstatus: {type: eng.DataTypes.INTEGER, defaultValue: 1},
    tvalue: {type: eng.DataTypes.STRING, allowNull: false},
}, {sequelize: conn, modelName: 'rs_tickets'});

conn.sync();
module.exports = Mticket;