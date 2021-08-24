import Image from 'next/image'
import styles from '../styles/StreamerGrid.module.css'
const StreamerGrid = ({ channels, setChannels }) => {
  //Actions
  const removeChannelAction = channelId => () => {
    setChannels(channels.filter(channel => channel.id !== channelId))
  }

  //RenderMethod
  const renderGridItem = channel => (
    <div key={channel.id} className={styles.gridItem}>
      <button onClick={removeChannelAction(channel.id)}>X</button>
      <Image layout='fill' src={channel.thumbnail_url} />
      <div className={styles.gridItemContent}>
        <p>{channel.display_name}</p>
        {channel.is_live && <p>🔴 Live now!</p>}
        {!channel.is_live && <p>⚫ Offline</p>}
      </div>
    </div>
  )

  return (
    <div>
      <h2>{`Bader's Twitch Dashboard 😎`}</h2>
      {channels.map(renderGridItem)}
    </div>

  )
}

export default StreamerGrid