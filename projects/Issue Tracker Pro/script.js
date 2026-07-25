/* ==========================================
   Issue Tracker Pro
   Part 1
   Author : Probal Dhali
========================================== */

const issueForm = document.getElementById("issueInputForm");
const issueList = document.getElementById("issuesList");

const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");

const totalIssues = document.getElementById("totalIssues");
const openIssues = document.getElementById("openIssues");
const closedIssues = document.getElementById("closedIssues");

const scrollTopBtn = document.getElementById("scrollTop");
const themeBtn = document.getElementById("themeBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

let issues = JSON.parse(localStorage.getItem("issues")) || [];

/* ==========================================
   Save Issue
========================================== */

issueForm.addEventListener("submit", function(e){

    e.preventDefault();

    const description =
    document.getElementById("issueDescInput").value.trim();

    const severity =
    document.getElementById("issueSeverityInput").value;

    const assignedTo =
    document.getElementById("issueAssignedToInput").value.trim();

    if(description==="" || assignedTo===""){

        alert("Please fill all fields.");

        return;

    }

    const issue={

        id:Date.now(),

        description,

        severity,

        assignedTo,

        status:"Open",

        created:new Date().toLocaleString()

    };

    issues.unshift(issue);

    saveLocal();

    issueForm.reset();

    renderIssues();

});

/* ==========================================
   Local Storage
========================================== */

function saveLocal(){

    localStorage.setItem(

        "issues",

        JSON.stringify(issues)

    );

}

/* ==========================================
   Render Issues
========================================== */

function renderIssues(){

    issueList.innerHTML="";

    let open=0;

    let closed=0;

    let keyword=searchInput.value.toLowerCase();

    let filter=filterStatus.value;

    issues.forEach(issue=>{

        if(

            issue.description.toLowerCase().includes(keyword)==false

            &&

            issue.assignedTo.toLowerCase().includes(keyword)==false

        ){

            return;

        }

        if(filter!="All" && issue.status!=filter){

            return;

        }

        if(issue.status==="Open") open++;

        else closed++;

        issueList.innerHTML+=`

<div class="issue-card">

<div class="issue-header">

<span class="issue-id">

#${issue.id}

</span>

<span class="badge ${
issue.status==="Open"
?
"badge-open"
:
"badge-closed"
}">

${issue.status}

</span>

</div>

<h3 class="issue-title">

${issue.description}

</h3>

<div class="issue-info">

<span>

<i class="fa-solid fa-layer-group"></i>

${issue.severity}

</span>

<span>

<i class="fa-solid fa-user"></i>

${issue.assignedTo}

</span>

<span>

<i class="fa-solid fa-clock"></i>

${issue.created}

</span>

</div>

<div class="action-buttons">

<button
class="btn-close"

onclick="toggleStatus(${issue.id})">

${issue.status==="Open"
?
"Close"
:
"Reopen"}

</button>

<button
class="btn-delete"

onclick="deleteIssue(${issue.id})">

Delete

</button>

</div>

</div>

`;

    });

    totalIssues.textContent=issues.length;

    openIssues.textContent=open;

    closedIssues.textContent=closed;

}

/* ==========================================
   Delete
========================================== */

function deleteIssue(id){

    if(!confirm("Delete this issue?"))

        return;

    issues=issues.filter(

        issue=>issue.id!==id

    );

    saveLocal();

    renderIssues();

}

/* ==========================================
   Status
========================================== */

function toggleStatus(id){

    issues=issues.map(issue=>{

        if(issue.id===id){

            issue.status=

            issue.status==="Open"

            ?

            "Closed"

            :

            "Open";

        }

        return issue;

    });

    saveLocal();

    renderIssues();

}

/* ==========================================
   Events
========================================== */

searchInput.addEventListener(

"input",

renderIssues

);

filterStatus.addEventListener(

"change",

renderIssues

);

clearAllBtn.addEventListener(

"click",

()=>{

if(confirm("Delete all issues?")){

issues=[];

saveLocal();

renderIssues();

}

}

);

/* ==========================================
   Init
========================================== */

renderIssues();

/* ==========================================
   PART 2
   Theme, Toast, Scroll & Edit
========================================== */

/* ===========================
   Theme
=========================== */

loadTheme();

themeBtn.addEventListener("click", toggleTheme);

function toggleTheme(){

    document.body.classList.toggle("light");

    const mode = document.body.classList.contains("light")
        ? "light"
        : "dark";

    localStorage.setItem("theme", mode);

    updateThemeIcon();

}

function loadTheme(){

    const mode = localStorage.getItem("theme");

    if(mode === "light"){

        document.body.classList.add("light");

    }

    updateThemeIcon();

}

function updateThemeIcon(){

    themeBtn.innerHTML =

        document.body.classList.contains("light")

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';

}

/* ===========================
   Toast Notification
=========================== */

function showToast(message,color="#22c55e"){

    const toast=document.createElement("div");

    toast.className="toast-message";

    toast.innerHTML=message;

    toast.style.background=color;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },2500);

}

/* ===========================
   Scroll To Top
=========================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        scrollTopBtn.style.display="flex";

    }

    else{

        scrollTopBtn.style.display="none";

    }

});

scrollTopBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ===========================
   Edit Issue
=========================== */

