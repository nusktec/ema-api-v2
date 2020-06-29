/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//user class
class MMessage extends eng.Model {}

MMessage.init({
    mid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    meid: {type: eng.DataTypes.INTEGER, allowNull: true},
    mfrom: {type: eng.DataTypes.INTEGER, allowNull: false},
    mto: {type: eng.DataTypes.INTEGER, allowNull: false},
    mbody: {type: eng.DataTypes.TEXT, allowNull: false},
    tstatus: {type: eng.DataTypes.INTEGER, defaultValue: 0},
}, {sequelize: conn, modelName: 'rs_messages'});

conn.sync();
module.exports = MMessage;