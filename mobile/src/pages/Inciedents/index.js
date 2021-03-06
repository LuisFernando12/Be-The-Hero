import React, {useEffect, useState} from 'react';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View,FlatList ,Text, Image, TouchableOpacity} from 'react-native';

import api from '../../services/api';
import styles from './style';
import logoImg from '../../assets/logo.png';

export default function Incidents(){
    const navigation = useNavigation();
    const [incidents,setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents(){
        if(loading){
            return;
        }

        if (total > 0 && incidents.length === total ){
            return;
        }

        setLoading(true);
       try {
        const response = await api.get('incidents', {
            params: {page}
        });
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
       } catch (error) {
        console.log(error);
                   
       }
        
        
    }

    useEffect(()=>{
        loadIncidents();
    }, [])
    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>Total de <Text style={styles.hederTextBold}> {total} casos</Text></Text>
            </View>

            <Text style={styles.title}>Bem-Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia. </Text>
        
    <FlatList
        data={incidents}
        style={styles.incidentList}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        keyExtractor={incident => String(incident.id)}
        renderItem={({ item : incident}) => (
            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>
                
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
                
                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
            
                <TouchableOpacity
                 style={styles.Button}
                 onPress={()=>{navigateToDetail(incident)}}
                >
                    <Text style={styles.ButtonText}>Ver mais Detalhes</Text>
                    <Feather name="arrow-right" size={16} color="#E02041"/>
                </TouchableOpacity>
            </View>
        )}
    />
      
        </View>
    );
}