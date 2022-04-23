const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {   
  // find all tags
  const data = await Tag.findAll({
  // be sure to include its associated Product data
  include: [{ model: Product}],
});
console.log('data', data)
  res.status(200).json(data);
} catch (error) {
  res.status(500).json(err);
}
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id).then((data) => {
    res.json(data);
  });
  // be sure to include its associated Product data

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
