const mongoose = require('mongoose');

const emailSequenceSchema = new mongoose.Schema({
  name: String,
  nodes: [{
    type: { type: String, enum: ['send', 'wait', 'decision'] },
    parameters: mongoose.Schema.Types.Mixed,
  }],
});

const EmailSequence = mongoose.model('EmailSequence', emailSequenceSchema);

module.exports = EmailSequence;
