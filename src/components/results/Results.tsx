import { Component } from 'react';

interface ResultItem {
  name: string;
  description: string;
}

interface ResultsProps {
  results: ResultItem[];
}

export class Results extends Component<ResultsProps> {
  render() {
    return (
      <div>
        {this.props.results.map((result, index) => (
          <div key={index}>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  }
}
