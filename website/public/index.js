const fs = require('fs')
const Client = require('../../index').Client
module.exports = {
    name: "/",
    run: async (req, res) => {
        let args = {
            users: Client.users.cache.size,
            guilds: Client.guilds.cache.size,
        }

        delete require.cache[require.resolve("../../website/html/home.ejs")]
        res.render("./website/html/home.ejs", args)
    }
}