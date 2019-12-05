const db = require('./server/db')
const { Drawing } = require('./server/db/models')
const seed = async () => {
  await db.sync({ force: true })
  await Drawing.create({
    latitude: 40.0,
    longitude: -74.0,
    title: 'Sample',
    lines: [
      {
        points: [
          [0, 0, 0],
          [0, 1, 0]
        ],
        position: [1, 1, -1],
        material: 'red'
      }
    ]
  })
  db.close()
  console.log('Seeding successful')
}
seed().catch(err => {
  console.error('Seeding unsuccessful')
  console.error(err)
  db.close()
})
