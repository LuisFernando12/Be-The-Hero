import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'
import './style.css';
import logoImg from '../../assets/logo.svg'

export default function Register(){

    function maskWhatsapp(e) {
            if(e.target.value.length === 1){
            e.target.value = '(';
            }
              
           if(e.target.value.length === 3 ){
               e.target.value += ') ';
           }

           if(e.target.value.length === 10 ){
               e.target.value += '-';
           }
    }



    const [name,setName] =  useState('');
    const [email,setEmail] =  useState('');
    const [whatsapp,setWhatsapp] =  useState('');
    const [city,setCity] =  useState('');
    const [uf,setUf] =  useState('');

    const history = useHistory();

    async function handleReagiter(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        try{
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');    
        }catch(err){
            alert('Erro no cadastro, tente novamente')
            console.log(err); 
        }

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleReagiter}>
                    <input
                     type="text"
                     placeholder="Nome da ONG"
                     value={name}
                     onChange={(e)=>{setName(e.target.value)}}
                    />
                    <input
                     type="email"
                     placeholder="E-mail"
                     value={email}
                     onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <input
                     type="text"
                     placeholder="WhatsApp"
                     value={whatsapp}
                     maxLength={15}
                     onKeyUp={(e)=>{
                         if(e.keyCode === 8){
                            return;
                         }
                        if(e.keyCode < 48 || e.keyCode >= 58){
                             alert('Digite apenas numeros');
                             e.target.value = '';
                            
                         }
                     }}
                     onKeyPress={(e)=>{
                        maskWhatsapp(e);
                     }}
                     onChange={(e)=>{                 
                      setWhatsapp(e.target.value)
                    }}
                    />
                    <div className="input-group">
                        <input
                         type="text" 
                         placeholder="cidade"
                         value={city}
                         onChange={(e)=>{setCity(e.target.value)}}
                        />
                        <input
                         type="text" 
                         placeholder="UF" 
                         style={{width:80}}
                         value={uf}
                         onChange={(e)=>{setUf(e.target.value)}}
                        />
                    </div>
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}