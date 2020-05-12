import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"

class Song extends Component {
  state = {}
  constructor(props) {
    super(props)
    console.log("props are ", this.props)
  }
  render() {
    return (
      <Row>
        <Col>
          <h1>{this.props.songInfo.name}</h1>
        </Col>
        <Col></Col>
      </Row>
    )
  }
}

export default Song
