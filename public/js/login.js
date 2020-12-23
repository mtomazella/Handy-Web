$('body').on( 'click', ( ) => {
    if ( !user ) $('#login-modal').modal();
} )

async function loginTrigger ( ) {
    const result = await login( $('#pinus-email')[0].value, $('#pinus-password')[0].value );
    if ( result ) $('#login-modal').modal('hide');
}

async function login ( email, password ) {
    await $.ajax({
        type: "GET",
        url: `${APIurl}/user?email=${email}&password=${password}`,
        success: ( response ) => {
            if ( response != undefined && response[0] != undefined ){
                user = new User( response[0] );
                user.password = password;
            }
        },
        error: ( error ) => {
            alert( error )
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