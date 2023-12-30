document.addEventListener('DOMContentLoaded', function () {
    const apiURL = "https://s3.amazonaws.com/open-to-cors/assignment.json";

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data from the API:", data);

            if (data && data.products) {
                // Extract products from the nested structure
                const products = Object.values(data.products);
                
                // Sort products based on descending popularity
                products.sort((a, b) => b.popularity - a.popularity);

                // Display the sorted data
                displayData(products);
            } else {
                console.error("Data received from the API is not in the expected format.");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    function displayData(products) {
        const tbody = document.querySelector('#productList tbody');

        // Clear existing table content
        tbody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            // row.innerHTML = `
            //     <td>${product.subcategory}</td> 
            //     <td>${product.title}</td>
            //     <td>${product.price}</td>
            //     <td>${product.popularity}</td>
            // `;
            row.innerHTML = `
                <td>${product.title}</td>
                <td>${product.price}</td>
            `;
            tbody.appendChild(row);
        });
    }
});
