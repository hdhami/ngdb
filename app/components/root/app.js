import React from 'react';
import styled from 'styled-components';
import themes from '../../config/themes';

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
    'box-sizing': 'border-box',
    cursor: 'pointer'
};

const Header = styled.header`
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    color: gray;
    border-bottom: 1px solid #eee;
`;

const MainSection = () => (
    <div id="main" style={MainSectionStyle}>
        {themes.map(theme => (
            <button key={theme.id} type="button" style={ThemeStyle} onClick={() => {}}>
                {theme.name}
            </button>
        ))}
    </div>
);

const Footer = () => <footer style={FooterStyle}>All rights reserved @ ngdb</footer>;

const App = () => (
    <div className="dashboard" style={AppStyle}>
        <Header>Welcome to My Dashboard</Header>
        <MainSection />
        <Footer />
    </div>
);

export default App;
