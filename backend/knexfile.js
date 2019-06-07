const {
	db
} = require('./.env')
var moment = require('moment');

module.exports = {
	client: 'mysql',
	// connection: db,
	connection: {
		host: '127.0.0.1',
		port: 3306,
		database: 'odin',
		user: 'root',
		password: 'root',
		typeCast: function (field, next) {
			if (field.type == 'DATE') {
				return moment(field.string()).format('YYYY-MM-DD');
			}
			return next();
		}
	},
	pool: {
		min: 2,
		max: 10
	}
	// migrations: {
	// 	tableName: 'knex_migrations'
	// }
};