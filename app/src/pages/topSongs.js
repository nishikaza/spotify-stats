import React, { Component } from "react"
import { Tabs, Tab, Container, Row } from "react-bootstrap"
import Song from "../components/song"

class TopSongs extends Component {
  constructor(props) {
    super(props)
    // this.createPlaylistOnClick = this.createPlaylistOnClick.bind(this)
    this.state = {
      topSongsLastMonthReady: false,
      topSongsLastSixMonthsReady: false,
      topSongsAllTimeReady: false,
      userId: "",
      topSongsAllTime: [],
      topSongsLastSixMonths: [],
      topSongsLastMonth: [],
    }
  }

  // createPlaylistOnClick(playlistName) {
  //   this.props.spotifyApi.createPlaylist({
  //     userId: this.state.userId,
  //     playlistName,
  //     options: { public: false },
  //   })
  // }

  getSpotifyData() {
    var scope = this
    // this.props.spotifyApi
    //   .getMe()
    //   .then(data =>
    //     Promise.resolve(data).then(data =>
    //       scope.setState({ userId: data.body.id })
    //     )
    //   )
    this.props.spotifyApi
      .getMyTopTracks({ time_range: "long_term", limit: 50 })
      .then(value =>
        Promise.resolve(value).then(data =>
          scope.setState({
            topSongsAllTime: data.body.items,
          })
        )
      )
      .then(scope.setState({ topSongsAllTimeReady: true }))

    this.props.spotifyApi
      .getMyTopTracks({ time_range: "medium_term", limit: 50 })
      .then(value => Promise.resolve(value))
      .then(data => {
        scope.setState({
          topSongsLastSixMonths: data.body.items,
        })
      })
      .then(scope.setState({ topSongsLastSixMonthsReady: true }))
    this.props.spotifyApi
      .getMyTopTracks({ time_range: "short_term", limit: 50 })
      .then(value => Promise.resolve(value))
      .then(data => scope.setState({ topSongsLastMonth: data.body.items }))
      .then(scope.setState({ topSongsLastMonthReady: true }))
  }
  componentDidMount() {
    this.getSpotifyData()
  }
  render() {
    var lastMonthCount = 0
    var lastSixMonthsCount = 0
    var allTimeCount = 0
    return (
      <div>
        <h1>My top songs:</h1>
        <Tabs>
          <Tab eventKey="lastMonth" title="Last Month">
            <ul className="list-unstyled">
              {this.state.topSongsLastMonthReady &&
                this.state.topSongsLastMonth.map(song => (
                  <Song
                    id={++lastMonthCount}
                    key={lastMonthCount}
                    songInfo={song}
                  />
                ))}
            </ul>
            <Container>
              <Row className="justify-content-md-center">
                {/* <Button
                  onClick={this.createPlaylistOnClick(
                    "Most Played Songs Last 30 Days"
                  )}
                  variant="success"
                >
                  Create playlist
                </Button> */}
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="lastSixMonths" title="Last Six Months">
            <ul className="list-unstyled">
              {this.state.topSongsLastSixMonthsReady &&
                this.state.topSongsLastSixMonths.map(song => (
                  <Song
                    id={++lastSixMonthsCount}
                    key={lastSixMonthsCount}
                    songInfo={song}
                  />
                ))}
            </ul>
            <Container>
              <Row className="justify-content-md-center">
                {/* <Button
                  onClick={this.createPlaylistOnClick(
                    "Most Played Songs Last 6 Months"
                  )}
                  variant="success"
                >
                  Create playlist
                </Button> */}
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="allTime" title="All Time">
            <ul className="list-unstyled">
              {this.state.topSongsAllTimeReady &&
                this.state.topSongsAllTime.map(song => (
                  <Song
                    id={++allTimeCount}
                    key={allTimeCount}
                    songInfo={song}
                  />
                ))}
            </ul>
            <Container>
              <Row className="justify-content-md-center">
                {/* <Button
                  onClick={this.createPlaylistOnClick(
                    "Most Played Songs All Time"
                  )}
                  variant="success"
                >
                  Create playlist
                </Button> */}
              </Row>
            </Container>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default TopSongs
