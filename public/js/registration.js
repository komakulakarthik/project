document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Log the data being sent
        console.log('Registration Data:', { name, email, username, password, role });

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, username, password, role }),
            });

            const result = await response.json();
            
            if (response.ok) {
                alert(result.message);
                // Redirect to login page on successful registration
                window.location.href = result.redirectUrl;
                form.reset(); // Clear the form after successful registration

            } else {
                // Handle validation or server errors
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user. Please try again.');
        }
    });
});
