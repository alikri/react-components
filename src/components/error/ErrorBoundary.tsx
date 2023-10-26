import { ReactNode, Component } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  onResetError?: () => void;
}
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onResetError?.();
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
