// Lógica de Alternância de Abas (Login / Cadastro)
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const formLogin = document.getElementById("form-login");
const formRegister = document.getElementById("form-register");
const toggleBg = document.querySelector(".toggle-bg");

if (tabLogin && tabRegister && formLogin && formRegister && toggleBg) {
  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    formLogin.classList.add("active");
    formRegister.classList.remove("active");
    toggleBg.style.left = "4px"; // Move background to left
  });

  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    formRegister.classList.add("active");
    formLogin.classList.remove("active");
    toggleBg.style.left = "50%"; // Move background to right
  });
}

// Lógica do Modal de Termos e Condições
const modal = document.getElementById("terms-modal");
const btn = document.getElementById("open-terms");
const span = document.querySelector(".close-modal");
const acceptBtn = document.getElementById("accept-terms-btn");
const checkbox = document.getElementById("terms");

if (btn && modal) {
  btn.onclick = function (e) {
    e.preventDefault();
    modal.style.display = "block";
  };
}

if (span && modal) {
  span.onclick = function () {
    modal.style.display = "none";
  };
}

if (acceptBtn && modal && checkbox) {
  acceptBtn.onclick = function () {
    modal.style.display = "none";
    checkbox.checked = true;
  };
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
