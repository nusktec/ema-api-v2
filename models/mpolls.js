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
    qtitle: {type: eng.DataTypes.STRING, allowNull: true},
    qque: {type: eng.DataTypes.TEXT, allowNull: true},
    qurl: {type: eng.DataTypes.TEXT, allowNull: true},
    qbasic: {type: eng.DataTypes.INTEGER, defaultValue: 1},
}, {sequelize: conn, modelName: 'rs_mpolls'});
MPoll.belongsTo(mevents, {as: 'event', foreignKey: 'qeid'});
conn.sync();
module.exports = MPoll;