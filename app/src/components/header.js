import React, { Component } from "react"
import { Navbar, Nav } from "react-bootstrap"

class Header extends Component {
  state = {}
  render() {
    return (
      <Navbar variant="dark" style={{ backgroundColor: "#1DB954" }}>
        <Navbar.Brand href="#home">Spotify Listening Statistics</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => this.props.linkOnClick("recent")}>
            Recently Played
          </Nav.Link>
          <Nav.Link onClick={() => this.props.linkOnClick("topsongs")}>
            Top Songs
          </Nav.Link>
          <Nav.Link onClick={() => this.props.linkOnClick("topartists")}>
            Top Artists
          </Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}

export default Header
