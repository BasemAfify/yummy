let mealid;
let searchbyname = "";
let fetchsearch = "s";
let category;
let areafilter;
let ingedient;
async function getmeals() {
  let response = [];

  let api = await fetch(
    `https://themealdb.com/api/json/v1/1/search.php?${fetchsearch}=${searchbyname}`
  );
  response = await api.json();

  let temp = "";
  for (let i = 0; i < response.meals.length; i++) {
    let meals = response.meals[i];
    temp += `<div id="${meals.idMeal}" class="col-xl-3 col-lg-4 col-md-6 position-relative overflow-hidden layerhover  pointer">
    <div> 
    <img id="${meals.idMeal}" src="${meals.strMealThumb}" class="w-100 rounded-3" alt="">
    <div id="${meals.idMeal}" class="layer position-absolute rounded-3 d-flex align-items-center justify-content-start">
    <p class="text-black fs-2">${meals.strMeal}</p>
    </div></div>
    </div>`;
  }

  document.querySelector(".temp").innerHTML = temp;

  $(".layerhover").click(function (e) {
    mealid = e.target.id;
    $("#mealdetails").removeClass("d-none");
    $(".temp").addClass("d-none");
    $("#Searchform").addClass("d-none");

    getmealdetails();
  });

  $("#Search").click(function () {
    $("#Searchform").removeClass("d-none");
    $("#mealdetails").addClass("d-none");
    $(".temp").removeClass("d-none");
    getmeals();
    closesidebar();
  });

  $("#search-by-name").keyup(function () {
    searchbyname = document.querySelector("#search-by-name").value;
    fetchsearch = "s";

    getmeals();
  });
  $("#search-by-first-letter").keyup(function () {
    searchbyname = document.querySelector("#search-by-first-letter").value;
    fetchsearch = "f";
    getmeals();
  });
}

async function getmealdetails() {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
  );
  let response = await api.json();
  let mealdetails = response.meals[0];
  let recepies = "";
  let tag = "";
  let tags;
  if (mealdetails.strTags != null) {
    tags = mealdetails.strTags.split(",");
  } else {
    tags = "";
  }
  $("#mealimage").attr("src", mealdetails.strMealThumb);
  $("#mealname").html(mealdetails.strMeal);
  $("#Instructions").html(mealdetails.strInstructions);
  $("#mealarea").html(mealdetails.strArea);
  $("#maleCategory").html(mealdetails.strCategory);
  for (let i = 1; i < 20; i++) {
    if (mealdetails["strIngredient" + i] == "") {
      recepies += "";
    } else if (mealdetails["strIngredient" + i] !== "") {
      recepies += `<li class="alert alert-info m-2 p-1"><span class="ingredients">${
        mealdetails["strMeasure" + i]
      }</span> <span class="mesure">${
        mealdetails["strIngredient" + i]
      }</span></li>`;
    }
  }
  $(".recepies").html(recepies);
  for (let i = 0; i < tags.length; i++) {
    tag += `<p class="bg-secondary py-1 px-2 m-2 rounded-2 d-inline">${tags[i]}</p>`;
  }
  $(".tags").html(tag);
  $("#mealyoutube").attr("href", mealdetails.strYoutube);
  $("#mealsource").attr("href", mealdetails.strSource);
}

async function getmealcategry() {
  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let response = await api.json();
  let temp = "";
  for (let i = 0; i < response.categories.length; i++) {
    let categories = response.categories[i];
    temp += `<div id="${
      categories.strCategory
    }" class="col-xl-3 col-lg-4 col-md-6 position-relative overflow-hidden cards  g-1 layerhover   pointer">
    <div> 
    <img id="${categories.strCategory}" src="${
      categories.strCategoryThumb
    }" class="w-100 rounded-3" alt="">
    <div id="${
      categories.strCategory
    }" class="overflow-hidden layer  position-absolute rounded-3 d-flex flex-column align-items-center justify-content-evenly">
    <p id="${categories.strCategory}" class="text-black fs-3 text-bold">${
      categories.strCategory
    }</p>
    <p id="${
      categories.strCategory
    }" class="p-2 text-black fs-6">${categories.strCategoryDescription
      .split(" ")
      .slice(0, 20)
      .join(" ")}</p>
    </div></div>
    </div>`;
  }
  document.querySelector(".temp").innerHTML = temp;

  $(".cards").click(function (e) {
    category = e.target.id;
    getmealsofacategory();
  });
}
$("#Categories").click(function () {
  closesidebar();
  $("#Searchform").addClass("d-none");
  $("#mealdetails").addClass("d-none");
  $(".temp").removeClass("d-none");

  getmealcategry();
});

getmeals();

$(".fa-bars").click(function () {
  opensidebar();
});

$("#close").click(function () {
  closesidebar();
});

function opensidebar() {
  $(".links-slide").animate({ left: 0 });
  $(".sideBar").animate({ left: $(".links-slide").outerWidth(true) });
  $("#bars").addClass("d-none");
  $("#close").removeClass("d-none");
}

