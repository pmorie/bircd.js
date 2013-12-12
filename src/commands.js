var BIRCD = BIRCD | {};
BIRCD.Messages = BIRCD.Messages | {};
BIRCD.Messages.Commands = BIRCD.Messages.Commands | {};

exports.commands = {
    
    /** Password Message 
      * The PASS command is used to set a ’connection password’. The
      * password can and must be set before any attempt to register the
      * connection is made. Currently this requires that clients send a PASS
      * command before sending the NICK/USER combination and servers *must*
      * send a PASS command before any SERVER command. The password supplied
      * must match the one contained in the C/N lines (for servers) or I
      * lines (for clients). It is possible to send multiple PASS commands
      * before registering but only the last one sent is used for
      * verification and it may not be changed once registered. Numeric
      * @param password
      * @returns
      * Numeric Replies:
      * ERR_NEEDMOREPARAMS ERR_ALREADYREGISTRED
      * @example
      * PASS secretpasswordhere
      */
    PASS: function(password) { },
    
    /** Nick Message
      * NICK message is used to give user a nickname or change the previous
      * one. The <hopcount> parameter is only used by servers to indicate
      * how far away a nick is from its home server. A local connection has
      * a hopcount of 0. If supplied by a client, it must be ignored.
      * If a NICK message arrives at a server which already knows about an
      * identical nickname for another client, a nickname collision occurs.
      * As a result of a nickname collision, all instances of the nickname
      * are removed from the server’s database, and a KILL command is issued
      * to remove the nickname from all other server’s database. If the NICK
      * message causing the collision was a nickname change, then the
      * original (old) nick must be removed as well.
      * If the server recieves an identical NICK from a client which is
      * directly connected, it may issue an ERR_NICKCOLLISION to the local
      * client, drop the NICK command, and not generate any kills.
      * @param nickname
      * @param hopcount <optional>
      * @returns
      * Numeric Replies:
      * ERR_NONICKNAMEGIVEN ERR_ERRONEUSNICKNAME
      * ERR_NICKNAMEINUSE ERR_NICKCOLLISION
      * @example
      * NICK Wiz ; Introducing new nick "Wiz".
      * :WiZ NICK Kilroy ; WiZ changed his nickname to Kilroy.
      */
    NICK: function(nickname, hopcount) { },
    
    /** User message
      * The USER message is used at the beginning of connection to specify
      * the username, hostname, servername and realname of s new user. It is
      * also used in communication between servers to indicate new user
      * arriving on IRC, since only after both USER and NICK have been
      * received from a client does a user become registered.
      * Between servers USER must to be prefixed with client’s NICKname.
      * Note that hostname and servername are normally ignored by the IRC
      * server when the USER command comes from a directly connected client
      * (for security reasons), but they are used in server to server
      * communication. This means that a NICK must always be sent to a
      * remote server when a new user is being introduced to the rest of the
      * network before the accompanying USER is sent.
      * It must be noted that realname parameter must be the last parameter,
      * because it may contain space characters and must be prefixed with a
      * colon (’:’) to make sure this is recognised as such.
      * Since it is easy for a client to lie about its username by relying
      * solely on the USER message, the use of an "Identity Server" is
      * recommended. If the host which a user connects from has such a
      * server enabled the username is set to that as in the reply from the
      * "Identity Server".
      * @param username
      * @param hostname
      * @param servername
      * @param realname
      * @returns
      * Numeric Replies:
      * ERR_NEEDMOREPARAMS ERR_ALREADYREGISTRED
      * @example
      * USER guest tolmoon tolsun :Ronnie Reagan
      * ; User registering themselves with a
      * username of "guest" and real name
      * "Ronnie Reagan".
      * 
      * :testnick USER guest tolmoon tolsun :Ronnie Reagan
      * ; message between servers with the
      * nickname for which the USER command
      * belongs to
      */
    USER: function(username, hostname, servername, realname) { },
    
    
}