
const schema = require('../../schema/dashboard.js')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require("../../config.json")
module.exports = {
    name: "/dashboard",
    run: async (req, res) => {
        delete require.cache[require.resolve("../html/dashboard.ejs")]

        if(!req.cookies.token) return res.redirect('/login')
        let decoded;
        try {
            decoded = jwt.verify(req.cookies.token, jwt_secret)
        } catch (e) {}

        if (decoded) {
            let data = await schema.findOne({
                _id: decoded.uuid
            })

            let args = {
                avatar: `https://cdn.discordapp.com/avatars/${data.userId}/${data.user.avatar}.png`,
                username: data.user.username,
                discriminator: data.user.discriminator,
                id: data.user.userID,
                loggedIN: true
            }

            res.render("./website/html/dashboard.ejs", args)
        } else res.redirect("/login")

    }
}