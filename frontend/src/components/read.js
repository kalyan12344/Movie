const LoginUser=()=>{
    const [data,setData]=useState([]);
    const url="http://localhost:8080/user"
    const getData=async()=>{
        Axios.get(`${url}/get`).then(response=>{
            setData(response.data)
        });
        // setData(res.data)
       
    }
    useEffect(()=>{
        getData();
    },[]);
    return(
        <div>
            <ul>
                {data.map((list,index)=>{
                    return(
                    <li key={index}>{list.username},{list.email},{list.password}</li>)
                })}
            </ul>
        </div>
    )
}
