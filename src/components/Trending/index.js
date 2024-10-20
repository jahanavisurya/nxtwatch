import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import {Component} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import TrendingVideoItem from '../TrendingVideoItem'
import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {trendingVideosList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
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

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
        trendingVideosList: videosData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  lightThemeHeading = () => (
    <div className="light-theme-trending-heading-container">
      <div className="light-theme-trending-icon-container">
        <FaFire className="trending-icon" />
      </div>
      <h1 className="light-theme-trending-heading">Trending</h1>
    </div>
  )

  darkThemeHeading = () => (
    <div className="dark-theme-trending-heading-container">
      <div className="dark-theme-trending-icon-container">
        <FaFire className="trending-icon" />
      </div>
      <h1 className="dark-theme-trending-heading">Trending</h1>
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
        data-testid="loader"
        className="loader-container dark-theme-trending-container"
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
      <button className="confirm-button" onClick={this.getTrendingVideos}>
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
      <button className="confirm-button" onClick={this.getTrendingVideos}>
        Retry
      </button>
    </div>
  )

  lightThemeSuccessView = () => {
    const {trendingVideosList} = this.state
    return (
      <div>
        {this.lightThemeHeading()}
        <div className="light-theme-trending-container">
          <ul className="trending-videos-list">
            {trendingVideosList.map(item => (
              <TrendingVideoItem trendingVideoItem={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  darkThemeSuccessView = () => {
    const {trendingVideosList} = this.state
    return (
      <div>
        {this.darkThemeHeading()}
        <div className="dark-theme-trending-container">
          <ul className="gaming-videos-list">
            {trendingVideosList.map(item => (
              <TrendingVideoItem trendingVideoItem={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  lightThemeTrendingContainer = () => {
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

  darkThemeTrendingContainer = () => {
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

          const renderTrendingContainer = () => {
            if (darkTheme) {
              return this.darkThemeTrendingContainer()
            }
            return this.lightThemeTrendingContainer()
          }

          return (
            <>
              <Header />
              <div className="container">
                <Sidebar />
                {renderTrendingContainer()}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending