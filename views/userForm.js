function userForm(aUser) {
    return `
        <form action="" method="POST">
            <input type="text" name="name" value="${aUser.name}">
            <br>
            <input type="submit">
        </form>
    `;
}

module.exports = userForm;