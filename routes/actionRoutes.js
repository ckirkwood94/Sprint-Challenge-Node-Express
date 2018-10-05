const express = require('express');

const router = express.Router();
const actionDb = require('../data/helpers/actionModel');

// MIDDLEWARE
router.use(express.json());
const checkReqs = (req, res, next) => {
  if (!req.body.description || req.body.description.length > 128) {
    return res.status(400).send({
      message:
        'Please provide a description for the action that is less than 128 characters.',
    });
  } else if (!req.body.notes) {
    return res.status(400).send({
      message: 'Please provide notes for the action',
    });
  } else if (!req.body.project_id) {
    return res.status(400).send({
      message: 'Please provide project Id for the action',
    });
  }
  next();
};

// ROUTES
router.get('/', (req, res) => {
  actionDb
    .get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(() => {
      res
        .status(500)
        .send({ error: 'The actions information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  actionDb
    .get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(() => {
      res
        .status(500)
        .send({ error: 'The action information could not be retrieved.' });
    });
});

router.post('/', checkReqs, (req, res) => {
  const { notes, description, project_id } = req.body;
  const newAction = { notes, description, project_id };
  actionDb
    .insert(newAction)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(() => {
      res
        .status(500)
        .send({ error: 'The action information could not be saved.' });
    });
});

router.put('/:id', checkReqs, (req, res) => {
  const { id } = req.params;
  const { notes, description, project_id } = req.body;
  const newAction = { notes, description, project_id };
  actionDb
    .update(id, newAction)
    .then((action) => {
      if (!action) {
        console.log(action);
        return res.status(404).send({
          message: 'The action with the specified ID does not exist.',
        });
      }
      res.status(200).json(action);
    })
    .catch(() => {
      res.status(500).send({
        error: 'The action information could not be modified.',
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  actionDb
    .remove(id)
    .then((remove) => {
      if (!remove) {
        return res.status(404).send({
          message: 'The action with the specified ID does not exist.',
        });
      }
      res.status(200).send({ message: `action with ID ${id} was removed.` });
    })
    .catch(() => {
      res.status(500).json({
        error: 'The user could not be removed.',
      });
    });
});

module.exports = router;
