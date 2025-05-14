
    async function registerUser() {
      console.log("123");
      try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;
        const response = await fetch(
          "https://quiz-be-zeta.vercel.app/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              username: username,
            }),
          }
        );
        const data = await response.json()
        if (data.token) {
          localStorage.setItem("token", data.token);
          alert("Registracija uspješna! Token: " + data.token);
          window.location.href = "../kviz/index.html";
        } else if(data.message) {
            alert(data.message)
        } else {
          alert("Nije uredu");
        }
      } catch (error) {
        console.log(error);
        alert("Greška prilikom registracije.");
      }
    }
    document.querySelector(".prijavabtn2")?.addEventListener("click", registerUser);
    