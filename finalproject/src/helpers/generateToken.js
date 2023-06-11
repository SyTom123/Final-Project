function GenerateToken () {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const lengthToken = 20;
    let token = "";
    for(let i = 0; i < lengthToken; i++ ){
        const index = Math.round(Math.random()*characters.length);
        token += characters.charAt(index);
    }
    return token;
}
export default GenerateToken;