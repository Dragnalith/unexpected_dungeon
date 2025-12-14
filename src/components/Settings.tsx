import * as stylex from '@stylexjs/stylex'
import { styles } from './Settings.style'

type SettingsProps = {
  onClose: () => void
}

export function Settings({ onClose }: SettingsProps) {
  return (
    <div {...stylex.props(styles.dropdown)}>
      <div>
        <label {...stylex.props(styles.label)} htmlFor="api-url">
          API URL
        </label>
        <input
          id="api-url"
          type="text"
          {...stylex.props(styles.input)}
          placeholder="https://api.example.com"
        />
      </div>
      <div>
        <label {...stylex.props(styles.label)} htmlFor="api-key">
          API KEY
        </label>
        <input
          id="api-key"
          type="text"
          {...stylex.props(styles.input)}
          placeholder="sk-..."
        />
      </div>
      <div {...stylex.props(styles.buttonWrapper)}>
        <button onClick={onClose} {...stylex.props(styles.closeButton)}>
          Close
        </button>
      </div>
    </div>
  )
}
