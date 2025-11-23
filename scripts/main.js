const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll(".navbar-links li a").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );
}

// Lógica de Validação do Formulário
const form = document.getElementById("start-now");

if (form) {
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  // Formatação do Telefone em tempo real (Máscara)
  phoneInput.addEventListener("input", (e) => {
    // Remove tudo que não é dígito
    let value = e.target.value.replace(/\D/g, "");

    // Limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);

    // Aplica a formatação
    if (value.length > 10) {
      // (11) 99999-9999
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 6) {
      // (11) 9999-9999
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      // (11) 99...
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
      // (1...
      value = value.replace(/^(\d*)/, "($1");
    }

    e.target.value = value;
  });

  // Impede espaços no email enquanto digita
  emailInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\s/g, "");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio real do formulário

    const email = emailInput.value;
    const phone = phoneInput.value;

    // Regex para validação de Email (mais rigoroso)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Regex para validação de Telefone (Formatos brasileiros com ou sem máscara)
    // Suporta: (11) 99999-9999, (11) 9999-9999, 11 999999999, 11999999999
    const phoneRegex = /^\(?\d{2}\)?\s?(?:9\d{4}|\d{4})[- ]?\d{4}$/;

    let isValid = true;
    let errorMessage = "";

    // Verifica se o formulário é válido baseado nos atributos 'required' e tipos dos inputs
    if (!form.checkValidity()) {
      isValid = false;
      errorMessage = "Por favor, preencha todos os campos obrigatórios corretamente.";
    } else if (!emailRegex.test(email)) {
      isValid = false;
      errorMessage = "Por favor, insira um email válido.";
      emailInput.focus();
    } else if (!phoneRegex.test(phone)) {
      isValid = false;
      errorMessage = "Por favor, insira um telefone válido (ex: (11) 99999-9999).";
      phoneInput.focus();
    }

    if (!isValid) {
      Swal.fire({
        title: "Atenção!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#d33",
      });

      // Foca no primeiro campo que estiver inválido para ajudar o usuário (se for erro de HTML5)
      if (form.checkValidity() === false) {
        const invalidField = form.querySelector(":invalid");
        if (invalidField) {
          invalidField.focus();
        }
      }
    } else {
      // Se estiver tudo válido, envia os dados via Formspree

      // ⚠️ IMPORTANTE: Substitua a URL abaixo pelo seu endpoint do Formspree
      // Crie uma conta em https://formspree.io/ e crie um novo formulário para obter seu código.
      const formAction = "https://formspree.io/f/SEU_CODIGO_AQUI";

      fetch(formAction, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              title: "Pré-cadastro realizado!",
              text: "Recebemos seus dados com sucesso. Nossa equipe entrará em contato em até 48h.",
              icon: "success",
              confirmButtonColor: "#2e7d32",
            });
            form.reset(); // Limpa os campos do formulário
          } else {
            Swal.fire({
              title: "Erro!",
              text: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Erro!",
            text: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        });
    }
  });
}
