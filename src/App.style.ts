import * as stylex from '@stylexjs/stylex'
import { colors } from './tokens.stylex'

export const styles = stylex.create({
  main: {
    flex: '1',
    overflow: 'hidden',
    display: 'flex',
    minWidth: 0,
  },
  container: {
    overflow: 'hidden',
    backgroundColor: colors.gray900,
    color: colors.gray100,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
})
