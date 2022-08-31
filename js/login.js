
/*ostrar contraseña */
const showPsswd_boton = document.querySelector('.show-pass');
const showPsswd_icono = document.querySelector('.fa-solid');

showPsswd_boton.addEventListener('click', ()=>{
    if(showPsswd_icono.className.includes('fa-eye-slash')){
        showPsswd_icono.classList.remove('fa-eye-slash');
        showPsswd_icono.classList.add('fa-eye');
        psswd.type = 'password';
    }else{
        showPsswd_icono.classList.remove('fa-eye');
        showPsswd_icono.classList.add('fa-eye-slash');
        psswd.type = 'text';
    }

});

/* pop up y evaluacion de campos */
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

const close_btn = document.querySelector('.btn-close');
const danger = document.querySelector('.alert-danger');

close_btn.addEventListener('click', ()=>{
    danger.classList.remove("show");
})

const mail = document.getElementById('email');
const psswd = document.getElementById('psswd');
const btn = document.getElementById('btn-lgn');


btn.addEventListener('click', ()=>{

    localStorage.setItem('mail', mail.value);
    
    let psswdCheck = psswd.value == '';
    let mailCheck = mail.value == '';

    if(psswdCheck || mailCheck){
        showAlertError();
    }else{
        
        window.location.href='./login.html';
    }
});

/* 
// Social Media Login Authentication 
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

// console.log(getBasicProfile())

//facebook

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   
FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});
devolucion 

{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
        */