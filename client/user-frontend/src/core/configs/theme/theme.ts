import colors from '@/common/styles/common/_variables.module.scss'
import { ThemeConfig } from 'antd'

const {
  highlightColor_1,
  highlightColor_2,
  highlightColor_3,
  highlightColor_4,
  highlightColor_5,
  neutralColorLight_1,
  neutralColorLight_2,
  neutralColorLight_3,
  neutralColorLight_4,
  neutralColorLight_5,
  neutralColorDark_1,
  neutralColorDark_2,
  neutralColorDark_3,
  neutralColorDark_4,
  neutralColorDark_5,
  successColor_1,
  successColor_2,
  successColor_3,
  warningColor_1,
  warningColor_2,
  warningColor_3,
  errorColor_1,
  errorColor_2,
  errorColor_3
} = colors

export const theme: ThemeConfig = {
  token: {
    colorPrimary: highlightColor_1,
    colorBgContainer: neutralColorLight_5
  }
}
