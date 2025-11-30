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

        const passwordInput = document.getElementById('userPassword');
        const confirmInput = document.getElementById('confirmUserPassword');

        // Live update password rule UI
        function updatePasswordRulesUI(pwd) {
            const checks = {
                length: pwd.length >= 8,
                upper: /[A-Z]/.test(pwd),
                lower: /[a-z]/.test(pwd),
                digit: /[0-9]/.test(pwd),
                special: /[!@#\$%\^&\*_\-\?]/.test(pwd),
                nospace: !/\s/.test(pwd),
                notcommon: !['123456','password','admin','12345678','qwerty','letmein','welcome','password1','12345','passw0rd'].includes(pwd.toLowerCase())
            };
            document.getElementById('rule-length').style.color = checks.length ? '#2ecc71' : '#d32f2f';
            document.getElementById('rule-upper').style.color = checks.upper ? '#2ecc71' : '#d32f2f';
            document.getElementById('rule-lower').style.color = checks.lower ? '#2ecc71' : '#d32f2f';
            document.getElementById('rule-digit').style.color = checks.digit ? '#2ecc71' : '#d32f2f';
            document.getElementById('rule-special').style.color = checks.special ? '#2ecc71' : '#d32f2f';
            document.getElementById('rule-no-space').style.color = checks.nospace ? '#2ecc71' : '#d32f2f';
            document.getElementById('rule-not-common').style.color = checks.notcommon ? '#2ecc71' : '#d32f2f';
            return checks;
        }

        passwordInput.addEventListener('input', (e) => {
            updatePasswordRulesUI(e.target.value);
        });

        userRegisterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('userEmail').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const password = document.getElementById('userPassword').value;
            const confirmPassword = document.getElementById('confirmUserPassword').value;

            // Confirm match
            if (password !== confirmPassword) {
                alert('Passwords do not match — please make sure both fields match.');
                return;
            }

            // Validate password requirements locally
            const checks = updatePasswordRulesUI(password);
            const failed = Object.entries(checks).filter(([k, v]) => !v).map(x => x[0]);
            if (failed.length > 0) {
                const msgs = {
                    length: 'at least 8 characters',
                    upper: 'one uppercase letter',
                    lower: 'one lowercase letter',
                    digit: 'one digit',
                    special: 'one special character (! @ # $ % ^ & * _ - ?)',
                    nospace: 'no spaces',
                    notcommon: 'not a common/weak password'
                };
                const human = failed.map(f => msgs[f]).join(', ');
                alert('Password must include: ' + human + '.');
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
                    body: JSON.stringify({ fullName, email, phoneNumber, password, confirmPassword, otp })
                });

                const data = await response.json();
                if (response.ok) {
                    alert('User registration successful! Redirecting to login...');
                    // Redirect to login page after successful registration
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    // If server provides validation details, show them
                    if (data && data.error && data.details && Array.isArray(data.details)) {
                        alert(data.error + '\n' + data.details.join('\n'));
                    } else if (data && data.error) {
                        alert(data.error);
                    } else {
                        alert('Registration failed. Please check your input.');
                    }
                }
            } catch (error) {
                alert('An error occurred during user registration. Please try again.');
            }
        });
    }
}); 