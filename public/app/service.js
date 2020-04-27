var JUNGLECOOK_SERVICE = (function() {
  var _db;
  var _getAllData = function(callback) {
    _db
      .collection("Recipe")
      .get()
      .then(function(querySnapshot) {
        callback(querySnapshot);
      });
  };

  var _getHomeContent = function() {
    let homeContent = `<div class="contentHome">
    <div class="yellowCircle">
      <div class="yellow-text">
        <h1>The Jungle Cook</h1>
        <p>
          The home to various recipes of your choice. Add your own recipe
          today and fill the wolrd with joy!
        </p>
      </div>
    </div>
    <div class="pinkCircle">
      <p>
        Want to be a Jungle Cook? Go ahead and the kitchen is yours!
      </p>
    </div>
  </div>`;

    return homeContent;
  };

  var _getBrowseContent = function() {
    let browseContent = `
    <div class="browseContent"></div>`;
    return browseContent;
  };

  var _getRecipeContent = function(id) {
    let recipeContent = `
       <div id="recipeContent">
        <div class="recipeTop recipeContainers">
        <p style="font-family: 'caveat-bold'; font-size: '32px';">Hey User, create your recipe!</p>
          <input id="image" type="text" placeholder="Add Recipe Image(put url of image)" />
          <input id="name" type="text" placeholder="Recipe Name" />
          <input id="desc" type="text" placeholder="Recipe Description" />
          <input id="time" type="text" placeholder="Recipe Total Time" />
          <input id="size" type="text" placeholder="Recipe Serving Size" />
        </div>
        <div class="recipeMiddle recipeContainers" ;>
        <p style="font-family: 'lato-light';font-size: '24px';">Enter Ingredients:</p>
          <div class="ingredientList"><input name="ingreds[]" id="ingredient" type="text" placeholder="Ingredient #1" />
          </div>
          <button id="${id}" class="ingredAddInput">+</button>
        </div>
        <div class="recipeBottom recipeContainers";>
        <p style="font-family: 'lato-light'; font-size: '24px';">Enter Instructions:</p>
          <div class="instructionList"><input name="instruct[]" id="instruction" type="text" placeholder="Instruction #1" />
          </div>
          <button id="${id}" class="instructAddInput">+</button>
          
        </div>
        <div class="saveButton"><button id="${id}" class="saveData">Save Recipe</button></div>
      </div>`;

    return recipeContent;
  };

  var _getDisplayRecipeContent = function(id) {
    let recipeContent = ``;
    return recipeContent;
  };

  var _updateData = function(
    id,
    image,
    name,
    desc,
    time,
    size,
    ingredient,
    instruction
  ) {
    let recipeData = {
      recipeImage: image,
      recipeName: name,
      recipeDescription: desc,
      recipeTotalTime: time,
      recipeServingSize: size,
      ingredients: ingredient,
      instructions: instruction
    };

    _db

      .collection("Recipe")
      .doc(id)
      .update(recipeData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        callback("New Recipe Added");
      })
      .catch(function(error) {
        console.log("Error adding document: ", error);
      });
  };

  var _getEditDataContent = function(id) {
    let editContent = `<div class="mainContentEditRecipeE"></div><div class="bottomEditSaveButton" style="align-text:center;"><button id="${id}" class="editSaveData">Save Recipe</button><button id="${id}" class="deleteData">Delete Recipe</button></div>`;

    return editContent;
  };

  var _addData = function(
    image,
    name,
    desc,
    time,
    size,
    ingredient,
    instruction
  ) {
    console.log(image);
    console.log(name);
    let recipeData = {
      recipeImage: image,
      recipeName: name,
      recipeDescription: desc,
      recipeTotalTime: time,
      recipeServingSize: size,
      ingredients: ingredient,
      instructions: instruction
    };

    _db
      .collection("Recipe")
      .add(recipeData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        callback("New Recipe Added");
      })
      .catch(function(error) {
        console.log("Error adding document: ", error);
      });
  };

  var _deleteData = function(id) {
    _db
      .collection("Recipe")
      .doc(id)
      .delete();
    console.log("DELETED!!");
    callback("Recipe Deleted");
  };

  var _initFirebase = function(callback) {
    firebase
      .auth()
      .signInAnonymously()
      .then(function(result) {
        console.log("connected");
        _db = firebase.firestore();
        callback();
      });
  };

  return {
    initFirebase: _initFirebase,
    addData: _addData,
    updateData: _updateData,
    getAllData: _getAllData,
    deleteData: _deleteData,
    getHomeContent: _getHomeContent,
    getBrowseContent: _getBrowseContent,
    getRecipeContent: _getRecipeContent,
    getEditDataContent: _getEditDataContent,
    getDisplayRecipeContent: _getDisplayRecipeContent
  };
})();
