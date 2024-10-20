import './index.css'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import ThemeContext from '../../context/ThemeContext'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme, changeTheme} = value

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const lightThemeLogOutButton = () => {
        return (
          <div className="popup-container">
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button logout-button">
                  Logout
                </button>
              }
            >
              {close => (
                <div className="light-theme-logout-popup-container">
                  <div>
                    <p>Are you sure, you want to logout?</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="trigger-button cancel-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="trigger-button confirm-button"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        )
      }

      const darkThemeLogOutButton = () => {
        return (
          <div className="popup-container">
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button logout-button">
                  Logout
                </button>
              }
            >
              {close => (
                <div className="dark-theme-logout-popup-container">
                  <div>
                    <p>Are you sure, you want to logout?</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="trigger-button cancel-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="trigger-button confirm-button"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        )
      }

      const renderLightThemeNavbar = (
        <nav className="light-theme-header-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="nav-logo"
              alt="website logo"
            />
          </Link>
          <ul className="nav-items-container">
            <li className="nav-link-item">
              <button data-testid="theme">
                <FaMoon className="light-theme-icon" onClick={changeTheme} />
              </button>
            </li>
            <li className="nav-link-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile"
              />
            </li>
            <li className="nav-link-item">{lightThemeLogOutButton()}</li>
          </ul>
        </nav>
      )

      const renderDarkThemeNavbar = (
        <nav className="dark-theme-header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            className="nav-logo"
            alt="website logo"
          />
          <ul className="nav-items-container">
            <li className="nav-link-item">
              <button data-testid="theme">
                <FiSun className="dark-theme-icon" onClick={changeTheme} />
              </button>
            </li>
            <li className="nav-link-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile"
              />
            </li>
            <li className="nav-link-item">{darkThemeLogOutButton()}</li>
          </ul>
        </nav>
      )

      const renderNavbar = () => {
        if (darkTheme) {
          return renderDarkThemeNavbar
        }
        return renderLightThemeNavbar
      }

      return renderNavbar()
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
