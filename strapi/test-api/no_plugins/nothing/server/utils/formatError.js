module.exports = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];