function editIssue(id){

    const issue=issues.find(

        item=>item.id===id

    );

    if(!issue) return;

    const desc=prompt(

        "Edit Description",

        issue.description

    );

    if(desc===null) return;

    const user=prompt(

        "Assigned To",

        issue.assignedTo

    );

    if(user===null) return;

    issue.description=desc;

    issue.assignedTo=user;

    saveLocal();

    renderIssues();

    showToast("Issue Updated ✨");

}

/* ===========================
   Copy Issue ID
=========================== */

function copyID(id){

    navigator.clipboard.writeText(id);

    showToast("Issue ID Copied");

}

/* ===========================
   Export JSON
=========================== */

function exportJSON(){

    const data=

    JSON.stringify(

        issues,

        null,

        2

    );

    const blob=

    new Blob(

        [data],

        {type:"application/json"}

    );

    const url=

    URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="issues.json";

    a.click();

    URL.revokeObjectURL(url);

}

/* ===========================
   Import JSON
=========================== */

function importJSON(event){

    const file=event.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=e=>{

        try{

            issues=

            JSON.parse(e.target.result);

            saveLocal();

            renderIssues();

            showToast(

                "Issues Imported"

            );

        }

        catch{

            showToast(

                "Invalid JSON",

                "#ef4444"

            );

        }

    };

    reader.readAsText(file);

}

/* ===========================
   Better Delete
=========================== */

const oldDelete=deleteIssue;

deleteIssue=function(id){

    if(!confirm("Delete this issue?"))

        return;

    issues=

    issues.filter(

        item=>item.id!==id

    );

    saveLocal();

    renderIssues();

    showToast("Issue Deleted","#ef4444");

}

/* ===========================
   Better Status
=========================== */

const oldToggle=toggleStatus;

toggleStatus=function(id){

    issues=

    issues.map(item=>{

        if(item.id===id){

            item.status=

            item.status==="Open"

            ?

            "Closed"

            :

            "Open";

        }

        return item;

    });

    saveLocal();

    renderIssues();

    showToast("Status Updated");

}

/* ==========================================
   PART 3
   Professional Features
========================================== */

/* ===========================
   Keyboard Shortcut
=========================== */

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="f"){

        e.preventDefault();

        searchInput.focus();

    }

});

/* ===========================
   Auto Backup
=========================== */

setInterval(()=>{

    localStorage.setItem(

        "issue_backup",

        JSON.stringify(issues)

    );

},10000);

/* ===========================
   Restore Backup
=========================== */

function restoreBackup(){

    const backup=

    localStorage.getItem(

        "issue_backup"

    );

    if(!backup) return;

    if(confirm("Restore Backup?")){

        issues=JSON.parse(backup);

        saveLocal();

        renderIssues();

        showToast("Backup Restored");

    }

}

/* ===========================
   Empty State
=========================== */

function showEmpty(){

    if(issues.length!==0) return;

    issueList.innerHTML=`

    <div style="text-align:center;padding:60px;">

    <i class="fa-solid fa-inbox"

    style="font-size:80px;color:#94a3b8;"></i>

    <h2>No Issues Found</h2>

    <p>Create your first issue.</p>

    </div>

    `;

}

/* ===========================
   Export CSV
=========================== */

function exportCSV(){

    let csv=

"ID,Description,Severity,AssignedTo,Status,Created\n";

    issues.forEach(item=>{

csv+=`${item.id},"${item.description}",${item.severity},"${item.assignedTo}",${item.status},"${item.created}"\n`;

    });

    const blob=new Blob(

        [csv],

        {type:"text/csv"}

    );

    const url=

    URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="issues.csv";

    a.click();

    URL.revokeObjectURL(url);

}

/* ===========================
   Statistics
=========================== */

function updateStats(){

    totalIssues.textContent=

    issues.length;

    openIssues.textContent=

    issues.filter(

        i=>i.status==="Open"

    ).length;

    closedIssues.textContent=

    issues.filter(

        i=>i.status==="Closed"

    ).length;

}

/* ===========================
   Enhanced Render
=========================== */

const oldRender=renderIssues;

renderIssues=function(){

    oldRender();

    updateStats();

    showEmpty();

}

/* ===========================
   Welcome
=========================== */

window.addEventListener("load",()=>{

    showToast(

        "Welcome to Issue Tracker Pro 🚀"

    );

});

/* ===========================
   Auto Save Notification
=========================== */

window.addEventListener("beforeunload",()=>{

    saveLocal();

});

/* ===========================
   Version
=========================== */

console.log(

"%cIssue Tracker Pro v2.0",

"color:#06b6d4;font-size:20px;font-weight:bold"

);

/* ===========================
   Developer Info
=========================== */

console.log(

"Created By Probal Dhali"

);

console.log(

"https://github.com/probal2005"

);

/* Ripple Effect */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        ripple.style.left=e.offsetX+"px";

        ripple.style.top=e.offsetY+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },500);

    });

});

/* Live Clock */

function updateClock(){

    const now=new Date();

    document.title=

    "Issue Tracker • "+now.toLocaleTimeString();

}

setInterval(updateClock,1000);

/* Welcome Message */

setTimeout(()=>{

    showToast("Happy Coding 🚀");

},1200);

/* Footer Year */

const year=new Date().getFullYear();

const footer=document.querySelector("footer p:last-child");

if(footer){

    footer.innerHTML=

    `© ${year} <a href="https://github.com/probal2005" target="_blank">Probal Dhali</a>`;

}