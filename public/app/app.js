var idn = 0;

function init() {}

function initNavButtons() {
  $(".bars").click(function(e) {
    $(".nav-holder").css("display", "flex");
  });
  navHome();
  navCreateRecipe();
  navBrowse();
}

function navHome() {
  $("#homeButton").click(function(e) {
    console.log("home page");
    $("#allContent").html(JUNGLECOOK_SERVICE.getHomeContent());
  });
}

function navBrowse() {
  $("#browseButton").click(function(e) {
    console.log("browse page");
    $("#allContent").html(JUNGLECOOK_SERVICE.getBrowseContent());
    JUNGLECOOK_SERVICE.getAllData(displayData);
    console.log(idn);
  });
}

function navCreateRecipe() {
  $("#createButton").click(function(e) {
    console.log("create page");
    $("#allContent").html(JUNGLECOOK_SERVICE.getRecipeContent());
    IngredAddInput();
    InstructAddInput();
    saveButton();
  });
}

function saveButton() {
  $(".saveData").click(function(e) {
    e.preventDefault();

    var ingreds = $("input[name^=ingreds]")
      .map(function(idx, elem) {
        return $(elem).val();
      })
      .get();

    var instructs = $("input[name^=instruct]")
      .map(function(idx, elem) {
        return $(elem).val();
      })
      .get();

    console.log("add data");
    let image = $("#image").val();
    let name = $("#name")
      .val()
      .trim()
      .toLowerCase();
    let desc = $("#desc")
      .val()
      .trim()
      .toLowerCase();
    let time = $("#time")
      .val()
      .trim()
      .toLowerCase();
    let size = $("#size")
      .val()
      .trim()
      .toLowerCase();
    let ingredient = ingreds;
    let instruction = instructs;
    console.log(image);
    if (
      image != "" &&
      name != "" &&
      desc != "" &&
      instruction != "" &&
      time != "" &&
      size != ""
    ) {
      console.log("add data");

      JUNGLECOOK_SERVICE.addData(
        image,
        name,
        desc,
        time,
        size,
        ingredient,
        instruction
      );
    } else {
      alert("Oops! Please add a recipe. Thank you.");
    }
    $("#allContent").html(JUNGLECOOK_SERVICE.getBrowseContent());
    JUNGLECOOK_SERVICE.getAllData(displayData);
  });
}

function editRecipeNav() {
  $(".editRecipeBtn").click(function(e) {
    var id = e.currentTarget.id;
    $("#allContent").html(JUNGLECOOK_SERVICE.getEditDataContent(id));
    JUNGLECOOK_SERVICE.getAllData(editRecipe);
  });
}

function editSaveButton(id) {
  $(".editSaveData").click(function(e) {
    e.preventDefault();

    var ingreds = $("input[name^=ingreds]")
      .map(function(idx, elem) {
        return $(elem).val();
      })
      .get();

    var instructs = $("input[name^=instruct]")
      .map(function(idx, elem) {
        return $(elem).val();
      })
      .get();

    let image = $("#image")
      .val()
      .trim()
      .toLowerCase();
    let name = $("#name")
      .val()
      .trim()
      .toLowerCase();
    let desc = $("#desc")
      .val()
      .trim()
      .toLowerCase();
    let time = $("#time")
      .val()
      .trim()
      .toLowerCase();
    let size = $("#size")
      .val()
      .trim()
      .toLowerCase();
    let ingredient = ingreds;
    let instruction = instructs;

    if (
      image != "" &&
      name != "" &&
      desc != "" &&
      instruction != "" &&
      time != "" &&
      size != ""
    ) {
      JUNGLECOOK_SERVICE.updateData(
        id,
        image,
        name,
        desc,
        time,
        size,
        ingredient,
        instruction
      );
    } else {
      alert("add data");
    }
    $("#allContent").html(JUNGLECOOK_SERVICE.getBrowseContent());
    JUNGLECOOK_SERVICE.getAllData(displayData);
  });
}

function editRecipe(addData) {
  var doc = addData.docs[idn];
  var id = doc.id;
  var rawData = doc.data();
  var instNum = 0;
  let end = `" /></br>`;
  let abs = `<div class="instruction"><input name="instruct[]"  type="text" placeholder="instruction" value="`;

  var instructArray = rawData.instructions;
  var rHTML = $.map(instructArray, function(value) {
    instNum += 1;
    return abs + value + end;
  });
  rHTML = rHTML.toString().replace(/,/g, "");

  let asd = `<div class="ingredientList"><input name="ingreds[]"  type="text" placeholder="Ingredient" value="`;

  var ingHTML = rawData.ingredients;
  console.log(ingHTML);
  var ingHTML = $.map(ingHTML, function(value) {
    instNum += 1;
    return asd + value + end;
  });
  ingHTML = ingHTML.toString().replace(/,/g, "");
  console.log(ingHTML);

  var container = `
        <div class="editContainer">
          <div class="editContainerTop">
              <p style="font-family: 'caveat-bold'; font-size: 25px;">Hey User, edit your recipe!</p>
              <input id="image" type="text" placeholder="Add Recipe Image(put url of image)" value="${rawData.recipeImage}" />
              <input id="name" type="text" placeholder="Recipe Name" value="${rawData.recipeName}" />
              <input id="desc" type="text" placeholder="Recipe Description" value="${rawData.recipeDescription}" />
              <input id="time" type="text" placeholder="Recipe Total Time" value="${rawData.recipeTotalTime}" />
              <input id="size" type="text" placeholder="Recipe Serving Size" value="${rawData.recipeServingSize}" />
            </div>
            <div class="editContainerMiddle">
              <p>Enter Ingredients:</p>
                <div class="ingredientList">
                  ${ingHTML}
                </div>
              <button id="" class="ingredAddInput">+</button>
            </div>
            </div>
            <div class="editContainerBottom">
              <p>Enter Instructions:</p>
                <div class="instructionList">
                  ${rHTML}
                </div>
              <button id="" class="instructAddInput">+</button>
            </div>
            
            </div></div>
    `;
  $(".mainContentEditRecipeE").html(container);
  IngredAddInput();
  InstructAddInput();
  editSaveButton(id);
  deleteDataButton(id);
}

