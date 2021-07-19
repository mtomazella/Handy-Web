const divDest = document.getElementById( "list" );

renderScreen();

function renderScreen () {
    setLoading( true )
    fetchComponents()
    .then( ( result ) => {
        result.forEach( addComponentAndProviders );
        $('.collapsible').collapsible();
    } )
    .catch( console.error )
}

function setLoading ( state ) {
    const loading = document.getElementById( "loading" );
    if ( state ) {
        divDest.style.display = "none";
        loading.style.display = "block";
    } else {
        divDest.style.display = "block";
        loading.style.display = "none";
    }
}

function fetch ( url ) {
    return new Promise ( ( resolve, reject ) => {
        $.ajax({
            type: "GET",
            url: url,
            success: resolve,
            error: reject
        });
    } )
}
function fetchComponents () {
    return fetch( `${APIurl}/comp` );
}
function fetchProviders( idComp ) {
    return fetch( `${APIurl}/comp/prov?idComp=${idComp}` );
}


function addComponentAndProviders ( comp ) {
    fetchProviders(comp.id)
    .then( ( provs ) => {
        divDest.innerHTML += 
        `<li>
            <div class="collapsible-header">
                <i class="material-icons">memory</i>
                ${comp.name}
            </div>
            <div class="collapsible-body">
                <ul class="prov-list">
                    ${getProvidersListHtml( provs )}
                </ul>
            </div>
        </li>`
        setLoading( false );
    } )
    .catch( console.error );
}

function getProvidersListHtml ( provs ) {
    let html = "";
    provs.forEach( ( prov ) => { 
        html +=
        `<li>
            <div class="item-prov">
                <div style="width:50%;"> ${prov.name}</div>
                <div style="width:30%;"> <a target="_blank" href="${prov.link}">Link</a></div>
                <div style="width:20%;"> R$ ${prov.cost}</div>
            </div>
        </li>`;
    } );
    return html;
}