module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{textClipping,css,png,jpg,html,js,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};