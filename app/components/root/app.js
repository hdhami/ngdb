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
    'align-items': 'center',
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

const Header = () => <header style={HeaderStyle}>Welcome to My Dashboard</header>;

const MainSection = () => (
    <div id="main" style={MainSectionStyle}>
        Dashboard Content
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
