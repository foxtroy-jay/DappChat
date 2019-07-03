import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const translateType = type => {
  switch (true) {
    case /^uint/.test(type):
      return 'number';
    case /^string/.test(type) || /^bytes/.test(type):
      return 'text';
    case /^bool/.test(type):
      return 'checkbox';
    default:
      return 'text';
  }
};

class TweetForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;
    this.utils = context.drizzle.web3.utils;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
        this.inputs = abi[i].inputs;

        for (var j = 0; j < this.inputs.length; j++) {
          initialState[this.inputs[j].name] = '';
        }

        break;
      }
    }

    this.state = initialState;
  }

  findHashTag(str) {
    return str.split(' ').filter(word => {
      return word[0] === '#';
    })[0];
  }

  handleSubmit(event) {
    event.preventDefault();

    const convertedInputs = this.inputs.map(input => {
      if (input.type === 'bytes32') {
        return this.utils.toHex(this.state[input.name]);
      }
      return this.state[input.name];
    });

    if (this.props.sendArgs) {
      return this.contracts[this.props.contract].methods[
        this.props.method
      ].cacheSend(...convertedInputs, this.props.sendArgs);
    }

    return this.contracts[this.props.contract].methods[
      this.props.method
    ].cacheSend(...convertedInputs);
  }

  handleInputChange(event) {
    this.setState({
      tweet: event.target.value,
      hashT: this.findHashTag(event.target.value),
    });
    console.log(this.state);
  }

  render() {
    if (this.props.render) {
      return this.props.render({
        inputs: this.inputs,
        inputTypes: this.inputs.map(input => translateType(input.type)),
        state: this.state,
        handleInputChange: this.handleInputChange,
        handleSubmit: this.handleSubmit,
      });
    }

    return (
      <form
        className="pure-form pure-form-stacked"
        onSubmit={this.handleSubmit}
      >
        {this.inputs.map((input, index) => {
          var inputType = translateType(input.type);
          var inputLabel = this.props.labels
            ? this.props.labels[index]
            : input.name;
          // check if input type is struct and if so loop out struct fields as well
          let hideClass = '';
          if (index === 1) {
            hideClass = 'hide';
          }
          return (
            <input
              className={hideClass}
              key={input.name}
              type={inputType}
              name={input.name}
              value={this.state[input.name]}
              placeholder={inputLabel}
              onChange={this.handleInputChange}
            />
          );
        })}
        <button
          key="submit"
          className="pure-button"
          type="button"
          onClick={this.handleSubmit}
        >
          TWEET
        </button>
      </form>
    );
  }
}

TweetForm.contextTypes = {
  drizzle: PropTypes.object,
};

TweetForm.propTypes = {
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  sendArgs: PropTypes.object,
  labels: PropTypes.arrayOf(PropTypes.string),
  render: PropTypes.func,
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
  };
};

export default drizzleConnect(TweetForm, mapStateToProps);
