import { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

function Home(){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return(
        <div className='home-container'>
            
            <div className='wrap'>
                <h1>Lista de tarefas</h1>
                <p>Gerencia sua agenda de forma fácil</p>

                <form className='login-form'>
                    <input
                        type='text'
                        placeholder='Digite seu e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                    <input 
                        type="password"
                        placeholder='*****'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />

                    <button type="submit">Entrar</button>
                </form>
                <p>
                    Não possui uma conta?
                    <Link to="/register"> Registrar</Link>
                </p>
            </div>            
        </div>
    )
}

export default Home;