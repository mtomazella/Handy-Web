class RealTime {
    socket;
    user;
    otherUserInfo = { socketId: '' };

    constructor ( user ) {
        this.user = user;
        return this;
    }

    get_id ( ) {
        return this.socket.id;
    }

    async start ( url = 'http://localhost:3305', userType = 'user' ) {
        const socket    = await io( url );
        this.user.type  = userType;

        socket.emit( 'setSocket', { type: this.user.type, id: this.user.id } )

        socket.on( 'message', ( message ) => {
            const newMessage = new Men( message );
            newMessage.show();
        } )
        socket.on( 'messageLoad', ( messages ) => {
            messages.forEach( ( message ) => {
                const newMessage = new Men( message );
                let waitingTime = 0;
                const nameIsReady = setInterval( ( ) => {
                    if ( this.otherUserInfo.name != undefined || waitingTime >= 10 ) { 
                        clearInterval( nameIsReady );
                        newMessage.show();
                    }
                }, 1000 );
            } )
        } )
        socket.on( 'repportError', ( error ) => {
            console.log( error );
        } )
        socket.on( 'supportDisconnect', ( info ) => {
            if ( info.otherUserInfo.socketId === this.otherUserInfo.socketId ) this.otherUserInfo = { };
            chat.innerHTML = '';
        } )
        socket.on( 'supportConnect', ( info ) => {
            console.log( info )
            if ( info.user.socketId == this.socket.id ) { 
                this.otherUserInfo = { socketId: info.support.socketId, userId: info.support.supportId };
                $.ajax({
                    type: "GET",
                    url: `${APIurl}/admin?id=${this.otherUserInfo.userId}`,
                    success: function (response) {
                        console.log(response[0])
                        realTime.otherUserInfo.name = response[0].name;
                    }
                });
            }
        } )

        this.socket = socket;
    }

    supportRequest ( ) {
        if ( this.user.type == 'user' ) this.socket.emit( 'supportRequest' );
    }

    supportDisconnect ( ) {
        console.log( this.otherUserInfo )
        this.socket.emit( 'supportDisconnect', { otherUserInfo: this.otherUserInfo, userInfo: { userId: this.user.id, socketId: this.socket.id } } )
        console.log( { otherUserInfo: this.otherUserInfo, userInfo: this.user } )
        this.otherUserInfo = { };
        chat.innerHTML = '';
    }

    message ( message ) {
        const messageObj = message.extractInfo();
        this.socket.emit( 'message', { message: messageObj, otherSocketId: this.otherUserInfo.socketId } );
    }
}