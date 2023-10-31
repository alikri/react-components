import { Component } from 'react';

interface ErrorButtonProps {
  triggerError: () => void;
}

export class ErrorButton extends Component<ErrorButtonProps> {
  render() {
    return (
      <div className="error-button-wrapper">
        <button className="error-button" onClick={this.props.triggerError}>
          Throw Error
        </button>
      </div>
    );
  }
}
