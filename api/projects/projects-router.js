// Write your "projects" router here!
const Projects = require('./projects-model');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: 'The projects information could not be retrieved' });
    });
});

router.get('/:id', (req, res) => {
  const targetId = req.params.id;
  Projects.get(targetId)
    .then((project) => {
      project
        ? res.status(200).json(project)
        : res.status(404).json({
            message: 'The project with the specified ID does not exist',
          });
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: 'The project information could not be retrieved' }),
    );
});

router.post('/', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({
      message: 'Name and Description are required',
    });
  } else {
    Projects.insert(req.body)
      .then(({ id }) => {
        Projects.get(id).then((project) => res.status(201).json(project));
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: 'The project information could not be retrieved' });
      });
  }
});

router.put('/:id', (req, res) => {
  const targetId = req.params.id;

  try {
    Projects.update(targetId, req.body).then((numOfUpdatedTables) => {
      numOfUpdatedTables
        ? Projects.get(targetId).then((project) =>
            res.status(200).json(project),
          )
        : res.status(404).json({
            message: 'The action with the specified ID does not exist',
          });
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: 'The action information could not be modified' });
  }
});

router.delete('/:id', (req, res) => {
  const targetId = req.params.id;

  try {
    Projects.remove(targetId).then((numOfUpdatedTables) => {
      numOfUpdatedTables
        ? res.status(200).json()
        : res.status(404).json({
            message: 'The action with the specified ID does not exist',
          });
    });
  } catch (e) {
    res.status(500).json({ message: 'The project could not be removed' });
  }
});

// GET PROJECT ACTIONS
router.get('/:id/actions', (req, res) => {
  const targetId = req.params.id;
  Projects.getProjectActions(targetId)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
});

module.exports = router;
