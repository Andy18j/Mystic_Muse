              
       const wrapper = document.querySelector('.wrapper');
       const signUpLink = document.querySelector('.signUp-link');
       const signInLink = document.querySelector('.signIn-link');

       // const form1 = document.getElementById('form1');
       // const form2 = document.getElementById('form2');

       // Form animation (rotate)
       signUpLink.addEventListener('click', () => {
           wrapper.classList.add('animate-signIn');
           wrapper.classList.remove('animate-signUp');
       });

       signInLink.addEventListener('click', () => {
           wrapper.classList.add('animate-signUp');
           wrapper.classList.remove('animate-signIn');
       });

       let eyeIcons = document.querySelectorAll(".fa-eye-slash");
       eyeIcons.forEach(eyeIcon => {
           eyeIcon.addEventListener("click", () => {
               const pInput = eyeIcon.parentElement.querySelector("input");
               if (pInput.type === "password") {
                   eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
                   pInput.type = "text";
               } else {
                   eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
                   pInput.type = "password";
               }
           });
       });

       document.getElementById("form1").addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.getElementById("name1").value;
        const email = document.getElementById("email1").value;
        const password = document.getElementById("pass1").value;
        const confirmPassword = document.getElementById("pass12").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const userData = {
            username: username,
            email: email,
            password: password,
            confirm_password: confirmPassword
        };

        try {
            const response = await fetch("https://mystic-muse-backend.onrender.com/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('Signup successful:', responseData.msg);
                alert('Signup successful: ' + responseData.msg);
                // Optionally, redirect the user to another page upon successful signup
                // window.location.href = "./login.html";
            } else {
                console.error('Signup failed:', responseData);
                alert('Signup failed: ' + responseData.msg);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again later.");
        }
    });


    //for login heree...
 
    document.getElementById("form2").addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const userData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch("https://mystic-muse-backend.onrender.com/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('Login successful:', responseData.msg);
                alert('Login successful: ' + responseData.msg);

                // Store token in local storage
                localStorage.setItem("token", responseData.token);

                // Optionally, redirect the user to another page upon successful login
                window.location.href = "../index.html";
            } else {
                console.error('Login failed:', responseData);
                alert('Login failed: ' + responseData.msg);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again later.");
        }
    });