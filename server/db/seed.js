const db = require('./db')
const { Drawing } = require('./models')

const seed = async () => {
  await db.sync({ force:true })

  await Drawing.create({
    lines: [{
      points: [[0,0,0],[0,1,0]],
      position: [1, 1, -1],
      material: 'red'
    }]
  })

  db.close()
}

seed().catch(err => {
  console.error('Seeding unsuccessful')
  console.error(err)
  db.close()
})

