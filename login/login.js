async function loginUser() {
  const email = document.getElementById("email2").value
  const password= document.getElementById("password").value
    try {
      const response = await fetch("https://quiz-be-zeta.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });
  
      const data = await response.json();
      console.log("Odgovor servera:", data);
  
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Uspješno ste se prijavili!");
      } else {
        alert("Greška pri loginu: " + JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
      alert("Došlo je do greške prilikom prijave.");
    }
  }
  
  document.querySelector(".prijavabtn")?.addEventListener("click", loginUser);