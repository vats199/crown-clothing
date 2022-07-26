import React from "react";

import { connect } from "react-redux";

import CartIcon from "../cart-icon/cart-icon.component";

import { createStructuredSelector } from "reselect";

import { selectCartHidden } from "../../redux/cart/cart.selectors";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import { signOutStart } from "../../redux/user/user.actions";

import { HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer } from './header.styles'

import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import './header.styles.scss';

import { ReactComponent as Logo } from '../../assets/crown.svg'

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                    (
                        <OptionDiv onClick={signOutStart}>
                            SIGN OUT
                        </OptionDiv>
                    ) :
                    (
                        <OptionLink to='/signin'>
                            SIGN IN
                        </OptionLink>
                    )}

            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null :
                <CartDropdown />
        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);