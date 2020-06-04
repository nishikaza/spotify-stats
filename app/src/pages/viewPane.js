import React, { Component } from "react"
import TopSongs from "./topSongs"
import Recent from "./recent"
import TopArtists from "./topArtists"

class ViewPane extends Component {
  state = {}
  render() {
    switch (this.props.activePage) {
      case "recent":
        return (
          <Recent
            spotifyApi={this.props.spotifyApi}
            access_token={this.props.access_token}
          />
        )
      case "topsongs":
        return (
          <TopSongs
            spotifyApi={this.props.spotifyApi}
            access_token={this.props.access_token}
          />
        )
      case "topartists":
        return (
          <TopArtists
            spotifyApi={this.props.spotifyApi}
            access_token={this.props.access_token}
          />
        )
    }
    return (
      <TopSongs
        spotifyApi={this.props.spotifyApi}
        access_token={this.props.access_token}
      />
    )
  }
}

export default ViewPane
