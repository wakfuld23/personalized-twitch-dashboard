import Image from 'next/image'
import styles from '../styles/StreamerGrid.module.css'
const StreamerGrid = ({ channels, setChannels }) => {
  //Actions
  const removeChannelAction = channelId => async () => {
    const filteredChannels = channels.filter(channel => channel.id !== channelId)

    setChannels(filteredChannels)

    const joinedChannels = filteredChannels.map(channel => channel.display_name.toLowerCase()).join(",")

    await setDBChannels(joinedChannels)
  }

  const setDBChannels = async channels => {
    try {
      const path = `https://${window.location.hostname}`

      const response = await fetch(`${path}/api/database`, {
        method: 'POST',
        body: JSON.stringify({
          key: 'CHANNELS',
          value: channels,
        })
      })
      if (response.status === 200){
        console.log(`Set ${channles} in DB`)
      } 
    } catch (error){
        console.log(error.message)
      }
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

  const renderNoItems = () => {
    return (
      <div className={styles.gridNoItems}>
        <p> Add a streamer to get Started</p>
      </div>
    )
  }

  return (
    <div>
      <h2>{`Bader's Twitch Dashboard 😎`}</h2>
      {channels.length > 0 && channels.map(renderGridItem)}
      {channels.length === 0 && renderNoItems()}
    </div>

  )
}

export default StreamerGrid