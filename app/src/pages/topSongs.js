import React, { Component } from "react"
import { Tabs, Tab } from "react-bootstrap"
import Song from "../components/song"

class TopSongs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topSongsLastMonthReady: false,
      topSongsLastSixMonthsReady: false,
      topSongsAllTimeReady: false,
      topSongsAllTime: [],
      topSongsLastSixMonths: [],
      topSongsLastMonth: [],
    }
    console.log(this.state)
  }

  getSpotifyData() {
    var scope = this
    this.props.spotifyApi
      .getMyTopTracks({ time_range: "long_term" })
      .then(value =>
        Promise.resolve(value).then(data =>
          scope.setState({
            topSongsAllTime: data.body.items,
          })
        )
      )
      .then(scope.setState({ topSongsAllTimeReady: true }))

    this.props.spotifyApi
      .getMyTopTracks({ time_range: "medium_term" })
      .then(value => Promise.resolve(value))
      .then(data => {
        scope.setState({
          topSongsLastSixMonths: data.body.items,
        })
      })
      .then(scope.setState({ topSongsLastSixMonthsReady: true }))
    this.props.spotifyApi
      .getMyTopTracks({ time_range: "short_term" })
      .then(value => Promise.resolve(value))
      .then(data => scope.setState({ topSongsLastMonth: data.body.items }))
      .then(scope.setState({ topSongsLastMonthReady: true }))
  }
  componentDidMount() {
    this.getSpotifyData()
  }
  render() {
    return (
      <div>
        <h1>My top songs:</h1>
        <Tabs>
          <Tab eventKey="lastMonth" title="Last Month">
            {this.state.topSongsLastMonthReady &&
              this.state.topSongsLastMonth.map(song => (
                <Song songInfo={song} />
              ))}
          </Tab>
          <Tab eventKey="lastSixMonths" title="Last Six Months">
            {this.state.topSongsLastSixMonthsReady &&
              this.state.topSongsLastSixMonths.map(song => (
                <Song songInfo={song} />
              ))}
          </Tab>
          <Tab eventKey="allTime" title="All Time">
            {this.state.topSongsAllTimeReady &&
              this.state.topSongsAllTime.map(song => <Song songInfo={song} />)}
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default TopSongs
