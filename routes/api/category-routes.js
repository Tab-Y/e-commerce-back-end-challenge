const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {   // working
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]      // includes associated products
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {    // working
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]    // includes associated products
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id! Please check the id and try again.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {    // working
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {   // working
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      }, 
      {
      where: {id: req.params.id}
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id. Please check your input and try again.'})
    }
    res.status(200).json({message: `id ${req.params.id} has been updated.`});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {   //working
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {id: req.params.id}
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id. Please check your input and try again.'})
    }
    res.status(200).json({message: `id ${req.params.id} has been deleted.`});
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
