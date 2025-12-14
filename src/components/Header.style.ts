import * as stylex from '@stylexjs/stylex'
import { colors, spacing, fontSize, borderRadius, transitions } from '../tokens.stylex'

export const styles = stylex.create({
  header: {
    position: 'relative',
    height: spacing['12'],
    backgroundColor: colors.gray800,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.gray700,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: spacing['3'],
    paddingRight: spacing['3'],
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing['2'],
  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray50,
    letterSpacing: '0.025em',
  },
  rightSection: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: spacing['2'],
  },
  toggleButton: {
    position: 'relative',
    display: 'inline-flex',
    height: spacing['9'],
    width: spacing['9'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    transition: `background-color ${transitions.fast}`,
    ':hover': {
      backgroundColor: 'rgba(55, 65, 81, 0.6)',
    },
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
  toggleButtonTooltip: {
    pointerEvents: 'none',
    position: 'absolute',
    bottom: '-2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    borderRadius: borderRadius.DEFAULT,
    backgroundColor: colors.gray700,
    paddingLeft: spacing['2'],
    paddingRight: spacing['2'],
    paddingTop: spacing['1'],
    paddingBottom: spacing['1'],
    fontSize: fontSize['10px'],
    color: colors.gray100,
    opacity: 0,
    transition: `opacity ${transitions.fast}`,
  },
  toggleButtonTooltipVisible: {
    ':hover': {
      opacity: 1,
    },
  },
})
