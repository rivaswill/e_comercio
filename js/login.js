const mail = document.getElementById("mail");
const psswd = document.getElementById("psswd");
const btn = document.getElementById("ingresar");

/*mostrar contraseña */
const showPsswd_boton = document.querySelector(".input_psswd");
const showPsswd_icono = document.querySelector(".input_psswd .fa-solid");

showPsswd_boton.addEventListener("click", () => {
  if (showPsswd_icono.className.includes("fa-eye-slash")) {
    showPsswd_icono.classList.toggle("fa-eye-slash");
    showPsswd_icono.classList.toggle("fa-eye");
    psswd.type = "password";
  } else {
    showPsswd_icono.classList.toggle("fa-eye");
    showPsswd_icono.classList.toggle("fa-eye-slash");
    psswd.type = "text";
  }
});

const loginValidate=()=>{
  let psswdCheck = psswd.value.replaceAll(" ", "");
  let mailCheck = mail.value.replaceAll(" ", "");
  
  let colorDanger = '#dc3545'
  let colorSucces = localStorage.dataTheme == "light" ? '#292d30' : '#f8f9fa'

  const changePsswd=(color)=> document.querySelector('.input_psswd_cnt').style.setProperty('--text',color)
  const changeMail=(color)=> document.querySelector('.input_mail_cnt').style.setProperty('--text',color)

  if (psswdCheck && mailCheck) {
    const USER = JSON.parse(localStorage.user)
    USER.mail = mailCheck;
    localStorage.user = JSON.stringify(USER)
    window.location.href = "./home.html";
  }
  else{
    psswdCheck == '' && changePsswd(colorDanger)
    mailCheck == '' && changeMail(colorDanger)
  }
  //--danger: claro->#dc3545   oscuro->#6c232a

  psswd.addEventListener("input", () => {
    psswdCheck = psswd.value.replaceAll(" ", "");
    if(psswd.checkValidity() && psswdCheck.length>=6){
    changePsswd(colorSucces)}else{changePsswd(colorDanger)}
  });
  mail.addEventListener("input", () => {
    mailCheck = mail.value.replaceAll(" ", "");
    if(mail.checkValidity() && mailCheck.length>=6){
      changeMail(colorSucces)}else{changeMail(colorDanger)}
  });
}
btn.addEventListener("click", loginValidate);
psswd.addEventListener('keypress',(e)=>{if(e.key==='Enter')loginValidate()})
mail.addEventListener('keypress',(e)=>{if(e.key==='Enter')loginValidate()})
