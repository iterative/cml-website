const imageSourcePaths = require('./models/image-source-paths')
const github = require('./models/github')
const pruneCache = require('./models/prune-cache')

const models = [imageSourcePaths, github, pruneCache]

module.exports = models
