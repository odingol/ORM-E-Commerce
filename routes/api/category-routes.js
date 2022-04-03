const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
  const categoryData = await Category.findAll({
    include: [{model: Product}]
  });
  res.status(200).json(categoryData);
}
catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}] 
    })

    if(categoryData) {
      res.status(200).json(categoryData);
    }
    else {
      res.status(404).json({message: "No category is found with that id!"})
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err)
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body) 

    if(newCategory) {
      res.status(200).json(newCategory);
    }
    else {
      req.status(404).json({message: "The request for a new category_name failed. Request must contain category_name"});
    }


  }
  catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    if(req.body && req.body.category_name) {
      const updateCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
      )
      
    if(!updateCategory[0]) {
      res.status(404).json({message: "There is no category with this id!"})
    }
    else {
      res.status(200).json(updateCategory)
    }
  }
    else {
      res.status(404).json({message: "Update request failed. Request must contain category_name"})
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );

    if(!deleteCategory) {
      res.status(404).json({message: "There is no category with this id!"})
    }
    else {
      res.status(200).json(deleteCategory);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
