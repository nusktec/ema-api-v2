/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//model
let programs = require('./mprogram');
let epurchase = require('./mpurchase');
//user class
class Events extends eng.Model {}
Events.init({
    eid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    euid: {type: eng.DataTypes.INTEGER, allowNull: true},
    etitle: {type: eng.DataTypes.STRING, allowNull: false},
    edesc: {type: eng.DataTypes.TEXT, allowNull: false},
    ebanner: {type: eng.DataTypes.STRING, allowNull: false, defaultValue: 'https://firebasestorage.googleapis.com/v0/b/ema-front.appspot.com/o/banners%2Fimage-placeholder.jpg?alt=media'},
    elocation: {type: eng.DataTypes.STRING, allowNull: true},
    elonglat: {type: eng.DataTypes.STRING, allowNull: true},
    eaddress: {type: eng.DataTypes.STRING, allowNull: true},
    ealias: {type: eng.DataTypes.STRING, allowNull: false, unique: true},
    estart_date: {type: eng.DataTypes.STRING, allowNull: true},
    eend_date: {type: eng.DataTypes.STRING, allowNull: true},
    espeakers: {type: eng.DataTypes.TEXT, allowNull: true, defaultValue: '[]'},
    esponsors: {type: eng.DataTypes.TEXT, allowNull: true, defaultValue: '[]'},
    eexhibitors: {type: eng.DataTypes.TEXT, allowNull: true, defaultValue: '[]'},
    egallery: {type: eng.DataTypes.TEXT, allowNull: true, defaultValue: '[]'},
    etfamily: {type: eng.DataTypes.STRING, allowNull: true},
    estatus: {type: eng.DataTypes.INTEGER, allowNull: true, defaultValue: 1},
}, {sequelize: conn, modelName: 'rs_events'});
Events.hasMany(programs, {as: "nprograms", foreignKey: "peid"});
Events.hasMany(epurchase, {as: "epurchases", foreignKey: "beid"});
conn.sync();
module.exports = Events;