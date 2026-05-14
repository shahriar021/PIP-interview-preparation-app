import { TFunction } from 'i18next';

export const getSettingItems = (t: TFunction) => [
  {
    icon: require('../../assets/restroIcon/Key_light.png'),
    label: t('screens.changePassword'),
    route: "Change Password",
  },
  {
    icon: require('../../assets/pipyrit/langua.png'),
    label: t('screens.language'),
    route: "Language",
  },
];