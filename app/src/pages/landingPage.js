import React, { Component } from "react"
import { Button } from "react-bootstrap"

const fullPageStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  backgroundImage: `url(
    "https://images.unsplash.com/photo-1559520093-40cf0669314a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80"
  )`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  margin: "0 auto",
}
class LandingPage extends Component {
  render() {
    return (
      <div style={fullPageStyle}>
        {!this.props.loggedIn && (
          <div className="row justify-content-center align-self-center">
            {/* <h1>Log in below to view your spotify listening stats.</h1> */}
            <Button variant="success" onClick={this.props.onClick}>
              Authenticate Spotify
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default LandingPage
