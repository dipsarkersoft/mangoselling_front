
import React , {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useAuth } from '../context/useAuth';


export const LoginPage =  () => {

  const navigate=useNavigate()

const {loginUser,role} =useAuth()


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)

  const handleLogin = async (e) => {

    e.preventDefault();

    if(!username){
      toast.error('Username Needed')
    }
   else if(!password){
      toast.error('Password Needed')
    }
    else{

      setLoading(true)    
      const res= await loginUser(username, password);
      if(res){
      setLoading(false)
      }
              
    }

   
  };

  useEffect(() => {
    if (role == 'Buyer') {
      navigate('/dashboard');
    } 
    else if (role == 'Seller') {
      navigate('/dashboard/Seller');
    }
  }, [role,navigate]); 




  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
           {

loading?<> <h1>Loading.....</h1></>:<>

<div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              <form>



                <div className="mb-3">
                  <label className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="text"
                    placeholder="Enter Your Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>



                <button onClick={handleLogin} type="submit" className="btn btn-primary w-100">
               Login
                </button>
              </form>
              <div className="text-center mt-3">
                
                  Don't have an account? <Link  to={'/register'}> Sign up</Link>
              
              </div>
            </div>
</>
         
         }
           
           

          </div>
        </div>
      </div>
    </div>
  )
}
