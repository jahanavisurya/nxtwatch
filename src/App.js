import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import ThemeContext from './context/ThemeContext'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

class App extends Component {
  state = {darkTheme: false, savedVideosList: []}

  changeTheme = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  addToSavedVideos = obj => {
    this.setState(prevState => ({
      savedVideosList: [obj, ...prevState.savedVideosList],
    }))
  }

  render() {
    const {darkTheme, savedVideosList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          darkTheme,
          changeTheme: this.changeTheme,
          savedVideosList,
          addToSavedVideos: this.addToSavedVideos,
        }}
      >
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/trending' component={Trending} />
          <ProtectedRoute exact path='/gaming' component={Gaming} />
          <ProtectedRoute
            exact
            path='/videos/:id'
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path='/savedvideos' component={SavedVideos} />
          <Route exact path='/not-found' component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
