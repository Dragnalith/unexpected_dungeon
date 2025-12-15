import * as stylex from '@stylexjs/stylex'
import { colors, spacing, fontSize, borderRadius, transitions } from '../tokens.stylex'

export const styles = stylex.create({
  toggleButtonTooltipVisible: {
    opacity: {
      default: null,
      ':hover': 1,
    },
  },
  toggleButtonTooltip: {
    borderRadius: borderRadius.DEFAULT,
    transition: `opacity ${transitions.fast}`,
    backgroundColor: colors.gray700,
    color: colors.gray100,
    fontSize: fontSize['10px'],
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    bottom: '-2rem',
    left: '50%',
    paddingBottom: spacing['1'],
    paddingLeft: spacing['2'],
    paddingRight: spacing['2'],
    paddingTop: spacing['1'],
  },
  toggleButtonOn: {
    color: colors.gray100,
  },
  toggleButtonOff: {
    color: colors.gray500,
  },
  toggleButtonIcon: {
    fontSize: fontSize.lg,
  },
  toggleButton: {
    borderRadius: borderRadius.md,
    transition: `background-color ${transitions.fast}`,
    alignItems: 'center',
    backgroundColor: {
      default: null,
      ':hover': 'rgba(55, 65, 81, 0.6)',
    },
    display: 'inline-flex',
    justifyContent: 'center',
    position: 'relative',
    height: spacing['9'],
    width: spacing['9'],
  },
  title: {
    color: colors.gray50,
    fontSize: fontSize.sm,
    fontWeight: 600,
    letterSpacing: '0.025em',
    position: 'absolute',
    transform: 'translateX(-50%)',
    left: '50%',
  },
  rightSection: {
    gap: spacing['2'],
    alignItems: 'center',
    display: 'flex',
    marginLeft: 'auto',
  },
  leftSection: {
    gap: spacing['2'],
    alignItems: 'center',
    display: 'flex',
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.gray800,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    display: 'flex',
    position: 'relative',
    borderBottomColor: colors.gray700,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    height: spacing['12'],
    paddingLeft: spacing['3'],
    paddingRight: spacing['3'],
  },
})
