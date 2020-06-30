/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
let mevents = require('./mevents');
let muser = require('./musers');
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
MMessage.belongsTo(mevents, {as: 'event', foreignKey: 'meid'});
MMessage.belongsTo(muser, {as: 'user', foreignKey: 'mfrom'});
conn.sync();
module.exports = MMessage;