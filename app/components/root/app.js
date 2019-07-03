import React, { useState } from 'react';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
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
    background: transparent;
`;

const App = () => {
    const [open, setOpen] = useState(false);
    const [themePageSource, setThemePageSource] = useState([]);
    return (
        <Dashboard>
            <Header>Welcome to My Dashboard</Header>
            <MainSection>
                {themes.map(theme => (
                    <Button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                            setOpen(true);
                            setThemePageSource(theme.pageSource);
                        }}
                    >
                        {theme.name}
                    </Button>
                ))}
            </MainSection>
            <Footer>All rights reserved @ ngdb</Footer>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <div tabIndex={0} role="button">
                    <ul>
                        {themePageSource.map(page => (
                            <li key={page.id}>{page.name}</li>
                        ))}
                    </ul>
                </div>
            </Drawer>
        </Dashboard>
    );
};

export default App;
