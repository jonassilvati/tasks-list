import { useState, useEffect } from 'react';
import './admin.scss';
import { auth, db} from '../../firebaseConnection'
import { signOut } from 'firebase/auth';

import {
    addDoc,
    collection
} from 'firebase/firestore';

function Admin(){

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser ] = useState({});
    
    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem('@detailUser');
            setUser(JSON.parse(userDetail));
        }

        loadTarefas();
    },[]);
    
    async function handleRegister(e){
        e.preventDefault();
        
        if(tarefaInput === ''){
            alert('Please enter with a valid task')
            return;
        }

        await addDoc(collection(db, "tarefas"),{
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            console.log('tarefa registrada');
            setTarefaInput('');
        })
        .catch(error=>{
            console.log('erro ao registrar: ', error)
        })
        

        
    }

    async function handleLogout(){
        await signOut(auth);
    }

    return(
        <div className='admin-container'>
            <div>
                <h1>Minhas tarefas</h1>
                <form className='form' onSubmit={handleRegister}>
                    <textarea
                        placeholder='Digite sua tarefa...'
                        value={tarefaInput}
                        onChange={ e => setTarefaInput(e.target.value) }/>

                    <button type="submit">Registrar tarefa</button>                
                </form>

                <article className='list'>
                    <p>Estudar javascript e reactjs</p>
                    
                    <div>
                        <button>Editar</button>
                        <button className='btn-delete'>Concluir</button>
                    </div>
                </article>

                <button onClick={handleLogout} className='btn-logout'>Sair</button>
            </div>
        </div>
    )
}

export default Admin;