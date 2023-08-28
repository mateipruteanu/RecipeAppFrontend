function PrepareJWT(header) {
    return header.slice(7,255).trim() + '\n';
}

export default PrepareJWT;