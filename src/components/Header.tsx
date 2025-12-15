import * as stylex from '@stylexjs/stylex'
import { styles } from './Header.style'
import { Settings } from './Settings'

type HeaderProps = {
  showLeft: boolean
  showRight: boolean
  showSettings: boolean
  apiKey: string
  setApiKey: (key: string) => void
  apiUrl: string
  setApiUrl: (url: string) => void
  modelName: string
  setModelName: (model: string) => void
  onToggleLeft: () => void
  onToggleRight: () => void
  onToggleSettings: () => void
}

export function Header({
  showLeft,
  showRight,
  showSettings,
  apiKey,
  setApiKey,
  apiUrl,
  setApiUrl,
  modelName,
  setModelName,
  onToggleLeft,
  onToggleRight,
  onToggleSettings,
}: HeaderProps) {
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.leftSection)}>
        <button
          onClick={onToggleLeft}
          {...stylex.props(styles.toggleButton, showLeft ? styles.toggleButtonOn : styles.toggleButtonOff)}
          aria-label="Toggle chat panel"
        >
          <span {...stylex.props(styles.toggleButtonIcon)}>◧</span>
          <span {...stylex.props(styles.toggleButtonTooltip, styles.toggleButtonTooltipVisible)}>
            {showLeft ? 'Chat On' : 'Chat Off'}
          </span>
        </button>
      </div>

      <h1 {...stylex.props(styles.title)}>Unexpected Dungeon</h1>

      <div {...stylex.props(styles.rightSection)}>
        <button
          onClick={onToggleRight}
          {...stylex.props(styles.toggleButton, showRight ? styles.toggleButtonOn : styles.toggleButtonOff)}
          aria-label="Toggle content panel"
        >
          <span {...stylex.props(styles.toggleButtonIcon)}>◨</span>
          <span {...stylex.props(styles.toggleButtonTooltip, styles.toggleButtonTooltipVisible)}>
            {showRight ? 'Content On' : 'Content Off'}
          </span>
        </button>
        <button
          onClick={onToggleSettings}
          {...stylex.props(styles.toggleButton, showSettings ? styles.toggleButtonOn : styles.toggleButtonOff)}
          aria-label="Open settings"
        >
          <span {...stylex.props(styles.toggleButtonIcon)}>⚙</span>
          <span {...stylex.props(styles.toggleButtonTooltip, styles.toggleButtonTooltipVisible)}>
            Settings
          </span>
        </button>
      </div>

      {showSettings && (
        <Settings
          apiKey={apiKey}
          setApiKey={setApiKey}
          apiUrl={apiUrl}
          setApiUrl={setApiUrl}
          modelName={modelName}
          setModelName={setModelName}
          onClose={onToggleSettings}
        />
      )}
    </header>
  )
}
