const express = require('express');

const router = express.Router();
const projectDb = require('../data/helpers/projectModel');

// MIDDLEWARE
router.use(express.json());
const checkReqs = (req, res, next) => {
  if (!req.body.name || req.body.name.length > 128) {
    return res.status(400).send({
      message:
        'Please provide a name for the project that is less than 128 characters.',
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      message: 'Please provide a description for the project',
    });
  }
  next();
};

// ROUTES
router.get('/', (req, res) => {
  projectDb
    .get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(() => {
      res
        .status(500)
        .send({ error: 'The projects information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  projectDb
    .get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(() => {
      res
        .status(500)
        .send({ error: 'The project information could not be retrieved.' });
    });
});

router.post('/', checkReqs, (req, res) => {
  const { name, description } = req.body;
  const newProject = { name, description };
  projectDb
    .insert(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(() => {
      res
        .status(500)
        .send({ error: 'The project information could not be saved.' });
    });
});

router.put('/:id', checkReqs, (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const newProject = { name, description };
  projectDb
    .update(id, newProject)
    .then((project) => {
      if (!project) {
        console.log(project);
        return res.status(404).send({
          message: 'The project with the specified ID does not exist.',
        });
      }
      res.status(200).json(project);
    })
    .catch(() => {
      res.status(500).send({
        error: 'The project information could not be modified.',
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  projectDb
    .remove(id)
    .then((remove) => {
      if (!remove) {
        return res.status(404).send({
          message: 'The project with the specified ID does not exist.',
        });
      }
      res.status(200).send({ message: `Project with ID ${id} was removed.` });
    })
    .catch(() => {
      res.status(500).json({
        error: 'The user could not be removed.',
      });
    });
});

router.get('/:id/actions', (req, res) => {
  const id = req.params.id;
  projectDb
    .getProjectActions(id)
    .then((projectActions) => {
      if (projectActions.length === 0) {
        return res.status(404).send({
          message: 'No actions for project found.',
        });
      }
      res.status(200).json(projectActions);
    })
    .catch(() => {
      res.status(500).json({ error: 'Error retrieving the projects actions.' });
    });
});

module.exports = router;
