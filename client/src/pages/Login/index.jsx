import React from "react";

import "./style.css";

import Logo from "../../images/png/logo.png"
import ThowColumnLayoutLoginRegister from "../../layouts/LayoutLoginRegister/ThowColumnLayoutLoginRegister";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { SignIn } from "../../services/authApi";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().min(1, { message: 'Required' }).required("Is required"),
    password: Yup.string().min(1, { message: 'Required' }).required("Is required")
  });

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { setValue, getValues } = useForm(formOptions);

  const handleSubmitValues = async (e) => {
    e.preventDefault();
    const values = getValues();
    try {
      await SignIn(values);
      navigate("/storage");
    } catch (error) {
      toast.error("Erro ao Logar")
    }
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
                required
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
                required
              />
            </div>

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
          </form>
        </div>
      </div>
    </ThowColumnLayoutLoginRegister>
  );
}

export default Login;