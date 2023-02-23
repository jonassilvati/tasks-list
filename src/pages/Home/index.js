import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.scss';
import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth';

function Home(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        
        if(email == '' || password == ''){
            alert('Please enter a correct email or password');
            return;
        }

        await signInWithEmailAndPassword(auth, email, password)
        .then(function(){
            navigate('/admin', {replace: true});
        })
        .catch(function(){
            console.log('Erro ao fazer login')
        });

        
    }

    return(
        <div className='home-container'>
            
            <div className='wrap'>
                <h1>Lista de tarefas</h1>
                <p>Gerencia sua agenda de forma fácil</p>

                <form className='login-form' onSubmit={handleLogin}>
                    <input
                        type='text'
                        placeholder='Digite seu e-mail'
                        autoComplete='false'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                    <input 
                        autoComplete='false'
                        type="password"
                        placeholder='Password'
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