function deleteDataButton() {
  $(".deleteData").click(function(e) {
    var id = e.currentTarget.id;
    JUNGLECOOK_SERVICE.deleteData(id);
    $("#allContent").html(JUNGLECOOK_SERVICE.getBrowseContent());
    JUNGLECOOK_SERVICE.getAllData(displayData);
  });
}

function alertUser(result) {
  alert(result);
}

function IngredAddInput() {
  let testArray = [];
  let num = 1;
  $(".ingredAddInput").click(function(e) {
    let ingredientName = `$(<input type="text" class="fieldname${num}" />`;
    let testConsole = testArray.push(ingredientName);
    num += 1;
    $(".ingredientList").append(
      `<input name="ingreds[]" type="text" class="fieldname${num}" placeholder="Ingredient #${num}" />`
    );
    console.log("AI" + testArray);
  });
}

function InstructAddInput() {
  let testArray = [];
  let num = 1;
  $(".instructAddInput").click(function(e) {
    console.log("clicked");
    let ingredientName = `$(<input type="text" class="fieldname${num}" />`;
    let testConsole = testArray.push(ingredientName);
    num += 1;
    $(".instructionList").append(
      `<input name="instruct[]" type="text" class="instruction${num}" placeholder="Instruction #${num}" />`
    );
    console.log("AI" + testArray);
  });
}

function displayRecipe(addData) {
  var doc = addData.docs[idn];
  console.log(doc);
  var id = doc.id;
  var rawData = doc.data();
  console.log(rawData.instruction);
  var instNum = 0;
  var instructArray = rawData.instructions;
  var rHTML = $.map(instructArray, function(value) {
    instNum += 1;
    return "<span>" + instNum + ". " + value + "</span></br>";
  });
  rHTML = rHTML.toString().replace(/,/g, "");

  var ingredArray = rawData.ingredients;
  ingredArray = ingredArray.toString().replace(/,/g, "</br>");

  var container = ` </div>
  <div class="viewRecipeContent">
  <h1 style="writing-mode: vertical-lr;
  transform: rotate(-180deg); 
  text-align: right; 
  margin-right: 10px; 
  font-family: "lato-bold";
  display: flex;
  ">${rawData.recipeName}</h1>
    <div class="receipeContainer">
      <div class="recipeTop">
        <div class="recipeTopImage">
        <img style="width: 500px; padding-right: 30px;" src="${rawData.recipeImage}" alt=""></div>
        <div  class="recipeTopText">
          <h2 style="font-family: "lato-bold";">Description:</h2>
          <p>${rawData.recipeDescription}</p>
          <h2 style="font-family: "lato-bold";">Total Time:</h2>
          <p>${rawData.recipeTotalTime}</p>
          <h2 style="font-family: "lato-bold";">Servings:</h2>
          <p>${rawData.recipeServingSize}</p>
        </div>
      </div>
      <div class="recipeBottom">
        <div class="viewRecipeIngredients">
          <h2>Ingredients:</h2>
          <p>${ingredArray}</p>
        </div>
        <div class="viewRecipeInstructions">
          <h2>Instructions:</h2>
          <p class="vrInstruction">${rHTML}</p>
        </div>
        <button id="${id}" class="editRecipeBtn">Edit Recipe</button>
      </div>
    </div>`;
  $("#allContent").html(container);
  editRecipeNav();
}

function displayData(addData) {
  console.log(addData);
  var container = `<div>`;
  var num = 0;
  addData.forEach(function(doc) {
    var id = doc.id;
    var rawData = doc.data();
    container += ` 
    <div class="recipes">
    <div class="recipeBox">
        <div id="${num}" class="rPLeft clicker" style="cursor: pointer; 
        background-image: url(${rawData.recipeImage})"></div>
            <span class="recipeData">
              <div class="rPRight">
                <p class="name" id="${id}">${rawData.recipeName}</p>
                <span class="recipeText"> 
                  <p class="desc" id="${id}">${rawData.recipeDescription}</p>
                    <div class="timeServingsContainer">
                      <span class="timeImages">
                        <img src="../images/time.svg" alt="time" style="width: 23px;" />
                        <img src="../images/servings.svg" alt="servings" style="width: 23px;" />
                      </span>
                      <span class="timeP>
                        <p class="rMin" id="${id}">${rawData.recipeTotalTime} min</p>
                        <p class="rSize" id="${id}"> ${rawData.recipeServingSize} servings</p>
                      </span>
                    </div>
                </div>
            </span>
        </div>
    </div>
    </div>`;
    num += 1;
    console.log(num);
  });
  container += "</div>";
  $(".browseContent").html(container);
  clickRecipe();
}

function clickRecipe() {
  $(".clicker").click(function(e) {
    var id = e.currentTarget.id;
    $("#allContent").html(JUNGLECOOK_SERVICE.getDisplayRecipeContent(id));
    console.log("clicked");
    JUNGLECOOK_SERVICE.getAllData(displayRecipe);
    idn = id;
  });
}

$(document).ready(function() {
  JUNGLECOOK_SERVICE.initFirebase();
  $("#allContent").html(JUNGLECOOK_SERVICE.getHomeContent());
  initNavButtons();
});
