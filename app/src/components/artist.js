import React, { Component } from "react"
import { Card } from "react-bootstrap"

class Artist extends Component {
  constructor(props) {
    super(props)
    this.artistOnClick = this.artistOnClick.bind(this)
    const metadata = this.props.artistInfo
    this.state = {
      picture: metadata.images[1].url,
      name: metadata.name,
      link: metadata.external_urls.spotify,
    }
  }

  artistOnClick() {
    window.open(this.state.link, "_blank")
  }

  render() {
    return (
      <Card style={{ cursor: "pointer" }} onClick={this.artistOnClick}>
        <Card.Img variant="top" src={this.state.picture} />
        <Card.Header>{this.props.id + ". " + this.state.name}</Card.Header>
      </Card>
    )
  }
}

export default Artist
