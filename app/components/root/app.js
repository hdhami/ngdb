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

    &:hover {
        background: #dcd8d8;
        opacity: 0.8;
    }
    &:focus {
        outline: none;
    }
`;

const PageSource = styled.a`
    display: flex;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    flex: auto;
    background: #eee;
    cursor: pointer;
    color: #000000;
    text-decoration: none;

    &:hover {
        background: #dcd8d8;
        opacity: 0.8;
    }
`;

const App = () => {
    const [open, setOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState(null);
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
                            setActiveTheme(theme);
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
                <div tabIndex={0} role="button" style={{ width: '300px', height: '100%' }}>
                    <div
                        style={{
                            padding: '5px',
                            'list-style': 'none',
                            display: 'flex',
                            'flex-direction': 'column',
                            margin: '0',
                            height: '100%'
                        }}
                    >
                        {activeTheme &&
                            activeTheme.pageSource.map(page => (
                                <PageSource key={page.id} href={`/${activeTheme.name}/${page.name}`}>
                                    {page.name}
                                </PageSource>
                            ))}
                    </div>
                </div>
            </Drawer>
        </Dashboard>
    );
};

export default App;
