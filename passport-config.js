const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');

function initialize(passport) {
    var users = [];
    db.any(`SELECT * FROM usuarios`)
        .then(rows => {
            rows.forEach(row => {
                users.push({
                    id: row.id,
                    username: row.usuario,
                    password: row.contrasena
                });
            });
            const authenticateUser = (username, password, done) => {
                const user = users.find(user => user.username === username);
                if (user == null) {
                    return done(null, false, { message: 'El usuario no existe' });
                }
                try {
                    if (password == user.password) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: 'La contraseña es incorrecta' });
                    }
                } catch (e) {
                    return done(e);
                }
            }

            passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
            passport.serializeUser((user, done) => done(null, user.id));
            passport.deserializeUser((id, done) => {
                return done(null, users.find(user => user.id === id));
            });
        });
}

module.exports = initialize;