import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoLogoGameControllerB} from 'react-icons/io'
import {Component} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingVideoItem from '../GamingVideoItem'
import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {gamingVideosList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getCamelCase = obj => ({
    id: obj.id,
    thumbnailUrl: obj.thumbnail_url,
    title: obj.title,
    viewCount: obj.view_count,
  })

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const responseData = await response.json()
      const videosData = responseData.videos.map(item =>
        this.getCamelCase(item),
      )

      this.setState({
        gamingVideosList: videosData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  lightThemeHeading = () => (
    <div className="light-theme-trending-heading-container">
      <div className="light-theme-trending-icon-container">
        <IoLogoGameControllerB className="trending-icon" />
      </div>
      <h1 className="light-theme-trending-heading">Gaming</h1>
    </div>
  )

  darkThemeHeading = () => (
    <div className="dark-theme-trending-heading-container">
      <div className="dark-theme-trending-icon-container">
        <IoLogoGameControllerB className="trending-icon" />
      </div>
      <h1 className="dark-theme-trending-heading">Gaming</h1>
    </div>
  )

  lightThemeLoadingView = () => (
    <div>
      {this.lightThemeHeading()}
      <div
        className="loader-container light-theme-trending-container"
        data-testid="loader"
      >
        <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
      </div>
    </div>
  )

  darkThemeLoadingView = () => (
    <div>
      {this.darkThemeHeading()}
      <div
        className="loader-container dark-theme-trending-container"
        data-testid="loader"
      >
        <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
      </div>
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
      <button className="confirm-button" onClick={this.getGamingVideos}>
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
      <button className="confirm-button" onClick={this.getGamingVideos}>
        Retry
      </button>
    </div>
  )

  lightThemeSuccessView = () => {
    const {gamingVideosList} = this.state
    return (
      <div>
        {this.lightThemeHeading()}
        <div className="light-theme-trending-container">
          <ul className="gaming-videos-list">
            {gamingVideosList.map(item => (
              <GamingVideoItem gamingVideoItem={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  darkThemeSuccessView = () => {
    const {gamingVideosList} = this.state
    return (
      <div>
        {this.darkThemeHeading()}
        <div className="dark-theme-trending-container">
          <ul className="gaming-videos-list">
            {gamingVideosList.map(item => (
              <GamingVideoItem gamingVideoItem={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLightThemeGamingContainer = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.lightThemeLoadingView()
      case apiStatusConstants.success:
        return this.lightThemeSuccessView()
      case apiStatusConstants.failure:
        return this.lightThemeFailureView()
      default:
        return null
    }
  }

  renderDarkThemeGamingContainer = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.darkThemeLoadingView()
      case apiStatusConstants.success:
        return this.darkThemeSuccessView()
      case apiStatusConstants.failure:
        return this.darkThemeFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value

          const renderGamingContainer = () => {
            if (darkTheme) {
              return this.renderDarkThemeGamingContainer()
            }
            return this.renderLightThemeGamingContainer()
          }

          return (
            <>
              <Header />
              <div className="container">
                <Sidebar />
                {renderGamingContainer()}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
