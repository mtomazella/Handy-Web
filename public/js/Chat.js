class Chat {
    constructor (  ) {
        $(document).ready( ( ) => {
            $( 'input' ).keydown(function (e) { 
                if ( e.keyCode === 13 ) chatHandler.post( );
            });
        } )
        return this;
    }
    
    post ( ) {
        if ( realTime.otherUserInfo.socketId == "" ) return;
        const idAdmin = ( realTime.user.type === 'admin' ) ? realTime.user.id : realTime.otherUserInfo.userId;
        const idUser  = ( realTime.user.type === 'admin' ) ? realTime.otherUserInfo.userId : realTime.user.id;
        const message = new Men( { 
            idAdmin: idAdmin, 
            idUser: idUser, 
            datetime: undefined,
            sender: realTime.user.type, 
            type: 'text', 
            text: input.value, 
            image: undefined,
            token: user.token
        } )
        input.value = '';
        if ( message.type === 'text' && ( message.text.trim() === '' || message.text === undefined ) ) return;
        message.show();
        realTime.message( message );
    }
}