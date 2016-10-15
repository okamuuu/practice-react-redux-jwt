import React, { Component, PropTypes } from 'react'

export default class Hello extends Component {

  render() {
    const { onHelloClick, onPrivateHelloClick, isAuthenticated, hello, privateHello } = this.props

    return (
      <div>
        <div className="col-sm-3">
          <button onClick={onHelloClick} className="btn btn-primary">
            Get Hello
          </button>
          { hello &&
            <p>{hello}</p>
          }
        </div>

        { isAuthenticated &&
          <div className="col-sm-3">
            <button onClick={onPrivateHelloClick} className="btn btn-warning">
              Get Private Hello
            </button>
            { privateHello &&
              <p>{privateHello}</p>
            }
          </div>
        }
      </div>
    )
  }
}

// Hello.propTypes = {
//   // onQuoteClick: PropTypes.func.isRequired,
//   // onSecretQuoteClick: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool.isRequired,
//   hello: PropTypes.string,
//   // isSecretQuote: PropTypes.bool.isRequired
// }
