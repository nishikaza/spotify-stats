import React, { Component } from "react"
import { Tabs, Tab, Container, Row } from "react-bootstrap"
import Artist from "../components/artist"
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
      .getMyTopArtists({ time_range: "long_term", limit: 50 })
      .then(value =>
        Promise.resolve(value).then(data =>
          scope.setState({
            topArtistsAllTime: data.body.items,
          })
        )
      )
      .then(scope.setState({ topArtistsAllTimeReady: true }))

    this.props.spotifyApi
      .getMyTopArtists({ time_range: "medium_term", limit: 50 })
      .then(value => Promise.resolve(value))
      .then(data => {
        scope.setState({
          topArtistsLastSixMonths: data.body.items,
        })
      })
      .then(scope.setState({ topArtistsLastSixMonthsReady: true }))
    this.props.spotifyApi
      .getMyTopArtists({ time_range: "short_term", limit: 50 })
      .then(value => Promise.resolve(value))
      .then(data => scope.setState({ topArtistsLastMonth: data.body.items }))
      .then(scope.setState({ topArtistsLastMonthReady: true }))
  }
  componentDidMount() {
    this.getSpotifyData()
    console.log(this.state)
  }
  render() {
    var lastMonthCount = 0
    var lastSixMonthsCount = 0
    var allTimeCount = 0
    return (
      <div>
        <h1>My top artists:</h1>
        <Tabs>
          <Tab eventKey="lastMonth" title="Last Month">
            <Container>
              <Row>
                {this.state.topArtistsLastMonthReady &&
                  this.state.topArtistsLastMonth.map(artist => (
                    <Artist
                      id={++lastMonthCount}
                      key={lastMonthCount}
                      artistInfo={artist}
                    />
                  ))}
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="lastSixMonths" title="Last Six Months">
            <Container>
              <Row>
                {this.state.topArtistsLastSixMonthsReady &&
                  this.state.topArtistsLastSixMonths.map(artist => (
                    <Artist
                      id={++lastSixMonthsCount}
                      key={lastSixMonthsCount}
                      artistInfo={artist}
                    />
                  ))}
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="allTime" title="All Time">
            <Container>
              <Row>
                {this.state.topArtistsAllTimeReady &&
                  this.state.topArtistsAllTime.map(artist => (
                    <Artist
                      id={++allTimeCount}
                      key={allTimeCount}
                      artistInfo={artist}
                    />
                  ))}
              </Row>
            </Container>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default TopArtists
