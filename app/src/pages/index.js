import React, { Component } from "react"
import * as spotifyWebAPI from "spotify-web-api-node"
import "bootstrap/dist/css/bootstrap.min.css"
import LandingPage from "./landingPage"
import ViewPane from "./viewPane"
import Header from "../components/header"

class Index extends Component {
  constructor() {
    super()
    this.landingPageOnClick = this.landingPageOnClick.bind(this)
    this.navLinkOnClick = this.navLinkOnClick.bind(this)
    this.state = { loggedIn: false, activePage: "home" }
    const spotifyApi = new spotifyWebAPI()
    const parameters = this.getHashParams()
    const access_token = parameters.access_token
    if (access_token) {
      this.state = { loggedIn: true, access_token, spotifyApi }
      spotifyApi.setAccessToken(access_token)
      console.log(spotifyApi.getMyTopTracks({ time_range: "long_term" }))
    }
  }

  getHashParams() {
    var hashParams = {}
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    return hashParams
  }

  navLinkOnClick(id) {
    console.log(id)
    this.setState({ activePage: id })
  }

  landingPageOnClick() {
    // Get the hash of the url
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=")
          initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial
      }, {})
    window.location.hash = ""

    let access_token = hash.access_token
    const authEndpoint = "https://accounts.spotify.com/authorize"

    const clientId = "a4251ec3a1024ca3b68f59efdc66b362"
    const redirectUri = "http://localhost:8000/"
    const scopes = ["user-top-read", "user-read-recently-played"]

    // If there is no token, redirect to Spotify authorization
    if (!access_token) {
      window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=token`
    }
    this.setState({ loggedIn: true })
  }

  render() {
    return (
      <div>
        {!this.state.loggedIn && (
          <LandingPage
            onClick={this.landingPageOnClick}
            loggedIn={this.state.loggedIn}
          />
        )}
        {this.state.loggedIn && (
          <div>
            <Header linkOnClick={this.navLinkOnClick} />
            <ViewPane
              activePage={this.state.activePage}
              spotifyApi={this.state.spotifyApi}
              access_token={this.state.access_token}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Index
