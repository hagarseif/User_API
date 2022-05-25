let userId=1;
let next=document.querySelector('.next')
let prev=document.querySelector(".prev");
 //next and prev btn

      
 next.addEventListener('click',()=>{
    if(userId>=10){
        userId=10;
    }
    else{
        userId++;
        displaydata()
    }
})

prev.addEventListener('click',()=>{
    if(userId<=1){
        userId=1;
    }
    else
    {
        --userId;
    }
    displaydata();
    
})
let getinfo=(userId)=>{
    return new Promise((res)=>{
        let url=`https://jsonplaceholder.typicode.com/users/${userId}`
        fetch(url)
        .then((response)=>{
            res(response.json())
        })
    })
}


function getPost(){
    return new Promise((res)=>{
        let url='https://jsonplaceholder.typicode.com/posts/';
        fetch(url).
        then((response)=>{
            res(response.json())
        })
    })
}
    
async function displaydata(){
    let text=document.querySelector('.text');
    let userInfo='';
    let posts=document.querySelector('.caard');
    let postInfo=``;
    try{
        const data1=await getinfo(userId)
        const data2=await getPost();
        userInfo=`
        <p>User ID: ${data1.id}</p>
        <p>User name:  ${data1.name}</p>
        <p>Email:  ${data1.email}</p>
        <p>Address:  ${data1.address.street} ${data1.address.suite}</p>
        <p>Phone: ${data1.phone} </p>
        <p>Company name: ${data1.company.name}</p>
        `
        text.innerHTML=userInfo;


        data2.forEach((post)=> {
            if(userId === post.userId){
                postInfo+=`
                <div class="card mb-4">
                <div class="card-header">
                <h5>${post.title}</h5>
                  </div>
                <div class="card-body">
                <p>${post.body}</p>
                  </div>
                </div>
                `;
            }
        })
        posts.innerHTML=postInfo;
        }
      
    catch(err){
        text.innerHTML='<h2>404 Error</h2>'
        posts.innerHTML='<h2>404 Error</h2>'
    }
}
displaydata()