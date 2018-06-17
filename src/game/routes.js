const { Router } = require('express');
const router = Router({ mergeParams: true });

const gameController = require('./controller');

router.post('/validation', gameController.game);
router.get('/ingredients', gameController.getIngredients);
router.get('/potions', gameController.getPotions);

module.exports = router;