import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { styles } from './Settings.style'

type SettingsProps = {
  apiKey: string
  setApiKey: (key: string) => void
  apiUrl: string
  setApiUrl: (url: string) => void
  modelName: string
  setModelName: (model: string) => void
  onClose: () => void
}

export function Settings({ apiKey, setApiKey, apiUrl, setApiUrl, modelName, setModelName, onClose }: SettingsProps) {
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div {...stylex.props(styles.dropdown)}>
      <div>
        <label {...stylex.props(styles.label)} htmlFor="api-url">
          API URL
        </label>
        <input
          id="api-url"
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          {...stylex.props(styles.input)}
          placeholder="https://openrouter.ai/api/v1"
        />
      </div>
      <div>
        <label {...stylex.props(styles.label)} htmlFor="model-name">
          Model Name
        </label>
        <input
          id="model-name"
          type="text"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          {...stylex.props(styles.input)}
          placeholder="anthropic/claude-sonnet-4.5"
        />
      </div>
      <div>
        <label {...stylex.props(styles.label)} htmlFor="api-key">
          API KEY
        </label>
        <div {...stylex.props(styles.inputGroup)}>
          <input
            id="api-key"
            type={showApiKey ? 'text' : 'text'} // Always text, but style changes
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            {...stylex.props(styles.input, styles.inputWithToggle)}
            placeholder="sk-..."
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            style={showApiKey ? {} : { WebkitTextSecurity: 'disc' } as React.CSSProperties}
          />
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            {...stylex.props(styles.toggleButton)}
            aria-label={showApiKey ? 'Hide API Key' : 'Show API Key'}
          >
            {showApiKey ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <div {...stylex.props(styles.buttonWrapper)}>
        <button onClick={onClose} {...stylex.props(styles.closeButton)}>
          Close
        </button>
      </div>
    </div>
  )
}
