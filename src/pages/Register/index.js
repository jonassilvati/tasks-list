import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();
        
        if(email == '' || password == ''){
            alert('Please enter with credentials');
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password)
            .then(function(){
                //-- cadastrou o usuário
                navigate('/admin', {replace:true})
            })
            .catch(function(){
                alert('Error creating user')
            });
        
        

        
    }

    return(
        <div className='home-container'>
            
            <div className='wrap'>
                <h1>Cadastre-se</h1>
                <p>Vamos criar sua conta</p>

                <form className='login-form' onSubmit={handleRegister}>
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
                    Já possui uma conta?
                    <Link to="/"> faça o Login</Link>
                </p>
            </div>            
        </div>
    )
}

export default Register;