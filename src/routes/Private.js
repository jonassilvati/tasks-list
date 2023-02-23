import { useState, useEffect } from 'react'
import { auth } from '../firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

export default function Private({children}){    
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);
    
    useEffect(()=>{
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, user => {
                if(user){//logado
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem('@detailUser', JSON.stringify(userData));
                    setSigned(true);
                }else{
                    setSigned(false);
                }

                setLoading(false);
            })  
        };

        checkLogin();
    }, []);

    if(loading){
        return(<p>Carregando...</p>)
    }
    
    if(!signed){
        return <Navigate to="/" />
    }
    
    console.log('usupario logado')
    
    return children;
}