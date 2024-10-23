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

            const result = await response.json();

            if (!response.ok) {
                console.error('Server Error:', result);
                alert(`Error: ${result.message}`);
                return;
            }

            alert(result.message); // Show success message

            // Redirect based on the role
            switch (result.user.role) {
                case 'Patient':
                    window.location.href = '/patient-dashboard.html'; // Redirect to Patient Dashboard
                    break;
                case 'Doctor':
                    window.location.href = '/doctor-dashboard.html'; // Redirect to Doctor Dashboard
                    break;
                case 'Staff':
                    window.location.href = '/staff-dashboard.html'; // Redirect to Staff Dashboard
                    break;
                case 'Admin':
                    window.location.href = '/admin-dashboard.html'; // Redirect to Admin Dashboard
                    break;
                default:
                    alert('Unknown role, redirect failed.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in. Please try again.');
        }
    });
});
