import React, { Component } from "react"
import { Button } from "react-bootstrap"

class LandingPage extends Component {
  render() {
    return (
      <div>
        {!this.props.loggedIn && (
          <Button variant="success" onClick={this.props.onClick}>
            Log in to Spotify
          </Button>
        )}
      </div>
    )
  }
}

export default LandingPage
