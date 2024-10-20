import './index.css'
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

const GamingVideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value

      const {gamingVideoItem} = props
      const {id, thumbnailUrl, title, viewCount} = gamingVideoItem

      const lightThemeGamingItem = () => (
        <Link to={`/videos/${id}`} className="links">
          <li className="gaming-list-item">
            <div className="gaming-item">
              <img
                src={thumbnailUrl}
                alt="thumbnail"
                className="gaming-video-thumbnail"
              />
              <p className="light-theme-title-para">{title}</p>
              <p className="light-theme-title-para2">
                {viewCount} Watching Worldwide
              </p>
            </div>
          </li>
        </Link>
      )

      const darkThemeGamingItem = () => (
        <Link to={`/videos/${id}`} className="links">
          <li className="gaming-list-item">
            <div className="gaming-item">
              <img
                src={thumbnailUrl}
                alt="thumbnail"
                className="gaming-video-thumbnail"
              />
              <p className="dark-theme-title-para">{title}</p>
              <p className="dark-theme-title-para2">
                {viewCount} Watching Worldwide
              </p>
            </div>
          </li>
        </Link>
      )

      const renderGamingItem = () => {
        if (darkTheme) {
          return darkThemeGamingItem()
        }
        return lightThemeGamingItem()
      }

      return renderGamingItem()
    }}
  </ThemeContext.Consumer>
)

export default GamingVideoItem
