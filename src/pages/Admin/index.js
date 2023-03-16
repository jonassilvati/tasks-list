import { useState, useEffect } from 'react';
import './admin.scss';
import { auth, db} from '../../firebaseConnection'
import { signOut } from 'firebase/auth';

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

function Admin(){

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser ] = useState({});
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState({});
    
    useEffect(()=>{
        async function loadTarefas(){
            console.log('carregando tarefas');
            const userDetail = localStorage.getItem('@detailUser');
            setUser(JSON.parse(userDetail));

            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas");
                const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid));

                const unsub = onSnapshot(q, snapshot => {
                    let lista = [];
                    
                    snapshot.forEach(doc => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })

                    console.log('tarefas:', lista);
                    setTarefas(lista);
                })
            }

        }

        loadTarefas();
    },[]);

    async function handleUpdateTask(){
        const docRef = doc(db, 'tarefas', edit?.id);
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            console.log('tarefa atualizada')            
        })
        .catch((err) => {
            console.log('erro atualizar: ', err)
        }) 
        .finally(() => {
            setTarefaInput('');
            setEdit({});
        })
    }
    
    async function handleRegister(e){
        e.preventDefault();
        
        if(tarefaInput === ''){
            alert('Please enter with a valid task')
            return;
        }

        if(edit?.id){
            handleUpdateTask();
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

    async function deleteTask(taskId){
        const docRef = doc(db, 'tarefas', taskId);
        await deleteDoc(docRef);    
    }

    function editTask(item){
        setTarefaInput(item.tarefa);
        setEdit(item);

        //document.querySelector('[type="submit"]').textContent = 'Salvar dados';
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


                    {Object.keys(edit).length > 0 ? (
                        <button type="submit">Salvar tarefa</button>                
                    ):(
                        <button type="submit">Registrar tarefa</button>                
                    )
                    }
                    
                </form>
                {tarefas.map((task) => {
                    return (
                        <article key={task.id} className='list'>
                            <p>{task.tarefa}</p>
                            
                            <div>
                                <button onClick={() => editTask(task)} className="btn-edit">Editar</button>
                                <button onClick={() => deleteTask(task.id)} className='btn-delete'>Concluir</button>
                            </div>
                        </article>
                    )
                })}
                

                <button onClick={handleLogout} className='btn-logout'>Sair</button>
            </div>
        </div>
    )
}

export default Admin;