class User {
    constructor ( user = { }, socket ) {
        this.id             = user.id;
        this.name           = user.name;
        this.email          = user.email;
        this.accessLevel    = user.accessLevel;
        this.password       = user.password;
        this.socket         = socket;
        return this;
    }

    get_userObject ( ) {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            accessLevel: this.accessLevel
        }
    }

    updateUserCredentials ( info = { } ) {
        const keys      = Object.keys( info );
        const values    = Object.values( info );
        for ( let i in keys ) this[ keys[i] ] = values[i];
    }

    async login ( email, password ) {
        this.password = password;
        await $.ajax({
            type: "GET",
            url: `${APIurl}/user?email=${email}&password=${password}`,
            success: function ( response ) {
                response = response[0];
                console.log(user);
            },
            error: ( error ) => {
                console.log(error);
            }
        }, user );
    }
}