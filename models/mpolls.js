/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
let mevents = require('./mevents');
//user class
class MPoll extends eng.Model {}
MPoll.init({
    qid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    qeid: {type: eng.DataTypes.INTEGER, allowNull: true},
    qtitle: {type: eng.DataTypes.STRING, allowNull: false, unique: true},
    qque: {type: eng.DataTypes.TEXT, allowNull: false},
}, {sequelize: conn, modelName: 'rs_mpolls'});
MPoll.hasMany(mevents, {as: 'event', foreignKey: 'eid'});
conn.sync();
module.exports = MPoll;