import React, { Component } from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Watch from "../Watch/Watch";
import Topbar from "../Topbar/Topbar";
import {styled} from "@mui/material/styles";

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.header.backgroundColor,
}));

class Header extends Component {
  render() {
    return (
      <Container className={'header'}>
        <Logo />
        <Search />
        <Topbar />
        <Watch />
      </Container>
    )
  }
}

export default Header;
