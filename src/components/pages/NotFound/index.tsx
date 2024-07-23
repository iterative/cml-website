import * as styles from './styles.module.css'

const NotFound = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Not Found</h1>
    <div className={styles.content}>
      You just hit a route that doesn&#39;t exist... the sadness.
    </div>
  </div>
)

export default NotFound
