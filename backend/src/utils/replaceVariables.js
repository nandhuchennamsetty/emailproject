

module.exports = (body, contact) => {
    return body.replace(/{{name}}/g, contact.name);
};
