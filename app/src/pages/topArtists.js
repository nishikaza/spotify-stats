import React, { Component } from "react"
import { Card } from "react-bootstrap"

class TopArtists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topArtistsLastMonthReady: false,
      topArtistsLastSixMonthsReady: false,
      topArtistsAllTimeReady: false,
      topArtistsAllTime: [],
      topArtistsLastSixMonths: [],
      topArtistsLastMonth: [],
    }
  }

  getSpotifyData() {
    var scope = this
    this.props.spotifyApi
      .getMyTopArtists({ time_range: "long_term" })
      .then(value =>
        Promise.resolve(value).then(data =>
          scope.setState({
            topArtistsAllTime: data.body.items,
          })
        )
      )
      .then(scope.setState({ topArtistsAllTimeReady: true }))

    this.props.spotifyApi
      .getMyTopArtists({ time_range: "medium_term" })
      .then(value => Promise.resolve(value))
      .then(data => {
        scope.setState({
          topArtistsLastSixMonths: data.body.items,
        })
      })
      .then(scope.setState({ topArtistsLastSixMonthsReady: true }))
    this.props.spotifyApi
      .getMyTopArtists({ time_range: "short_term" })
      .then(value => Promise.resolve(value))
      .then(data => scope.setState({ topArtistsLastMonth: data.body.items }))
      .then(scope.setState({ topArtistsLastMonthReady: true }))
  }
  componentDidMount() {
    this.getSpotifyData()
  }
  render() {
    return (
      <div>
        <h1>My top artists:</h1>
        <Card>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default TopArtists
