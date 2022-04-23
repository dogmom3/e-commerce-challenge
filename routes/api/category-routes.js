const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
try {
 // find all categories
  const data = await Category.findAll({
  // be sure to include its associated Products
    include: [{ model: Product}],
  });
  console.log('data', data)
  res.status(200).json(data);
} catch (error) {
  res.status(500).json(err);
}
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id).then((data) => {
    res.json(data);
  });
  // be sure to include its associated Products

});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body)
      res.status(200).json(categoryData);
    
  } catch (err) {
      res.status(500).json(err);
    };
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    //Calls the update method on the Book model
    Category.update(req.body,
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
  // delete a category by its `id` value
  Category.destroy({
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
