const pageSource = [
    {
        name: 'landing',
        lang: 'en',
        source: 'app/html/page-source/landing.html'
    },
    {
        name: 'listing',
        lang: 'en',
        source: 'app/html/page-source/landing.html'
    }
];
const themes = [
    {
        name: 'theme1',
        id: '_theme1',
        color: '#666666',
        pageSource: [...pageSource]
    },
    {
        name: 'theme2',
        id: '_theme2',
        color: '#b5914e',
        pageSource: [...pageSource]
    },
    {
        name: 'theme3',
        id: '_theme3',
        color: '#735d35',
        pageSource: [...pageSource]
    },
    {
        name: 'theme4',
        id: '_theme4',
        color: '#426cad',
        pageSource: [...pageSource]
    },
    {
        name: 'theme5',
        id: '_theme5',
        color: '#ad71a8',
        pageSource: [...pageSource]
    }
];

export default themes;
