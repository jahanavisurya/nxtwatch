import './index.css'
import {IoClose, IoSearch} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import HomeVideoItem from '../HomeVideoItem'
import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    showBanner: true,
    searchInput: '',
    titleSearch: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getCamelCase = obj => ({
    channel: {
      name: obj.channel.name,
      profileImageUrl: obj.channel.profile_image_url,
    },
    id: obj.id,
    publishedAt: obj.published_at,
    thumbnailUrl: obj.thumbnail_url,
    title: obj.title,
    viewCount: obj.view_count,
  })

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {titleSearch} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${titleSearch}`

    const jwt = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const responseData = await response.json()
      const videosData = responseData.videos.map(item =>
        this.getCamelCase(item),
      )

      this.setState({
        videosList: videosData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  renderNxtWatchBanner = (
    <div className="banner-container" data-testid="banner">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="light-theme-website-logo"
        />
        <p className="banner-para">Buy Nxt Watch Premium</p>
        <button className="get-it-now-button">GET IT NOW</button>
      </div>
      <button
        className="close-icon-button"
        onClick={this.closeBanner}
        data-testid="close"
      >
        <IoClose className="close-icon" />
      </button>
    </div>
  )

  renderBanner = () => {
    const {showBanner} = this.state
    if (showBanner) {
      return this.renderNxtWatchBanner
    }
    return null
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeTitleSearch = () => {
    const {searchInput} = this.state
    this.setState(
      {titleSearch: searchInput, isLoading: true},
      this.getHomeVideos,
    )
  }

  renderLightThemeSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="light-theme-search-input-container">
        <input
          type="search"
          className="light-theme-search-input"
          placeholder="Search"
          value={searchInput}
          onChange={this.changeSearchInput}
        />
        <button
          className="light-theme-search-icon-button"
          onClick={this.changeTitleSearch}
          data-testid="searchButton"
        >
          <IoSearch className="light-theme-search-icon" />
        </button>
      </div>
    )
  }

  renderDarkThemeSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="dark-theme-search-input-container">
        <input
          type="search"
          className="dark-theme-search-input"
          placeholder="Search"
          value={searchInput}
          onChange={this.changeSearchInput}
        />
        <button
          className="dark-theme-search-icon-button"
          onClick={this.changeTitleSearch}
          data-testid="searchButton"
        >
          <IoSearch className="dark-theme-search-icon" />
        </button>
      </div>
    )
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  lightThemeFailureView = () => (
    <div className="light-theme-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button className="confirm-button" onClick={this.getHomeVideos}>
        Retry
      </button>
    </div>
  )

  darkThemeFailureView = () => (
    <div className="dark-theme-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button className="confirm-button" onClick={this.getHomeVideos}>
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {videosList} = this.state

    return (
      <ul className="videos-list-container">
        {videosList.map(item => (
          <HomeVideoItem videoItem={item} key={item.id} />
        ))}
      </ul>
    )
  }

  renderLightThemeHomeVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.lightThemeFailureView()
      default:
        return null
    }
  }

  renderDarkThemeHomeVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.darkThemeFailureView()
      default:
        return null
    }
  }

  renderLightThemeHomeContainer = () => (
    <div className="light-theme-home-container">
      {this.renderBanner()}
      <div className="home-bottom-container">
        {this.renderLightThemeSearchInput()}
        {this.renderLightThemeHomeVideos()}
      </div>
    </div>
  )

  renderDarkThemeHomeContainer = () => (
    <div className="dark-theme-home-container">
      {this.renderBanner()}
      <div className="home-bottom-container">
        {this.renderDarkThemeSearchInput()}
        {this.renderDarkThemeHomeVideos()}
      </div>
    </div>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value

          const renderHomeContainer = () => {
            if (darkTheme) {
              return this.renderDarkThemeHomeContainer()
            }
            return this.renderLightThemeHomeContainer()
          }

          return (
            <>
              <Header />
              <div className="container">
                <Sidebar />
                {renderHomeContainer()}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
