import React from 'react'

const ThemeContext = React.createContext({
  darkTheme: false,
  changeTheme: () => {},
  savedVideosList: [],
  addToSavedVideos: () => {},
})

export default ThemeContext
