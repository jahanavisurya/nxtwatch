import './index.css'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../context/ThemeContext'

const VideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value

      const {videoItem} = props
      const {channel, id, publishedAt} = videoItem
      const {thumbnailUrl, title, viewCount} = videoItem
      const {name, profileImageUrl} = channel

      const parsedDate = new Date(publishedAt)
      const distance = formatDistanceToNow(parsedDate).split(' ')

      const lightThemeVideoItem = () => (
        <Link to={`/videos/${id}`} className="links">
          <li className="video-item">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail-image"
            />
            <div className="video-description-container">
              <img
                src={profileImageUrl}
                alt="channel logo"
                className="profile-image"
              />
              <div>
                <p className="light-theme-title-para">{title}</p>
                <p className="light-theme-title-para">{name}</p>
                <div className="views-date-container">
                  <p className="light-theme-title-para2">{viewCount} views</p>
                  <p className="light-theme-title-para2">
                    {distance[1]} years ago
                  </p>
                </div>
              </div>
            </div>
          </li>
        </Link>
      )

      const darkThemeVideoItem = () => (
        <Link to={`/videos/${id}`} className="links">
          <li className="video-item">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail-image"
            />
            <div className="video-description-container">
              <img
                src={profileImageUrl}
                alt="channel logo"
                className="profile-image"
              />
              <div>
                <p className="dark-theme-title-para">{title}</p>
                <p className="dark-theme-title-para">{name}</p>
                <div className="views-date-container">
                  <p className="dark-theme-title-para2">{viewCount} views</p>
                  <p className="dark-theme-title-para2">
                    {distance[1]} years ago
                  </p>
                </div>
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

export default VideoItem
