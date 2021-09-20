const list = document.getElementById("list");
const city = document.getElementById("city");
const apiState = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';
const apiCity = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/municipios';

jQuery.support.cors = true;

function fetch (url) {
    return new Promise ( ( resolve, reject ) =>{
		$.ajax({
			type:"GET",
            crossDomain: true,
			url:url,
			success:resolve,
			error:reject,
		});
	})
}

function fetchVolunteers ( state, city ) {
    let url = "/volunt";
    const query = [];
    if ( state ) query.push(`state=${state}`);
    if ( city ) query.push(`city=${city}`);
    url += "?"+query.join("&");
    console.log(url)
    return fetch(APIurl+url);
}

function fetchStates ( ) {
    return fetch(apiState);
}

function fetchCities ( state ) {
    return fetch(apiCity.replace("{uf}",state));
}

function addVolunteers( volunteer ) {
list.innerHTML += `  
    <li style="display:flex;width:100%;flex-direction: column;">
        <div class="collapsible-header volunteer">
            <div style="display: flex;flex-direction:row;" class="width:20%">
                <i class="material-icons">account_circle</i>
                <div>${(volunteer.nameVisibility) ? volunteer.name : "Voluntário Anônimo" }</div>
            </div>
            <div class="width:20%">${volunteer.contactEmail} </div>
            <div class="width:20%">${volunteer.whatsapp}     </div>
            <div class="width:10%">${volunteer.country}      </div>
            <div class="width:10%">${volunteer.state}        </div>
            <div class="width:20%">${volunteer.city}         </div>
        </div>

        <div class="collapsible-body">
            <div>${volunteer.descr} </div>
        </div>
    </li>
    `;
}

function updateStateSelect () {
    fetchStates().then( ( states ) => {
        states.forEach( ( state ) => {
            addOptionToId( "state", state.sigla, state.nome );
        } );
        $('select').formSelect();
    });
}

function updateCitySelect ( state ) {
    fetchCities(state).then( ( cities ) => {
        document.getElementById("cities").innerHTML = "";
        cities.forEach( ( city ) => {
            addOptionToId("cities",city.nome); 
        })
    });
}

function addOptionToId ( id, value, text = "" ) {
    $(`#${id}`).append( $("<option>").attr("value", value).text(text) );
}

function updateList (state,city) {
    fetchVolunteers(state,city).then( (/*Array de Obj de voluntário*/volunteer) => {
        document.getElementById("list").innerHTML = "";
        volunteer.forEach(addVolunteers);
    } )
    .catch( console.err )
}

function search(){
    updateList($("#state").val(), city.value );
};


updateList();
updateStateSelect();
updateCitySelect("SP");

$("#state").on('change', function() {
    console.log($("#cities"))
    updateCitySelect( $(this).val() );
});

// promise
// .then( (valor) => {} )
// .catch( function(valor){} )

