const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = ` <div class="col h-100">
    <div class="card h-100 card-hover " id="card-color">
      <div id="all-products h-100" >
    <div class="single-product h-100 ">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h6><span class="rate-rateCount">Rating: </span>${product.rating.rate}<br>
      <span class="rate-rateCount">Count: </span>${product.rating.count}</h6>

      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="detail(${product.id})">Details</button></div>
      </div>
      </div>
      </div>
      `;
    document.getElementById("single-product-card").appendChild(div);
  }
};
// product detail by using id 
detail=(detailId)=>{
  fetch(`https://fakestoreapi.com/products/${detailId}`)
            .then(res=>res.json())
            .then(json=>showDetail(json))
}
showDetail=(detail)=>{
    const displayDetail=document.getElementById('display-detail');
    displayDetail.textContent='';
    const image = detail.image;
    const div = document.createElement("div");
    div.classList.add("detail-product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${detail.title}</h3>
      <p>Category: ${detail.category}</p>
      <p><span class="rate-rateCount">Details: ${detail.description}</span></p>
      <h6> <span class="rate-rateCount">Rating: </span>${detail.rating.rate}<br>
     <span class="rate-rateCount"> Count:</span> ${detail.rating.count}</h6>

      <h2>Price: $ ${detail.price}</h2>
      <button onclick="addToCart(${detail.id},${detail.price})" id="addToCart-btn" class="buy-now btn">add to cart</button>
      <button id="details-btn" class="btn" onclick="detail(${detail.id})">Details</button></div>
      `;
    displayDetail.appendChild(div);


}

// counting product 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =getInputValue("price")+getInputValue("delivery-charge")+getInputValue("total-tax");
  document.getElementById("total").innerText =parseFloat(grandTotal.toFixed(2));
};
