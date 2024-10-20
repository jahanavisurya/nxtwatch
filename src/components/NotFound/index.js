import './index.css'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value

      const lightThemeNotFoundContainer = () => (
        <div className="light-theme-failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            className="failure-image"
            alt="not found"
          />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found.</p>
        </div>
      )

      const darkThemeNotFoundContainer = () => (
        <div className="dark-theme-failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
            className="failure-image"
            alt="not found"
          />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found.</p>
        </div>
      )

      const renderNotFoundContainer = () => {
        if (darkTheme) {
          return darkThemeNotFoundContainer()
        }
        return lightThemeNotFoundContainer()
      }

      return (
        <>
          <Header />
          <div className="container">
            <Sidebar />
            {renderNotFoundContainer()}
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound