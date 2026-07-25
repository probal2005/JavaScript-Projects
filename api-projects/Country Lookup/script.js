const input=document.getElementById("countryInput");

const btn=document.getElementById("searchBtn");

const result=document.getElementById("result");

btn.addEventListener("click",fetchCountry);

input.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        fetchCountry();

    }

});

async function fetchCountry(){

    const country=input.value.trim();

    if(country===""){

        result.innerHTML=`
        <div class="error">
        ⚠️ Please enter a country name.
        </div>
        `;

        return;

    }

    result.innerHTML=`
    <div class="loading">
        ⏳ Searching...
    </div>
    `;

    try{

        const response=await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(country)}`
        );

        if(!response.ok){

            throw new Error("Country not found.");

        }

        const data=await response.json();

        result.innerHTML=`

        <div class="card shadow-lg">

            <div class="card-body">

                <h2 class="mb-3">

                    ${data.title}

                </h2>

                ${
                    data.thumbnail
                    ?
                    `<img src="${data.thumbnail.source}"
                    class="img-fluid mb-3">`
                    :
                    ""
                }

                <p>

                    ${data.extract}

                </p>

                <a
                    href="${data.content_urls.desktop.page}"
                    target="_blank"
                    class="btn btn-outline-primary">

                    📖 Read Full Article

                </a>

            </div>

        </div>

        `;

    }

    catch(err){

        result.innerHTML=`

        <div class="error">

            ❌ Country Not Found

        </div>

        `;

    }

}