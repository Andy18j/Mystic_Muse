const itemsPerPage = 10; // Adjust the number of items per page as needed
let currentPage = 1;

let globalData = [];
// let pagination = document.getElementById("pagination-wrapper");




const checkboxColor = document.querySelectorAll(".selectbtn-color input");
const checkboxStock = document.querySelectorAll(".selectbtn-stock input");
const checkboxBrand = document.querySelectorAll(".selectbtn-brand input");
const checkboxSize = document.querySelectorAll(".selectbtn-size input");
const checkboxProductType = document.querySelectorAll(".selectbtn-productType input");
const pagination = document.getElementById("pagination-wrapper");

// Fetch data from the API
async function getData() {
    try {
        const response = await fetch("https://mystic-muse-backend.onrender.com/product/filter/Coat");
        const data = await response.json();
        console.log("API Response:", data); // Log the API response
        const coatData = data.products; // Accessing the array under 'products' key
        console.log("Extracted coatData:", coatData); // Log the extracted coatData
        if (Array.isArray(coatData)) {
            globalData = coatData;
            renderData(globalData);
        } else {
            console.error("Data is not an array:", coatData);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


getData();

// pagination.addEventListener("click", function (event) {
//     if (event.target && event.target.classList.contains("pagination-btn")) {
//         const pageNumber = parseInt(event.target.dataset.pageNumber);
//         renderData(globalData.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
//     }
// });


// Render product data
function renderData(data) {
    const productEl = document.getElementById("product-container");
    productEl.innerHTML = data.map(item => getProductHTML(item)).join("");

    const products = document.querySelectorAll(".products");
    products.forEach(product => {
        product.addEventListener("click", () => {
            const itemId = product.getAttribute("data-id");
            const selectedItem = data.find(item => item.id === itemId);
            if (selectedItem) {
                localStorage.setItem("product-id", selectedItem.id);
                location.href = "/Product_Description/Product.html";
            }
        });
    });
}

// Helper function to generate product HTML
function getProductHTML(item) {
    // Access the first image URL
    const primaryImage = item.images[0] ? item.images[0].url : '';
    
    // Access the second image URL (for hover effect)
    const hoverImage = item.images[4] ? item.images[4].url : ''; // Change index as needed

    return `
        <div data-id="${item.id}" class="products">
            <img src="${primaryImage}" alt="Product Image">
            <img class="hover-img" src="${hoverImage}">
            <div class="rating">${item.rating}</div>
            <h4 class="top">${item.top}</h4>
            <span class="price">From ₹${item.price} ${item.category}</span>
            <h4 class="title">${item.title}</h4>
            <p class="desc">${item.description}</p>
        </div>
    `;
}





// Filter products by color
function filterDataByColor() {
    const selectedColors = Array.from(checkboxColor)
        .filter(input => input.checked)
        .map(input => input.name);

    if (selectedColors.length === 0) {
        renderData(globalData);
        return;
    }

    const filteredData = globalData.filter(item => selectedColors.includes(item.color));
    renderData(filteredData);
}

checkboxColor.forEach(input => input.addEventListener("change", filterDataByColor));

// Add event listeners for other filters (stock, brand, size, product type)...

// Sorting function
function sorting() {
    const sortValue = document.getElementById("sort-products").value;
    let sortedData = [...globalData];

    if (sortValue === "asc") {
        sortedData.sort((a, b) => a.price - b.price);
    } else if (sortValue === "desc") {
        sortedData.sort((a, b) => b.price - a.price);
    }

    renderData(sortedData);
}

document.getElementById("sort-products").addEventListener("change", sorting);

// Other functions (pagination, search, etc.) can be added similarly...



// function renderData(data) {
//     const productEl = document.getElementById("product-container");
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentItems = data.slice(startIndex, endIndex);

//     productEl.innerHTML = currentItems.map(item => getProductHTML(item)).join("");
// }

// // Render pagination controls
// // Render pagination controls
// function renderPagination() {
//     const totalItems = globalData.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const paginationEl = document.getElementById("pagination-wrapper");

//     paginationEl.innerHTML = ''; // Clear previous pagination buttons

//     for (let i = 1; i <= totalPages; i++) {
//         const button = document.createElement('button');
//         button.textContent = i;
//         button.classList.add('page-btn');
//         button.onclick = () => goToPage(i);
//         if (i === currentPage) {
//             button.classList.add('active');
//         }
//         paginationEl.appendChild(button);
//     }
// }





// actual pagination code 
// function showPagination(totalItems, limit) {
//     const numofButtons = Math.ceil(totalItems / limit);
//     pagination.innerHTML = '';
//     for (let i = 1; i <= numofButtons; i++) {
//         pagination.innerHTML += getButton(i, i);
//     }

//     pagination.addEventListener("click", function (event) {
//         if (event.target && event.target.classList.contains("pagination-btn")) {
//             const pageNumber = parseInt(event.target.dataset.pageNumber);
//             renderData(globalData.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
//         }
//     });
// }


// function getButton(text, pageNumber) {
//     return `<button class="pagination-btn" data-page-number="${pageNumber}">${text}</button>`;
// }
