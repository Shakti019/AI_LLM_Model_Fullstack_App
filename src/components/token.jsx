import React from "react";
function tokenAuth() {
    const token = localStorage.getItem('jwtToken'); // Assuming you store the token in localStorage

    fetch('http://localhost:5000/api/protected', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Ensure Content-Type is set correctly
    },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    return(
        <p>Token Authorization</p>
    )
}
export default tokenAuth;