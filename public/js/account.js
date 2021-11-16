let voluntInfo;

const possibleEmail = new URLSearchParams(location.search).get("email");
if ( possibleEmail ) document.getElementById("login-email").value = possibleEmail;

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

function isVolunteer ( ) {
    return new Promise ( ( resolve, reject ) => {
        $.ajax({
            type: "GET",
            url: `${APIurl}/volunt?u.id=${user.id}`,
            success: function (response) {
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
    $.ajax({
        type: "PUT",
        url: `${APIurl}/user`,
        contentType: "application/json",
        data: JSON.stringify({
            identifier: {
                id: user.id
            },
            update: {
                name: name.value.trim()
            },
            token: user.token
        }),
        success: function (response) {
            window.location.href = `/account?email=${user.email}`
        },
        error: ( error ) => {
            console.error(error);
            document.getElementById("user-edit-error").style.display = "block";
        }
    });
}

function openForm ( ) {
    document.getElementById("join").style.display = "none";
    document.getElementById("edit").style.display = "flex";
    document.getElementById("edit-btn").innerText = "Cadastrar-se";
    document.getElementById("edit-btn").onclick = createVolunteer;
    document.getElementById("edit-del").style.display = "none";
}

function verifyFormValues ( ) {
    const validStates = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"] ;
    if ( contEmail.value.trim() == "" ) return false;
    if ( country.value.trim()   == "" ) return false;
    if ( state.value.trim() == "" || !validStates.includes(state.value) ) return false;
    if ( city.value.trim()     == "" ) return false;

    return true;
}

function createVolunteer ( ) {
    if ( !verifyFormValues() ) return;
    $.ajax({
        type: "POST",
        url: `${APIurl}/volunt`,
        data: {
            id: user.id,
            isInstitution: 0,
            nameVisibility: nameVis.checked ? 1 : 0,
            whatsapp: phone.value,
            country: country.value,
            city: city.value,
            state: state.value,
            description: description.value,
            contactEmail: contEmail.value,
            token: user.token,
        },
        success: console.log,
        error: console.error
    });
}

function editVolunteer ( ) {
    if ( !verifyFormValues() ) return;
    $.ajax({
        type: "PUT",
        url: `${APIurl}/volunt`,
        data: {
            identifier: {
                id: user.id,
            },
            update: { 
                nameVisibility: nameVis.checked ? 1 : 0,
                whatsapp: phone.value,
                country: country.value,
                city: city.value,
                state: state.value,
                description: description.value,
                contactEmail: contEmail.value,
            },
            token: user.token,
        },
        contentType: "application/json",
        success: console.log,
        error: console.error
    });
}