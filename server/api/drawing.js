const router = require('express').Router();
const { Drawing } = require('../db/models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op

// router.get('/', async (req, res, next) => {
//   try {
//     const allDrawings = await Drawing.findAll();
//     let parsedDrawings = await Promise.all(
//       allDrawings.map(drawing => {
//         let lines = JSON.parse(drawing.lines);
//         drawing.lines = lines;
//         return drawing;
//       })
//     );
//     res.send(parsedDrawings);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/:id', async (req, res, next) => {
  try {
    const drawing = await Drawing.findOne({ where: { id: req.params.id } });
    res.send(drawing);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
  let lat = parseFloat(req.query.latitude)
  let long = parseFloat(req.query.longitude)
    const nearbyDrawings = await Drawing.findAll({
      where: {
        latitude: {
          [Op.between]: [lat - 0.001, lat + 0.001]
        },
        longitude: {
          [Op.between]: [long - 0.001, long + 0.001]
        }
      }
    })
    res.send(nearbyDrawings)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // const lines = req.body
    console.log(req.body)
    const newDrawing = await Drawing.create({
      lines: req.body.lines,
      latitude: req.body.lat,
      longitude: req.body.long
     });
    res.status(201).send(newDrawing);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
