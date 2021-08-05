import {useState, useEffect} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './screen.css';

const Screen = () => {

    const [users, setUsers] = useState([]);

    const getUser = (page=1) => {
        fetch(`https://reqres.in/api/users?page=${page}`)
        .then(res => res.json())
        .then(json => {
        setUsers(json);
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    let total_pages=[];
    
    for(let i=1; users.total_pages>=i; i++ ){
        total_pages.push(i);
        
    }


    return (
        <div>
            <h1>Fetch Data from Api !!</h1>
            <div className="container mt-5">
                <div className="row text-center">
                    {
                        users.data && users.data.map((user) => {
                            return(
                                <div className="col-10 col-md-4 mt-5" key={user.id}>
                                    <div className="card" style={{width: '18rem'}}>
                                        <img src={user.avatar} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <p className="card-text">Name: {user.first_name} {user.last_name}</p>
                                            <p className="card-text">Email: {user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            
                <div> 
                    <ul className="page">
                        {
                            total_pages.map((page) => <li className="page-item" onClick={()=>getUser(page)}>{page}</li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Screen;

