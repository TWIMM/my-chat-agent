
document.querySelector('.reg_btn input').addEventListener('click', async () => {
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
        gender: "Prefer not to say",
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
            Notiflix.Notify.success('User registered successfully!').then(
                window.location.href = "/auth/login"
            );
            console.log(result);
        } else {
            const error = await response.json();
            Notiflix.Notify.failure(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        //alert('An error occurred while registering. Please try again.');
    }
});
