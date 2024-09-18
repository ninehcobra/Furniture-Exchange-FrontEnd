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
    colorPrimaryHover: highlightColor_2,
    colorPrimaryActive: highlightColor_3,
    colorBgContainer: neutralColorLight_5,
    colorSuccess: successColor_1,
    colorWarning: warningColor_1,
    colorError: errorColor_1,
    colorSuccessBg: successColor_3,
    colorWarningBg: warningColor_3,
    colorErrorBg: errorColor_3,
    colorSuccessBgHover: successColor_2,
    colorWarningBgHover: warningColor_2,
    colorErrorBgHover: errorColor_2
  },
  components: {
    Layout: {
      headerBg: neutralColorLight_5
    }
  }
}