function closesidebar() {
  $(".links-slide").animate({ left: -$(".links-slide").outerWidth(true) });
  $(".sideBar").animate({ left: 0 });
  $("#bars").removeClass("d-none");
  $("#close").addClass("d-none");
}

async function getmealsofacategory() {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}
`
  );
  let response = await api.json();

  let temp = "";
  for (let i = 0; i < response.meals.length; i++) {
    let meals = response.meals[i];
    temp += `<div id="${meals.idMeal}" class="col-xl-3 col-lg-4 col-md-6 position-relative overflow-hidden  layerhover  pointer">
    <div> 
    <img id="${meals.idMeal}" src="${meals.strMealThumb}" class="w-100 rounded-3" alt="">
    <div id="${meals.idMeal}" class="layer position-absolute rounded-3 d-flex align-items-center justify-content-start">
    <p id="${meals.idMeal}" class="text-black fs-2">${meals.strMeal}</p>
    </div></div>
    </div>`;
  }

  document.querySelector(".temp").innerHTML = temp;

  $(".layerhover").click(function (e) {
    mealid = e.target.id;
    $("#mealdetails").removeClass("d-none");
    $(".temp").addClass("d-none");
    $("#Searchform").addClass("d-none");

    getmealdetails();
  });
}

async function getmealarea() {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await api.json();

  let temp = "";
  for (let i = 0; i < response.meals.length; i++) {
    const element = response.meals[i];
    temp += `
    <div id="${element.strArea}" class=" m-auto col-xl-3  col-lg-4 col-md-6 position-relative pointer iconarea">
      <i id="${element.strArea}" class="fa-solid fa-house-laptop fa-4x "></i>
      <p id="${element.strArea}"  class="fs-3">${element.strArea}</p>
    </div>`;
  }
  document.querySelector(".temp").innerHTML = temp;

  $(".iconarea").click(function (e) {
    areafilter = e.target.id;
    filterbyarea();
  });
}

$("#Area").click(function () {
  $("#Searchform").addClass("d-none");
  $("#mealdetails").addClass("d-none");
  $(".temp").removeClass("d-none");
  closesidebar();
  getmealarea();
});

async function filterbyarea() {
  let api =
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areafilter}
`);
  let response = await api.json();

  let temp = "";
  for (let i = 0; i < response.meals.length; i++) {
    let meals = response.meals[i];
    temp += `<div id="${meals.idMeal}" class="col-xl-3 col-lg-4 col-md-6 position-relative overflow-hidden layerhover  pointer">
    <div> 
    <img id="${meals.idMeal}" src="${meals.strMealThumb}" class="w-100 rounded-3" alt="">
    <div id="${meals.idMeal}" class="layer position-absolute rounded-3 d-flex align-items-center justify-content-start">
    <p class="text-black fs-2">${meals.strMeal}</p>
    </div></div>
    </div>`;
  }

  document.querySelector(".temp").innerHTML = temp;
}

async function getmealingredient() {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await api.json();

  let temp = "";
  for (let i = 0; i < 24; i++) {
    const element = response.meals[i];
    temp += `
    <div id="${
      element.strIngredient
    }" class=" m-auto text-center col-xl-3  col-lg-4 col-md-6 position-relative pointer ingredientfilter">
      <i id="${
        element.strIngredient
      }" class="fa-solid fa-drumstick-bite d-block fs-1"></i>
      <span id="${element.strIngredient}" class="fs-3">${
      element.strIngredient
    }</span>
      <p id="${
        element.strIngredient
      }" class="text-center">${element.strDescription
      .split(" ")
      .slice(0, 20)
      .join(" ")}</p>
    </div>
    `;
  }
  document.querySelector(".temp").innerHTML = temp;

  $(".ingredientfilter").click(function (e) {
    ingedient = e.target.id;
    getmealingredientdata();
  });
}

$("#Ingredients").click(function () {
  getmealingredient();
  $("#Searchform").addClass("d-none");
  $("#mealdetails").addClass("d-none");
  $(".temp").removeClass("d-none");
  closesidebar();
});

