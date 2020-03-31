import React, {useState} from 'react';
import './style.css';
import {FiArrowLeft} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'
export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value
        };
        const ongId = localStorage.getItem('ong_id');
        try {
            api.post('incidents',data,{
                headers:{
                    Authorization: ongId
                }
            });
            history.push('/profile')
        } catch (error) {
            alert('Erro ao cadastrar um novo caso')
        }
    }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" srcset=""/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                     type="text" 
                     placeholder="Titulo do caso"
                     value={title}
                     onChange={(e)=>{setTitle(e.target.value)}}
                    />
                    <textarea
                     placeholder="Descrição"
                     value={description}
                     onChange={(e)=>{setDescription(e.target.value)}}
                    />
                    <input
                     type="text"
                     placeholder="Valor em reais"
                     value={value}
                     onChange={(e)=>{setValue(e.target.value)}}
                   />
                    
                
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}