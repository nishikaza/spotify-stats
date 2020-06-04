import React, { Component } from "react"
import { Container, Row, Col } from "react-bootstrap"

class StatsPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      followers: 0,
      profilePictureURL: "",
    }
  }

  componentDidMount() {
    this.getUserData()
  }

  getUserData() {
    var scope = this
    this.props.spotifyApi.getMe().then(value =>
      Promise.resolve(value).then(data =>
        scope.setState({
          name: data.body.display_name,
          followers: data.body.followers.total,
          profilePictureURL: data.body.images[0].url,
        })
      )
    )
  }

  state = {}
  render() {
    return (
      <div
        style={{
          backgroundColor: "#1DB954",
          color: "#FFFFFF",
          height: "100vh",
        }}
      >
        <Container>
          <Row>
            {/* <Col>
              <img
                src={this.state.profilePictureURL}
                width="100"
                height="100"
              />
            </Col> */}
            <Col>
              <h2>{"Hello, " + this.state.name}</h2>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default StatsPane