async function getmealingredientdata() {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingedient}`
  );
  let response = await api.json();

  let temp = "";
  for (let i = 0; i < response.meals.length; i++) {
    const element = response.meals[i];
    temp += `<div id="${element.idMeal}" class="col-xl-3 col-lg-4 col-md-6 position-relative overflow-hidden layerhover  pointer">
    <div> 
    <img id="${element.idMeal}" src="${element.strMealThumb}" class="w-100 rounded-3" alt="">
    <div id="${element.idMeal}" class="layer position-absolute rounded-3 d-flex align-items-center justify-content-start">
    <p class="text-black fs-2">${element.strMeal}</p>
    </div></div>
    </div>`;
  }
  document.querySelector(".temp").innerHTML = temp;

  $(".layerhover").click(function (e) {
    mealid = e.target.id;
    $("#mealdetails").removeClass("d-none");
    $(".temp").addClass("d-none");
    $("#Searchform").addClass("d-none");

    getmealdetails();
  });
}

$("#Contact-Us").click(function () {
  contactus();
  $("#Searchform").addClass("d-none");
  $("#mealdetails").addClass("d-none");
  $(".temp").removeClass("d-none");
  closesidebar();
});

function contactus() {
  document.querySelector(
    ".temp"
  ).innerHTML = `<section id="contact" class="">
    <div class="container px-1 px-lg-5">
      <h2 class="fs-1 text-center mb-5">Contact Us</h2>
      <form>
        <div class="row g-4 justify-content-center">
          <div class="col-lg-6 position-relative">
            <i class="fa fa-check bg-green"></i>
            <i class="fa fa-close bg-red"></i>
            <input class="w-100" type="text" name="name" placeholder="Enter Your Name" required>
            <div class="validation-card  ">"Your name should have at least 3 characters."</div>
          </div>
          <div class="col-lg-6 position-relative">
            <i class="fa fa-check bg-green"></i>
            <i class="fa fa-close bg-red"></i>
            <input class="w-100" type="email" name="email" placeholder="Enter Your Email" required>
            <div class="validation-card ">"You should enter a valid email."</div>
          </div>
          <div class="col-lg-6 position-relative">
            <i class="fa fa-check bg-green"></i>
            <i class="fa fa-close bg-red"></i>
            <input class="w-100" type="tel" name="phone" placeholder="Enter Your Phone" required>
            <div class="validation-card ">"You should enter a valid number ex:0104 5678 910."</div>
          </div>
          <div class="col-lg-6 position-relative">
            <i class="fa fa-check bg-green"></i>
            <i class="fa fa-close bg-red"></i>
            <input class="w-100" type="number" name="age" placeholder="Enter Your Age" required>
            <div class="validation-card ">"You should enter a valid age."</div>
          </div>
          <div class="col-lg-6 position-relative">
            <i class="fa fa-check bg-green"></i>
            <i class="fa fa-close bg-red"></i>
            <input class="w-100" type="password" name="password" placeholder="Enter Your Password" required>
            <div class="validation-card ">"Your name should have at least 8 characters, 1 UPPERCASE, 1 lowercase, 1 number, 1 $peci@l ch@r@cter."</div>
          </div>
          <div class="col-lg-6 position-relative">
            <i class="fa fa-check bg-green"></i>
            <i class="fa fa-close bg-red"></i>
            <input class="w-100" type="password" name="repassword" placeholder="Re-enter Your Password" required>
            <div class="validation-card ">"You should have matched passwords."</div>
          </div>
          <button class="btn btn-outline-warning mt-5 disabled" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </section>`;

  // let inputname = Document.querySelector("#inputname").value;
  // console.log(inputname);
  
  // validatename(inputname);

// $("#submitbtn").click(function () {
//   console.log();
// });
  
}

// function validatename(name) {
//   if (/^[0-9a-zA-z]{8,30}$/.test(name)) {
//     return true;
//   } else {
//     return fallse;
//   }
// }
// ----------------------------------
const inputs = $('#contact input');

const passwordInput = $('#contact input').eq(4);
const repasswordInput = $('#contact input').eq(5);
const submitBtn = $('#contact button');

const nameRegex = /^.{3,}$/;
const emailRegex = /^.+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
const phoneRegex = /^(\+2)*01(1|0|2|5){1}[0-9]{8}$/;
const ageRegex = /^[1-9]{1}[0-9]{0,1}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/;

const regexMap = {
    'name' : nameRegex,
    'email' : emailRegex,
    'phone' : phoneRegex,
    'age' : ageRegex,
    'password' : passwordRegex,
}

function validHandler(elem)
{
    elem.removeClass('non-valid');
    elem.addClass('valid');
    elem.next().slideUp()
    elem.parent().children('i').eq(1).fadeOut()
    elem.parent().children('i').eq(0).fadeIn()
}

function nonValidHandler(elem)
{
    elem.removeClass('valid');
    elem.addClass('non-valid');
    elem.next().slideDown()
    elem.parent().children('i').eq(0).fadeOut()
    elem.parent().children('i').eq(1).fadeIn()
}


inputs.on('input',(elem)=>
{
    const input = $(elem.target);

    if( input.attr('name') === 'repassword' || input.attr('name') === 'password' )
    {
        if( passwordInput.val() === repasswordInput.val() ){ console.log('in 1');  validHandler(repasswordInput);  }
        else{ console.log('in 2');  nonValidHandler(repasswordInput);  }
        if( input.attr('name') === 'repassword'){ return; }
    }

    if(regexMap[input.attr('name')].test(elem.target.value) ){   validHandler(input);  }
    else{   nonValidHandler(input);  }

});

submitBtn.on('click',function(){

    const checks = $('.fa-check');

    for (let i = 0; i < checks.length; i++) 
    {
        if( checks.eq(i).css('display') === 'none' ){ return; }
    }

    $('#contact form').html('<div class="text-center pt-5 justify-content-center d-flex"><div class="loader mt-5"></div></div>');
    setTimeout(() => {
        $('#contact form').html('<div class="text-center pt-5 "><h2 class="fs-1 text-success mt-5">Submit Successfully</h2></div>');
    }, 1000);

});

