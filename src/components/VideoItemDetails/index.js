import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player/youtube'
import {BiLike, BiDislike} from 'react-icons/bi'
import {HiOutlineSaveAs} from 'react-icons/hi'
import {Component, useContext} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'

class VideoItemDetails extends Component {
  state = {
    isLoading: true,
    videoDetails: {},
    liked: false,
    disliked: false,
    saved: false,
  }

  loader = (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getCamelCase = obj => ({
    channel: {
      name: obj.channel.name,
      profileImageUrl: obj.channel.profile_image_url,
      subscriberCount: obj.channel.subscriber_count,
    },
    description: obj.description,
    videoUrl: obj.video_url,
    id: obj.id,
    publishedAt: obj.published_at,
    thumbnailUrl: obj.thumbnail_url,
    title: obj.title,
    viewCount: obj.view_count,
  })

  getVideoItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`

    const jwt = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    const videoDetails = this.getCamelCase(responseData.video_details)
    this.setState({videoDetails, isLoading: false})
  }

  changeLikeStatus = () => {
    this.setState(prevState => ({
      liked: !prevState.liked,
      disliked: false,
    }))
  }

  changeDislikeStatus = () => {
    this.setState(prevState => ({
      disliked: !prevState.disliked,
      liked: false,
    }))
  }

  changeSavedStatus = () => {
    this.setState({saved: true})
  }

  lightThemeVideoItemTopSection = addToSavedVideos => {
    const {videoDetails, liked, disliked, saved} = this.state
    const {videoUrl, title, viewCount, publishedAt} = videoDetails
    const parsedDate = new Date(publishedAt)
    const distance = formatDistanceToNow(parsedDate).split(' ')
    const likedClassName = liked ? 'liked' : 'light-theme-like-buttons'
    const disLikedClassName = disliked ? 'disliked' : 'light-theme-like-buttons'
    const savedClassname = saved ? 'liked' : 'light-theme-like-buttons'
    const savedButtonText = saved ? 'Saved' : 'Save'

    const onClickSaved = () => {
      addToSavedVideos(videoDetails)
      this.changeSavedStatus()
    }

    return (
      <div>
        <ReactPlayer url={videoUrl} className="react-player-video" />
        <h1 className="light-theme-trending-title-heading">{title}</h1>
        <div className="views-likes-container">
          <div className="views-date-container">
            <p className="light-theme-video-para">{viewCount} views</p>
            <p className="light-theme-video-para">{distance[1]} years ago</p>
          </div>
          <div className="views-date-container">
            <button className={likedClassName} onClick={this.changeLikeStatus}>
              <BiLike className="light-theme-video-icon" />
              Like
            </button>
            <button
              className={disLikedClassName}
              onClick={this.changeDislikeStatus}
            >
              <BiDislike className="light-theme-video-icon" />
              Dislike
            </button>
            <button className={savedClassname} onClick={onClickSaved}>
              <HiOutlineSaveAs className="light-theme-video-icon" />
              {savedButtonText}
            </button>
          </div>
        </div>
      </div>
    )
  }

  darkThemeVideoItemTopSection = addToSavedVideos => {
    const {videoDetails, liked, disliked, saved} = this.state
    const {videoUrl, title, viewCount, publishedAt} = videoDetails
    const parsedDate = new Date(publishedAt)
    const distance = formatDistanceToNow(parsedDate).split(' ')
    const likedClassName = liked ? 'liked' : 'dark-theme-like-buttons'
    const disLikedClassName = disliked ? 'disliked' : 'dark-theme-like-buttons'
    const savedClassname = saved ? 'liked' : 'dark-theme-like-buttons'
    const savedButtonText = saved ? 'Saved' : 'Save'

    const onClickSaved = () => {
      addToSavedVideos(videoDetails)
      this.changeSavedStatus()
    }

    return (
      <div>
        <ReactPlayer url={videoUrl} className="react-player-video" />
        <h1 className="dark-theme-trending-title-heading">{title}</h1>
        <div className="views-likes-container">
          <div className="views-date-container">
            <p className="dark-theme-video-para">{viewCount} views</p>
            <p className="dark-theme-video-para">{distance[1]} years ago</p>
          </div>
          <div className="views-date-container">
            <button className={likedClassName} onClick={this.changeLikeStatus}>
              <BiLike className="dark-theme-video-icon" />
              Like
            </button>
            <button
              className={disLikedClassName}
              onClick={this.changeDislikeStatus}
            >
              <BiDislike className="dark-theme-video-icon" />
              Dislike
            </button>
            <button className={savedClassname} onClick={onClickSaved}>
              <HiOutlineSaveAs className="dark-theme-video-icon" />
              {savedButtonText}
            </button>
          </div>
        </div>
      </div>
    )
  }

  lightThemeVideoItemBottomSection = () => {
    const {videoDetails} = this.state
    const {channel} = videoDetails
    const {description} = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel
    return (
      <div className="channel-profile-container">
        <img src={profileImageUrl} className="channel-profile-image" />
        <div>
          <p className="light-theme-channel-name">{name}</p>
          <p className="light-theme-channel-subscribers-count">
            {subscriberCount} Subscribers
          </p>
          <p className="light-theme-description-para">{description}</p>
        </div>
      </div>
    )
  }

  darkThemeVideoItemBottomSection = () => {
    const {videoDetails} = this.state
    const {channel} = videoDetails
    const {description} = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel
    return (
      <div className="channel-profile-container">
        <img src={profileImageUrl} className="channel-profile-image" />
        <div>
          <p className="dark-theme-channel-name">{name}</p>
          <p className="dark-theme-channel-subscribers-count">
            {subscriberCount} Subscribers
          </p>
          <p className="dark-theme-description-para">{description}</p>
        </div>
      </div>
    )
  }

  lightThemeVideoItem = addToSavedVideos => {
    const {isLoading} = this.state

    if (isLoading) {
      return <div className="light-theme-video-container">{this.loader}</div>
    }

    return (
      <div className="light-theme-video-container">
        {this.lightThemeVideoItemTopSection(addToSavedVideos)}
        <hr />
        {this.lightThemeVideoItemBottomSection()}
      </div>
    )
  }

  darkThemeVideoItem = addToSavedVideos => {
    const {isLoading} = this.state

    if (isLoading) {
      return <div className="dark-theme-video-container">{this.loader}</div>
    }

    return (
      <div className="dark-theme-video-container">
        {this.darkThemeVideoItemTopSection(addToSavedVideos)}
        <hr />
        {this.darkThemeVideoItemBottomSection()}
      </div>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme, addToSavedVideos} = value

          const videoItem = darkTheme
            ? this.darkThemeVideoItem(addToSavedVideos)
            : this.lightThemeVideoItem(addToSavedVideos)

          return (
            <>
              <Header />
              <div className="container">
                <Sidebar />
                {videoItem}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails