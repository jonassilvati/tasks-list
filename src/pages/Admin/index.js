import { useState } from 'react';
import './admin.scss';

function Admin(){

    const [tarefaInput, setTarefaInput] = useState('');
    
    function handleTarefa(e){
        e.preventDefault();
        
        alert('clicou');
    }

    return(
        <div className='admin-container'>
            <div>
                <h1>Minhas tarefas</h1>
                <form onSubmit={handleTarefa}>
                    <textarea
                        placeholder='Digite sua tarefa...'
                        value={tarefaInput}
                        onChange={ e => setTarefaInput(e.target.value) }/>

                    <button type="submit">Registrar tarefa</button>                
                </form>
            </div>
        </div>
    )
}

export default Admin;