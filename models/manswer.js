/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
let mpoll = require('./mpolls');
//user class
class MAnswer extends eng.Model {}
MAnswer.init({
    aid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    aqid: {type: eng.DataTypes.INTEGER},
    auid: {type: eng.DataTypes.INTEGER},
    aans: {type: eng.DataTypes.TEXT, allowNull: false},
}, {sequelize: conn, modelName: 'rs_manswers'});
MAnswer.belongsTo(mpoll, {as: 'poll', foreignKey: 'aqid'});
conn.sync();
module.exports = MAnswer;