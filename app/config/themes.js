import defaultThemes from './themes.default';
import externalThemes from './themes.external';

const themes = externalThemes.length ? externalThemes : defaultThemes;
export default themes;
