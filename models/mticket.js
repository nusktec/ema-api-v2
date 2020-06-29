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
    teid: {type: eng.DataTypes.INTEGER, allowNull: false},
    ttitle: {type: eng.DataTypes.STRING, allowNull: false},
    talloc: {type: eng.DataTypes.STRING, allowNull: false},
    tdesc: {type: eng.DataTypes.TEXT, allowNull: false},
    tunique: {type: eng.DataTypes.STRING, allowNull: false, unique: true},
    ttype: {type: eng.DataTypes.STRING, defaultValue: 'Regular Ticket'},
    tstatus: {type: eng.DataTypes.INTEGER, defaultValue: 1},
}, {sequelize: conn, modelName: 'rs_tickets'});

conn.sync();
module.exports = Mticket;