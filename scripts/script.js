const jobApp = {};

//search for job listing from search field
jobApp.jobSearch = () =>{
    let search = $('input[type=search]').val();
    jobApp.getJobListing(search);
}


//indeed api. searches indeed for job
jobApp.getJobListing = (search) => {
    $.ajax({
        url: "https://proxy.hackeryou.com",
        method: "GET",
        dataType: "json",
        data: {
            reqUrl: "http://api.indeed.com/ads/apisearch",
            params: {
                publisher: "2117056629901044",
                v: 2,
                format: "json",
                q: search,
                location: "toronto",
                co: "ca",
                limit: "3",
                pageNumber: "1"
            }
        }
    }).then(res => {

        if (res.totalResults === 0) {
          alert("0 results found please search again");}
        else {  
        const jobListings = res.results;
        jobApp.displayJobListings(jobListings);
        location.href = "#next";
        }
    });
}; 
//display results
jobApp.displayJobListings = jobListings => {
    $('.jobContainer').html("");
    const job = jobListings; job.forEach(item => {
        $(".jobContainer").append(`
           <div class="job">
               <h2>${item.jobtitle}</h2>
               <h3>${item.company}</h3>
               <p>${item.snippet}</p>
               <button class="jobbtn">Ruin This Oppurtunity!</button>
           </div>`);
    });
}; 


//stores the title and employer
jobApp.getJobTitle = x => {
    let indeedTitle = $(x).siblings("h2").text();
    let indeedCompany = $(x).siblings("h3").text();
    textQuery = indeedTitle.replace(/\s/g, "%20");
    jobApp.jobTitleNormalize(textQuery);
    jobApp.coverLetterIntro(indeedCompany, indeedTitle);

}; 

//enters the job title to get a normalised job title which will be used to find skills associated with job
//and gets the uuid needed
jobApp.jobTitleNormalize = textQuery => {
    $.ajax({
        url: `https://api.dataatwork.org/v1/jobs/normalize?job_title=${textQuery}`,
        dataType: "json",
        method: "GET"
    }).then(res => {
        console.log(res[0].parent_uuid);
        const jobuuid = res[0].parent_uuid;
        jobApp.getJobuuid(jobuuid);
    });
}; 

//uuid used from normalised job title to get a list of skills
jobApp.getJobuuid = uuid => {
    $.ajax({
        url: `https://api.dataatwork.org/v1/jobs/${uuid}/related_skills`,
        dataType: "json",
        method: "GET"
    }).then(res => {
         $(".skillsList").html("");
        for (let i = 0; i < 3; i++) {
            $(".skillsList").append(`
           <li> ${res.skills[i].description}</li>`);
            console.log(res.skills[i].description);
        }
    });
}; 

//display job title and employer in cover letter
jobApp.coverLetterIntro = (x,y) => {
    $(".companyName").text(x);
    $(".jobRole").text(y);    
};




////////// collects values from the checkboxes below and uses that value to search for a list of antonyms

jobApp.replaceAntonymn = (query) => {
  $.ajax({
    url: `https://api.datamuse.com/words?rel_ant=${query}`,
    method: "GET",
    dataType: "json"
  }).then(res => {
    console.log(res);
    if (res.length === 0) {
      alert(`no antonym for ${query}`);
    }
    const anton = res; 
    jobApp.randomAnt(anton);
  });
};

//selects a random antonym from the list
jobApp.randomAnt = (anton) => {
  const index = Math.floor(Math.random() * anton.length);
  console.log(anton[index].word);
  $('.ability').text(anton[index].word);
};

jobApp.replaceAntonymn2 = query => {
  $.ajax({
    url: `https://api.datamuse.com/words?rel_ant=${query}`,
    method: "GET",
    dataType: "json"
  }).then(res => {
    console.log(res);
    if (res.length === 0) {
      alert(`no antonym for ${query}`);
    }
    const anton = res;
    jobApp.randomAnt2(anton);
  });
};

jobApp.randomAnt2 = anton => {
  const index = Math.floor(Math.random() * anton.length);
  console.log(anton[index].word);
  $(".antony1").text(anton[index].word);
};

jobApp.replaceAntonymn3 = query => {
  $.ajax({
    url: `https://api.datamuse.com/words?rel_ant=${query}`,
    method: "GET",
    dataType: "json"
  }).then(res => {
    console.log(res);
    if (res.length === 0) {
      alert(`no antonym for ${query}`);
    }
    const anton = res;
    jobApp.randomAnt3(anton);
  });
};

jobApp.randomAnt3 = anton => {
  const index = Math.floor(Math.random() * anton.length);
  console.log(anton[index].word);
  $(".antony2").text(anton[index].word);
};

jobApp.replaceAntonymn4 = query => {
  $.ajax({
    url: `https://api.datamuse.com/words?rel_ant=${query}`,
    method: "GET",
    dataType: "json"
  }).then(res => {
    console.log(res);
    if (res.length === 0) {
      alert(`no antonym for ${query}`);
    }
    const anton = res;
    jobApp.randomAnt4(anton);
  });
};

jobApp.randomAnt4 = anton => {
  const index = Math.floor(Math.random() * anton.length);
  console.log(anton[index].word);
  $(".antony3").text(anton[index].word);
};


jobApp.replaceAntonymn5 = query => {
  $.ajax({
    url: `https://api.datamuse.com/words?rel_ant=${query}`,
    method: "GET",
    dataType: "json"
  }).then(res => {
    console.log(res);
    if (res.length === 0) {
      alert(`no antonym for ${query}`);
    }
    const anton = res;
    jobApp.randomAnt5(anton);
  });
};
jobApp.randomAnt5 = anton => {
  const index = Math.floor(Math.random() * anton.length);
  console.log(anton[index].word);
  $(".antony4").text(anton[index].word);
};


jobApp.smoothScroll = () => {

    $('a[href^="#"]').on('click', function (event) {
    
        var target = $(this.getAttribute('href'));
    
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    
    });
}

jobApp.init = () => {
    jobApp.smoothScroll();
    $('.cvrLetter').hide();
    $('.againButton').hide();
}; 

$(function () {
    jobApp.init(); 

    $(".showJobs").on("click", function(e) {
    e.preventDefault();
    jobApp.jobSearch();
    });    

    $("div").on("click", ".jobbtn", function(e) {
    jobApp.getJobTitle(this);
    location.href="#wordSkill";
});


   //incase user selects more than 5 skills

    $("input[type=checkbox]").on("change", function(e) {
    if ($("input[type=checkbox]:checked").length > 5) {
        $(this).prop("checked", false);
        alert("Please only select 5 skills");
    }
    });
//collects values from the checkboxes
    
    $('form').on("submit", function(e){
        e.preventDefault();
        let searchIDs = $("input:checked").map(function() {
          return $(this).val();
        });
        $("input:checked").prop("checked", false);
        $('.cvrLetter').show();
        $('.againButton').show();
        console.log(searchIDs.get());
        console.log(searchIDs[1]);
        jobApp.replaceAntonymn(searchIDs[0]);
        jobApp.replaceAntonymn2(searchIDs[1]);
        jobApp.replaceAntonymn3(searchIDs[2]);
        jobApp.replaceAntonymn4(searchIDs[3]);
        jobApp.replaceAntonymn5(searchIDs[4]);
        location.href="#cvrLetter";
    });

    $(".againButton button").on("click", function(e) {
        e.preventDefault();
        $(".cvrLetter").hide();
        $(".againButton").hide();
        $("input[type=search]").val("");
        $('.jobContainer').html('');
    });

});