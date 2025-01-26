/* Registration */
const regBtn = document.querySelector('.reg_btn input');
if (regBtn) {
    regBtn.addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('pass').value;
        const confirmPass = document.getElementById('confirmPass').value;

        // Check if passwords match
        if (password !== confirmPass) {
            Notiflix.Notify.failure('Passwords do not match!');
            return;
        }

        // Determine selected gender
        const gender = document.querySelector('input[name="gender"]:checked');
        const genderValue = gender ? gender.nextElementSibling.textContent.trim() : 'Prefer not to say';

        // Prepare the data
        const requestData = {
            name,
            username,
            email,
            phone,
            password,
            gender: genderValue,  // Use the correct gender value
            role: "user"
        };

        try {
            // Make the POST request
            const response = await fetch('/auth/register-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const result = await response.json();
                Notiflix.Notify.success('User registered successfully!');
                window.location.href = "/auth/login";
                console.log(result);
            } else {
                const error = await response.json();
                Notiflix.Notify.failure(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            Notiflix.Notify.failure('An error occurred while registering. Please try again.');
        }
    });
}

/* Login */
const logBtn = document.querySelector('.log_btn input');
if (logBtn) {
    logBtn.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;

        // Check if fields are empty
        if (!email || !password) {
            Notiflix.Notify.failure('Both fields are required!');
            return;
        }

        // Prepare data
        const requestData = { email, password };

        try {
            // Send the login request
            const response = await fetch('/auth/log-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // Handle server response
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    Notiflix.Notify.success('Login successful!');
                    // Redirect to dashboard or home
                    window.location.href = '/dashboard';
                } else {
                    Notiflix.Notify.failure(result.message || 'Login failed!');
                }
            } else {
                Notiflix.Notify.failure('An error occurred during login.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Notiflix.Notify.failure('An error occurred. Please try again.');
        }
    });
}
