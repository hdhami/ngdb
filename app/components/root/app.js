import React from 'react';
import styled from 'styled-components';
import themes from '../../config/themes';

const Dashboard = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh);
`;

const Header = styled.header`
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    color: gray;
    border-bottom: 1px solid #eee;
`;

const Footer = styled.footer`
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: center;
    color: gray;
    margin-top: auto;
    border-top: 1px solid #eee;
`;

const MainSection = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-wrap: wrap;
    justify-content: center;
    color: gray;
    background: #eee;
`;

const Button = styled.button`
    display: flex;
    min-width: 25%;
    flex: 1;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    box-sizing: border-box;
    cursor: pointer;
`;

const App = () => (
    <div id="root">
        <Dashboard>
            <Header>Welcome to My Dashboard</Header>
            <MainSection>
                {themes.map(theme => (
                    <Button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                            // eslint-disable-next-line no-alert
                            alert(theme.name);
                        }}
                    >
                        {theme.name}
                    </Button>
                ))}
            </MainSection>
            <Footer>All rights reserved @ ngdb</Footer>
        </Dashboard>
    </div>
);

export default App;
