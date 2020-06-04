import React, { Component } from "react"
import { Media } from "react-bootstrap"

class Song extends Component {
  constructor(props) {
    super(props)
    this.songOnClick = this.songOnClick.bind(this)
    const metadata = this.props.songInfo
    this.state = {
      albumArt: metadata.album.images[1].url,
      title: metadata.name,
      artist: metadata.album.artists[0].name,
      link: metadata.external_urls.spotify,
    }
  }

  songOnClick() {
    window.open(this.state.link, "_blank")
  }

  render() {
    return (
      <Media style={{ cursor: "pointer" }} onClick={this.songOnClick}>
        <img
          width={64}
          height={64}
          className="mr-3"
          src={this.state.albumArt}
          alt="Album art"
        />
        <Media.Body>
          <h5>{this.props.id + ". " + this.state.title}</h5>
          <p>{this.state.artist}</p>
        </Media.Body>
      </Media>
    )
  }
}

export default Song
