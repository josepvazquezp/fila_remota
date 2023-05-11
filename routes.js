module.exports = function(app) {
    
    app.get('/', function(req, res) {
        res.status(200).send('Corriendo');
    });
    
    app.get('*', function(req, res) {
        res.status(404).send('Pagina no encontrada');
    });
}