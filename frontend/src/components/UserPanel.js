import { observer } from "mobx-react-lite";
import React from "react";
import { Card } from "react-bootstrap";
import { useContext} from "react";
import { Context } from "../index";
import { LOGIN_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UserPanel = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setIsAdmin(false)
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin')
    history(LOGIN_ROUTE)
    }

    const StyledButton = styled.button`
    color: #fdf6f0;
    border: 0;
    text-align: end;
  `;
    return (
    <Card className="bg2 p-3 text-end">
        <h5><b>Заказы</b></h5>
        <StyledButton
            onClick={() => logOut()}>
            Выйти
        </StyledButton>
    </Card>
    )
})


export default UserPanel;