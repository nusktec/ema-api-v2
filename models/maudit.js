/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//import model
let muser = require('./musers');
//user class
class maudit extends eng.Model {
}maudit.init({
    aid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    auser: {type: eng.DataTypes.INTEGER},
    aaction: {type: eng.DataTypes.STRING},
}, {sequelize: conn, modelName: 'rs_audits'});
maudit.belongsTo(muser, {as: 'user', foreignKey: 'auser'});
conn.sync();
module.exports = maudit;