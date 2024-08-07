import { defineConfig } from '@adonisjs/lucid'
import env from '../start/env.js'

const dbConfig = defineConfig({
  //connection: 'sqlite', 
  connection: 'postgres',
  connections: {
    //sqlite: {
    //  client: 'sqlite',
    //  connection: {
    //    filename: "database.sqlite"
    //  },
    //  useNullAsDefault: true,
    //  migrations: {
    //    naturalSort: true,
    //    paths: ['database/migrations'],
    //  },
    //  debug: true,
    //},
    postgres: {
      client: 'postgres',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
        ssl: env.get('DB_SSL'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      debug: true,
    },
  },
})

export default dbConfig

