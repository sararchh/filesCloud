import React from "react";

import "./style.css";

import Logo from "../../images/png/logo.png"
import ThowColumnLayoutLoginRegister from "../../layouts/LayoutLoginRegister/ThowColumnLayoutLoginRegister";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const Login = () => {

  const schema = z.object({
    email: z.string().min(1, { message: 'Required' }).nonempty("Is required"),
    password: z.string().min(1, { message: 'Required' }).nonempty("Is required")
  });

  const { setValue, getValues } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitValues = (e) => {
    e.preventDefault();
    const values = getValues();
    console.log(values);
  }

  return (
    <ThowColumnLayoutLoginRegister>
      <div className="containerInfosLogin">
        <div className="containerFormLogin">
          <img className="logo" src={Logo} alt="logo" />
          <p className="textPoppinsTitle title">Dados de acesso</p>

          <form onSubmit={handleSubmitValues}>
            <div className="contentInputLogin">
              <Input
                name="E-mail"
                placeholder="Insira seu e-mail"
                width="26rem"
                height="3.12rem"
                background="#FFFFFF"
                border="1px solid #D7D7D7"
                borderRadius="10px"
                outline="none"
                marginTop="1rem"
                padding="0.8rem"
                value={getValues("email")}
                onChange={(value) => setValue("email", value)}
              />

              <Input
                type="password"
                name="Senha"
                placeholder="Insira seu senha"
                width="26rem"
                height="3.12rem"
                background="#FFFFFF"
                border="1px solid #D7D7D7"
                borderRadius="10px"
                outline="none"
                marginTop="1rem"
                marginBottom="3rem"
                padding="0.8rem"
                value={getValues("password")}
                onChange={(value) => setValue("password", value)}
              />
            </div>

          </form>
          <div className="containerLogin">
            <div className="containerLogin" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Button
                width="11rem"
                height="2.81rem"
                background="#476EE6"
                borderRadius="60px"
                color="white"
                border="none"
              >
                <span className="textPoppinsButtonRegister">Entrar</span>
              </Button>

              <span className="textPoppinsTerms">Esqueceu a senha?</span>
            </div>
          </div>
        </div>
      </div>
    </ThowColumnLayoutLoginRegister>
  );
}

export default Login;