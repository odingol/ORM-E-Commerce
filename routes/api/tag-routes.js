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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagName = req.body.tag_name;

    if (tagName) {
      const updateTag = await Tag.update(
        {tag_name: tagName},
        {
          where: {
            id: req.params.id
          }
        }
      );

      if (!updateTag[0]) {
        res.status(404).json({message: 'There is no tag in existence with the id requested!'});
      }
    
      else {
        res.status(200).json(updateTag);
      }
    }
    else {
      res.status(404).json({message: 'The request body must have the tag_name!'})
    }
  }
  catch (err) {
    console.log('Error in updating the tag_name based on its id!')
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    // This approach is called to delete all the references related to the product_tag table
    await ProductTag.destroy({
      where: {
        tag_id: req.params.id
      }
    });

    const deleteTag = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!deleteTag) {
      res.status(404).json({message: "There is no tag in existence with the id requested!"})
    }
    else {
      res.status(200).json(deleteTag);
    }
  }
  catch (err) {
    console.log(`Error in deleting the tag: ${err}`);
    res.status(500).json(err);
  }
});

module.exports = router;
