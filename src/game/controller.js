const ingredients = require("../../client/src/assets/data/ingredients.json");
const potions = require("../../client/src/assets/data/potions.json");

const game = (req, res) => {

  const ids = [];
  // Push ingredient id in array
  for (let key in req.body) {
    ids.push(req.body[key].id);
  }

  // Do action if user has choose 3 ingredients
  if (ids.length === 3) {
    for (let i in potions.potions) {

      let isCorrect = [];
      const composition = potions.potions[i].composition;
  
      // For each composition, we test if ingredient is present
      for (let j = 0; j < composition.length; j++) {
        if (ids.indexOf(composition[j]) === -1) {
          isCorrect.push(false);
        } else {
          isCorrect.push(true);
        }
      }
  
      if (!isCorrect.includes(false)) {
        const name = potions.potions[i].name
  
        // If potion already created
        if (potions.potions[i].find) {
          return res.json({
            err: true,
            name: name,
            type: 'duplicate'
          });
        }
  
        // Update JSON
        potions.potions[i].find = true;
        for (let k = 0; k < ids.length; k++) {
          ingredients[ids[k] - 1].quantity--;
        }
  
        return res.json({
          err: false,
          name: name,
          type: 'success'
        });
      }
    }
    // If no match is detected
    return res.json({
      err: true,
      name: null,
      type: 'invalid'
    }).status(400);
  }
  return res.json({
    err: true,
    name: null,
    type: 'length'
  });

}

const getIngredients = (req, res) => {
  const usableIngredients = [];
  for (let i = 0; i < ingredients.length; i++) {
    if (ingredients[i].quantity > 0) {
      usableIngredients.push({
        'id': ingredients[i].id,
        'name': ingredients[i].name,
        'quantity': ingredients[i].quantity,
      })
    }
  }
  return res.json({
    list: usableIngredients
  });
}

const getPotions = (req, res) => {
  const createdPotions = [];
  const potionsList = potions.potions;
  for (let i = 0; i < potionsList.length; i++) {
    if (potionsList[i].find) {
      createdPotions.push({
        'name': potionsList[i].name
      })
    }
  }
  return res.json({
    list: createdPotions
  });
}



module.exports = {
  game,
  getIngredients,
  getPotions
}