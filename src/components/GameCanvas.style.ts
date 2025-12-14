import * as stylex from '@stylexjs/stylex'
import { colors, spacing, fontSize } from '../tokens.stylex'

export const styles = stylex.create({
  panel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: spacing['2'],
    overflow: 'hidden',
    minWidth: 0,
    '@media (min-width: 640px)': {
      padding: spacing['3'],
    },
  },
  canvasWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  canvas: {
    aspectRatio: '4 / 3',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: colors.gray950,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.gray300,
    fontSize: fontSize.lg,
  },
})
