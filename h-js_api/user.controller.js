const User = {
    get: (req,res) => {
        res.status(200).send('Getting one');
    },
    list: (req,res) => {
        res.status(200).send('Getting');
    },
    create: (req,res) => {
        res.status(201).send('Creating');
    },
    update: (req,res) => {
        res.status(204).send('Updating');
    },
    destroy: (req,res) => {
        res.status(204).send('Deleting');
    }
}

module.exports = User;
