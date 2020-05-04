const clubsController = {};

// Funciones
clubsController.listClubs = (req, res) => {
	res.render('/models/clubs/list');
};

clubsController.createClubs = (req, res) => {
	res.render('/models/clubs/create');
};

clubsController.storeClubs = (req, res) => {
	res.send('saved');
};

clubsController.editClubs = (req, res) => {
	res.render('/models/clubs/edit');
};

clubsController.updateClubs = (req, res) => {
	res.send('saved');
};

clubsController.destroyClubs = (req, res) => {
	res.send('saved');
};

module.exports = clubsController;
