import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  ingredientArray = [];
  ingredients = null;
  potions = null;
  successMessage = '';
  errorMessage = '';
  countIngredients = 0;
  showHelp = false;

  constructor(public game: GameService) { }

  ngOnInit() {
    this.getIngredientsData();
    this.getCreatedPotions();
    document.getElementById('mix').setAttribute("disabled", "disabled");
    document.getElementById('clear').setAttribute("disabled", "disabled");
  }

  getIngredientsData() {
    this.game.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients.list;
    })
  }

  getCreatedPotions() {
    this.game.getPotions().subscribe(potions => {
      this.potions = potions.list;
    })
  }

  toggleShowHelp() {
    this.showHelp = !this.showHelp;
  }

  /**
   * Function clear
   * ---
   * Clear ingredients
   * -> No params
   */
  clear() {
    document.getElementById('mix').setAttribute("disabled", "disabled");
    document.getElementById('clear').setAttribute("disabled", "disabled");
    this.countIngredients = 0;

    // Remove ingredients
    const drop = document.getElementById('drop-container');
    while (drop.firstChild) {
      drop.removeChild(drop.firstChild)
    }
    // Clear ingredients array 
    this.ingredientArray = [];
  }

  /**
   * Function add
   * ---
   * Add ingredient in mix box
   * @param event 
   */
  add(event) {
    // Check if there are less than 3 ingredients in mix box
    if (this.countIngredients < 3) {

      this.countIngredients++;

      // Allow clear
      if (this.countIngredients >= 1) {
        document.getElementById('clear').removeAttribute('disabled');
      }
      // Allow "test" action if there are 3 ingredients
      if (this.countIngredients === 3) {
        document.getElementById('mix').removeAttribute('disabled');
      }

      // Push in new array the name & quantity of the ingredient added
      const target = event.target.id;
      /([0-9]+)/.exec(target);
      const id = RegExp.$1;
      const data = this.ingredients;
      let name = '';
      let qty = 0;
      const searchField = "id";
      const searchVal = id;
      for (let i = 0; i < data.length; i++) {
        if (data[i][searchField] == searchVal) {
          name = data[i].name;
          qty = data[i].quantity;
          this.ingredientArray.push({ id: parseInt(id), name: name, quantity: qty });
        }
      }

      // Create ingredient in mix box
      let drop = document.getElementById('drop-container');
      let item = document.createElement('div');
      item.setAttribute('id', 'item-' + id);
      item.setAttribute('class', 'item item-test');
      item.innerHTML = '' +
        '<img src="assets/images/' + name + '.jpg"/>' +
        '<div class="ingredient__name">' + name + '</div>' +
        '<div class="ingredient__quantity">' + qty + '</div>';
      drop.appendChild(item);

      // Show success message
      this.successMessage = `L'ingrédient "${name}" a été importé avec succès !`;
      document.getElementById('success').className += " show";
      setTimeout(() => {
        this.successMessage = '';
        document.getElementById('success').classList.remove('show');
      }, 5000);
    } else {
      this.errorMessage = `Vous ne pouvez mélanger que 3 éléments entre eux !`;
      document.getElementById('error').className += " show";
      setTimeout(() => {
        this.errorMessage = '';
        document.getElementById('error').classList.remove('show');
      }, 5000);
    }
  }

  /**
   * Function mix
   * ---
   * Mix ingredient to check if a potion exists
   * -> No params
   */
  mix() {
    if (this.countIngredients === 3) {

      this.game.checkIngredients(this.ingredientArray).subscribe((res) => {
        this.clear();

        if (res.err) {
          switch (res.type) {
            case 'invalid':
              this.errorMessage = `Aucune potion n'a été trouvée avec ces ingrédients !`;
              break;
            case 'duplicate':
              this.errorMessage = `La potion "${res.name}" a déjà été créée !`;
              break;
          }
          this.showMessage('error');
        } else {
          this.successMessage = `La potion "${res.name}" a été créée avec succès !`;
          this.showMessage('success');
        }

        // If no error, show potion
        if (!res.err) {
          // Update lists
          this.getIngredientsData();
          this.getCreatedPotions();
        }
      }, (err) => {
        console.log(err);
      });
    } else {
      this.errorMessage = `Vous devez entrer 3 ingrédients pour tester un mélange !`;
    }
  }

  showMessage(type) {
    document.getElementById(type).className += " show";
    setTimeout(() => {
      type === 'error' ? this.errorMessage = '' : this.successMessage = '';
      document.getElementById(type).classList.remove('show');
    }, 5000);
  }

}