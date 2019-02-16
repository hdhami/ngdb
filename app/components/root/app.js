import React from 'react';

const HeaderStyle = {
    display: 'flex',
    height: '50px',
    'align-items': 'center',
    'justify-content': 'center',
    color: 'gray',
    'border-bottom': '1px solid #eee'
};

const AppStyle = {
    display: 'flex',
    'flex-direction': 'column',
    height: 'calc(100vh)'
};

const MainSectionStyle = {
    display: 'flex',
    'flex-direction': 'row',
    flex: 1,
    'flex-wrap': 'wrap',
    'justify-content': 'center',
    color: 'gray',
    background: '#eee'
};

const FooterStyle = {
    display: 'flex',
    height: '30px',
    'align-items': 'center',
    'justify-content': 'center',
    color: 'gray',
    'margin-top': 'auto',
    'border-top': '1px solid #eee'
};

const ThemeStyle = {
    display: 'flex',
    'min-width': '25%',
    flex: 1,
    'justify-content': 'center',
    'align-items': 'center',
    border: '1px solid #fff',
    'box-sizing': 'border-box'
};

const Header = () => <header style={HeaderStyle}>Welcome to My Dashboard</header>;

const MainSection = () => (
    <div id="main" style={MainSectionStyle}>
        <div style={ThemeStyle}>Theme1</div>
        <div style={ThemeStyle}>Theme2</div>
        <div style={ThemeStyle}>Theme3</div>
        <div style={ThemeStyle}>Theme4</div>
        <div style={ThemeStyle}>Theme5</div>
    </div>
);

const Footer = () => <footer style={FooterStyle}>All rights reserved @ ngdb</footer>;

const App = () => (
    <div className="dashboard" style={AppStyle}>
        <Header />
        <MainSection />
        <Footer />
    </div>
);

export default App;
