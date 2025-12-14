import * as stylex from '@stylexjs/stylex'
import { styles } from './GameCanvas.style'

export function GameCanvas() {
  return (
    <section {...stylex.props(styles.panel)}>
      <div {...stylex.props(styles.canvasWrapper)}>
        <div {...stylex.props(styles.canvas)}>Game Canvas</div>
      </div>
    </section>
  )
}
