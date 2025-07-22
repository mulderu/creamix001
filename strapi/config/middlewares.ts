const dev_origins = [
  'http://localhost:3000',
  'http://localhost:1337',
  'http://localhost:5174',
  'http://localhost:8080',
  'http://localhost:8088',
  'http://192.168.1.80:3000'
]
const corsAllowOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : dev_origins

export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: corsAllowOrigins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
