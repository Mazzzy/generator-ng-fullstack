'use strict';

const optionsParser = require('../utils/options_parser');
const {AngularFactory} = require('./angular');
const {FeatureMissingError} = require('../utils/errors');

exports.ViewSubGenerator = class ViewSubGenerator {
  constructor(generator) {
    this.wrapper = generator;
    this.wrapper.client = this.wrapper.config.get('client');
  }

  initializing() {
    this.wrapper.argument('name', {
      required: true,
      type: String,
      desc: 'view'
    });
  }

  writing() {
    let feature = optionsParser.getFeature(this.wrapper.options);

    if (!feature.length) {
      throw new FeatureMissingError();
    }

    AngularFactory.build(this.wrapper.client, this.wrapper).copyTemplate();
  }
};
