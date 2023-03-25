const router = require('express').Router();
const { Tag, Product, ProductTag} = require('../../models');

// The `/api/tags` endpoint
// Find all tags include its associated Product data
router.get('/', async (req, res) => {
    try {
        const tagData = await Tag.findAll({
        include: [
          {
            model: Product,
            as: 'products',
            through: ProductTag,
            attributes: ['id', 'product_name', 'price', 'stock']
          }
        ]
    });
        res.status(200).json(tagData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
  
// find a single tag by its `id` include its associated Product data
router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id,{
        include: [
          {
            model: Product,
            as: 'products',
            through: ProductTag,
            attributes: ['id', 'product_name', 'price', 'stock']
          }
        ]
    });
        res.status(200).json(tagData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create a new Tag
router.post('/', async (req, res) => {
    // req.body should look like this...  {"tag_name" : "new tag name"}
    try {
      const tagData = await Tag.create(req.body);
      res.status(200).json(tagData);
    } catch (err) {
      console.log(err); // log the error to the console
      res.status(500).json(err);
    }
});

// Update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
    try {
        const tagData = await Tag.update(req.body, {
          where: {
            id: req.params.id,
          },
        });
        if (!tagData[0]) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        console.log(err); // log the error to the console
        res.status(500).json(err);
    }
});

// Delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.status(200).json(tagData);
    } catch (err) {
      console.log(err); // log the error to the console
      res.status(500).json(err);
    }
});

module.exports = router;
