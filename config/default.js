module.exports = {
	port: 3000,
	session: {
		secret: 'node_news',
		key: 'node_news',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://localhost/nodeNews'
}