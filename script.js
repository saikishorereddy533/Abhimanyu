const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const suggestions = document.querySelector('#suggestions');
const products = document.querySelectorAll('.f-product');

// Store the initial state of the products
const initialProducts = Array.from(products).map(product => ({
  element: product,
  name: product.querySelector('.card-title a').textContent.toLowerCase(),
  brand: product.dataset.brand.toLowerCase(),
  type: product.dataset.type.toLowerCase(),
  design: product.dataset.design.toLowerCase(),
}));

let searchButtonClicked = false;

function searchProducts() {
  const query = searchInput.value.toLowerCase().trim();

  if (query === '') {
    suggestions.innerHTML = '';
    initialProducts.forEach(product => {
      product.element.style.display = 'inline-block';
    });
    return;
  }

  const matchingProducts = [];

  initialProducts.forEach(product => {
  if(searchButtonClicked){
    if (((product.name.includes(query) || product.brand.includes(query) || product.type.includes(query) || product.design.includes(query)))) {
        product.element.style.display = 'inline-block';
      }
      else {
        product.element.style.display = 'none';
      }
    }else{
      if (((product.name.includes(query) || product.brand.includes(query) || product.type.includes(query) || product.design.includes(query)))) {
        matchingProducts.push(`<li> ${product.name}</li>`);
      }
    }
  });

  if (matchingProducts.length === 0 && !searchButtonClicked) {
    suggestions.innerHTML = '<li>No matching products found</li>';
  } else {
    suggestions.innerHTML = matchingProducts.join('');
  }


  suggestions.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      searchInput.value = li.textContent.trim();
      searchButtonClicked = true;
      searchProducts();
    });
  });
  
}




searchButton.addEventListener('click', () => {
  searchButtonClicked = true;
  searchProducts();
});

searchInput.addEventListener('input', () => {
  searchButtonClicked = false;
  searchProducts();
});































// Get all filter dropdowns
const genderFilter = document.getElementById('gender');
const sizeFilter = document.getElementById('size');
const brandFilter = document.getElementById('brand');
const colorFilter = document.getElementById('color');
const designFilter = document.getElementById('design');
const typeFilter = document.getElementById('type');
const priceSort = document.getElementById('price-sort');

// Add event listeners to filter dropdowns
genderFilter.addEventListener('change', filterProducts);
sizeFilter.addEventListener('change', filterProducts);
brandFilter.addEventListener('change', filterProducts);
colorFilter.addEventListener('change', filterProducts);
designFilter.addEventListener('change', filterProducts);
typeFilter.addEventListener('change', filterProducts);
priceSort.addEventListener('change', sortProducts);

function filterProducts() {
  // Get selected filter values
  const selectedGender = genderFilter.value;
  const selectedSize = sizeFilter.value;
  const selectedBrand = brandFilter.value;
  const selectedColor = colorFilter.value;
  const selectedDesign = designFilter.value;
  const selectedType = typeFilter.value;

  // Loop through all products and show/hide based on selected filters
  products.forEach(product => {
    const productGender = product.dataset.gender;
    const productSize = product.dataset.size;
    const productBrand = product.dataset.brand;
    const productColor = product.dataset.color;
    const productDesign = product.dataset.design;
    const productType = product.dataset.type;

    if ((selectedGender === 'all' || selectedGender === productGender) &&
        (selectedSize === 'all' || selectedSize === productSize) &&
        (selectedBrand === 'all' || selectedBrand === productBrand) &&
        (selectedColor === 'all' || selectedColor === productColor) &&
        (selectedDesign === 'all' || selectedDesign === productDesign) &&
        (selectedType === 'all' || selectedType === productType)) {
      product.style.display = 'inline-block';
    } else {
      product.style.display = 'none';
    }
  });
}

function sortProducts() {
    // Get selected sort order
    const sortOrder = priceSort.value;
  
    // Convert NodeList to Array
    const productsArray = Array.from(products);
  
    // Sort products based on selected sort order
    if (sortOrder === 'low-to-high') {
      productsArray.sort((a, b) => a.dataset.price - b.dataset.price);
    } else if (sortOrder === 'high-to-low') {
      productsArray.sort((a, b) => b.dataset.price - a.dataset.price);
    }
    console.log(productsArray)
    // Loop through sorted array and set order property
    productsArray.forEach((product, index) => {
        product.style.order = index + 1; // add 1 to index to avoid 0 value
        product.style.order = `${index + 1} !important`; // add !important
      });
      
  }
  


  var modal = document.getElementById("filters-container");
  var btn = document.getElementById("filtering");
  const modalOverlay = document.getElementById("myModal");
  var content = document.getElementsByClassName("modalContent");
  var span = document.getElementsByClassName("close")[0];

  
  
  btn.addEventListener("click", () => {
    console.log("clicked filter")
    modalOverlay.style.display = "block";
    modal.style.display = "block";
  });
  
  span.onclick = function() {
    modalOverlay.style.display = "none";
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    console.log("clicked on window")
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }










  var sortmodal = document.getElementById("sort-myModal");
  var sortbtn = document.getElementById("sorting");
  const sortmodalOverlay = document.getElementById("sort-modal-overlay");
  var content = document.getElementsByClassName("sort-modalContent");
  var span = document.getElementsByClassName("sort-close")[0];

  
  
  sortbtn.addEventListener("click", () => {
    sortmodalOverlay.style.display = "block";
    sortmodal.style.display = "block";
  });
  
  span.onclick = function() {
    sortmodal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }










  
//   // Get the modal element
// const modal = document.getElementById("myModal");

// // Get the button that opens the modal
// const btn = document.getElementById("filtering");

// // Get the content that will be displayed in the modal
// const content = document.getElementsByClassName("filters").innerHTML;

// // Get the element that will hold the content in the modal
// const modalContent = document.getElementsByClassName("modal-content");

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
//   modalContent.innerHTML = content;
// }

// // When the user clicks on the close button or outside the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal || event.target.className == "close") {
//     modal.style.display = "none";
//     modalContent.innerHTML = "";
//   }
// }



