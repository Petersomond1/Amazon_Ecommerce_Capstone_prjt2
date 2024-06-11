// import {useEffect } from 'react';

// const UseFetchProducts = () => {
//     useEffect(() => {
//         fetch('http://localhost:5000/api/products')
//             .then(response => response.json())
//             .then(data => {
//                 setProducts(data);
//             })
//             .catch(error => console.error('Error fetching products:', error));
//     }, []); // Removed setProducts from the dependency array to avoid infinite loop

//     return products;
// }

// export default UseFetchProducts;