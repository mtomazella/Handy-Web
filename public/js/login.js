$('body').on( 'click', ( ) => {
    if ( !user ) $('#login-modal').modal();
} )

async function loginTrigger ( ) {
    document.getElementById("login-error").style.display = "none";
    const result = await login( $('#pinus-email')[0].value, $('#pinus-password')[0].value );
    if ( result ) $('#login-modal').modal('hide');
}

async function login ( email, password ) {
    await $.ajax({
        type: "POST",
        url: `${APIurl}/login`,
        data: {
            email,
            password,
            type: 'user'
        },
        success: ( response ) => {
            if ( response != undefined ){
                user = new User( response.user );
                user.password = password;
                user.token = response.token;
            }
        },
        error: ( error ) => {
            console.log( error )
            document.getElementById("login-error").style.display = "block";
        }
    });
    if ( user ) { 
        realTime = new RealTime( user );
        await realTime.start( APIurl, 'user' );
        await realTime.supportRequest();
        return true;
    }
    else return false;
}