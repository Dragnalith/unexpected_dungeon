import * as stylex from '@stylexjs/stylex'
import { colors, spacing } from '../tokens.stylex'

export const styles = stylex.create({
  canvas: {
    outline: 'none',
    boxShadow: {
      default: null,
      ':focus': `0 0 0 2px ${colors.blue500}`,
    },
    cursor: 'default',
    display: 'block',
  },
  canvasContainer: {
    display: 'inline-block',
    position: 'relative',
  },
  canvasWrapper: {
    flex: '1',
    overflow: 'hidden',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  panel: {
    padding: {
      default: spacing['2'],
      '@media (min-width: 640px)': spacing['3'],
    },
    flex: '1',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
})
