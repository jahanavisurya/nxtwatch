import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

const TrendingVideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value

      const {trendingVideoItem} = props
      const {channel, id, publishedAt} = trendingVideoItem
      const {thumbnailUrl, title, viewCount} = trendingVideoItem
      const {name} = channel

      const parsedDate = new Date(publishedAt)
      const distance = formatDistanceToNow(parsedDate).split(' ')

      const lightThemeVideoItem = () => (
        <Link to={`/videos/${id}`} className="links">
          <li className="trending-video-item">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="trending-thumbnail-image"
            />
            <div>
              <p className="light-theme-trending-title-heading">{title}</p>
              <p className="light-theme-title-para">{name}</p>
              <div className="views-date-container">
                <p className="light-theme-title-para2">{viewCount} views</p>
                <p className="light-theme-title-para2">
                  {distance[1]} years ago
                </p>
              </div>
            </div>
          </li>
        </Link>
      )

      const darkThemeVideoItem = () => (
        <Link to={`/videos/${id}`} className="links">
          <li className="trending-video-item">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="trending-thumbnail-image"
            />
            <div>
              <p className="dark-theme-trending-title-heading">{title}</p>
              <p className="dark-theme-title-para">{name}</p>
              <div className="views-date-container">
                <p className="dark-theme-title-para2">{viewCount} views</p>
                <p className="dark-theme-title-para2">
                  {distance[1]} years ago
                </p>
              </div>
            </div>
          </li>
        </Link>
      )

      const renderVideoItem = darkTheme
        ? darkThemeVideoItem()
        : lightThemeVideoItem()

      return renderVideoItem
    }}
  </ThemeContext.Consumer>
)

export default TrendingVideoItem