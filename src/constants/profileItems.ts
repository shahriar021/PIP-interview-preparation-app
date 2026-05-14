import { TFunction } from 'i18next';

export const getProfileItems = (t: TFunction) => [
  {
    icon: require("../../assets/pipyrit/Edit_duotone_line.png"),
    label: t('screens.editProfile'),
    route: "Edit Profile",
    type: ['user', 'rider']
  },
  {
    icon: require("../../assets/restroIcon/setting.png"),
    label: t('screens.setting'),
    route: "Setting",
    type: ['user', 'rider']
  },
  {
    icon: require("../../assets/restroIcon/Time_progress_duotone_line.png"),
    label: t('screens.history'),
    route: "History",
    type: 'rider'
  },
  {
    icon: require("../../assets/restroIcon/Chield.png"),
    label: t('screens.privacy'),
    route: "Privacy",
    type: ['user', 'rider']
  },
  {
    icon: require("../../assets/restroIcon/Paper_light.png"),
    label: t('screens.terms'),
    route: "Terms",
    type: ['user', 'rider']
  },
  {
    icon: require("../../assets/restroIcon/Info_alt_light.png"),
    label: t('screens.about'),
    route: "about",
    type: ['user', 'rider']
  },
  {
    icon: require("../../assets/restroIcon/Info_alt_light.png"),
    label: t('screens.subscription'),
    route: "Subscription",
    type: ['user', 'rider']
  },
];