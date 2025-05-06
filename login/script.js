async function loginUser() {
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Molimo unesite i email i lozinku.");
      return;
    }

    const response = await fetch("https://quiz-be-zeta.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Odgovor servera:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "./index.html";
    } else {
      alert("Greška pri loginu: " + (data.message || "Nepoznata greška"));
    }
  } catch (error) {
    console.error("Greška:", error);
    alert("Došlo je do greške prilikom prijave.");
  }
}

document.querySelector("#login-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  loginUser();
  zavrsiLogIn()
});

function zavrsiLogIn() {
  console.log("završeno");
  window.location.href = "../kviz/index.html";

  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => {
    if (btn.id !== "logout-btn") {
      btn.remove(); 
    }
  });
  if (!document.getElementById("logout-btn")) {
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-btn";
    logoutBtn.textContent = "Odjavi se";
    logoutBtn.onclick = logoutUser;
    document.body.appendChild(logoutBtn);
  }
}
function logoutUser() {
  localStorage.removeItem("token");
  alert("Uspešno ste se odjavili.");
  location.reload();
}