document.addEventListener("DOMContentLoaded", function() {
  let container = document.getElementById("container");
  let ratings = document.getElementById("ratings");
  let baseUrl = `https://63f1ba774f17278c9a18b9b9.mockapi.io/product`;

  function initialize() {
      let key = localStorage.getItem("product-id");
      if (!key) {
          console.error("Product ID not found in localStorage");
          return;
      }

      fetch(`${baseUrl}/${key}`).then((res) => {
          if (!res.ok) {
              throw new Error("Network response was not ok");
          }
          return res.json();
      }).then((data) => {
          Cartlength();
          displayData(data);
      }).catch((error) => {
          console.error("There has been a problem with your fetch operation:", error);
      });
  }

  function displayData(element) {
      if (!container || !ratings) {
          console.error("Container or ratings element not found");
          return;
      }
      
      Cartlength();
      container.innerHTML = `
          <!-- for small images -->
          <div class="smallImgs">
              <div><img id="img1" src=${element.image4} alt=""></div>
              <div><img id="img2" src=${element.image3} alt=""></div>
              <div><img id="img3" src=${element.image2} alt=""></div>
          </div>

          <!-- for big image -->
          <div class="mainImg"><div><img src=${element.image1} alt=""></div></div>

          <!-- for All details -->
          <div class="Specification">
              <div>
                  <p class="title">${element.title}</p>
                  <p><s> ₹ 5,200.00</s></p>
                  <p class="price">₹ ${element.price}</p>
              </div> 
              <div class="Xaz">
                  <img src="images/ca-plcc-platinum-icon.svg" alt="">
                  <p><b> Save $20 </b> on your first purchase of $25+ when you open and use a Catherines Platinum Credit Card!1, * <a href=""><br>Learn More</a></p>
              </div>
              <!-- color -->
              <p class="col2"><b class="col">Color :</b>${element.color}</p>
              <p class="col2"><b class="col">Category :</b>${element.productType}</p>
              <div id="colorOpt">
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <p class="save">${element.category}</p>
              <p class="slsize"><b>Size :</b> <b id="slsize">Please Select </b> </p>
              <div class="SizeSelect">
                  <div class="mm">
                      <div class="m">
                          <a>T</a>Whats My Size?
                      </div>
                  </div>
                  <div class="gift">Get fitted in 60 seconds.</div>
              </div>
              <!-- Size Boxes -->
              <div id="sizeBoxes">
                  <div data-id="1" class="Sizebtn">OX/L</div>
                  <div data-id="2" class="Sizebtn">1X</div>
                  <div data-id="3" class="Sizebtn">2X</div>
                  <div data-id="4" class="Sizebtn">3X</div>
                  <div data-id="5" class="Sizebtn">4X</div>
                  <div data-id="6" class="Sizebtn">5X</div>
                  <div data-id="7" class="Sizebtn">6X</div>
              </div>
              <!-- review -->
              <div class="reveiw">True To Size Based On <b> CUSTOMER REVIEWS</b></div>
              <div class="Ssl">
                  <div class="filter">
                      <label for="">Qty</label>
                      <select name="Select" id="SizeSelect">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                      </select>
                  </div>
                  <div id="sbn" class="sbn"><span id="SelectBtn">Add To Bag</span></div>
              </div>
              <div class="desc">
                  <p>Description & Details</p>
                  <select name="" id=""></select>
              </div>
              <div class="retun">
                  <p>Shipping & Returns</p>
                  <select name="" id=""></select>
              </div>
          </div>
      `;

      ratings.innerHTML = `
          <div class="lblog">
              <div>${element.rating}</div>
              <p>Out Of 5 Stars</p>
              <div>WRITE A REVIEW</div>
          </div>
          <div>
              <img src="productimage/Screenshot (292).png" alt="">
          </div>
      `;

      let TopSweater = document.getElementById("Top-Sweater");
      if (TopSweater) {
          TopSweater.innerText = element.title;
      }

      element.quantity = 1;

      let addToBag = document.getElementById("SelectBtn");
      if (addToBag) {
          addToBag.addEventListener("click", (e) => {
              e.preventDefault();
              let CartData = JSON.parse(localStorage.getItem("CartData")) || [];

              let flag = false;
              for (let i = 0; i < CartData.length; i++) {
                  if (element.id === CartData[i].id) {
                      flag = true;
                      break;
                  }
              }

              if (flag) {
                  swal("", "Product Already In Bag", "info");
              } else {
                  CartData.push(element);
                  localStorage.setItem("CartData", JSON.stringify(CartData));
                  swal("", "Item Added To Bag", "success");
                  Cartlength();
              }
          });
      } else {
          console.error("Add To Bag button not found");
      }

      let sbn = document.getElementById("sbn");
      let SizeValue = document.getElementById("slsize");
      let SizebtnSelect = document.getElementsByClassName("Sizebtn");

      for (let sizeBtn of SizebtnSelect) {
          sizeBtn.addEventListener("click", (e) => {
              e.preventDefault();
              sbn.style.background = "#2a2a7c";
              sbn.style.color = "white";
              let value = e.target.dataset.id;

              if (value == 1) {
                  SizeValue.innerText = "OX/L";
              } else if (value == 2) {
                  SizeValue.innerText = "1X";
              } else if (value == 3) {
                  SizeValue.innerText = "2X";
              } else if (value == 4) {
                  SizeValue.innerText = "3X";
              } else if (value == 5) {
                  SizeValue.innerText = "4X";
              } else if (value == 6) {
                  SizeValue.innerText = "5X";
              } else if (value == 7) {
                  SizeValue.innerText = "6X";
              }
          });
      }
  }

  function Cartlength() {
      let CartData = JSON.parse(localStorage.getItem("CartData")) || [];
      let cardlength = document.getElementById("cardlength");
      if (cardlength) {
          cardlength.innerText = CartData.length;
      }
  }

  initialize();
});
