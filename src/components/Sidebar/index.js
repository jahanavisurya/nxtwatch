import './index.css'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {IoLogoGameControllerB} from 'react-icons/io'
import {HiOutlineSaveAs} from 'react-icons/hi'
import {Component} from 'react'
import ThemeContext from '../../context/ThemeContext'

class Sidebar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value

          const renderLightThemeSidebar = (
            <div className="light-theme-sidebar-container">
              <ul>
                <Link to="/" className="links">
                  <li className="sidebar-link">
                    <AiFillHome className="light-theme-sidebar-icon" />
                    <p className="light-theme-side-bar-para">Home</p>
                  </li>
                </Link>
                <Link to="/trending" className="links">
                  <li className="sidebar-link">
                    <FaFire className="light-theme-sidebar-icon" />
                    <p className="light-theme-side-bar-para">Trending</p>
                  </li>
                </Link>
                <Link to="/gaming" className="links">
                  <li className="sidebar-link">
                    <IoLogoGameControllerB className="light-theme-sidebar-icon" />
                    <p className="light-theme-side-bar-para">Gaming</p>
                  </li>
                </Link>
                <Link to="/savedvideos" className="links">
                  <li className="sidebar-link">
                    <HiOutlineSaveAs className="light-theme-sidebar-icon" />
                    <p className="light-theme-side-bar-para">Saved Videos</p>
                  </li>
                </Link>
              </ul>
              <div>
                <p className="contact-us-para">CONTACT US</p>
                <div className="social-images-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="social-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="social-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="social-icon"
                  />
                </div>
                <p className="social-para">
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )

          const renderDarkThemeSidebar = (
            <div className="dark-theme-sidebar-container">
              <ul>
                <Link to="/" className="links">
                  <li className="sidebar-link">
                    <AiFillHome className="dark-theme-sidebar-icon" />
                    <p className="dark-theme-side-bar-para">Home</p>
                  </li>
                </Link>
                <Link to="/trending" className="links">
                  <li className="sidebar-link">
                    <FaFire className="dark-theme-sidebar-icon" />
                    <p className="dark-theme-side-bar-para">Trending</p>
                  </li>
                </Link>
                <Link to="/gaming" className="links">
                  <li className="sidebar-link">
                    <IoLogoGameControllerB className="dark-theme-sidebar-icon" />
                    <p className="dark-theme-side-bar-para">Gaming</p>
                  </li>
                </Link>
                <Link to="/savedvideos" className="links">
                  <li className="sidebar-link">
                    <HiOutlineSaveAs className="dark-theme-sidebar-icon" />
                    <p className="dark-theme-side-bar-para">Saved Videos</p>
                  </li>
                </Link>
              </ul>
              <div>
                <p className="dark-theme-contact-us-para">CONTACT US</p>
                <div className="social-images-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook"
                    className="social-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="facebook"
                    className="social-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="facebook"
                    className="social-icon"
                  />
                </div>
                <p className="dark-theme-social-para">
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )

          const renderSidebar = () => {
            if (darkTheme) {
              return renderDarkThemeSidebar
            }
            return renderLightThemeSidebar
          }

          return renderSidebar()
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Sidebar
