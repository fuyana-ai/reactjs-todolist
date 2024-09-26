// import React from 'react';

// const ErrorBoundary = ({ children }) => {
//   return (
//     <div>
//       {children}
//     </div>
//   );
// };

// export default ErrorBoundary;


import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo);
    this.setState({
      hasError: true,
      errorInfo: { error, componentStack: errorInfo.componentStack }
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <p>Something went wrong.</p>
          <pre>{JSON.stringify(this.state.errorInfo, null, 2)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
