import {useEffect, useState} from 'react'
import axios from 'axios'
import './index.css'



const Table = ()=>{
    const [users, setUsersData] = useState([])
    const [searchText, setSerachText] = useState('')

    useEffect(()=>{

        const getData = async ()=>{
            try {
                const usersResponse = await axios.get(`http://localhost:3000/v1/users?searchText=${searchText}`) 
                setUsersData(usersResponse.data)
            } catch (error) {
                console.log('Error fetching data: ', error)
            }
        }
        getData()
    }, [searchText])

    return(
        <div className='main-container'>
            <h2>Users Details</h2>
            <input type="search" placeholder='search by name' value={searchText} onChange={(e)=> setSerachText(e.target.value)}/>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Posts</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    users.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <ol>
                                    {
                                        user.posts.map((post)=> (
                                            <li key={post.id}>{post.title}</li>
                                        ))
                                    }
                                </ol>
                            </td>
                        </tr>
                    )) 
                    }
                </tbody>
            </table>
        </div>
    )
}





export default Table