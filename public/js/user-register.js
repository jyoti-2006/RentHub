document.addEventListener('DOMContentLoaded', () => {
    const userRegisterForm = document.getElementById('userRegisterForm');

    if (userRegisterForm) {
        const sendOtpBtn = document.getElementById('sendOtpBtn');
        const emailOtpGroup = document.getElementById('emailOtpGroup');
        const userOtpInput = document.getElementById('userOtp');
        const registerBtn = document.getElementById('registerBtn');

        // Send OTP flow
        sendOtpBtn.addEventListener('click', async () => {
            const email = document.getElementById('userEmail').value.trim();
            if (!email) return alert('Please enter your email first');
            sendOtpBtn.disabled = true;
            sendOtpBtn.textContent = 'Sending...';
            try {
                const r = await fetch('/api/register/send-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const j = await r.json();
                if (r.ok) {
                    emailOtpGroup.style.display = 'block';
                    alert(j.message || 'OTP sent to your email');
                } else {
                    alert(j.error || 'Failed to send OTP');
                }
            } catch (err) {
                alert('Could not send OTP, please try again later');
            }
            sendOtpBtn.disabled = false;
            sendOtpBtn.textContent = 'Verify Email';
        });

        userRegisterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('userEmail').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const password = document.getElementById('userPassword').value;
            const confirmPassword = document.getElementById('confirmUserPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const otp = document.getElementById('userOtp') ? document.getElementById('userOtp').value.trim() : '';
            // Ensure OTP provided
            if (!otp) {
                alert('Please verify your email with OTP before submitting the registration');
                return;
            }

            try {
                const response = await fetch('/api/register/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fullName, email, phoneNumber, password, otp })
                });

                const data = await response.json();
                if (response.ok) {
                    alert('User registration successful! Redirecting to login...');
                    // Redirect to login page after successful registration
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    alert(data.error);
                }
            } catch (error) {
                alert('An error occurred during user registration. Please try again.');
            }
        });
    }
}); 