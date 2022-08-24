import { atom } from 'recoil'
import {
  layoutModeTypes,
  layoutPositionTypes,
  layoutTypes,
  layoutWidthTypes,
  leftsidbarSizeTypes,
  leftSidebarImageTypes,
  leftSidebarTypes,
  leftSidebarViewTypes,
  topbarThemeTypes
} from '../constants/layout'

export const layoutState = atom({
  key: 'layoutState',
  default: {
    layoutType: layoutTypes.VERTICAL,
    leftSidebarType: leftSidebarTypes.DARK,
    layoutModeType: layoutModeTypes.LIGHTMODE,
    layoutWidthType: layoutWidthTypes.FLUID,
    layoutPositionType: layoutPositionTypes.FIXED,
    topbarThemeType: topbarThemeTypes.LIGHT,
    leftsidbarSizeType: leftsidbarSizeTypes.DEFAULT,
    leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
    leftSidebarImageType: leftSidebarImageTypes.NONE
  }
})
