const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      inclue: [{model: Product, through: ProductTag}]
    });

    res.status(200).json(tags);
  }
  catch (err) {
    console.log(`Error in getting all available tags: ${err}`);
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product, through: ProductTag}
      ]
    });

    if (singleTag) {
      res.status(200).json(singleTag);
    }
    else {
      res.status(404).json({message: "There is no tag with that id!"})
    }
  }
  catch (err) {
    console.log(`Error in getting a single tag by its id: ${err}`);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = req.body.tag_name;

    if (newTag) {
      const createTag = await Tag.create({tag_name: newTag});
      res.status(200).json(createTag);
    }
    else {
      res.status(404).json({message: `The request body needs a tag_name!`})
    }
  }
  catch (err) {
    console.log(`Error in creating the tag: ${err}`);
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {

  }
  catch (err) {
    
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {

  }
  catch (err) {
    
  }
});

module.exports = router;
