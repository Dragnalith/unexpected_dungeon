import * as stylex from '@stylexjs/stylex'
import { colors, spacing, fontSize, borderRadius } from '../tokens.stylex'

export const styles = stylex.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',

    display: 'flex',
    justifyContent: 'center',

    position: 'absolute',


    zIndex: 100,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  modal: {







    padding: spacing['4'],
    borderColor: colors.gray700,
    borderRadius: borderRadius.lg,
    borderStyle: 'solid',
    borderWidth: '1px',
    backgroundColor: colors.gray900,
    maxWidth: '400px',
    minWidth: '280px',
  },
  header: {
    alignItems: 'center',



    display: 'flex',
    justifyContent: 'space-between',
    borderBottomColor: colors.gray700,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    marginBottom: spacing['3'],
    paddingBottom: spacing['2'],
  },
  npcName: {



    margin: 0,
    color: colors.blue400,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  closeButton: {






    padding: spacing['1'],
    borderWidth: 0,
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.gray800,
    },
    color: {
      default: colors.gray400,
      ':hover': colors.gray100,
    },
    cursor: 'pointer',
    fontSize: fontSize.lg,
    lineHeight: 1,
  },
  dialogue: {
    color: colors.gray300,
    fontSize: fontSize.sm,
    fontStyle: 'italic',
    lineHeight: 1.5,
    marginBottom: spacing['3'],
  },
  section: {
    marginBottom: spacing['3'],
  },
  sectionTitle: {
    color: colors.gray400,
    fontSize: fontSize.xs,
    letterSpacing: '0.05em',

    textTransform: 'uppercase',
    marginBottom: spacing['1'],
  },
  itemList: {


    gap: spacing['1'],
    display: 'flex',
    flexDirection: 'column',
  },
  itemRow: {





    padding: spacing['2'],
    borderRadius: borderRadius.DEFAULT,
    alignItems: 'center',
    backgroundColor: colors.gray800,
    display: 'flex',
    justifyContent: 'space-between',
  },
  itemName: {
    color: colors.gray100,
    fontSize: fontSize.sm,
  },
  actionButton: {

    borderRadius: borderRadius.DEFAULT,
    borderWidth: 0,
    backgroundColor: {
      default: colors.blue600,
      ':disabled': colors.gray700,
      ':hover': colors.blue500,
    },
    color: {
      default: colors.white,
      ':disabled': colors.gray500,
    },
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed',
    },
    fontSize: fontSize.xs,
    paddingBottom: spacing['1'],
    paddingLeft: spacing['2'],
    paddingRight: spacing['2'],
    paddingTop: spacing['1'],
  },
  emptyText: {
    color: colors.gray500,
    fontSize: fontSize.sm,
    fontStyle: 'italic',
  },
  nextButton: {

    borderRadius: borderRadius.DEFAULT,
    borderWidth: 0,
    backgroundColor: {
      default: colors.gray700,
      ':hover': colors.gray500,
    },
    color: colors.gray100,
    cursor: 'pointer',
    fontSize: fontSize.xs,
    marginLeft: spacing['2'],
    paddingBottom: spacing['1'],
    paddingLeft: spacing['2'],
    paddingRight: spacing['2'],
    paddingTop: spacing['1'],
  },
})
