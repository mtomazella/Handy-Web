let voluntInfo;

const name = document.getElementById("name")
const contEmail = document.getElementById("cont-email")
const phone = document.getElementById("phone")
const nameVis = document.getElementById("nameVis")
const country = document.getElementById("country")
const state = document.getElementById("state")
const city = document.getElementById("city")
const description = document.getElementById("description")

function login ( email, password ) {
    return new Promise ( ( resolve, reject ) => {
        $.ajax({
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
                    user.token = response.token;
                    fillUserInformation();
                    loginModal.close()
                    handleVolunteer();
                    resolve(true)
                } else resolve(false);
            },
            error: ( error ) => {
                console.error( error )
                document.getElementById("login-error").style.display = "block";
                resolve(false);
            }
        });
    } )
}

function loginTrigger ( ) {
    login( document.getElementById("login-email").value.trim(), 
           document.getElementById("login-password").value.trim() );
}

function fillUserInformation ( ) {
    name.value = user.name;
}

function isVolunteer ( id ) {
    return new Promise ( ( resolve, reject ) => {
        $.ajax({
            type: "GET",
            url: `${APIurl}/volunt?u.id=${user.id}`,
            success: function (response) {
                console.log(response);
                if ( response.length > 0 ) {
                    voluntInfo = response[0];
                    resolve(true);
                } else resolve( false );
            },
            error: ( error ) => {
                console.error(error);
                resolve(false);
            }
        });
    } )
}

async function handleVolunteer ( ) {
    if ( await isVolunteer( user.id ) ) {
        document.getElementById("edit").style.display = "flex";
        fillVolunteerInfo();
    } else document.getElementById("join").style.display = "flex";
}

function fillVolunteerInfo ( ) {
    contEmail.value = voluntInfo.contactEmail;
    phone.value = voluntInfo.whatsapp;
    nameVis.checked = voluntInfo.nameVisibility == 1 ? true : false;
    country.value = voluntInfo.country;
    state.value = voluntInfo.state;
    city.value = voluntInfo.city;
    description.innerText = voluntInfo.descr
    M.textareaAutoResize(description);
}

function editUser ( ) {
    document.getElementById("user-edit-error").style.display = "none";
    if ( name.value.trim() == "" ) return;
    const obj = {
        identifier: {
            id: user.id
        },
        update: {
            name: name.value.trim()
        },
        token: user.token
    }
    console.log(obj)
    $.ajax({
        type: "PUT",
        url: `${APIurl}/user`,
        data: obj,
        success: function (response) {
            fillUserInformation();
        },
        error: ( error ) => {
            console.error(error);
            document.getElementById("user-edit-error").style.display = "block";
        }
    });
}