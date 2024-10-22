document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        console.log('Login Data:', { username, password, role });

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server Error:', errorData);
                alert(`Error: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            alert(result.message); // Show success message
            // Redirect or handle successful login here, e.g.:
            // window.location.href = '/dashboard.html'; // Example redirect
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in. Please try again.');
        }
    });
});
