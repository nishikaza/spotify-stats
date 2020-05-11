import React, { Component } from "react"
import * as spotifyWebAPI from "spotify-web-api-node"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "react-bootstrap"
import LandingPage from "./landingPage"

export const authEndpoint = "https://accounts.spotify.com/authorize"
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "a4251ec3a1024ca3b68f59efdc66b362"
const redirectUri = "http://localhost:8000/callback/"
const scopes = ["user-read-currently-playing", "user-read-playback-state"]

class Index extends Component {
  constructor() {
    super()
    this.state = { loggedIn: false }
    if (this.state.loggedIn) {
      const spotifyApi = new spotifyWebAPI()
      const parameters = this.getHashParams()
      if (parameters) {
        spotifyApi.setAccessToken(parameters.access_token)
        console.log(spotifyApi.getMyTopTracks({ time_range: "long_term" }))
      }
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
  landingPageOnClick() {}

  render() {
    return <div>{!this.state.loggedIn && <LandingPage />}</div>
  }
}

export default Index
