import React from "react";

import "./style.css";

import Logo from "../../images/png/logo.png"
import ThowColumnLayoutLoginRegister from "../../layouts/LayoutLoginRegister/ThowColumnLayoutLoginRegister";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignUp } from "../../services/authApi";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().min(2).required("Is required"),
    password: Yup.string().required("Is required"),
    name: Yup.string().required("Is required"),
    terms: Yup.boolean(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { handleSubmit, setValue, getValues, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleSubmitValues = async (e) => {
    e.preventDefault();

    try {
      const values = getValues();

      if (values.terms !== true) {
        return toast.error("Aceite os termos");
      }

      const obj = {
        name: values.name,
        email: values.email,
        password: values.password
      }

      await SignUp(obj);

      navigate("/storage");
      toast.success("Cadastro com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar, verifique")
    }

  }

  return (
    <ThowColumnLayoutLoginRegister>
      <div className="containerInfos">
        <div className="containerForm">
          <img className="logo" src={Logo} alt="logo" />
          <p className="textPoppinsTitle title">Cadastro</p>

          <form onSubmit={handleSubmitValues}>
            <div className="containerTwoColumns">
              <Input
                name="Nome"
                placeholder="Insira seu nome"
                width="18rem"
                height="3.12rem"
                background="#FFFFFF"
                border="1px solid #D7D7D7"
                borderRadius="10px"
                outline="none"
                marginTop="1rem"
                padding="0.8rem"
                value={getValues("name")}
                onChange={(value) => setValue("name", value)}
                required
              />

              <Input
                name="E-mail"
                placeholder="Insira seu e-mail"
                width="18rem"
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
                width="18rem"
                height="3.12rem"
                background="#FFFFFF"
                border="1px solid #D7D7D7"
                borderRadius="10px"
                outline="none"
                marginTop="1rem"
                padding="0.8rem"
                value={getValues("password")}
                onChange={(value) => setValue("password", value)}
                required
              />
            </div>

            <p className="textPoppinsWeight600 textTerms">Termos de uso e privacidade</p>
            <div className="containerCheckbox">
              <input
                type="checkbox"
                className="inputCheckbox"
                value={getValues("terms")}
                onChange={(e) => setValue("terms", e.target.checked)}
              />

              <div>
                <p className="textPoppinsCheckBox">Ao clicar neste botão, eu concordo com os  termos de uso e privacidade da nossa empresa.</p>

                <p className="textPoppinsTerms">Termos de uso e privacidade</p>
              </div>
            </div>

            <div className="containerRegister">
              <Button
                width="16.68rem"
                height="2.81rem"
                background="#476EE6"
                borderRadius="60px"
                color="white"
                border="none"
                marginBottom="1.5rem"
              >
                <span className="textPoppinsButtonRegister">Cadastrar</span>
              </Button>

            </div>
          </form>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p className="textPoppinsPlaceholder" style={{ marginRight: "1rem" }}>Já tem uma conta?</p>
            <Button
              background="transparent"
              border="none"
              onClick={() => navigate("/login")}
            >
              <span className="textPoppinsTerms">Login</span>
            </Button>
          </div>
        </div>
      </div>
    </ThowColumnLayoutLoginRegister >
  );
}

export default Register;