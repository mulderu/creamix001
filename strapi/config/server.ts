export default ({ env }) => {
	console.error("-------DEBUG--------")
	console.error("HOST:", env('HOST', '0.0.0.0'))
	console.error("PORT:", env.int('PORT', 1337))
	console.error("--------------------")

	return {
	  host: env('HOST', '0.0.0.0'),
	  port: env.int('PORT', 1337),
	  app: {
	    keys: env.array('APP_KEYS'),
	  },
	};
}
