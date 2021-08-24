
document.querySelector(".button-container")
.addEventListener("click",() =>{
    let text=document.getElementById ("filter-jobs").value;
    getJobs().then(jobs =>{
        let filteredJobs=filterJobs(jobs,text);
        showJobs(filteredJobs)
    })

})

function getJobs(){

    const res= fetch("data.json")
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        return data;
    })
    return res;
}

function filterJobs(jobs,searchText){
    if(searchText){
        let filteredJobs=jobs.filter(job=>{
            if(job.roleName.toLowerCase().includes(searchText)
               || job.type.toLowerCase().includes(searchText)
               || job.company.toLowerCase().includes(searchText)
               || job.requirements.content.toLowerCase().includes(searchText) ){
                   return true;
            } else {
                   return false;
            }
        })
        return filteredJobs;
    }
    else{
        return jobs;
    }
}

function showJobs(jobs){
    console.log(jobs);
    let jobsContainer= document.querySelector(".jobs-container");
    let jobsHTML = "";
    jobs.forEach(job => {
       // console.log(job.logo);
        jobsHTML += `
        <div class="jobs-tile">
        <div class="top">
            <img src="${job.logo}">
            <span class="material-icons
            more_horiz">more_horiz</span>
        </div>
        <div class="rolename">
            <span>"${job.roleName}"</span>
        </div>
        <div class="description">
            <span>"${job.requirements.content}"</sapn>
        </div>
        <div class="buttons">
            <div class="button apply-now">
                Apply Now
            </div>
            <div class="button">
                Message
            </div>
        </div>
    </div>
    `
        
    })
    //console.log(jobsHTML);
    jobsContainer.innerHTML = jobsHTML;
}

getJobs().then(data => {
    showJobs(data);
});