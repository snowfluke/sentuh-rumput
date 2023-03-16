import {Dimensions, TouchableNativeFeedback} from 'react-native';

export const Color = {
  main: '#57CC99',
  accent900: '#225779',
  accent600: '#37A3A5',
  accent400: '#80EE98',
  accent100: '#C8F9CC',
  success: '#31C458',
  info: '#288CFF',
  warning: '#FFBB2B',
  danger: '#FF7ABE',
  background: '#FFFFFF',
  backgroundAccent: '#F6F7F6',
  text: '#656565',
  text2: '#A4A4A5',
  text3: '#D8DADA',
  text4: '#F6F7F6',
  barStyle: 'dark-content',
  black: '#000000',
  red: '#FF4248',
};

export const Dimension = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const Effect = {
  rippleWhite: TouchableNativeFeedback.Ripple(Color.text3, true, 200),
  rippleWhiteMd: TouchableNativeFeedback.Ripple(Color.text3, true, 100),
  rippleWhiteSm: TouchableNativeFeedback.Ripple(Color.text3, true, 50),
  rippleWhiteBorder: TouchableNativeFeedback.Ripple(Color.text3, false, 300),
};

export const Icons = {
  show: 'visibility',
  hide: 'visibility-off',
  logout: 'logout',
  home: 'home',
  relaxation: 'self-improvement',
  recommendation: 'auto-awesome',
  search: 'search',
  location: 'pin-drop',
  locationOn: 'location-on',
  star: 'star',
  grass: 'grass',
  run: 'directions-run',
  fire: 'local-fire-department',
  recreation: 'deck',
  nature: 'emoji-nature',
  favorite: 'favorite',
  next: 'arrow-forward-ios',
  loop: 'autorenew',
  playPrev: 'skip-previous',
  play: 'play-arrow',
  pause: 'pause',
  playNext: 'skip-next',
  playlist: 'queue-music',
  support: 'support',
  settings: 'settings',
  profile: 'person',
  share: 'share',
  starOutline: 'star-outline',
  logout: 'logout',
  info: 'info',
  navigation: 'navigation',
  add: 'add',
};
