const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordtwo = document.getElementById("password-two");
const cpf = document.getElementById("cpf");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const cpfValue = cpf.value.trim();
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordtwoValue = passwordtwo.value.trim();

  if (cpfValue === "") {
    setErrorFor(cpf, "Preencha esse campo");
  } else if (cpfValue.length < 11) {
    setErrorFor(cpf, "Deve ter 11 números");
  } else if (!/^\d+$/.test(cpfValue)) {
    setErrorFor(cpf, "O CPF não pode conter letras ou caracteres especiais");
  } else if (validateCPF(cpfValue)) {
    setSuccessFor(cpf);
  }

  function validateCPF(cpfValue) {
    var soma = 0;
    var resto;

    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpfValue.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfValue.substring(9, 10))) {
      setErrorFor(cpf, "CPF Inválido");
      return false;
    }

    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpfValue.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfValue.substring(10, 11))) {
      setErrorFor(cpf, "CPF Inválido");
      return false;
    }

    return true;
  }

  /*
    if(cpfValue = preg_replace( '/[^0-9]/is', '', cpfValue )) {
        setErrorFor(cpf, 'Não pode ter')
    } 
    else {
        setSuccessFor(cpf)
    }
}

*/
  function validateUsernameValue(usernameElement) {
    const usernameValue = usernameElement.value.trim(); // Pegando o valor corretamente
    const onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    if (usernameValue === "") {
      setErrorFor(usernameElement, "Preencha esse campo"); // Corrigindo chamada da função
      return false;
    } else if (!onlyLetters.test(usernameValue)) {
      setErrorFor(usernameElement, "Por favor, digite apenas letras.");
      return false;
    } else {
      setSuccessFor(usernameElement);
      return true;
    }
  }

  // Chamando corretamente a função
  validateUsernameValue(username);

  if (emailValue === "") {
    setErrorFor(email, "Preencha esse campo");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email inválido");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Preencha esse campo");
  } else if (passwordValue.length < 8) {
    setErrorFor(password, "Senha deve ter mais que 8 caracteres");
  } else {
    setSuccessFor(password);
  }

  if (passwordtwoValue === "") {
    setErrorFor(passwordtwo, "Preencha esse campo");
  } else if (passwordValue !== passwordtwoValue) {
    setErrorFor(passwordtwo, "Senhas não estão covalentes");
  } else {
    setSuccessFor(passwordtwo);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email
  );
}

function isCpf(cpf) {
  return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    cpf
  );
}
