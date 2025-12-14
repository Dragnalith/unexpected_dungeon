import * as stylex from '@stylexjs/stylex'
import { colors } from './tokens.stylex'

export const styles = stylex.create({
  container: {
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: colors.gray900,
    color: colors.gray100,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    minWidth: 0,
  },
})
