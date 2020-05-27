import React, { Component } from "react"
import { Media, Card } from "react-bootstrap"

class Song extends Component {
  constructor(props) {
    super(props)
    const metadata = this.props.songInfo
    console.log(metadata)
    this.state = {
      albumArt: metadata.album.images[2].url,
      title: metadata.name,
      artist: metadata.album.artists[0].name,
    }
  }
  render() {
    return (
      <Media>
        <img
          width={64}
          height={64}
          className="mr-3"
          src={this.state.albumArt}
        />
        <Media.Body>
          <h5>{this.state.title}</h5>
          <h6>{this.state.artist}</h6>
        </Media.Body>
      </Media>
    )
  }
}

export default Song
