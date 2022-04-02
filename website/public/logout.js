module.exports = {
    name: '/logout',
    run: async (req, res) => {
        res.redirect('/')
    }
}