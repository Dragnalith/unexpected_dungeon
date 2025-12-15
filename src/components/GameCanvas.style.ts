import * as stylex from '@stylexjs/stylex'
import { colors, spacing, fontSize } from '../tokens.stylex'

export const styles = stylex.create({
  canvas: {
    alignItems: 'center',
    aspectRatio: '4 / 3',
    backgroundColor: colors.gray950,
    color: colors.gray300,
    display: 'flex',
    fontSize: fontSize.lg,
    justifyContent: 'center',
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    width: '100%',
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
