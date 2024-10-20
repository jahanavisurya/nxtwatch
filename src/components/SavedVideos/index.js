import './index.css'
import {HiOutlineSaveAs} from 'react-icons/hi'
import {Component} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import TrendingVideoItem from '../TrendingVideoItem'
import ThemeContext from '../../context/ThemeContext'

class SavedVideos extends Component {
  lightThemeHeading = () => (
    <div className="light-theme-trending-heading-container">
      <div className="light-theme-trending-icon-container">
        <HiOutlineSaveAs className="trending-icon" />
      </div>
      <h1 className="light-theme-trending-heading">Saved Videos</h1>
    </div>
  )

  darkThemeHeading = () => (
    <div className="dark-theme-trending-heading-container">
      <div className="dark-theme-trending-icon-container">
        <HiOutlineSaveAs className="trending-icon" />
      </div>
      <h1 className="dark-theme-trending-heading">Saved Videos</h1>
    </div>
  )

  lightThemeSavedVideosContainer = savedVideosList => {
    if (savedVideosList.length === 0) {
      return (
        <div className="light-theme-failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
            className="no-saved-videos-img"
          />
          <h1>No saved videos found</h1>
          <p>Save your videos by clicking a button</p>
        </div>
      )
    }

    return (
      <div className="light-theme-trending-container">
        <ul className="trending-videos-list">
          {savedVideosList.map(item => (
            <TrendingVideoItem key={item.id} trendingVideoItem={item} />
          ))}
        </ul>
      </div>
    )
  }

  darkThemeSavedVideosContainer = savedVideosList => {
    if (savedVideosList.length === 0) {
      return (
        <div className="dark-theme-failure-view-container dark-theme-trending-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
            className="no-saved-videos-img"
          />
          <h1>No saved videos found</h1>
          <p>Save your videos by clicking a button</p>
        </div>
      )
    }

    return (
      <div className="dark-theme-trending-container">
        <ul className="trending-videos-list">
          {savedVideosList.map(item => (
            <TrendingVideoItem key={item.id} trendingVideoItem={item} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme, savedVideosList} = value

          const renderTrendingContainer = () => {
            if (darkTheme) {
              return (
                <div>
                  {this.darkThemeHeading()}
                  {this.darkThemeSavedVideosContainer(savedVideosList)}
                </div>
              )
            }
            return (
              <div>
                {this.lightThemeHeading()}
                {this.lightThemeSavedVideosContainer(savedVideosList)}
              </div>
            )
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

export default SavedVideos
